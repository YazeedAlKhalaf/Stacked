import { existsSync } from "fs";
import {
  createStackedViewModelTemplate,
  createStackedViewTemplate,
} from "./create_stacked_view_view_model_templates";
import { Utils, promptForOverrideDirectory } from "../../utils";
import { FileSystemManager } from "../../utils/file_system_manager";

export async function generateStackedViewViewModelCode(
  stackedName: string,
  targetDirectory: string,
  useReactive: boolean
) {
  const snakeCaseStackedName = Utils.convertToSnakeCase(
    stackedName.toLowerCase()
  );
  const pascalCaseStackedName = Utils.convertToPascalCase(
    stackedName.toLowerCase()
  );

  const stackedDirectoryPath = `${targetDirectory}/${snakeCaseStackedName}`;

  if (!existsSync(stackedDirectoryPath)) {
    await FileSystemManager.createFolder(stackedDirectoryPath);
    await Promise.all([
      createStackedViewModelTemplate(stackedName, targetDirectory),
      createStackedViewTemplate(stackedName, targetDirectory, useReactive),
    ]);
    Utils.showInformationMessage(
      `Successfully Generated ${pascalCaseStackedName} Stacked View-ViewModel`
    );
    return;
  }

  if (existsSync(stackedDirectoryPath)) {
    Utils.showInformationMessage(
      `
      \"${pascalCaseStackedName}\" Directory Already Exists!
      \n
      Did Not Create Stacked View-ViewModel.
      `
    );
    return;
  }
}
