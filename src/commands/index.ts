import { navigateRails } from '../navigation';
import { switchToView } from '../switch-to-view';
import { switchToModel } from '../switch-to-model';
import { switchToTest } from '../switch-to-test';
import { switchToController } from '../switch-to-controller';
import { cycleThroughFiles } from '../navigation';
import { updateStatusBar } from '../util';

export const commands = {
  fastNavigation: navigateRails,
  switchToView: switchToView,
  switchToModel: switchToModel,
  switchToTest: switchToTest,
  switchToSpec: switchToTest,
  switchToController: switchToController,
  cycleThroughFiles,
};

export function activate(context: vscode.ExtensionContext) {
  Object.keys(commands).forEach(name => {
    const command = commands[name];
    const disposable = vscode.commands.registerCommand(
      `rails.${name}`,
      command
    );

    context.subscriptions.push(disposable);
  });

  updateStatusBar();
}
