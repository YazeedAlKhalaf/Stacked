import { Base } from "./base";
import { Utils } from "../../utils";

export class ViewModel extends Base {
  private _dartString: string;

  constructor(fileName: string, suffix: string) {
    super(fileName, suffix);

    let classPrefixList: string[] = this.className.split("View");
    const className = classPrefixList[0];

    const pascalCaseStackedViewName = Utils.convertToPascalCase(className);
    const stackedViewModel = `${pascalCaseStackedViewName}ViewModel`;

    this._dartString = `
import 'package:stacked/stacked.dart';

class ${stackedViewModel} extends BaseViewModel {}
`;
  }

  get dartString(): string {
    return this._dartString;
  }
}
