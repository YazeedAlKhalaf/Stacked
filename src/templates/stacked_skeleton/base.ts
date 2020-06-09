import * as lodash from "lodash";

export abstract class Base {
  constructor(private fileName: string, private classSuffix?: string) {}

  get className(): string {
    return this.getClassName(this.fileName, this.classSuffix);
  }

  private getClassName(fileName: string, suffix?: string): string {
    let camelCaseString = lodash.camelCase(fileName);
    let className = this.convertStringToUpperCamelCase(camelCaseString);
    if (suffix === undefined) {
      return className;
    }
    return (className += suffix);
  }

  private convertStringToUpperCamelCase(fileName: string): string {
    let camelCaseString = lodash.camelCase(fileName);
    return lodash.upperFirst(camelCaseString);
  }
}
