import { Base } from "./base";
import { YamlHelper } from "../../utils/yaml_helper";

export class StartupView extends Base {
  private _dartString: string;

  constructor(fileName: string, suffix: string) {
    super(fileName, suffix);

    this._dartString = `
import 'package:flutter/material.dart';
import 'package:stacked/stacked.dart';
import 'package:${YamlHelper.getProjectName()}/src/ui/global/ui_helpers.dart';
import 'package:${YamlHelper.getProjectName()}/src/ui/global/app_colors.dart';
import 'package:${YamlHelper.getProjectName()}/src/ui/views/startup/startup_view_model.dart';

class StartupView extends StatefulWidget {
  @override
  _StartupViewState createState() => _StartupViewState();
}

class _StartupViewState extends State<StartupView> {
  @override
  Widget build(BuildContext context) {
    return ViewModelBuilder<StartupViewModel>.reactive(
      viewModelBuilder: () => StartupViewModel(),
      onModelReady: (StartupViewModel model) => model.handleStartup(),
      builder: (
        BuildContext context,
        StartupViewModel model,
        Widget child,
      ) {
        return Scaffold(
          body: Center(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              crossAxisAlignment: CrossAxisAlignment.center,
              children: <Widget>[
                // TODO(yazeed): Put Your Logo Here :)
                // Image.asset(
                //   'assets/icons/logo.png',
                //   width: blockSizeHorizontal(context) * 25,
                // ),
            
                SizedBox(
                  height: blockSizeHorizontal(context) * 10,
                ),
                CircularProgressIndicator(
                  valueColor: AlwaysStoppedAnimation(primaryColor),
                ),
              ],
            ),
          ),
        );
      },
    );
  }
}
`;
  }

  get dartString(): string {
    return this._dartString;
  }
}
