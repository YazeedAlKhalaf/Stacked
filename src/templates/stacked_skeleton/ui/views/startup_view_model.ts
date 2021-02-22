import { Base } from "../../base";
import { YamlHelper } from "../../../../utils/yaml_helper";

export class StartupViewModel extends Base {
  private _dartString: string;

  constructor(fileName: string, suffix: string) {
    super(fileName, suffix);

    this._dartString = `import 'dart:async';

import 'package:stacked_services/stacked_services.dart';

import 'package:${YamlHelper.getProjectName()}/src/app/generated/locator/locator.dart';
import 'package:${YamlHelper.getProjectName()}/src/app/generated/router/router.gr.dart';
import 'package:${YamlHelper.getProjectName()}/src/ui/global/custom_base_view_model.dart';

class StartupViewModel extends CustomBaseViewModel {
  final NavigationService _navigationService = locator<NavigationService>();
  Future handleStartup() async {
    /// Do Some Logic Here
    /// The timer is a placeholder, but the view needs to be viewed at least for a second!
    Timer(
      Duration(
        seconds: 1,
      ),
      () async => await navigateToHomeView(),
    );
  }

  Future navigateToHomeView() async {
    await _navigationService.pushNamedAndRemoveUntil(Routes.homeView);
  }
}`;
  }

  get dartString(): string {
    return this._dartString;
  }
}
