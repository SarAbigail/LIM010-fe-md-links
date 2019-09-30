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

const outputStats = 'Total: 3 \nUnique: 3';

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
  thePath: path.join(process.cwd(), 'test', 'prueba', '1.md'),
  status: 'ERROR',
  statusText: 'FAIL',
  href: 'https://www.facebooks.com/',
  text: 'Facebook',
},
];

const outputStatsValidate = 'Total: 3 \nUnique: 3 \nBroken: 2';

const outputDefault = '/home/laboratoria/LIM010-fe-md-links/test/prueba/1.md https://nodejs.org/es/ Node.js';

const outputMdLinks = [{ href: 'https://nodejs.org/es/', text: 'Node.js', thePath: '/home/laboratoria/LIM010-fe-md-links/test/prueba/1.md' }, { href: 'https://github.com/karenLee57/karenLee57.github.io-hangman', text: 'Repositorio', thePath: '/home/laboratoria/LIM010-fe-md-links/test/prueba/1.md' }, { href: 'https://www.facebooks.com/', text: 'Facebook', thePath: '/home/laboratoria/LIM010-fe-md-links/test/prueba/1.md' }, { href: 'https://www.lucidchart.com/documents/edit/e4a7533c-2a38-4c2a-9bb8-cbb7777b88bf/0_0?beaconFlowId=2523CA70E6CB8EBE//', text: 'Diagrama de flujo', thePath: '/home/laboratoria/LIM010-fe-md-links/test/prueba/sub carpeta/2.md' }, { href: 'https://github.com/SarAbigail/LIM010-fe-md-links/tree/master/test', text: 'GH', thePath: '/home/laboratoria/LIM010-fe-md-links/test/prueba/sub carpeta/2.md' }, { href: 'https://www.youtube.com/', text: 'Youtube', thePath: '/home/laboratoria/LIM010-fe-md-links/test/prueba/sub carpeta/2.md' }, { href: 'https://www.google.com/', text: 'Google', thePath: '/home/laboratoria/LIM010-fe-md-links/test/prueba/sub carpeta/2.md' }, { href: 'https://www.facebook.com/', text: 'Fb', thePath: '/home/laboratoria/LIM010-fe-md-links/test/prueba/sub carpeta/2.md' }];

const outputMdLinksValidate = [{
  href: 'https://nodejs.org/es/', status: 200, statusText: 'OK', text: 'Node.js', thePath: '/home/laboratoria/LIM010-fe-md-links/test/prueba/1.md',
}, {
  href: 'https://github.com/karenLee57/karenLee57.github.io-hangman', status: 404, statusText: 'FAIL', text: 'Repositorio', thePath: '/home/laboratoria/LIM010-fe-md-links/test/prueba/1.md',
}, {
  href: 'https://www.facebooks.com/', status: 'ERROR', statusText: 'FAIL', text: 'Facebook', thePath: '/home/laboratoria/LIM010-fe-md-links/test/prueba/1.md',
}, {
  href: 'https://www.lucidchart.com/documents/edit/e4a7533c-2a38-4c2a-9bb8-cbb7777b88bf/0_0?beaconFlowId=2523CA70E6CB8EBE//', status: 200, statusText: 'OK', text: 'Diagrama de flujo', thePath: '/home/laboratoria/LIM010-fe-md-links/test/prueba/sub carpeta/2.md',
}, {
  href: 'https://github.com/SarAbigail/LIM010-fe-md-links/tree/master/test', status: 200, statusText: 'OK', text: 'GH', thePath: '/home/laboratoria/LIM010-fe-md-links/test/prueba/sub carpeta/2.md',
}, {
  href: 'https://www.youtube.com/', status: 200, statusText: 'OK', text: 'Youtube', thePath: '/home/laboratoria/LIM010-fe-md-links/test/prueba/sub carpeta/2.md',
}, {
  href: 'https://www.google.com/', status: 200, statusText: 'OK', text: 'Google', thePath: '/home/laboratoria/LIM010-fe-md-links/test/prueba/sub carpeta/2.md',
}, {
  href: 'https://www.facebook.com/', status: 200, statusText: 'OK', text: 'Fb', thePath: '/home/laboratoria/LIM010-fe-md-links/test/prueba/sub carpeta/2.md',
}];

const outputMdLinksCliDefault = '/home/laboratoria/LIM010-fe-md-links/test/prueba/1.md https://nodejs.org/es/ Node.js/home/laboratoria/LIM010-fe-md-links/test/prueba/1.md https://github.com/karenLee57/karenLee57.github.io-hangman Repositorio/home/laboratoria/LIM010-fe-md-links/test/prueba/1.md https://www.facebooks.com/ Facebook/home/laboratoria/LIM010-fe-md-links/test/prueba/sub carpeta/2.md https://www.lucidchart.com/documents/edit/e4a7533c-2a38-4c2a-9bb8-cbb7777b88bf/0_0?beaconFlowId=2523CA70E6CB8EBE// Diagrama de flujo/home/laboratoria/LIM010-fe-md-links/test/prueba/sub carpeta/2.md https://github.com/SarAbigail/LIM010-fe-md-links/tree/master/test GH/home/laboratoria/LIM010-fe-md-links/test/prueba/sub carpeta/2.md https://www.youtube.com/ Youtube/home/laboratoria/LIM010-fe-md-links/test/prueba/sub carpeta/2.md https://www.google.com/ Google/home/laboratoria/LIM010-fe-md-links/test/prueba/sub carpeta/2.md https://www.facebook.com/ Fb';

const outputMdLinksCliStats = 'Total: 8 \nUnique: 8';

const outputMdLinksCliValidate = '/home/laboratoria/LIM010-fe-md-links/test/prueba/1.md https://nodejs.org/es/ OK 200 Node.js/home/laboratoria/LIM010-fe-md-links/test/prueba/1.md https://github.com/karenLee57/karenLee57.github.io-hangman FAIL 404 Repositorio/home/laboratoria/LIM010-fe-md-links/test/prueba/1.md https://www.facebooks.com/ FAIL ERROR Facebook/home/laboratoria/LIM010-fe-md-links/test/prueba/sub carpeta/2.md https://www.lucidchart.com/documents/edit/e4a7533c-2a38-4c2a-9bb8-cbb7777b88bf/0_0?beaconFlowId=2523CA70E6CB8EBE// OK 200 Diagrama de flujo/home/laboratoria/LIM010-fe-md-links/test/prueba/sub carpeta/2.md https://github.com/SarAbigail/LIM010-fe-md-links/tree/master/test OK 200 GH/home/laboratoria/LIM010-fe-md-links/test/prueba/sub carpeta/2.md https://www.youtube.com/ OK 200 Youtube/home/laboratoria/LIM010-fe-md-links/test/prueba/sub carpeta/2.md https://www.google.com/ OK 200 Google/home/laboratoria/LIM010-fe-md-links/test/prueba/sub carpeta/2.md https://www.facebook.com/ OK 200 Fb';

const outputMdLinksCliStatsValidate = 'Total: 8 \nUnique: 8 \nBroken: 2';

export const io = {
  path,
  arrObj,
  outputStats,
  inputStatsValidate,
  outputStatsValidate,
  outputDefault,
  outputMdLinks,
  outputMdLinksValidate,
  outputMdLinksCliDefault,
  outputMdLinksCliStats,
  outputMdLinksCliValidate,
  outputMdLinksCliStatsValidate,
};
