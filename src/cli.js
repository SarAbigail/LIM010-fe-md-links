#!/usr/bin/env node

import { mdLinksCli } from './main.js';

const { log, error } = console;
const [, , path, opt1, opt2] = process.argv;

mdLinksCli(path, opt1, opt2).then(res => log(res)).catch(err => error(err));
