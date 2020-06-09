import {
  OpenDialogOptions,
  QuickPickOptions,
  window,
  InputBoxOptions,
} from "vscode";
import * as lodash from "lodash";

export function promptForStackedName(): Thenable<string | undefined> {
  const stackedNamePromptOptions: InputBoxOptions = {
    prompt: "Stacked Name",
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

export function promptForOverrideDirectory(): Thenable<string | undefined> {
  const overrideDirectoryPromptValues: string[] = ["yes", "no (default)"];
  const overrideDirectoryPromptOptions: QuickPickOptions = {
    placeHolder:
      "There is a directory with that name, do you want to override the directory?",
    canPickMany: false,
  };
  return window.showQuickPick(
    overrideDirectoryPromptValues,
    overrideDirectoryPromptOptions
  );
}
