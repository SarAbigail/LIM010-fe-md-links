// module.exports = () => {
//   return console.log(path);
// };

const path = require('path');
const fs = require('fs');

export const convertRelativePathToAbsolutePath = (thePath) => {
  if (path.isAbsolute(thePath) === false) {
    return path.resolve(thePath);
  }
  return thePath;
};

export const isFile = (file) => {
  if (fs.statSync(file).isFile()) {
    return true;
  }
  return false;
};

export const isDirectory = (file) => {
  if (fs.statSync(file).isDirectory()) {
    return true;
  }
  return false;
};


export const isMd = (file) => {
  if (path.extname(file) === '.md') {
    return true;
  }
  return false;
};
// export const readFile = (file) => {
//   fs.readFile('file', 'utf8', (err, data) => {
//     if (err) {
//       console.error('error', err);
//     } else {
//       console.log(data);
//     }
//   });
// };
