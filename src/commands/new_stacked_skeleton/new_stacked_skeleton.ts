import * as lodash from "lodash";
import { Uri } from "vscode";
import { lstatSync } from "fs";
import { generateStackedSkeletonCode } from "./generate_stacked_skeleton_code";
import {
  promptForTargetDirectory,
  promptForUseReactive,
  Utils,
} from "../../utils";

export async function newStackedSkeltonCommand(uri: Uri) {
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

  const useReactive = (await promptForUseReactive()) === "yes (default)";

  try {
    await generateStackedSkeletonCode(targetDirectory, useReactive);
    Utils.showInformationMessage(`Successfully Generated Stacked Skelelton`);
  } catch (error) {
    Utils.showErrorMessage(`
      Error:
      ${error instanceof Error ? error.message : JSON.stringify(error)}
      `);
  }
}
