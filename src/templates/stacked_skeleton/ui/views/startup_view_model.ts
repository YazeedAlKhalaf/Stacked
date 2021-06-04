import { Base } from "../../base";
import { YamlHelper } from "../../../../utils/yaml_helper";

export class StartupViewModel extends Base {
  private _dartString: string;

  constructor(fileName: string, suffix: string) {
    super(fileName, suffix);

    this._dartString = `import 'package:flutter/material.dart';
import 'package:${YamlHelper.getProjectName()}/app/core/custom_base_view_model.dart';
import 'package:${YamlHelper.getProjectName()}/app/locator/locator.dart';
import 'package:${YamlHelper.getProjectName()}/app/router/router.dart';
import 'package:${YamlHelper.getProjectName()}/app/services/router_service.dart';

class StartupViewModel extends CustomBaseViewModel {
  final RouterService _routerService = locator<RouterService>();

  Future<void> init() async {
    WidgetsBinding.instance!.addPostFrameCallback((Duration duration) async {
      await navigateToHomeView();
    });
  }

  Future navigateToHomeView() async {
    await _routerService.router.push(
      HomeRoute(),
    );
  }
}`;
  }

  get dartString(): string {
    return this._dartString;
  }
}
