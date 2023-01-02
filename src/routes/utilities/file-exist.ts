import fs from 'fs';

function fileExist(path: string): boolean {
  try {
    fs.accessSync(path);
    return true;
  } catch (err) {
    return false;
  }
}

export default fileExist;
