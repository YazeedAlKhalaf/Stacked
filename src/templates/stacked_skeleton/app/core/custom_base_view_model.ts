import { YamlHelper } from "../../../../utils/yaml_helper";
import { Base } from "../../base";

export class CustomBaseViewModel extends Base {
  private _dartString: string;

  constructor(fileName: string) {
    super(fileName);

    this._dartString = `
import 'package:${YamlHelper.getProjectName()}/app/locator/locator.dart';
import 'package:${YamlHelper.getProjectName()}/app/services/router_service.dart';
import 'package:flutter/material.dart';
import 'package:stacked/stacked.dart';

abstract class CustomBaseViewModel extends BaseViewModel {
  final RouterService _routerService = locator<RouterService>();

  void goBack() {
    _routerService.router.pop();
  }

  void removeFocus() {
    FocusManager.instance.primaryFocus!.unfocus();
  }
}`;
  }

  get dartString(): string {
    return this._dartString;
  }
}
