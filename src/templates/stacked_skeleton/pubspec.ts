import * as _ from "lodash";
import { Base } from "./base";
import { YamlHelper } from "../../utils/yaml_helper";

export class Pubspec extends Base {
  private _dartString: string;

  constructor(fileName: string, projectName: string, suffix?: string) {
    super(fileName, suffix);

    this._dartString = `
name: ${projectName !== undefined ? projectName : "example_app"}
description: A new Flutter project.
version: 1.0.0+1

environment:
  sdk: ">=2.7.0 <3.0.0"

dependencies:
  flutter:
    sdk: flutter
  
  # Cupertino Icons
  cupertino_icons: ^0.1.3
  # Stacked
  stacked: ^1.5.1
  # third-party services
  stacked_services: ^0.3.1
  # navigation
  auto_route: ^0.5.0
  # inversion of control
  get_it: ^4.0.2
  injectable: ^0.4.0
  # Flutter Spinkit
  flutter_spinkit: ^4.1.2+1
  # Logger
  logger: ^0.9.1
  
dev_dependencies:
  flutter_test:
    sdk: flutter

  # Generators
  build_runner: ^1.10.0
  auto_route_generator: ^0.5.0
  injectable_generator: ^0.4.0

# For information on the generic Dart part of this file, see the
# following page: https://dart.dev/tools/pub/pubspec
# The following section is specific to Flutter.
flutter:
  # The following line ensures that the Material Icons font is
  # included with your application, so that you can use the icons in
  # the material Icons class.
  uses-material-design: true
  # To add assets to your application, add an assets section, like this:
  # assets:
  #  - images/a_dot_burr.jpeg
  #  - images/a_dot_ham.jpeg
  # An image asset can refer to one or more resolution-specific "variants", see
  # https://flutter.dev/assets-and-images/#resolution-aware.
  # For details regarding adding assets from package dependencies, see
  # https://flutter.dev/assets-and-images/#from-packages
  # To add custom fonts to your application, add a fonts section here,
  # in this "flutter" section. Each entry in this list should have a
  # "family" key with the font family name, and a "fonts" key with a
  # list giving the asset and other descriptors for the font. For
  # example:
  # fonts:
  #   - family: Schyler
  #     fonts:
  #       - asset: fonts/Schyler-Regular.ttf
  #       - asset: fonts/Schyler-Italic.ttf
  #         style: italic
  #   - family: Trajan Pro
  #     fonts:
  #       - asset: fonts/TrajanPro.ttf
  #       - asset: fonts/TrajanPro_Bold.ttf
  #         weight: 700
  #
  # For details regarding fonts from package dependencies,
  # see https://flutter.dev/custom-fonts/#from-packages
`;
  }

  get dartString(): string {
    return this._dartString;
  }
}
