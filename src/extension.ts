import { commands, ExtensionContext } from "vscode";
import { newStackedViewViewModelCommand } from "./commands";

export function activate(_context: ExtensionContext) {
  commands.registerCommand(
    "extension.new-stacked-view-viewmodel",
    newStackedViewViewModelCommand
  );
}
