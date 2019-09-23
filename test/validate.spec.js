import { statusOfTheLink } from '../src/main.js';

const path = require('path');

const arrObj = [{
  href: 'https://nodejs.org/es/',
  text: 'Node.js',
  thePath: '/home/laboratoria/LIM010-fe-md-links/test/prueba/1.md',
},
{
  href: 'https://github.com/karenLee57/karenLee57.github.io-hangman',
  text: 'Repositorio',
  thePath: '/home/laboratoria/LIM010-fe-md-links/test/prueba/1.md',
},
{
  href: 'https://www.facebooks.com/',
  text: 'Facebook',
  thePath: '/home/laboratoria/LIM010-fe-md-links/test/prueba/1.md',
},
];

describe('Validate link', () => {
  it('Debería ser una función', (done) => {
    expect(typeof statusOfTheLink).toBe('function');
    done();
  });

  it('Debería devolver un array de objetos con la ruta, url, status, status text y text', done => statusOfTheLink(arrObj)
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
