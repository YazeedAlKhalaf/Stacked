import {
  OpenDialogOptions,
  QuickPickOptions,
  window,
  InputBoxOptions,
} from "vscode";
import * as lodash from "lodash";

export function promptForStackedName(): Thenable<string | undefined> {
  const stackedNamePromptOptions: InputBoxOptions = {
    prompt: "Stacked View-ViewModel Name",
    placeHolder: "e.g StartUp | Don't write `StartUpView`",
  };
  return window.showInputBox(stackedNamePromptOptions);
}

export function promptForUseReactive(): Thenable<string | undefined> {
  const useReactivePromptValues: string[] = ["yes (default)", "no"];
  const useReactivePromptOptions: QuickPickOptions = {
    placeHolder:
      "Do you want to use the `.reactive` for your `ViewModelBuilder`?",
    canPickMany: false,
  };
  return window.showQuickPick(
    useReactivePromptValues,
    useReactivePromptOptions
  );
}

export async function promptForTargetDirectory(): Promise<string | undefined> {
  const options: OpenDialogOptions = {
    canSelectMany: false,
    openLabel: "Select The Views Folder In Your Project",
    canSelectFolders: true,
  };

  return window.showOpenDialog(options).then((uri) => {
    if (lodash.isNil(uri) || lodash.isEmpty(uri)) {
      return undefined;
    }
    return uri[0].fsPath;
  });
}

export function promptForCustomDirectory(): Thenable<string | undefined> {
  const customDirectoryPromptValues: string[] = ["no (default)", "yes"];
  const customDirectoryPromptOptions: QuickPickOptions = {
    placeHolder:
      "Do you want to place you files in a custom directory? aka NOT `views` directory",
    canPickMany: false,
  };
  return window.showQuickPick(
    customDirectoryPromptValues,
    customDirectoryPromptOptions
  );
}
