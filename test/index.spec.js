// importamos la funcion que vamos a testear
import { convertRelativePathToAbsolutePath, isMd, isFile, isDirectory } from '../src/main';

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

describe('¿Es un archivo markdown?', () => {
  it('debería retornar true si la extensión del archivo es .md', () => {
    expect(isMd('1.md')).toBe(true);
  });
  it('debería retornar false si la extensión del archivo es .md', () => {
    expect(isMd('1.txt')).toBe(false);
  });
});

describe('It is a file?', () => {
  it('Debería ser una función', (done) => {
    expect(typeof isFile).toBe('function');
    done();
  });
  it('Debería retornar true si es un archivo', (done) => {
    expect(isFile('C:\\Users\\sara s\\Documents\\Laboratoria\\Track\\LIM010-fe-md-links\\src\\main.js')).toBe(true);
    done();
  });
  it('Debería retornar false si no es un archivo', (done) => {
    expect(isFile('C:\\Users\\sara s\\Documents\\Laboratoria\\Track\\LIM010-fe-md-links\\src')).toBe(false);
    done();
  });
});

describe('It is a directory?', () => {
  it('Debería ser una función', (done) => {
    expect(typeof isDirectory).toBe('function');
    done();
  });
  it('Debería retornar true si es un directorio', (done) => {
    expect(isDirectory('C:\\Users\\sara s\\Documents\\Laboratoria\\Track\\LIM010-fe-md-links\\src')).toBe(true);
    done();
  });
  it('Debería retornar false si no es un directorio', (done) => {
    expect(isDirectory('C:\\Users\\sara s\\Documents\\Laboratoria\\Track\\LIM010-fe-md-links\\src\\main.js')).toBe(false);
    done();
  });
});
