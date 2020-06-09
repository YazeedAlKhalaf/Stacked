import * as _ from "lodash";
import { Base } from "./base";

export class Router extends Base {
  private _dartString: string;

  constructor(fileName: string, projectName: string, suffix?: string) {
    super(fileName, suffix);

    this._dartString = `
import 'package:auto_route/auto_route_annotations.dart';
import 'package:${projectName}/src/ui/views/startup/startup_view.dart';
import 'package:${projectName}/src/ui/views/home/home_view.dart';

@MaterialAutoRouter()
class $Router {
  @initial
  StartupView startupViewRoute;

  HomeView homeViewRoute;
}    
`;
  }

  get dartString(): string {
    return this._dartString;
  }
}
