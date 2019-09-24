/* eslint-disable max-len */
// importamos la funcion que vamos a testear
import { io } from './input-output.js';
import {
  convertRelativePathToAbsolutePath, isFile, isDirectory, isMd, walkDirectory, saveLinks, validate, stats, statsValidate,
} from '../src/main';

const path = require('path');

describe('Absolute path to relative path', () => {
  it('Debería ser una función', () => {
    expect(typeof convertRelativePathToAbsolutePath).toBe('function');
  });
  it('Debería convertir una ruta relativa a una ruta absoluta', () => {
    expect(convertRelativePathToAbsolutePath('./prueba/1.md')).toBe(path.join(process.cwd(), 'prueba', '1.md'));
  });
  it('Debería retornar la misma ruta si es absoluta', () => {
    expect(convertRelativePathToAbsolutePath(path.join(process.cwd(), 'prueba', '1.md'))).toBe(path.join(process.cwd(), 'prueba', '1.md'));
  });
});

describe('It is a file?', () => {
  it('Debería ser una función', () => {
    expect(typeof isFile).toBe('function');
  });
  it('Debería retornar true si es un archivo', () => {
    expect(isFile(path.join(process.cwd(), 'src', 'main.js'))).toBe(true);
  });
  it('Debería retornar false si no es un archivo', () => {
    expect(isFile(path.join(process.cwd(), 'src'))).toBe(false);
  });
});

describe('It is a directory?', () => {
  it('Debería ser una función', () => {
    expect(typeof isDirectory).toBe('function');
  });
  it('Debería retornar true si es un directorio', () => {
    expect(isDirectory(path.join(process.cwd(), 'src'))).toBe(true);
  });
  it('Debería retornar false si no es un directorio', () => {
    expect(isDirectory(path.join(process.cwd(), 'src', 'main.js'))).toBe(false);
  });
});

describe('It is a markdown file?', () => {
  it('Debería retornar true si la extensión del archivo es .md', () => {
    expect(isMd('1.md')).toBe(true);
  });
  it('Debería retornar false si la extensión del archivo es .md', () => {
    expect(isMd('1.txt')).toBe(false);
  });
});

describe('Found md files in all directory', () => {
  it('Debería ser una función', () => {
    expect(typeof walkDirectory).toBe('function');
  });
  it('Debería retornar el file con extensión Md', () => {
    expect(walkDirectory(path.join(process.cwd(), 'test'))[0]).toBe(path.join(process.cwd(), 'test', 'prueba', '1.md'));
  });
  it('Debería retornar el file con extensión Md de un directorio', () => {
    expect(walkDirectory(path.join(process.cwd(), 'test'))[1]).toBe(path.join(process.cwd(), 'test', 'prueba', 'sub carpeta', '2.md'));
  });
});

describe('Save all links in an array of objects (href,text,file)', () => {
  it('Debería ser una función', () => {
    expect(typeof saveLinks).toBe('function');
  });
  it('Debería mostrar el primer link', () => {
    expect(saveLinks([path.join(process.cwd(), 'test', 'prueba', '1.md')])[0].href).toBe('https://nodejs.org/es/');
  });
  it('Debería mostrar el texto dentro del link', () => {
    expect(saveLinks([path.join(process.cwd(), 'test', 'prueba', '1.md')])[0].text).toBe('Node.js');
  });
  it('Debería mostrar la ruta de donde procede el link', () => {
    expect(saveLinks([path.join(process.cwd(), 'test', 'prueba', '1.md')])[0].thePath).toBe(path.join(process.cwd(), 'test', 'prueba', '1.md'));
  });
});

describe('Validate link', () => {
  it('Debería ser una función', (done) => {
    expect(typeof validate).toBe('function');
    done();
  });

  it('Debería devolver un array de objetos con la ruta, url, status, status text y text', done => validate(io.arrObj)
    .then((data) => {
      expect(data).toStrictEqual([{
        thePath: path.join(process.cwd(), 'test', 'prueba', '1.md'),
        href: 'https://nodejs.org/es/',
        status: 200,
        statusText: 'OK',
        text: 'Node.js',
      },
      {
        thePath: path.join(process.cwd(), 'test', 'prueba', '1.md'),
        href: 'https://github.com/karenLee57/karenLee57.github.io-hangman',
        status: 404,
        statusText: 'FAIL',
        text: 'Repositorio',
      },
      {
        thePath: '/home/laboratoria/LIM010-fe-md-links/test/prueba/1.md',
        status: 'ERROR',
        statusText: 'FAIL',
        href: 'https://www.facebooks.com/',
        text: 'Facebook',
      },
      ]);
      done();
    }));
});

describe('Show stadistics about md-links', () => {
  it('Debería ser una función', () => {
    expect(typeof stats).toBe('function');
  });
  it('Debería retornar el número total y unique de links', () => {
    expect(stats(io.arrObj)).toMatchObject(io.outputStats);
  });
});

describe('Show stadistics about md-links and validate', () => {
  it('Debería ser una función', () => {
    expect(typeof statsValidate).toBe('function');
  });
  it('Debería retornar el número total,unique y broken de links ', () => {
    expect(statsValidate(io.inputStatsValidate)).toMatchObject(io.outputStatsValidate);
  });
});
