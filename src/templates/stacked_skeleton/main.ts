import * as _ from "lodash";
import { Base } from "./base";

export class Main extends Base {
  private _dartString: string;

  constructor(fileName: string, projectName: string, suffix?: string) {
    super(fileName, suffix);

    this._dartString = `
import 'package:flutter/material.dart';
import 'package:logger/logger.dart';
import 'package:${projectName}/src/app/generated/locator/locator.dart';
import 'package:${projectName}/src/app/generated/router/router.gr.dart';
import 'package:${projectName}/src/ui/global/app_colors.dart';
import 'package:stacked_services/stacked_services.dart';

main() {
  WidgetsFlutterBinding.ensureInitialized();

  // Sets logging level
  Logger.level = Level.debug;

  // Register all the models and services before the app starts
  setupLocator();

  // Runs the app :)
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: '${projectName}',
      initialRoute: Routes.startupViewRoute,
      onGenerateRoute: Router().onGenerateRoute,
      navigatorKey: locator<NavigationService>().navigatorKey,
      theme: ThemeData(
        primaryColor: primaryColor,
        accentColor: accentColor,
      ),
    );
  }
}
    
`;
  }

  get dartString(): string {
    return this._dartString;
  }
}
