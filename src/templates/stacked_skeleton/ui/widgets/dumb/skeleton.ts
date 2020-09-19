import * as _ from "lodash";
import { Base } from "../../../base";

export class Skeleton extends Base {
  private _dartString: string;

  constructor(fileName: string, projectName: string, suffix?: string) {
    super(fileName, suffix);

    this._dartString = `import 'package:flutter/material.dart';
import 'package:${projectName}/src/ui/global/ui_helpers.dart';
import 'package:${projectName}/src/ui/widgets/dumb/busy.dart';

class Skeleton extends StatelessWidget {
  final bool isBusy;
  final Color backgroundColor;
  final String appBarTitle;
  final TextStyle appBarTitleStyle;
  final Widget body;
  final Widget floatingActionButton;
  final FloatingActionButtonAnimator floatingActionButtonAnimator;
  final FloatingActionButtonLocation floatingActionButtonLocation;
  final Widget belowOverlayChild;
  final List<Widget> appBarActions;
  final Widget appBarLeading;
  final Widget drawer;
  final Widget endDrawer;
  final Widget bottomNavigationBar;
  final Widget bottomSheet;
  final EdgeInsets bodyPadding;
  final Widget appBarTitleWidget;
  final BoxConstraints constraints;
  final bool centerTitle;
  final String busyText;

  const Skeleton({
    Key key,
    @required this.isBusy,
    this.backgroundColor,
    this.appBarTitle,
    this.appBarTitleStyle,
    @required this.body,
    this.floatingActionButton,
    this.floatingActionButtonAnimator,
    this.floatingActionButtonLocation,
    this.belowOverlayChild,
    this.appBarActions,
    this.appBarLeading,
    this.drawer,
    this.endDrawer,
    this.bottomNavigationBar,
    this.bottomSheet,
    this.bodyPadding,
    this.appBarTitleWidget,
    this.constraints,
    this.centerTitle = false,
    this.busyText,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return IgnorePointer(
      ignoring: isBusy,
      child: Stack(
        children: <Widget>[
          GestureDetector(
            onTap: () {
              FocusScope.of(context).requestFocus(FocusNode());
            },
            child: Scaffold(
              appBar: appBarTitle != null || appBarTitleWidget != null
                  ? AppBar(
                      iconTheme: IconThemeData(
                        color: Theme.of(context).accentColor,
                      ),
                      actionsIconTheme: IconThemeData(
                        color: Theme.of(context).accentColor,
                      ),
                      leading: appBarLeading,
                      actions: appBarActions,
                      elevation: 5,
                      centerTitle: centerTitle,
                      title: appBarTitleWidget ??
                          Text(
                            appBarTitle,
                            style: appBarTitleStyle ??
                                TextStyle(
                                  fontSize: blockSize(context) * 3,
                                  fontWeight: FontWeight.bold,
                                ),
                          ),
                    )
                  : null,
              body: SafeArea(
                child: Container(
                  constraints: constraints ??
                      BoxConstraints(
                        maxWidth: 768.0,
                      ),
                  padding: bodyPadding ??
                      EdgeInsets.fromLTRB(
                        blockSize(context) * 2,
                        blockSize(context) * 2,
                        blockSize(context) * 2,
                        blockSize(context) * 2,
                      ),
                  child: body,
                ),
              ),
              floatingActionButton: floatingActionButton ?? null,
              floatingActionButtonAnimator: floatingActionButtonAnimator,
              floatingActionButtonLocation: floatingActionButtonLocation,
              drawer: drawer,
              endDrawer: endDrawer,
              bottomNavigationBar: bottomNavigationBar,
              bottomSheet: bottomSheet,
            ),
          ),
          isBusy
              ? Busy(
                  text: busyText,
                )
              : SizedBox.shrink(),
        ],
      ),
    );
  }
}`;
  }

  get dartString(): string {
    return this._dartString;
  }
}
