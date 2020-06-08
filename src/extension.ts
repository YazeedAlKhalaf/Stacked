import * as lodash from "lodash";
import { commands, ExtensionContext, Uri } from "vscode";
import { lstatSync } from "fs";
import {
  promptForStackedName,
  promptForTargetDirectory,
  promptForUseReactive,
  generateStackedCode,
  convertToPascalCase,
  showErrorMessage,
  showInformationMessage,
} from "./utils";

export function activate(_context: ExtensionContext) {
  commands.registerCommand("extension.new-stacked", async (uri: Uri) => {
    const stackedName = await promptForStackedName();
    if (lodash.isNil(stackedName) || stackedName.trim() === "") {
      showErrorMessage("The stacked name must not be empty");
      return;
    }

    let targetDirectory;
    if (
      lodash.isNil(lodash.get(uri, "fsPath")) ||
      !lstatSync(uri.fsPath).isDirectory()
    ) {
      targetDirectory = await promptForTargetDirectory();
      if (lodash.isNil(targetDirectory)) {
        showErrorMessage("Please select a valid directory");
        return;
      }
    } else {
      targetDirectory = uri.fsPath;
    }

    const useReactive = (await promptForUseReactive()) === "yes (default)";

    const pascalCaseStackedName = convertToPascalCase(
      stackedName.toLowerCase()
    );

    try {
      await generateStackedCode(stackedName, targetDirectory, useReactive);
      showInformationMessage(
        `Successfully Generated ${pascalCaseStackedName} Stacked`
      );
    } catch (error) {
      showErrorMessage(`
      Error:
      ${error instanceof Error ? error.message : JSON.stringify(error)}
      `);
    }
  });
}
