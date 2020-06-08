import { convertToPascalCase } from "../utils";

export function getStackedViewModelTemplate(stackedViewName: string): string {
  return getStackedViewModelTemplateAndDecideReactive(stackedViewName);
}

function getStackedViewModelTemplateAndDecideReactive(stackedViewName: string) {
  const pascalCaseStackedViewName = convertToPascalCase(
    stackedViewName.toLowerCase()
  );
  const stackedViewModel = `${pascalCaseStackedViewName}ViewModel`;

  return `
import 'package:stacked/stacked.dart';

class ${stackedViewModel} extends BaseViewModel {}
`;
}
