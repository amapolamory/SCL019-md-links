

import { mdLinks } from './index.js';

import Yargs from "yargs";

const path = process.argv[2];
const option = Yargs(process.argv.slice(2)).argv;

mdLinks(path, option).then((results) => console.table(results));