import { Base } from "../../base";
import { Utils } from "../../../../utils";
import { YamlHelper } from "../../../../utils/yaml_helper";

export class ViewModel extends Base {
  private _dartString: string;

  constructor(fileName: string, suffix: string) {
    super(fileName, suffix);

    let classPrefixList: string[] = this.className.split("View");
    const className = classPrefixList[0];

    const pascalCaseStackedViewName = Utils.convertToPascalCase(className);
    const stackedViewModel = `${pascalCaseStackedViewName}ViewModel`;

    this._dartString = `import 'package:${YamlHelper.getProjectName()}/app/core/custom_base_view_model.dart';

class ${stackedViewModel} extends CustomBaseViewModel {
  Future<void> init() async {}
}
`;
  }

  get dartString(): string {
    return this._dartString;
  }
}
