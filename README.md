# Rails Fast Nav ![Test status](https://img.shields.io/github/workflow/status/jemmyw/vscode-rails-fast-nav/Test.png)
  
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
