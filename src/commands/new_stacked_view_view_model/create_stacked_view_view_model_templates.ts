import { existsSync, writeFile } from "fs";
import {
  getStackedViewTemplate,
  getStackedViewModelTemplate,
} from "../../templates";
import { Utils } from "../../utils";

export function createStackedViewTemplate(
  stackedName: string,
  targetDirectory: string,
  useReactive: boolean
) {
  const snakeCaseStackedName = Utils.convertToSnakeCase(
    stackedName.toLowerCase()
  );
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
  const snakeCaseStackedName = Utils.convertToSnakeCase(
    stackedName.toLowerCase()
  );
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
