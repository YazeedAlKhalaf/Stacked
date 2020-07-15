# <img src="assets/logo.png" width="25" /> Stacked VS Code Extension

![Visual Studio Marketplace Downloads](https://img.shields.io/visual-studio-marketplace/d/yazeedalkhalaf.stacked?style=for-the-badge)
![GitHub stars](https://img.shields.io/github/stars/YazeedAlKhalaf/Stacked?style=for-the-badge)

## Commands Usage

1. `Stacked: New Stacked Skeleton`
   - This command generates for you a skeleton, aka boiler plate, for the stacked architecture.
   - **After the files are generated, you have to run this command: `flutter pub run build_runner build --delete-conflicting-outputs`**.
   - You can use this command in one way:
     1. Click `Ctrl+Shift+P` then search for `Stacked: New Stacked Skeleton`.
2. `Stacked: New Stacked View-ViewModel`
   - This Command generates for you everything you need to create your stacked view-viewmodel folder.
   - You can use this command in two ways:
     1. Click `Ctrl+Shift+P` then search for `Stacked: New Stacked-View ViewModel`.
     2. Right click anywhere in the explorer, then click on `Stacked: New Stacked View-ViewModel` option.

## Snippets Usage

| Shortcut | Description                                  |
| -------- | -------------------------------------------- |
| `svrf`   | Creates a Stacked View Reactive Statefull    |
| `svnf`   | Creates a Stacked View NonReactive Statefull |
| `svrl`   | Creates a Stacked View Reactive Stateless    |
| `svnl`   | Creates a Stacked View NonReactive Stateless |
| `svm`    | Creates a Stacked View Model                 |

## **Breaking Change: The Package now uses `CustomBaseViewModel` instead of `BaseViewModel`**

**You have the right to ask why 🚀**
**So the reason for this is that adding this functionality will let you share stuff between ViewModels easily by putting it in the `CustomBaseViewModel` and accessing it from any other `ViewModel` that extends it.**

### Migrating from version `>=1.0.0 <2.0.0`

It is easy:

1. Create a file named `custom_base_view_model.dart` in your `lib/src/ui/global` folder.
2. Paste this into the file:

```dart
import 'package:stacked/stacked.dart';

abstract class CustomBaseViewModel extends BaseViewModel {
  // Add any shared stuff between all viewmodels here,
  // they will be accessible in every viewmodel you extend using this class.
}
```

3. Replace `BaseViewModel` in your ViewModels to use the new CustomBaseViewModel.
