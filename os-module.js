import os from 'node:os';
import { converter } from './converter.js';

export const info = () => {
  const getArch = os.arch();
  const arch = `Arch: ${getArch} \n`;

  const getType = os.type();
  const type = `Platform: ${getType} \n`;

  const getCpus = os.cpus();
  const lengthOfCpus = getCpus.length;
  const cpus = `Number of CPUs: ${lengthOfCpus} \n`;

  const freeMemoryInBytes = os.freemem();
  const freeMemInGB = converter(freeMemoryInBytes);
  const freemem = `Free Memory: ${freeMemInGB} \n`;

  const totalMemoryInBytes = os.totalmem();
  const totalMemInGB = converter(totalMemoryInBytes);
  const totalmem = `Total Memory: ${totalMemInGB} \n`;

  return {
    arch,
    type,
    cpus,
    freemem,
    totalmem,
  };
};
