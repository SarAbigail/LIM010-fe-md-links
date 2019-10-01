"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mdLinksCli = exports.bool = exports.mdLinks = exports.statsValidate = exports.stats = exports.validate = exports.saveLinks = exports.walkDirectory = exports.isMd = exports.isDirectory = exports.isFile = exports.convertRelativePathToAbsolutePath = void 0;

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

const isFile = thePath => fs.statSync(thePath).isFile();

exports.isFile = isFile;

const isDirectory = thePath => fs.statSync(thePath).isDirectory();

exports.isDirectory = isDirectory;

const isMd = file => path.extname(file) === '.md';

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

const saveLinks = arrayOfPaths => {
  const arrayOfRoutes = walkDirectory(arrayOfPaths);
  const allLinks = [];
  arrayOfRoutes.forEach(thePath => {
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
  }).catch(() => ({ ...file,
    status: 'ERROR',
    statusText: 'FAIL'
  })));
  return Promise.all(b);
};

exports.validate = validate;

const stats = arrObj => `Total: ${arrObj.length} \nUnique: ${arrObj.map(item => item.href).filter((value, index, self) => self.indexOf(value) === index).length}`;

exports.stats = stats;

const statsValidate = arrObj => {
  const objStats = stats(arrObj);
  return `${objStats} \nBroken: ${arrObj.map(item => item.statusText).filter(word => word === 'FAIL').length}`;
};

exports.statsValidate = statsValidate;

const mdLinks = (thePath, options) => new Promise(resolve => {
  const absolutePath = convertRelativePathToAbsolutePath(thePath);

  if (options === undefined || options.validate === false) {
    resolve(saveLinks(absolutePath));
  } else {
    const arrayOfLinks = saveLinks(absolutePath);
    resolve(validate(arrayOfLinks));
  }
});

exports.mdLinks = mdLinks;

const bool = (opt1, opt2) => {
  if (opt1 === '--validate' && opt2 === undefined || opt1 === '--stats' && opt2 === '--validate') return {
    validate: true
  };
  return {
    validate: false
  };
};

exports.bool = bool;

const mdLinksCli = (thePath, opt1, opt2) => {
  const options = bool;
  return mdLinks(thePath, options).then(res => {
    let response = '';

    if (res.length === 0) {
      response += '-- No se encontraron links o archivos md en la ruta dada.';
    }

    if (opt1 === undefined) {
      res.forEach(file => {
        response += `${file.thePath} ${file.href} ${file.text.substr(0, 50)}`;
      });
    }

    if (opt1 === '--stats' && opt2 === undefined) {
      response += stats(res);
    }

    if (opt1 === '--validate' && opt2 === undefined) {
      res.forEach(file => {
        response += `${file.thePath} ${file.href} ${file.statusText} ${file.status} ${file.text.substr(0, 50)}`;
      });
    }

    if (opt1 === '--stats' && opt2 === '--validate') {
      response += statsValidate(res);
    }

    if (opt1 !== '--stats' && opt1 !== '--validate' && opt1 !== undefined || opt2 !== '--validate' && opt2 !== undefined) {
      response += '> No es un comando válido!!!';
    }

    return response;
  });
};

exports.mdLinksCli = mdLinksCli;