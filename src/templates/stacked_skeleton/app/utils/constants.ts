import * as _ from "lodash";
import { Base } from "../../base";

export class Constants extends Base {
  private _dartString: string;

  constructor(fileName: string, suffix?: string) {
    super(fileName, suffix);

    this._dartString = `class Constants {
  /// For Example
  /// static const String MY_AWESOME_CONSTANT = 'yazeed';
}`;
  }

  get dartString(): string {
    return this._dartString;
  }
}
