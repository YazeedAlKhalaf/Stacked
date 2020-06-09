import { commands, ExtensionContext } from "vscode";
import {
  newStackedViewViewModelCommand,
  newStackedSkeltonCommand,
} from "./commands";

export function activate(_context: ExtensionContext) {
  commands.registerCommand(
    "extension.new-stacked-view-viewmodel",
    newStackedViewViewModelCommand
  );

  commands.registerCommand(
    "extension.new-stacked-skeleton",
    newStackedSkeltonCommand
  );
}
