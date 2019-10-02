/* eslint-disable max-len */

import { io } from './input-output.js';
import {
  convertRelativePathToAbsolutePath, isFile, isDirectory, isMd, walkDirectory, saveLinks, validate, stats, statsValidate, mdLinks, mdLinksCli, bool,
} from '../src/main';

describe('Absolute path to relative path', () => {
  it('Debería convertir una ruta relativa a una ruta absoluta', () => {
    expect(convertRelativePathToAbsolutePath('./prueba/1.md')).toBe(io.path.join(process.cwd(), 'prueba', '1.md'));
  });
  it('Debería retornar la misma ruta si es absoluta', () => {
    expect(convertRelativePathToAbsolutePath(io.path.join(process.cwd(), 'prueba', '1.md'))).toBe(io.path.join(process.cwd(), 'prueba', '1.md'));
  });
});

describe('It is a file?', () => {
  it('Debería retornar true si es un archivo', () => {
    expect(isFile(io.path.join(process.cwd(), 'src', 'main.js'))).toBe(true);
  });
  it('Debería retornar false si no es un archivo', () => {
    expect(isFile(io.path.join(process.cwd(), 'src'))).toBe(false);
  });
});

describe('It is a directory?', () => {
  it('Debería retornar true si es un directorio', () => {
    expect(isDirectory(io.path.join(process.cwd(), 'src'))).toBe(true);
  });
  it('Debería retornar false si no es un directorio', () => {
    expect(isDirectory(io.path.join(process.cwd(), 'src', 'main.js'))).toBe(false);
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
  it('Debería retornar el file con extensión Md', () => {
    expect(walkDirectory(io.path.join(process.cwd(), 'test'))[0]).toBe(io.path.join(process.cwd(), 'test', 'prueba', '1.md'));
  });
  it('Debería retornar el file con extensión Md de un directorio', () => {
    expect(walkDirectory(io.path.join(process.cwd(), 'test'))[1]).toBe(io.path.join(process.cwd(), 'test', 'prueba', 'sub carpeta', '2.md'));
  });
});

describe('Save all links in an array of objects (href,text,file)', () => {
  it('Debería mostrar el primer link', () => {
    expect(saveLinks(io.path.join(process.cwd(), 'test', 'prueba', '1.md'))[0].href).toBe('https://nodejs.org/es/');
  });
  it('Debería mostrar el texto dentro del link', () => {
    expect(saveLinks(io.path.join(process.cwd(), 'test', 'prueba', '1.md'))[0].text).toBe('Node.js');
  });
  it('Debería mostrar la ruta de donde procede el link', () => {
    expect(saveLinks(io.path.join(process.cwd(), 'test', 'prueba', '1.md'))[0].thePath).toBe(io.path.join(process.cwd(), 'test', 'prueba', '1.md'));
  });
});

describe('Validate link', () => {
  it('Debería devolver un array de objetos con la ruta, url, status, status text y text', done => validate(io.arrObj)
    .then((data) => {
      expect(data).toStrictEqual(io.inputStatsValidate);
      done();
    }));
});

describe('Show stadistics about md-links', () => {
  it('Debería retornar el número total y unique de links', () => {
    expect(stats(io.arrObj)).toBe(io.outputStats);
  });
});

describe('Show stadistics about md-links and validate', () => {
  it('Debería retornar el número total,unique y broken de links ', () => {
    expect(statsValidate(io.inputStatsValidate)).toBe(io.outputStatsValidate);
  });
});

describe('mdLinks', () => {
  it('Debería retornar el url, path y texto cuando validate es false o indefinido', (done) => {
    mdLinks(io.path.join(process.cwd(), 'test'), { validate: false }).then((res) => {
      expect(res).toStrictEqual(io.outputMdLinks);
      done();
    });
  });
  it('Debería retornar el url, path, texto, status y status text cuando validate es true', (done) => {
    mdLinks(io.path.join(process.cwd(), 'test'), { validate: true }).then((res) => {
      expect(res).toStrictEqual(io.outputMdLinksValidate);
      done();
    });
  });
});

describe('mdLinksCli', () => {
  it('Si se usa validate el valor deberia ser true', () => {
    expect(bool('--validate', undefined)).toMatchObject({ validate: true });
  });
  it('Si se usa stats y validate el valor deberia ser true', () => {
    expect(bool('--stats', '--validate')).toMatchObject({ validate: true });
  });
  it('Si se usa stats o no se usa ninguna opción deberia ser false', () => {
    expect(bool('--stats', '-s')).toMatchObject({ validate: false });
  });
  it('Debería retornar no se encontraron links en los archivos md', (done) => {
    mdLinksCli('test/prueba/sub carpeta/sub', undefined, undefined).then((response) => {
      expect(response).toBe('> No se encontraron links o archivos md en la ruta dada.');
      done();
    });
  });
  it('Debería retornar la ruta, el link y el texto (50 char) de todos los archivos md encontrados', (done) => {
    mdLinksCli('test', undefined, undefined).then((res) => {
      expect(res).toStrictEqual(io.outputMdLinksCliDefault);
      done();
    });
  });
  it('Debería retornar el total de links y el total de links únicos', (done) => {
    mdLinksCli('test', '--stats', undefined).then((res) => {
      expect(res).toBe(io.outputMdLinksCliStats);
      done();
    });
  });
  it('Debería retornar la ruta, el link, el texto, el status y el status text de todos los archivos md', (done) => {
    mdLinksCli('test', '--validate', undefined).then((res) => {
      expect(res).toStrictEqual(io.outputMdLinksCliValidate);
      done();
    });
  });
  it('Debería retornar el total de links, el total de links únicos y el total de links rotos', (done) => {
    mdLinksCli('test', '--stats', '--validate').then((res) => {
      expect(res).toBe(io.outputMdLinksCliStatsValidate);
      done();
    });
  });
  it('Debería retornar no es un comando válido si la opción es diferente de --stats y --validate', (done) => {
    mdLinksCli('test', '-stat', undefined).then((response) => {
      expect(response).toBe('> No es un comando válido!!!');
      done();
    });
  });
});
