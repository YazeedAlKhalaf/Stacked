import * as _ from "lodash";
import { Base } from "./base";

export class Main extends Base {
  private _dartString: string;

  constructor(fileName: string, projectName: string, suffix?: string) {
    super(fileName, suffix);

    this._dartString = `import 'package:flutter/material.dart';
import 'package:logger/logger.dart';
import 'package:${projectName}/src/app/app.dart';
import 'package:${projectName}/src/app/generated/locator/locator.dart';

main() {
  WidgetsFlutterBinding.ensureInitialized();

  /// Sets logging level
  Logger.level = Level.debug;

  /// Register all the models and services before the app starts
  setupLocator();

  /// Runs the app :)
  runApp(App());
}`;
  }

  get dartString(): string {
    return this._dartString;
  }
}
