import * as _ from "lodash";
import { Base } from "./base";

export class Pubspec extends Base {
  private _dartString: string;

  constructor(fileName: string, projectName: string, suffix?: string) {
    super(fileName, suffix);

    this._dartString = `name: ${
      projectName !== undefined ? projectName : "example_app"
    }
description: A new Flutter project.
version: 1.0.0+1

environment:
  sdk: ">=2.7.0 <3.0.0"

dependencies:
  flutter:
    sdk: flutter
  
  # state management
  stacked: ^1.7.6
  
  # third-party services
  stacked_services: ^0.5.4+3
  
  # navigation
  auto_route: ^0.6.7
  
  # inversion of control
  get_it: ^4.0.4
  injectable: ^1.0.4
  
  # icons
  cupertino_icons: ^1.0.0
  font_awesome_flutter: ^8.8.1
  
  # misc
  logger: ^0.9.2
  
dev_dependencies:
  flutter_test:
    sdk: flutter

  # Generators
  build_runner: ^1.10.1
  auto_route_generator: ^0.6.8
  injectable_generator: ^1.0.4
  
flutter:
  uses-material-design: true

# Assets Example
#  assets:
#    - assets/images/
#
# Fonts Example
#  fonts:
#    - family: Open Sans
#      fonts:
#        - asset: assets/fonts/OpenSans-Italic.ttf
#          style: italic
#        - asset: assets/fonts/OpenSans-Bold.ttf
#          weight: 700
#        - asset: assets/fonts/OpenSans-ExtraBold.ttf
#          weight: 800
#        - asset: assets/fonts/OpenSans-Light.ttf
#          weight: 300
#        - asset: assets/fonts/OpenSans-Regular.ttf
#          weight: 400`;
  }

  get dartString(): string {
    return this._dartString;
  }
}
