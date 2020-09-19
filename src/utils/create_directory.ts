import * as mkdirp from "mkdirp";

export function createDirectory(targetDirectory: string): Promise<void> {
  return new Promise((resolve, reject) => {
    mkdirp(targetDirectory).then((made) => {
      if (!made) {
        return reject("Didn't make directory!");
      }

      resolve();
    });
  });
}
