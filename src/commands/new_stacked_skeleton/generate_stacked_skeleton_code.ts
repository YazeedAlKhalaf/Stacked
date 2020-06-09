import { existsSync } from "fs";
import { createDirectory } from "../../utils";
import { YamlHelper } from "../../utils/yaml_helper";

export async function generateStackedSkeletonCode(
  targetDirectory: string,
  useReactive: boolean
) {
  if (YamlHelper.isValidFlutterPubspec() === undefined) {
    YamlHelper.initializeWithDependencies();
  }

  const appDirectoryPath = `${targetDirectory}/src/app`;
  const uiDirectoryPath = `${targetDirectory}/src/ui`;
  if (!existsSync(appDirectoryPath)) {
    await createDirectory(appDirectoryPath);
  }

  if (!existsSync(uiDirectoryPath)) {
    await createDirectory(uiDirectoryPath);
  }

  await Promise.all([
    // createStackedViewModelTemplate(stackedName, targetDirectory),
    // createStackedViewTemplate(stackedName, targetDirectory, useReactive),
  ]);
}
