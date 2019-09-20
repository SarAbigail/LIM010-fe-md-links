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

export const statusOfTheLink = (array) => {
  array.forEach((file) => {
    fetch(file.href)
      .then((res) => {
        console.log(res.status);
      })
      .catch((err) => {
        // handle error for example
        console.error(err);
      });
  });
};
