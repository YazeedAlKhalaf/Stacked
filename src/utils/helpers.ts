import * as changeCase from "change-case";
import { commands, ExtensionContext, Uri, window } from "vscode";

export function convertToPascalCase(text: string) {
  const pascalCaseText = changeCase.pascalCase(text);
  return pascalCaseText;
}

export function convertToSnakeCase(text: string) {
  const snakeCaseText = changeCase.snakeCase(text);
  return snakeCaseText;
}

export function showErrorMessage(errorText: string) {
  window.showErrorMessage(errorText);
  return;
}

export function showInformationMessage(message: string) {
  window.showInformationMessage(message);
  return;
}
