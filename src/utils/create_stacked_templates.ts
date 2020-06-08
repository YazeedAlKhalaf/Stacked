import * as changeCase from "change-case";
import { existsSync, lstatSync, writeFile } from "fs";
import {
  getStackedViewTemplate,
  getStackedViewModelTemplate,
} from "../templates";

export function createStackedViewTemplate(
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

export function createStackedViewModelTemplate(
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
