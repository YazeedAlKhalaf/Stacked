import * as lodash from "lodash";
import { Uri } from "vscode";
import { lstatSync, open } from "fs";
import {
  promptForStackedName,
  promptForTargetDirectory,
  promptForUseReactive,
  Utils,
  promptForCustomDirectory,
} from "../../utils";
import { ViewFile } from "../../utils/view_file";
import { VsCodeActions } from "../../utils/vs_code_actions";

export async function newStackedViewViewModelCommand(uri: Uri) {
  let stackedName = await promptForStackedName();
  if (lodash.isNil(stackedName) || stackedName.trim() === "") {
    Utils.showErrorMessage("The stacked name can't not be empty");
    return;
  }

  stackedName = Utils.convertToPascalCase(stackedName);

  let targetDirectory = undefined;
  const customLocation: boolean = (await promptForCustomDirectory()) === "yes";
  if (customLocation) {
    targetDirectory = await promptForTargetDirectory(
      "Select The Custom Directory"
    );
    if (lodash.isNil(targetDirectory)) {
      Utils.showErrorMessage("Please select a valid directory");
      return;
    }
  }

  const useReactive: boolean =
    (await promptForUseReactive()) === "yes (default)";

  let rootPath = VsCodeActions.rootPath;

  customLocation
    ? new ViewFile(
        rootPath,
        stackedName,
        useReactive,
        // @ts-ignore
        targetDirectory.split("/")
      ).createViewViewModel()
    : new ViewFile(rootPath, stackedName, useReactive).createViewViewModel();
}
