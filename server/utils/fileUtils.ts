import * as fs from 'fs';
import { includes } from 'lodash';
import shell from 'shelljs';

export function checkPath(path: string): string {
  let dir = path;
  if (includes(path, '.')) {
    // remove the file from path and only create the folders
    // @ts-ignore
    dir = dir.split('/');
    // @ts-ignore
    dir.pop();
    // @ts-ignore
    dir = dir.join('/');
  }

  if (!fs.existsSync(dir)) {
    shell.mkdir('-p', dir);
  }
  return path;
}
