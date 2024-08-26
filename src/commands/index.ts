1 import { navigateRails } from './navigation';
2 import { switchToView } from './switch-to-view';
3 import { switchToModel } from './switch-to-model';
4 import { switchToTest } from './switch-to-test';
5 import { switchToController } from './switch-to-controller';
6 import { cycleThroughFiles } from './navigation';
7 
8 export const commands = {
9   fastNavigation: navigateRails,
10   switchToView: switchToView,
11   switchToModel: switchToModel,
12   switchToTest: switchToTest,
13   switchToSpec: switchToTest,
14   switchToController: switchToController,
15   cycleThroughFiles,
16 };
