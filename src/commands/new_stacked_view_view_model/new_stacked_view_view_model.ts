import * as lodash from "lodash";
import { Uri } from "vscode";
import { lstatSync } from "fs";
import { generateStackedViewViewModelCode } from "./generate_stacked_view_view_model_code";
import {
  promptForStackedName,
  promptForTargetDirectory,
  promptForUseReactive,
  Utils,
} from "../../utils";

export async function newStackedViewViewModelCommand(uri: Uri) {
  const stackedName = await promptForStackedName();
  if (lodash.isNil(stackedName) || stackedName.trim() === "") {
    Utils.showErrorMessage("The stacked name must not be empty");
    return;
  }

  let targetDirectory;
  if (
    lodash.isNil(lodash.get(uri, "fsPath")) ||
    !lstatSync(uri.fsPath).isDirectory()
  ) {
    targetDirectory = await promptForTargetDirectory();
    if (lodash.isNil(targetDirectory)) {
      Utils.showErrorMessage("Please select a valid directory");
      return;
    }
  } else {
    targetDirectory = uri.fsPath;
  }

  const useReactive: boolean =
    (await promptForUseReactive()) === "yes (default)";

  try {
    await generateStackedViewViewModelCode(
      stackedName,
      targetDirectory,
      useReactive
    );
  } catch (error) {
    Utils.showErrorMessage(`
      Error:
      ${error instanceof Error ? error.message : JSON.stringify(error)}
      `);
  }
}
