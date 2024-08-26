import * as vscode from 'vscode';
import * as path from 'path';
import { ensureDocument } from '../path-utils';
import { SwitchFile, OrPromise } from '../types';

interface IndexedQuickPickItem extends vscode.QuickPickItem {
  create: boolean;
  index: number;
}

let notificationTimeout: NodeJS.Timeout | null = null;

export function openFile(filename: string) {
  return vscode.workspace
    .openTextDocument(filename)
    .then(vscode.window.showTextDocument);
}

export async function createFile(switchFile: SwitchFile) {
  return openFile(switchFile.filename);
}

function existingQuickPickItem(root: string) {
  return (switchFile: SwitchFile, index: number): IndexedQuickPickItem => ({
    label: switchFile.title,
    description: '',
    detail: path.relative(root, switchFile.filename),
    index,
    create: false,
  });
}

function createQuickPickItem(root: string) {
  return (switchFile: SwitchFile, index: number): IndexedQuickPickItem => ({
    label: switchFile.title,
    description: `Create ${switchFile.type}`,
    detail: path.relative(root, switchFile.filename),
    index,
    create: true,
  });
}

function quickPickItem(root: string) {
  const existing = existingQuickPickItem(root);
  const create = createQuickPickItem(root);

  return (switchFile: SwitchFile, index: number) => {
    if (switchFile.checkedExists) {
      return existing(switchFile, index);
    } else {
      return create(switchFile, index);
    }
  };
}

async function quickPickItems(
  root: string,
  switchFiles: OrPromise<SwitchFile[]>
): Promise<IndexedQuickPickItem[]> {
  return (await Promise.resolve(switchFiles)).map(quickPickItem(root));
}

export async function showPicker(
  root: string,
  switchFiles: OrPromise<SwitchFile[]>
) {
  const picked: IndexedQuickPickItem = await vscode.window.showQuickPick(
    quickPickItems(root, switchFiles)
  );

  if (picked) {
    const switchFile = switchFiles[picked.index];

    if (picked.create) {
      await createFile(switchFile);
    } else {
      await openFile(switchFile.filename);
    }
    return switchFile;
  }
}

export async function showYesNo(message: string): Promise<boolean> {
  const yesItem: vscode.MessageItem = {
    title: 'Yes',
  };
  const noItem: vscode.MessageItem = {
    title: 'No',
    isCloseAffordance: true,
  };

  const response = await vscode.window.showInformationMessage(
    message,
    yesItem,
    noItem
  );
  return response === yesItem;
}

export async function showCreateFile(filename: string): Promise<void> {
  const root = vscode.workspace.workspaceFolders[0].uri.fsPath;
  const display = path.relative(root, filename);
  const message = `Create ${display}`;

  if (await showYesNo(message)) {
    return ensureDocument(filename);
  }
}

export async function showNotification(message: string): Promise<void> {
  if (notificationTimeout) {
    clearTimeout(notificationTimeout);
  }

  vscode.window.setStatusBarMessage(message, 3000);

  notificationTimeout = setTimeout(() => {
    vscode.window.setStatusBarMessage('');
  }, 3000);
}
