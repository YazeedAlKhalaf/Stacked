import * as _ from "lodash";
import { Utils } from "../../../../utils/utils";
import { Base } from "../../base";

export class RouterService extends Base {
  private _dartString: string;

  constructor(fileName: string, projectName: string, suffix?: string) {
    super(fileName, suffix);

    this._dartString = `import "package:injectable/injectable.dart";
import "package:${projectName}/app/router/router.dart";
    
@lazySingleton
class RouterService {
  final ${Utils.convertToPascalCase(
    projectName
  )}Router router = ${Utils.convertToPascalCase(projectName)}Router();
}`;
  }

  get dartString(): string {
    return this._dartString;
  }
}
