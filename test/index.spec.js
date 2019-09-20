// importamos la funcion que vamos a testear
import { convertRelativePathToAbsolutePath, isFile, isDirectory, isMd, walkDirectory, saveLinks } from '../src/main';
const path = require('path');
const arrayOfPaths = ['C:\\Users\\sara s\\Documents\\Laboratoria\\Track\\LIM010-fe-md-links\\test\\prueba\\1.md', 'C:\\Users\\sara s\\Documents\\Laboratoria\\Track\\LIM010-fe-md-links\\test\\prueba\\sub carpeta\\2.md']

describe('Absolute path to relative path', () => {
  it('Debería ser una función', () => {
    expect(typeof convertRelativePathToAbsolutePath).toBe('function');
  });
  it('debería convertir una ruta relativa a una ruta absoluta', () => {
    expect(convertRelativePathToAbsolutePath('./prueba/1.md')).toBe('C:\\Users\\sara s\\Documents\\Laboratoria\\Track\\LIM010-fe-md-links\\prueba\\1.md');
  });
  it('debería retornar la misma ruta si es absoluta', () => {
    expect(convertRelativePathToAbsolutePath('C:\\Users\\sara s\\Documents\\Laboratoria\\Track\\LIM010-fe-md-links\\prueba\\1.md')).toBe('C:\\Users\\sara s\\Documents\\Laboratoria\\Track\\LIM010-fe-md-links\\prueba\\1.md');
  });
});

describe('It is a file?', () => {
  it('Debería ser una función', () => {
    expect(typeof isFile).toBe('function');
  });
  it('Debería retornar true si es un archivo', () => {
    expect(isFile('C:\\Users\\sara s\\Documents\\Laboratoria\\Track\\LIM010-fe-md-links\\src\\main.js')).toBe(true);
  });
  it('Debería retornar false si no es un archivo', () => {
    expect(isFile('C:\\Users\\sara s\\Documents\\Laboratoria\\Track\\LIM010-fe-md-links\\src')).toBe(false);
  });
});

describe('It is a directory?', () => {
  it('Debería ser una función', () => {
    expect(typeof isDirectory).toBe('function');
  });
  it('Debería retornar true si es un directorio', () => {
    expect(isDirectory('C:\\Users\\sara s\\Documents\\Laboratoria\\Track\\LIM010-fe-md-links\\src')).toBe(true);
  });
  it('Debería retornar false si no es un directorio', () => {
    expect(isDirectory('C:\\Users\\sara s\\Documents\\Laboratoria\\Track\\LIM010-fe-md-links\\src\\main.js')).toBe(false);
  });
});

describe('It is a markdown file?', () => {
  it('debería retornar true si la extensión del archivo es .md', () => {
    expect(isMd('1.md')).toBe(true);
  });
  it('debería retornar false si la extensión del archivo es .md', () => {
    expect(isMd('1.txt')).toBe(false);
  });
});

describe('Found md files in all directory', () => {
  it('debería ser una función', () => {
    expect(typeof walkDirectory).toBe('function');
  });
  it('Debería retornar el file con extensión Md', () => {
    expect(walkDirectory(path.join(process.cwd(), 'test'))[0]).toBe(path.join(process.cwd(), 'test', 'prueba', '1.md'));
  });
  it('Debería retornar el file con extensión Md de un directorio', () => {
    expect(walkDirectory(path.join(process.cwd(), 'test'))[1]).toBe(path.join(process.cwd(), 'test', 'prueba', 'sub carpeta', '2.md'));
  });
});

describe('Save all links in an array of objects', () => {
  it('debería ser una función', () => {
    expect(typeof saveLinks).toBe('function');
  });
  it('Debería ', () => {
    expect(saveLinks([path.join(process.cwd(), 'test', 'prueba', '1.md')]).toBe('https://nodejs.org/es/');
  });
  // it('Debería', () => {
  //   expect(saveLinks(arrayOfPaths).text).toBe('Node');
  // });
  // it('Debería f', () => {
  //   expect(saveLinks(arrayOfPaths).thePath).toBe(path.join(process.cwd(), 'test', 'prueba', '1.md'));
  // });
});


