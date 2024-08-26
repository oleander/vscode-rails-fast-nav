1 import { getCheckedSwitches } from '../switches';
2 import { getCurrentRailsFile } from '../rails-file';
3 import { showNotification, openFile, updateStatusBar } from './util';
4 import { switchToModel } from './switch-to-model';
5 import { switchToController } from './switch-to-controller';
6 import { switchToView } from './switch-to-view';
7 
8 export async function navigateRails() {
9   try {
10     const railsFile = getCurrentRailsFile();
11     if (!railsFile) {
12       return;
13     }
14     const switchableFiles = await getCheckedSwitches(railsFile);
15 
16     updateStatusBar();
17     return await showPicker(railsFile.railsRoot, switchableFiles);
18   } catch (err) {
19     console.error(err);
20   }
21 }
22 
23 export async function cycleThroughFiles() {
24   try {
25     const railsFile = getCurrentRailsFile();
26     if (!railsFile) {
27       return;
28     }
29 
30     if (railsFile.isModel()) {
31       await switchToView();
32     } else if (railsFile.isView()) {
33       await switchToController();
34     } else if (railsFile.isController()) {
35       await switchToModel();
36     } else {
37       const switchableFiles = await getCheckedSwitches(railsFile);
38       await showNotification(`Cycling through files: ${switchableFiles.map(file => file.title).join(', ')}`);
39     }
40 
41     updateStatusBar();
42   } catch (err) {
43     console.error(err);
44   }
45 }
