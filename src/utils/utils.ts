import * as changeCase from "change-case";
import * as vscode from "vscode";
import { window } from "vscode";

export class Utils {
  public static convertToPascalCase(text: string) {
    const pascalCaseText = changeCase.pascalCase(text);
    return pascalCaseText;
  }

  public static convertToSnakeCase(text: string) {
    const snakeCaseText = changeCase.snakeCase(text);
    return snakeCaseText;
  }

  public static showErrorMessage(errorText: string) {
    window.showErrorMessage(errorText);
    return;
  }

  public static showInformationMessage(message: string) {
    window.showInformationMessage(message);
    return;
  }

  public static openFile(filePath: string) {
    console.info(`openFile: ${filePath}`);
    let openPath = vscode.Uri.file(filePath);

    vscode.workspace.openTextDocument(openPath).then((document) => {
      vscode.window.showTextDocument(document);
    });
  }
}
