import { io } from './input-output.js';
import { validate } from '../src/main.js';

const path = require('path');

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
