import { existsSync } from "fs";
import { createDirectory } from "../../utils";
import {
  createStackedViewModelTemplate,
  createStackedViewTemplate,
} from "./create_stacked_view_view_model_templates";
import { Utils } from "../../utils";

export async function generateStackedViewViewModelCode(
  stackedName: string,
  targetDirectory: string,
  useReactive: boolean
) {
  const snakeCaseStackedName = Utils.convertToSnakeCase(
    stackedName.toLowerCase()
  );
  const stackedDirectoryPath = `${targetDirectory}/${snakeCaseStackedName}`;
  if (!existsSync(stackedDirectoryPath)) {
    await createDirectory(stackedDirectoryPath);
  }

  await Promise.all([
    createStackedViewModelTemplate(stackedName, targetDirectory),
    createStackedViewTemplate(stackedName, targetDirectory, useReactive),
  ]);
}
