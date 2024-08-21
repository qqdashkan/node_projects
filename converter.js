export function converter(bites) {
  const sizeKB = bites / 1024;
  const sizeMB = sizeKB / 1024;
  const sizeGB = sizeMB / 1024;
  let res = null;

  if (sizeKB <= 1024) {
    res = sizeKB.toFixed(2) + ' KB';
  } else if (sizeKB >= 1024 && sizeMB <= 1024) {
    res = sizeMB.toFixed(2) + ' MB';
  } else {
    res = sizeGB.toFixed(2) + ' GB';
  }
  return res;
}
