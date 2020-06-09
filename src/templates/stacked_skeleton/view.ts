import { Base } from "./base";
import { Utils } from "../../utils";

export class View extends Base {
  private _dartString: string;

  constructor(fileName: string, suffix: string) {
    super(fileName, suffix);

    let classPrefixList: string[] = this.className.split("View");
    const className = classPrefixList[0];

    const pascalCaseStackedViewName = Utils.convertToPascalCase(
      className.toLowerCase()
    );
    const snakeCaseStackedViewName = Utils.convertToSnakeCase(
      className.toLowerCase()
    );
    const stackedView = `${pascalCaseStackedViewName}View`;
    const stackedViewModel = `${pascalCaseStackedViewName}ViewModel`;

    this._dartString = `
import 'package:flutter/material.dart';
import 'package:stacked/stacked.dart';

import './${snakeCaseStackedViewName}_view_model.dart';

class ${stackedView} extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return ViewModelBuilder<${stackedViewModel}>.reactive(
      viewModelBuilder: () => ${stackedViewModel}(),
      builder: (
        BuildContext context,
        ${stackedViewModel} model,
        Widget child,
      ) {
        return Scaffold(
          body: Center(
            child: Text(
              '${stackedView}',
            ),
          ),
        );
      },
    );
  }
}
`;
  }

  get dartString(): string {
    return this._dartString;
  }
}
