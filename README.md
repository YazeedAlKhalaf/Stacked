# <img src="assets/logo.png" width="25" /> Stacked VS Code Extension

## Commands Usage

1. `Stacked: New Stacked Skeleton`
   - This command generates for you a skeleton, aka boiler plate, for the stacked architecture.
   - **After the files are generated, you have to run this command: `flutter pub run build_runner build --delete-conflicting-outputs`**.
   - You can use this command in two ways:
     1. Click `Ctrl+Shift+P` then search for `Stacked: New Stacked Skeleton`.
     2. Right click anywhere in the explorer, then click on `Stacked: New Stacked Skeleton` option.
2. `Stacked: New Stacked View-ViewModel`
   - This Command generates for you everything you need to create your stacked view-viewmodel folder.
   - You can use this command in two ways:
     1. Click `Ctrl+Shift+P` then search for `Stacked: New Stacked-View ViewModel`.
        - if you use this way, you can customize where to put yout files by using a native dialog.
     2. Right click on the `views` folder, then click on `Stacked: New Stacked View-ViewModel` option.
        - If you use this way, you can

## Snippets Usage

| Shortcut | Description                                  |
| -------- | -------------------------------------------- |
| `svrf`   | Creates a Stacked View Reactive Statefull    |
| `svnf`   | Creates a Stacked View NonReactive Statefull |
| `svrl`   | Creates a Stacked View Reactive Stateless    |
| `svnl`   | Creates a Stacked View NonReactive Stateless |
