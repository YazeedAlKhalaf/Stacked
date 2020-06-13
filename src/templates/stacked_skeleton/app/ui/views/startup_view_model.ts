import { Base } from "../../../base";
import { YamlHelper } from "../../../../../utils/yaml_helper";

export class StartupViewModel extends Base {
  private _dartString: string;

  constructor(fileName: string, suffix: string) {
    super(fileName, suffix);

    this._dartString = `import 'dart:async';

import 'package:${YamlHelper.getProjectName()}/src/app/generated/locator/locator.dart';
import 'package:${YamlHelper.getProjectName()}/src/app/generated/router/router.gr.dart';
import 'package:stacked/stacked.dart';
import 'package:stacked_services/stacked_services.dart';

class StartupViewModel extends BaseViewModel {
  final NavigationService _navigationService = locator<NavigationService>();
  Future handleStartup() async {
    // Do Some Logic Here
    // The timer is a placeholder, but the view needs to be viewed at least for a second!
    Timer(
      Duration(),
      () => navigateToHomeView(),
    );
  }

  Future navigateToHomeView() async {
    await _navigationService.pushNamedAndRemoveUntil(Routes.homeViewRoute);
  }
}`;
  }

  get dartString(): string {
    return this._dartString;
  }
}
