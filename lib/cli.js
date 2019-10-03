#!/usr/bin/env node
"use strict";

var _main = require("./main.js");

const {
  log,
  error
} = console;
const [,, path, opt1, opt2] = process.argv;
(0, _main.mdLinksCli)(path, opt1, opt2).then(res => log(res)).catch(err => error(err.message));