"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.statsValidate = exports.stats = exports.validate = exports.saveLinks = exports.walkDirectory = exports.isMd = exports.isDirectory = exports.isFile = exports.convertRelativePathToAbsolutePath = void 0;

const path = require('path');

const fs = require('fs');

const fetch = require('node-fetch');

const marked = require('marked');

const convertRelativePathToAbsolutePath = thePath => {
  if (path.isAbsolute(thePath) === false) {
    return path.resolve(thePath);
  }

  return thePath;
};

exports.convertRelativePathToAbsolutePath = convertRelativePathToAbsolutePath;

const isFile = thePath => {
  if (fs.statSync(thePath).isFile()) {
    return true;
  }

  return false;
};

exports.isFile = isFile;

const isDirectory = thePath => {
  if (fs.statSync(thePath).isDirectory()) {
    return true;
  }

  return false;
};

exports.isDirectory = isDirectory;

const isMd = file => {
  if (path.extname(file) === '.md') {
    return true;
  }

  return false;
};

exports.isMd = isMd;

const walkDirectory = thePath => {
  const absolutePath = convertRelativePathToAbsolutePath(thePath);
  let arrFileMd = [];

  if (isFile(absolutePath)) {
    if (isMd(absolutePath)) {
      arrFileMd.push(absolutePath);
    }
  } else if (isDirectory(absolutePath)) {
    const pathOfFiles = fs.readdirSync(absolutePath);
    pathOfFiles.forEach(file => {
      arrFileMd = arrFileMd.concat(walkDirectory(path.join(absolutePath, file)));
    });
  }

  return arrFileMd;
};

exports.walkDirectory = walkDirectory;
const arrRutas = walkDirectory(path.join(process.cwd(), 'test', 'prueba'));

const saveLinks = arrayOfPaths => {
  const allLinks = [];
  arrayOfPaths.forEach(thePath => {
    const readFiles = fs.readFileSync(thePath, 'utf8');
    const renderer = new marked.Renderer();

    renderer.link = (href, title, text) => {
      allLinks.push({
        href,
        text,
        thePath
      });
    };

    marked(readFiles, {
      renderer
    });
  });
  return allLinks;
};

exports.saveLinks = saveLinks;
const a = saveLinks(arrRutas);

const validate = arrObj => {
  const b = arrObj.map(file => fetch(file.href).then(res => {
    if (res.status >= 200 && res.status <= 208) {
      return { ...file,
        status: res.status,
        statusText: res.statusText
      };
    }

    return { ...file,
      status: res.status,
      statusText: 'FAIL'
    };
  }).catch(() => ({ // handle error for example
    ...file,
    status: 'ERROR',
    statusText: 'FAIL'
  })));
  return Promise.all(b);
};

exports.validate = validate;
validate(a);

const stats = arrObj => ({
  Total: arrObj.length,
  Unique: arrObj.map(item => item.href).filter((value, index, self) => self.indexOf(value) === index).length
});

exports.stats = stats;

const statsValidate = arrObj => {
  const objStats = stats(arrObj);
  return { ...objStats,
    Broken: arrObj.map(item => item.statusText).filter(word => word === 'FAIL').length
  };
};

exports.statsValidate = statsValidate;
const arrValidate = [{
  thePath: path.join(process.cwd(), 'test', 'prueba', '1.md'),
  href: 'https://nodejs.org/es/',
  status: 200,
  statusText: 'OK',
  text: 'Node.js'
}, {
  thePath: path.join(process.cwd(), 'test', 'prueba', '1.md'),
  href: 'https://github.com/karenLee57/karenLee57.github.io-hangman',
  status: 404,
  statusText: 'FAIL',
  text: 'Repositorio'
}, {
  thePath: '/home/laboratoria/LIM010-fe-md-links/test/prueba/1.md',
  status: 'ERROR',
  statusText: 'FAIL',
  href: 'https://www.facebooks.com/',
  text: 'Facebook'
}, {
  thePath: '/home/laboratoria/LIM010-fe-md-links/test/prueba/1.md',
  status: 'ERROR',
  statusText: 'FAIL',
  href: 'https://www.facebooks.com/',
  text: 'Facebook'
}, {
  thePath: '/home/laboratoria/LIM010-fe-md-links/test/prueba/1.md',
  status: 'ERROR',
  statusText: 'FAIL',
  href: 'https://www.facebooks.com/',
  text: 'Facebook'
}];
console.log(statsValidate(arrValidate));