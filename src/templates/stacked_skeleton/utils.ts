import * as _ from "lodash";
import { Base } from "./base";

export class Utils extends Base {
  private _dartString: string;

  constructor(fileName: string, suffix?: string) {
    super(fileName, suffix);

    this._dartString = `
import 'package:injectable/injectable.dart';

@lazySingleton
class Utils {}    
`;
  }

  get dartString(): string {
    return this._dartString;
  }
}
