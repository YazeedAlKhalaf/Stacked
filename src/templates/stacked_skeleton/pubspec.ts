import * as _ from "lodash";
import { Base } from "./base";
import { YamlHelper } from "../../utils/yaml_helper";

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
  
  # Cupertino Icons
  cupertino_icons: ^0.1.3
  # Stacked
  stacked: ^1.6.0
  # third-party services
  stacked_services: ^0.4.0
  # navigation
  auto_route: ^0.5.0
  # inversion of control
  get_it: ^4.0.2
  injectable: ^0.4.0+1
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
  injectable_generator: ^0.4.1`;
  }

  get dartString(): string {
    return this._dartString;
  }
}
