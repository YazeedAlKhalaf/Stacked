import * as _ from "lodash";
import { Base } from "../base";

export class App extends Base {
  private _dartString: string;

  constructor(fileName: string, projectName: string, suffix?: string) {
    super(fileName, suffix);

    this._dartString = `import 'package:flutter/material.dart';
import 'package:${projectName}/src/app/generated/locator/locator.dart';
import 'package:${projectName}/src/app/generated/router/router.gr.dart' as RouterGR;
import 'package:stacked_services/stacked_services.dart';

class App extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: "${projectName}",
      initialRoute: RouterGR.Routes.startupView,
      onGenerateRoute: RouterGR.Router().onGenerateRoute,
      navigatorKey: locator<NavigationService>().navigatorKey,
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
