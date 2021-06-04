import * as yaml from "js-yaml";
import { VsCodeActions } from "./vs_code_actions";
import { FileSystemManager } from "./file_system_manager";
import * as _ from "lodash";

export class YamlHelper {
  public static isValidFlutterPubspec(): string | undefined {
    let json = this.getPubspecJsonFile();
    if (json === undefined) {
      return "Invalid Pubspec format";
    }
    let object = JSON.parse(json);

    if (object["environment"] === undefined) {
      return "No environment definition found";
    }
    if (object["dependencies"] === undefined) {
      return "Definition for dependencies not found";
    }
    if (object["dependencies"]["flutter"] === undefined) {
      return "Definition for FLutter in dependencies not found";
    }
    return undefined;
  }

  public static getProjectName(): string {
    let json = this.getPubspecJsonFile();
    if (json === undefined) {
      return "undefined";
    }
    let object = JSON.parse(json);

    return object["name"];
  }
  private static getPubspecJsonFile(): string | undefined {
    let rootPath = VsCodeActions.rootPath;
    let fileData = FileSystemManager.readFileAsString(rootPath, "pubspec.yaml");
    if (fileData === undefined) {
      console.debug("Pubspec.yaml not found");
      return undefined;
    }
    let data = YamlHelper.toJSON(fileData);
    return data;
  }

  private static toJSON(text: string) {
    let json;
    try {
      console.debug(`toJSON: ${text}`);
      json = yaml.safeLoad(text, { schema: yaml.JSON_SCHEMA });
    } catch (e) {
      VsCodeActions.showErrorMessage("Could not parse the selection as YAML.");
      console.error(e);
      return;
    }
    return JSON.stringify(json, null, this.getIndent());
  }

  private static getIndent(): number {
    const editorCfg = VsCodeActions.getEditorConfiguration();
    if (editorCfg && editorCfg.get("insertSpaces")) {
      const tabSize = editorCfg.get("tabSize");
      if (tabSize && typeof tabSize === "number") {
        return tabSize;
      }
    }
    return 2;
  }
}
