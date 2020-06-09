import * as changeCase from "change-case";
import { Utils } from "../../utils";

export function getStackedViewTemplate(
  stackedViewName: string,
  useReactive: boolean
): string {
  return getStackedViewTemplateAndDecideReactive(stackedViewName, useReactive);
}

function getStackedViewTemplateAndDecideReactive(
  stackedViewName: string,
  useReactive: boolean
) {
  const pascalCaseStackedViewName = Utils.convertToPascalCase(
    stackedViewName.toLowerCase()
  );
  const snakeCaseStackedViewName = Utils.convertToSnakeCase(
    stackedViewName.toLowerCase()
  );
  const stackedView = `${pascalCaseStackedViewName}View`;
  const stackedViewModel = `${pascalCaseStackedViewName}ViewModel`;

  return `
import 'package:flutter/material.dart';
import 'package:stacked/stacked.dart';

import './${snakeCaseStackedViewName}_view_model.dart';

class ${stackedView} extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return ViewModelBuilder<${stackedViewModel}>.${
    useReactive ? "reactive" : "nonReactive"
  }(
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
