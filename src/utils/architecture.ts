import * as path from "path";
import * as _ from "lodash";
import { FileSystemManager } from "./file_system_manager";
import { WriteFileOptions } from "fs";
import { Utils } from "./utils";
import { Logger } from "../templates/stacked_skeleton/app/utils/logger";
import { Main } from "../templates/stacked_skeleton/main";
import { YamlHelper } from "./yaml_helper";
import * as UtilsTemplate from "../templates/stacked_skeleton/app/utils/utils";
import { Locator } from "../templates/stacked_skeleton/app/locator/locator";
import { Router } from "../templates/stacked_skeleton/app/router/router";
import { Pubspec } from "../templates/stacked_skeleton/pubspec";
import { VsCodeActions } from "./vs_code_actions";
import { CustomBaseViewModel } from "../templates/stacked_skeleton/app/core/custom_base_view_model";
import { Constants } from "../templates/stacked_skeleton/app/utils/constants";
import { App } from "../templates/stacked_skeleton/app/app";
import { RouterService } from "../templates/stacked_skeleton/app/services/router_service";

let projectName: string;
projectName = YamlHelper.getProjectName();

export class Architecture {
  constructor(private projectPath: string, private rootPath: string) {}

  public init() {
    this.initAssets();
    this.initApp();
    this.initUi();

    this.createExistingFile(
      `${VsCodeActions.rootPath}/lib`,
      "main.dart",
      new Main("main.dart", projectName).dartString
    );

    this.createExistingFile(
      VsCodeActions.rootPath,
      "pubspec.yaml",
      new Pubspec("pubspec.yaml", projectName).dartString
    );
    Utils.showInformationMessage(
      "Please run this command to generate files: flutter pub run build_runner build --delete-conflicting-outputs"
    );
  }

  private initAssets() {
    let assetsPath = path.join(this.projectPath, "assets");

    let folderCreated = FileSystemManager.createFolder(assetsPath);
    if (!folderCreated) {
      return;
    }
  }

  private initApp() {
    let appPath = path.join(this.rootPath, "app");
    this.initCore(appPath);
    this.initServices(appPath);
    this.initUtils(appPath);
    this.initModels(appPath);
    this.initLocator(appPath);
    this.initRouter(appPath);

    this.createFile(
      appPath,
      "app.dart",
      new App("app.dart", projectName).dartString
    );
  }

  private initUi() {
    let uiPath = path.join(this.rootPath, "ui");
    this.initViews(uiPath);
    this.initWidgets(uiPath);
  }

  private initUtils(appPath: string) {
    let utilsPath = path.join(appPath, "utils");

    let folderCreated = FileSystemManager.createFolder(utilsPath);
    if (!folderCreated) {
      return;
    }

    this.createFile(
      utilsPath,
      "constants.dart",
      new Constants("constants.dart").dartString
    );

    this.createFile(
      utilsPath,
      "utils.dart",
      new UtilsTemplate.Utils("utils.dart").dartString
    );

    this.createFile(
      utilsPath,
      "logger.dart",
      new Logger("logger.dart").dartString
    );
  }

  private initLocator(appPath: string) {
    let locatorPath = path.join(appPath, "locator");

    let folderCreated = FileSystemManager.createFolder(locatorPath);
    if (!folderCreated) {
      return;
    }

    this.createFile(
      locatorPath,
      "locator.dart",
      new Locator("locator.dart").dartString
    );
  }

  private initRouter(appPath: string) {
    let routerPath = path.join(appPath, "router");

    let folderCreated = FileSystemManager.createFolder(routerPath);
    if (!folderCreated) {
      return;
    }

    this.createFile(
      routerPath,
      "router.dart",
      new Router("router.dart", projectName).dartString
    );
  }

  private initServices(appPath: string) {
    let servicesPath = path.join(appPath, "services");

    let folderCreated = FileSystemManager.createFolder(servicesPath);
    if (!folderCreated) {
      return;
    }

    this.createFile(
      servicesPath,
      "router_service.dart",
      new RouterService("router_service.dart", projectName).dartString
    );
  }

  private initModels(appPath: string) {
    let modelsPath = path.join(appPath, "models");
    let folderCreated = FileSystemManager.createFolder(modelsPath);
    console.debug(`FolderCreated: ${folderCreated}`);
  }

  private initViews(uiPath: string) {
    let viewsPath = path.join(uiPath, "views");

    let folderCreated = FileSystemManager.createFolder(viewsPath);
    if (!folderCreated) {
      return;
    }

    console.debug(`FolderCreated: ${folderCreated}`);
  }

  private initCore(appPath: string) {
    let corePath = path.join(appPath, "core");

    let folderCreated = FileSystemManager.createFolder(corePath);
    if (!folderCreated) {
      return;
    }

    this.createFile(
      corePath,
      "custom_base_view_model.dart",
      new CustomBaseViewModel("custom_base_view_model.dart").dartString
    );

    console.debug(`FolderCreated: ${folderCreated}`);
  }

  private initWidgets(uiPath: string) {
    this.initDumbWidgets(uiPath);
    this.initSmartWidgets(uiPath);
  }

  private initDumbWidgets(uiPath: string) {
    let dumbWidgetsPath = path.join(uiPath, "widgets", "dumb");

    let folderCreated = FileSystemManager.createFolder(dumbWidgetsPath);
    if (!folderCreated) {
      return;
    }

    console.debug(`FolderCreated: ${folderCreated}`);
  }

  private initSmartWidgets(uiPath: string) {
    let smartWidgetsPath = path.join(uiPath, "widgets", "smart");

    let folderCreated = FileSystemManager.createFolder(smartWidgetsPath);
    if (!folderCreated) {
      return;
    }

    console.debug(`FolderCreated: ${folderCreated}`);
  }

  private createFile(
    pathValue: string,
    fileName: string,
    data: string,
    options?: WriteFileOptions
  ) {
    if (FileSystemManager.doesFileExist(pathValue, fileName)) {
      console.error(`${fileName} already exists`);
      return;
    }

    FileSystemManager.createFile(pathValue, fileName, data);
    Utils.openFile(path.join(pathValue, fileName));
  }

  private createExistingFile(
    pathValue: string,
    fileName: string,
    data: string,
    options?: WriteFileOptions
  ) {
    FileSystemManager.createFile(pathValue, fileName, data);
    Utils.openFile(path.join(pathValue, fileName));
  }
}
