import { Base } from "../../base";

export class CustomBaseViewModel extends Base {
  private _dartString: string;

  constructor(fileName: string) {
    super(fileName);

    this._dartString = `import 'package:stacked/stacked.dart';

abstract class CustomBaseViewModel extends BaseViewModel {
    // Add any shared stuff between all viewmodels here,
    // they will be accessible in every viewmodel you extend using this class.
}
`;
  }

  get dartString(): string {
    return this._dartString;
  }
}
