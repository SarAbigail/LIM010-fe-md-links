const path = require('path');
const fs = require('fs');
const fetch = require('node-fetch');
const marked = require('marked');

export const convertRelativePathToAbsolutePath = (thePath) => {
  if (path.isAbsolute(thePath) === false) {
    return path.resolve(thePath);
  }
  return thePath;
};

export const isFile = (thePath) => {
  if (fs.statSync(thePath).isFile()) {
    return true;
  }
  return false;
};

export const isDirectory = (thePath) => {
  if (fs.statSync(thePath).isDirectory()) {
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

export const walkDirectory = (thePath) => {
  const absolutePath = convertRelativePathToAbsolutePath(thePath);
  let arrFileMd = [];
  if (isFile(absolutePath)) {
    if (isMd(absolutePath)) {
      arrFileMd.push(absolutePath);
    }
  } else if (isDirectory(absolutePath)) {
    const pathOfFiles = fs.readdirSync(absolutePath);
    pathOfFiles.forEach((file) => {
      arrFileMd = arrFileMd.concat(walkDirectory(path.join(absolutePath, file)));
    });
  }
  return arrFileMd;
};

export const saveLinks = (arrayOfPaths) => {
  const allLinks = [];
  arrayOfPaths.forEach((thePath) => {
    const readFiles = fs.readFileSync(thePath, 'utf8');
    const renderer = new marked.Renderer();
    renderer.link = (href, title, text) => {
      allLinks.push({
        href,
        text,
        thePath,
      });
    };
    marked(readFiles, { renderer });
  });
  return allLinks;
};

export const validate = (arrObj) => {
  const b = arrObj.map(file => fetch(file.href)
    .then((res) => {
      if (res.status >= 200 && res.status <= 208) {
        return {
          ...file,
          status: res.status,
          statusText: res.statusText,
        };
      } return {
        ...file,
        status: res.status,
        statusText: 'FAIL',
      };
    })
    .catch(() => ({
      // handle error for example
      ...file,
      status: 'ERROR',
      statusText: 'FAIL',
    })));
  return Promise.all(b);
};

export const stats = arrObj => ({
  Total: arrObj.length,
  Unique: arrObj.map(item => item.href)
    .filter((value, index, self) => self.indexOf(value) === index).length,
});

export const statsValidate = (arrObj) => {
  const objStats = stats(arrObj);
  return {
    ...objStats,
    Broken: arrObj.map(item => item.statusText).filter(word => word === 'FAIL').length,
  };
};
