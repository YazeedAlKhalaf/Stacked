import * as path from "path";
import * as _ from "lodash";
import { FileSystemManager } from "./file_system_manager";
import { WriteFileOptions } from "fs";
import { Utils } from "./utils";
import { Logger } from "../templates/stacked_skeleton/logger";
import { Main } from "../templates/stacked_skeleton/main";
import { YamlHelper } from "./yaml_helper";
import * as UtilsTemplate from "../templates/stacked_skeleton/utils";
import { ThirdPartyServicesModule } from "../templates/stacked_skeleton/third_party_services_module";
import { Locator } from "../templates/stacked_skeleton/locator";
import { Router } from "../templates/stacked_skeleton/router";
import { AppColors } from "../templates/stacked_skeleton/app_colors";
import { UiHelpers } from "../templates/stacked_skeleton/ui_helpers";
import { Pubspec } from "../templates/stacked_skeleton/pubspec";
import { VsCodeActions } from "./vs_code_actions";
import * as shell from "shelljs";

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
    let animPath = path.join(assetsPath, "animations");
    let fontsPath = path.join(assetsPath, "fonts");
    let imagesPath = path.join(assetsPath, "images");
    let iconsPath = path.join(imagesPath, "icons");
    let placeholdersPath = path.join(imagesPath, "placeholders");
    let miscPath = path.join(assetsPath, "misc");

    let folderCreated = FileSystemManager.createFolder(animPath);
    if (!folderCreated) {
      return;
    }

    folderCreated = FileSystemManager.createFolder(fontsPath);
    if (!folderCreated) {
      return;
    }

    folderCreated = FileSystemManager.createFolder(imagesPath);
    if (!folderCreated) {
      return;
    }

    folderCreated = FileSystemManager.createFolder(iconsPath);
    if (!folderCreated) {
      return;
    }

    folderCreated = FileSystemManager.createFolder(placeholdersPath);
    if (!folderCreated) {
      return;
    }

    folderCreated = FileSystemManager.createFolder(miscPath);
    if (!folderCreated) {
      return;
    }
  }

  private initApp() {
    let appPath = path.join(this.rootPath, "app");
    this.initServices(appPath);
    this.initUtils(appPath);
    this.initModels(appPath);
    this.initGenerated(appPath);
  }

  private initUi() {
    let uiPath = path.join(this.rootPath, "ui");
    this.initGlobal(uiPath);
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
      "utils.dart",
      new UtilsTemplate.Utils("utils.dart").dartString
    );
    this.createFile(
      utilsPath,
      "logger.dart",
      new Logger("logger.dart").dartString
    );
  }

  private initGenerated(appPath: string) {
    let generatedPath = path.join(appPath, "generated");

    let folderCreated = FileSystemManager.createFolder(generatedPath);
    if (!folderCreated) {
      return;
    }

    this.initLocator(generatedPath);
    this.initRouter(generatedPath);
  }

  private initLocator(generatedPath: string) {
    let locatorPath = path.join(generatedPath, "locator");

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

  private initRouter(generatedPath: string) {
    let routerPath = path.join(generatedPath, "router");

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
      "third_party_services_module.dart",
      new ThirdPartyServicesModule("third_party_services_module.dart")
        .dartString
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

  private initGlobal(uiPath: string) {
    let globalPath = path.join(uiPath, "global");

    let folderCreated = FileSystemManager.createFolder(globalPath);
    if (!folderCreated) {
      return;
    }

    this.createFile(
      globalPath,
      "app_colors.dart",
      new AppColors("app_colors.dart").dartString
    );

    this.createFile(
      globalPath,
      "ui_helpers.dart",
      new UiHelpers("ui_helpers.dart").dartString
    );

    console.debug(`FolderCreated: ${folderCreated}`);
  }

  private initWidgets(uiPath: string) {
    let widgetsPath = path.join(uiPath, "widgets");

    let folderCreated = FileSystemManager.createFolder(widgetsPath);
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
