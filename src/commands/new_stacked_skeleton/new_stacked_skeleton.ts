import * as lodash from "lodash";
import { Uri } from "vscode";
import { Architecture } from "../../utils/architecture";
import { FileSystemManager } from "../../utils/file_system_manager";
import { VsCodeActions } from "../../utils/vs_code_actions";
import path = require("path");
import { ViewFile } from "../../utils/view_file";

export async function newStackedSkeltonCommand(uri: Uri) {
  if (!FileSystemManager.isFlutterProject()) {
    return;
  }

  let rootPath = VsCodeActions.rootPath;
  let projectPath = VsCodeActions.rootPath;

  if (lodash.isUndefined(rootPath)) {
    return;
  }
  if (lodash.isUndefined(projectPath)) {
    return;
  }

  new Architecture(projectPath, path.join(rootPath, "lib/src")).init();
  new ViewFile(rootPath, "home").createViewViewModel();
  new ViewFile(rootPath, "startup").createStartupViewViewModel();
}
