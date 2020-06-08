import * as _ from "lodash";
import * as changeCase from "change-case";
import { commands, ExtensionContext, Uri, window } from "vscode";
import { lstatSync } from "fs";
import {
  promptForStackedName,
  promptForTargetDirectory,
  promptForUseReactive,
  generateStackedCode,
} from "./utils";

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
