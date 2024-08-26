# Rails Fast Nav ![Test status](https://img.shields.io/github/workflow/status/oleander/vscode-rails-fast-nav/Test.png)
  
Commands to move between files in a Rails application.

## Features

- Navigate to all known files (cmd+ctrl+r) [command.railsFastNavigation]
- Switch to model (cmd+ctrl+m) [command.railsFastSwitchToModel]
- Switch to controller (cmd+ctrl+c) [command.railsSwitchToController]
- Switch to view (cmd+ctrl+v) [command.railsFastSwitchToView]
- Switch to test/spec (cmd+ctrl+t) [command.railsFastSwitchToTest] + alias [command.railsFastSwitchToSpec]

## Screenshot

![Example](images/railsnav.gif)

## Configuration

Set the Rails `app` directory if you have a non-standard directory layout:

```json
"rails.appDir": "lib/app"
```

Change the default view extension from `html.erb`:

```json
"rails.viewFileExtension": "json.jbuilder"
```

## Display Keyboard Shortcuts in UI

This extension can display the keyboard shortcuts in the status bar for quick reference. This feature is enabled by default but can be disabled by setting the `rails.showKeyboardShortcuts` configuration to `false`.

```json
"rails.showKeyboardShortcuts": true
```

## Installation

To install the extension from this GitHub repository, follow these steps:

1. Clone the repository:
   ```sh
   git clone https://github.com/oleander/vscode-rails-fast-nav.git
   ```
2. Navigate to the project directory:
   ```sh
   cd vscode-rails-fast-nav
   ```
3. Install the dependencies:
   ```sh
   npm install
   ```
4. Open the project in Visual Studio Code:
   ```sh
   code .
   ```
5. Press `F5` to open a new window with the extension loaded.
