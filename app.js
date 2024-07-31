import fs from 'node:fs';

import { info } from './os-module.js';
let data = info();
const { arch, type, cpus, freemem, totalmem } = data;
const arr = [arch, type, cpus, freemem, totalmem];

arr.forEach((item) => {
  fs.appendFile('info.txt', item, (err) => {
    if (err) {
      console.error(err);
    }
    console.log('Файл был сохранен!');
  });
});
