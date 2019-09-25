#!/usr/bin/env node
"use strict";

var _main = require("./main.js");

const path = process.argv[2];
const op1 = process.argv[3];
const op2 = process.argv[4];
const {
  log,
  error
} = console;

const mdLinksC = () => {
  if (path === undefined) {
    error('\n--> No ha ingresado ninguna ruta\n');
  }

  if (op1 === undefined) {
    // Comportamiento por defecto ¿Va aquí?
    (0, _main.mdLinks)(path, {
      validate: false
    }).then(res => res.map(file => log(file.thePath, file.href, file.text.substr(0, 50)))).catch(err => error(err));
  }

  if (op1 === '--validate' && op2 === undefined) {
    (0, _main.mdLinks)(path, {
      validate: true
    }).then(res => res.map(file => log(file.thePath, file.href, file.statusText, file.status, file.text.substr(0, 50)))).catch(err => error(err));
  }

  if (op1 === '--stats' && op2 === undefined) {
    (0, _main.mdLinks)(path, {
      validate: false
    }) // ¿Qué pasa si validate es true? Nada.
    .then(res => {
      const a = (0, _main.stats)(res);
      return log('Total:', a.total, '\nUnique:', a.unique);
    }).catch(err => error(err));
  }

  if (op1 === '--stats' && op2 === '--validate') {
    (0, _main.mdLinks)(path, {
      validate: true
    }).then(res => {
      const a = (0, _main.statsValidate)(res);
      return log('Total:', a.total, '\nUnique:', a.unique, '\nBroken:', a.broken);
    }).catch(err => error(err));
  }

  if (op1 === '--validate' && op2 === '--stats') {
    log('\n******************** No es un comando válido ********************\n');
  }
};

mdLinksC();