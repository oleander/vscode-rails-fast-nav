1 import * as vscode from 'vscode';
2 import * as path from 'path';
3 import { ensureDocument } from '../path-utils';
4 import { SwitchFile, OrPromise } from '../types';
5 
6 interface IndexedQuickPickItem extends vscode.QuickPickItem {
7   create: boolean;
8   index: number;
9 }
10 
11 let notificationTimeout: NodeJS.Timeout | null = null;
12 
13 export function openFile(filename: string) {
14   return vscode.workspace
15     .openTextDocument(filename)
16     .then(vscode.window.showTextDocument);
17 }
18 
19 export async function createFile(switchFile: SwitchFile) {
20   return openFile(switchFile.filename);
21 }
22 
23 function existingQuickPickItem(root: string) {
24   return (switchFile: SwitchFile, index: number): IndexedQuickPickItem => ({
25     label: switchFile.title,
26     description: '',
27     detail: path.relative(root, switchFile.filename),
28     index,
29     create: false,
30   });
31 }
32 
33 function createQuickPickItem(root: string) {
34   return (switchFile: SwitchFile, index: number): IndexedQuickPickItem => ({
35     label: switchFile.title,
36     description: `Create ${switchFile.type}`,
37     detail: path.relative(root, switchFile.filename),
38     index,
39     create: true,
40   });
41 }
42 
43 function quickPickItem(root: string) {
44   const existing = existingQuickPickItem(root);
45   const create = createQuickPickItem(root);
46 
47   return (switchFile: SwitchFile, index: number) => {
48     if (switchFile.checkedExists) {
49       return existing(switchFile, index);
50     } else {
51       return create(switchFile, index);
52     }
53   };
54 }
55 
56 async function quickPickItems(
57   root: string,
58   switchFiles: OrPromise<SwitchFile[]>
59 ): Promise<IndexedQuickPickItem[]> {
60   return (await Promise.resolve(switchFiles)).map(quickPickItem(root));
61 }
62 
63 export async function showPicker(
64   root: string,
65   switchFiles: OrPromise<SwitchFile[]>
66 ) {
67   const picked: IndexedQuickPickItem = await vscode.window.showQuickPick(
68     quickPickItems(root, switchFiles)
69   );
70 
71   if (picked) {
72     const switchFile = switchFiles[picked.index];
73 
74     if (picked.create) {
75       await createFile(switchFile);
76     } else {
77       await openFile(switchFile.filename);
78     }
79     return switchFile;
80   }
81 }
82 
83 export async function showYesNo(message: string): Promise<boolean> {
84   const yesItem: vscode.MessageItem = {
85     title: 'Yes',
86   };
87   const noItem: vscode.MessageItem = {
88     title: 'No',
89     isCloseAffordance: true,
90   };
91 
92   const response = await vscode.window.showInformationMessage(
93     message,
94     yesItem,
95     noItem
96   );
97   return response === yesItem;
98 }
99 
100 export async function showCreateFile(filename: string): Promise<void> {
101   const root = vscode.workspace.workspaceFolders[0].uri.fsPath;
102   const display = path.relative(root, filename);
103   const message = `Create ${display}`;
104 
105   if (await showYesNo(message)) {
106     return ensureDocument(filename);
107   }
108 }
109 
110 export async function showNotification(message: string): Promise<void> {
111   if (notificationTimeout) {
112     clearTimeout(notificationTimeout);
113   }
114 
115   vscode.window.setStatusBarMessage(message, 3000);
116 
117   notificationTimeout = setTimeout(() => {
118     vscode.window.setStatusBarMessage('');
119   }, 3000);
120 }
121 
122 export function updateStatusBar() {
123   const config = vscode.workspace.getConfiguration('rails');
124   const showShortcuts = config.get('showKeyboardShortcuts', true);
125 
126   if (!showShortcuts) {
127     return;
128   }
129 
130   const statusBar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
131   statusBar.text = 'Rails Shortcuts: cmd+ctrl+r, cmd+ctrl+m, cmd+ctrl+c, cmd+ctrl+v, cmd+ctrl+t';
132   statusBar.show();
133 }
