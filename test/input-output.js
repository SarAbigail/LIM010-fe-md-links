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
const outputStats = { Total: 3, Unique: 3 };

const inputStatsValidate = [{
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
];
const outputStatsValidate = { Total: 3, Unique: 3, Broken: 2 };

export const io = {
  path,
  arrObj,
  outputStats,
  inputStatsValidate,
  outputStatsValidate,
};
