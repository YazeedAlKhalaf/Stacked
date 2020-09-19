import * as path from "path";
import * as _ from "lodash";
import { existsSync } from "fs";
import { FileSystemManager } from "./file_system_manager";
import { Utils } from "./utils";
import { View } from "../templates/stacked_skeleton/ui/views/view";
import { ViewModel } from "../templates/stacked_skeleton/ui/views/view_model";
import { StartupViewModel } from "../templates/stacked_skeleton/ui/views/startup_view_model";
import { StartupView } from "../templates/stacked_skeleton/ui/views/startup_view";

export class ViewFile {
  constructor(
    private rootPath: string,
    private fileName: string,
    private useReactive: boolean,
    private folders?: string[]
  ) {
    console.debug(`ViewFile(rootPath: ${rootPath}, fileName: ${fileName})`);
    let folderCreated = FileSystemManager.createFolder(this.pathValue);
    if (!folderCreated) {
      return;
    }
  }

  public createViewViewModel() {
    this.createView();
    this.createViewModel();
  }

  public createStartupViewViewModel() {
    this.createFiles(
      "startup_view.dart",
      new StartupView(this.snakeCasedFileName, "View").dartString
    );
    this.createFiles(
      "startup_view_model.dart",
      new StartupViewModel(this.snakeCasedFileName, "ViewModel").dartString
    );
  }

  private createView() {
    this.createFiles(
      this.snakeCasedFileName + "_view.dart",
      new View(this.snakeCasedFileName, "View", this.useReactive).dartString
    );
  }

  private createViewModel() {
    this.createFiles(
      this.snakeCasedFileName + "_view_model.dart",
      new ViewModel(this.snakeCasedFileName, "ViewModel").dartString
    );
  }

  private get snakeCasedFileName(): string {
    let snakeCasedFileName = Utils.convertToSnakeCase(this.fileName);
    console.debug(`get snakeCasedFileName: ${snakeCasedFileName}`);
    return snakeCasedFileName;
  }

  private get pathValue(): string {
    if (this.folders === undefined) {
      return path.join(
        this.rootPath,
        "lib",
        "src",
        "ui",
        "views",
        this.snakeCasedFileName
      );
    }
    return path.join(...this.folders, this.snakeCasedFileName);
  }

  private createFiles(fileName: string, data: string) {
    if (existsSync(path.join(this.pathValue, this.snakeCasedFileName))) {
      console.warn(`${fileName} already exists`);
      return;
    }

    FileSystemManager.createFile(this.pathValue, fileName, data);
  }
}
