import * as _ from "lodash";
import { Utils } from "../../../utils";
import { Base } from "../base";

export class App extends Base {
  private _dartString: string;

  constructor(fileName: string, projectName: string, suffix?: string) {
    super(fileName, suffix);

    this._dartString = `import 'package:flutter/material.dart';
    import 'package:${projectName}/app/locator/locator.dart';
    import 'package:${projectName}/app/services/router_service.dart';

class ${Utils.convertToPascalCase(projectName)}App extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final RouterService _routerService = locator<RouterService>();

    return MaterialApp.router(
      title: "${Utils.convertToPascalCase(projectName)}",
      routeInformationParser: _routerService.router.defaultRouteParser(),
      routerDelegate: _routerService.router.delegate(),
      theme: ThemeData(
        brightness: Brightness.light,
      ),
      darkTheme: ThemeData(
        brightness: Brightness.dark,
      ),
    );
  }
}`;
  }

  get dartString(): string {
    return this._dartString;
  }
}
