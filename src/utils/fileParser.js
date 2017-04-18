import fs from 'fs';

export const createFile = (path, file, encoding) => {
  try {
    fs.writeFileSync(path, file, { encoding: encoding });
  } catch (err) {
      console.log(err);
  }
  console.log('user image saved successfully......');
};

export const readFile = (path) => {
  try {
    const dataFile = fs.readFileSync(path);
    return dataFile;
  } catch (err) {
    if (err.code === 'ENOENT') { // check file to exist
      console.log('expected file to read......');
      return '';
    } else {
      throw err;
    }
  }
};

export const deleteFile = (path) => {
  try {
    fs.unlinkSync(path);
  } catch (err) {
    if (err.code === 'ENOENT') {
      console.log('expected file to read......');
      return;
    } else {
      throw err;
    }
  }
};
