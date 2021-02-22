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
version: 0.0.1+1

environment:
  sdk: ">=2.7.0 <3.0.0"

dependencies:
  flutter:
    sdk: flutter
  
  # state management
  stacked: ^1.9.1+2
  
  # third-party services
  stacked_services: ^0.6.7
  
  # navigation
  auto_route: ^0.6.9
  
  # inversion of control
  get_it: ^5.0.6
  injectable: ^1.1.0
  
  # icons
  font_awesome_flutter: ^8.11.0
  
  # misc
  logger: ^0.9.4
  
dev_dependencies:
  flutter_test:
    sdk: flutter

  # Generators
  build_runner: ^1.11.1
  auto_route_generator: ^0.6.10
  injectable_generator: ^1.1.0
  
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
