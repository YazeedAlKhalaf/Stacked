import * as _ from "lodash";
import { Utils } from "../../../../utils/utils";
import { Base } from "../../base";

export class Router extends Base {
  private _dartString: string;

  constructor(fileName: string, projectName: string, suffix?: string) {
    super(fileName, suffix);

    this._dartString = `import 'package:auto_route/auto_route.dart';

import 'package:${projectName}/ui/views/home/home_view.dart';
import 'package:${projectName}/ui/views/startup/startup_view.dart';

export './router.gr.dart';

@AdaptiveAutoRouter(
  replaceInRouteName: "View,Route",
  routes: <AutoRoute>[
    AdaptiveRoute(page: StartupView, initial: true),
    AdaptiveRoute(page: HomeView),
  ],
)
class $${Utils.convertToPascalCase(projectName)}Router {}`;
  }

  get dartString(): string {
    return this._dartString;
  }
}
