import { getCheckedSwitches } from '../switches';
import { getCurrentRailsFile } from '../rails-file';
import { showNotification, openFile, updateStatusBar } from './util';
import { switchToModel } from './switch-to-model';
import { switchToController } from './switch-to-controller';
import { switchToView } from './switch-to-view';

export async function navigateRails() {
  try {
    const railsFile = getCurrentRailsFile();
    if (!railsFile) {
      return;
    }
    const switchableFiles = await getCheckedSwitches(railsFile);

    updateStatusBar();
    return await showPicker(railsFile.railsRoot, switchableFiles);
  } catch (err) {
    console.error(err);
  }
}

export async function cycleThroughFiles() {
  try {
    const railsFile = getCurrentRailsFile();
    if (!railsFile) {
      return;
    }

    if (railsFile.isModel()) {
      await switchToView();
    } else if (railsFile.isView()) {
      await switchToController();
    } else if (railsFile.isController()) {
      await switchToModel();
    } else {
      const switchableFiles = await getCheckedSwitches(railsFile);
      await showNotification(`Cycling through files: ${switchableFiles.map(file => file.title).join(', ')}`);
    }

    updateStatusBar();
  } catch (err) {
    console.error(err);
  }
}
