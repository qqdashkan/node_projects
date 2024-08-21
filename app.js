import fs from 'node:fs';

import { info } from './os-module.js';
let data = info();
const { arch, type, cpus, freemem, totalmem } = data;
const item = `${arch} ${type} ${cpus} ${freemem} ${totalmem}`;

fs.writeFile('info.txt', item, (err) => {
  if (err) {
    console.error(err);
  }
  console.log('Файл был сохранен!');
});
