import * as _ from "lodash";
import { Base } from "./base";

export class AppColors extends Base {
  private _dartString: string;

  constructor(fileName: string, suffix?: string) {
    super(fileName, suffix);

    this._dartString = `
import 'package:flutter/material.dart';

const Color primaryColor = Color(0xff2A2E43);
const Color accentColor = Color(0xff454F63);
const Color lynchColor = Color(0xff78849E);
const Color backgroundColor = Color(0xffFFFFFF);

const Color mediumPurpleColor = Color(0xffC840E9);
const Color wildStrawberryColor = Color(0xffFF4F9A);
const Color coralColor = Color(0xffFF9057);
const Color selectiveYellowColor = Color(0xffFFB900);

const Color cornFlowerBlueColor = Color(0xff665EFF);
const Color dodgerBlueColor = Color(0xff5773FF);
const Color lightDodgerBlueColor = Color(0xff3497FD);
const Color pictonBlueColor = Color(0xff3ACCE1);

const Color textColorBlack = Color(0xff000000);
const Color textColorWhite = Color(0xffFFFFFF);
const Color textColorLink = Color(0xff3497FD);

const Color dangerColor = Color(0xffFF3131);
`;
  }

  get dartString(): string {
    return this._dartString;
  }
}
