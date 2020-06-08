import * as changeCase from "change-case";
import { existsSync } from "fs";
import {
  createDirectory,
  createStackedViewTemplate,
  createStackedViewModelTemplate,
} from ".";

export async function generateStackedCode(
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
