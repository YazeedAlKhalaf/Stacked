import * as _ from "lodash";
import { Base } from "./base";

export class Logger extends Base {
  private _dartString: string;

  constructor(fileName: string, suffix?: string) {
    super(fileName, suffix);

    this._dartString = `import 'package:logger/logger.dart';

Logger getLogger(String className) {
  return Logger(
    printer: SimpleLogPrinter(
      className,
    ),
  );
}

class SimpleLogPrinter extends LogPrinter {
  final String className;

  SimpleLogPrinter(
    this.className,
  );

  @override
  List<String> log(LogEvent event) {
    var color = PrettyPrinter.levelColors[event.level];
    var emoji = PrettyPrinter.levelEmojis[event.level];
    print(
      color(
        '\$emoji \$className - \${event.message}',
      ),
    );

    return [];
  }
}`;
  }

  get dartString(): string {
    return this._dartString;
  }
}
