import * as _ from "lodash";
import * as changeCase from "change-case";
import * as mkdirp from "mkdirp";

import {
  commands,
  ExtensionContext,
  InputBoxOptions,
  OpenDialogOptions,
  QuickPickOptions,
  Uri,
  window,
} from "vscode";
import { existsSync, lstatSync, writeFile } from "fs";
import {
  getStackedViewTemplate,
  getStackedViewModelTemplate,
} from "./templates";

export function activate(_context: ExtensionContext) {
  commands.registerCommand("extension.new-stacked", async (uri: Uri) => {
    const stackedName = await promptForStackedName();
    if (_.isNil(stackedName) || stackedName.trim() === "") {
      window.showErrorMessage("The stacked name must not be empty");
      return;
    }

    let targetDirectory;
    if (_.isNil(_.get(uri, "fsPath")) || !lstatSync(uri.fsPath).isDirectory()) {
      targetDirectory = await promptForTargetDirectory();
      if (_.isNil(targetDirectory)) {
        window.showErrorMessage("Please select a valid directory");
        return;
      }
    } else {
      targetDirectory = uri.fsPath;
    }

    const useReactive = (await promptForUseReactive()) === "yes (default)";

    const pascalCaseStackedName = changeCase.pascalCase(
      stackedName.toLowerCase()
    );
    try {
      await generateStackedCode(stackedName, targetDirectory, useReactive);
      window.showInformationMessage(
        `Successfully Generated ${pascalCaseStackedName} Stacked`
      );
    } catch (error) {
      window.showErrorMessage(
        `Error:
        ${error instanceof Error ? error.message : JSON.stringify(error)}`
      );
    }
  });
}

function promptForStackedName(): Thenable<string | undefined> {
  const stackedNamePromptOptions: InputBoxOptions = {
    prompt: "Stacked Name",
    placeHolder: "e.g StartUp | Don't write `StartUpView`",
  };
  return window.showInputBox(stackedNamePromptOptions);
}

function promptForUseReactive(): Thenable<string | undefined> {
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

async function promptForTargetDirectory(): Promise<string | undefined> {
  const options: OpenDialogOptions = {
    canSelectMany: false,
    openLabel: "Select The Views Folder In Your Project",
    canSelectFolders: true,
  };

  return window.showOpenDialog(options).then((uri) => {
    if (_.isNil(uri) || _.isEmpty(uri)) {
      return undefined;
    }
    return uri[0].fsPath;
  });
}

async function generateStackedCode(
  stackedName: string,
  targetDirectory: string,
  useReactive: boolean
) {
  const lowerCaseStackedName = changeCase.lowerCase(stackedName);
  const snakeCaseStackedName = changeCase.snakeCase(lowerCaseStackedName);
  const stackedDirectoryPath = `${targetDirectory}/${snakeCaseStackedName}`;
  if (!existsSync(stackedDirectoryPath)) {
    await createDirectory(stackedDirectoryPath);
  }

  await Promise.all([
    createStackedViewModelTemplate(stackedName, targetDirectory),
    createStackedViewTemplate(stackedName, targetDirectory, useReactive),
  ]);
}

function createDirectory(targetDirectory: string): Promise<void> {
  return new Promise((resolve, reject) => {
    mkdirp(targetDirectory, (error) => {
      if (error) {
        return reject(error);
      }
      resolve();
    });
  });
}

function createStackedViewTemplate(
  stackedName: string,
  targetDirectory: string,
  useReactive: boolean
) {
  const lowerCaseStackedName = changeCase.lowerCase(stackedName);
  const snakeCaseStackedName = changeCase.snakeCase(lowerCaseStackedName);
  const stackedDirectoryPath = `${targetDirectory}/${snakeCaseStackedName}/${snakeCaseStackedName}_view.dart`;
  if (existsSync(stackedDirectoryPath)) {
    throw Error(`${snakeCaseStackedName}_view.dart already exists`);
  }
  return new Promise(async (resolve, reject) => {
    writeFile(
      stackedDirectoryPath,
      getStackedViewTemplate(stackedName, useReactive),
      "utf8",
      (error) => {
        if (error) {
          reject(error);
          return;
        }
        resolve();
      }
    );
  });
}

function createStackedViewModelTemplate(
  stackedName: string,
  targetDirectory: string
) {
  const lowerCaseStackedName = changeCase.lowerCase(stackedName);
  const snakeCaseStackedName = changeCase.snakeCase(lowerCaseStackedName);
  const stackedDirectoryPath = `${targetDirectory}/${snakeCaseStackedName}/${snakeCaseStackedName}_view_model.dart`;
  if (existsSync(stackedDirectoryPath)) {
    throw Error(`${snakeCaseStackedName}_view_model.dart already exists`);
  }
  return new Promise(async (resolve, reject) => {
    writeFile(
      stackedDirectoryPath,
      getStackedViewModelTemplate(stackedName),
      "utf8",
      (error) => {
        if (error) {
          reject(error);
          return;
        }
        resolve();
      }
    );
  });
}
