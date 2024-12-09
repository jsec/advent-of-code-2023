import { getInput } from './utils/input.js';

/// PART 1 ///
const p1 = (input: string) => {
  let fileId = 0;

  const disk = [...input].flatMap((value, idx) => {
    if (idx % 2 === 0) {
      const file = Array.from({ length: Number(value) }).map(() => fileId.toString());
      fileId++;
      return file;
    }

    return Array.from({ length: Number(value) }).map(() => '.');
  });

  for (let i = disk.length - 1; i >= 0; i--) {
    if (disk[i] !== '.') {
      const swapIdx = disk.slice(0, i).indexOf('.');
      if (swapIdx === -1) {
        break;
      }

      disk[swapIdx] = disk[i]!;
      disk[i] = '.';
    }
  }

  return disk
    .filter(value => value !== '.')
    .map((value, idx) => Number(value) * idx)
    .reduce((a, c) => a + c, 0);
};

/// PART 2 ///
const p2 = (input: string) => {
  const disk = [...input].map(Number);

  const blocks = [];
  const files = [];
  let id = 0;
  let result = 0;

  for (const [idx, item] of disk.entries()) {
    const len = +item;

    if (idx % 2 === 0) {
      files.push({ id, length: len, start: blocks.length });

      for (let j = 0; j < len; j++) {
        blocks.push(`${id}`);
      }

      id++;
    } else {
      for (let j = 0; j < len; j++) {
        blocks.push('.');
      }
    }
  }

  files.sort((a, b) => b.id - a.id);

  for (const file of files) {
    const { id, length, start } = file;
    let blockStart = -1;
    let contiguous = 0;

    for (let i = 0; i < start; i++) {
      if (blocks[i] === '.') {
        if (blockStart < 0)
          blockStart = i;

        contiguous++;

        if (contiguous === length) {
          for (let k = 0; k < length; k++)
            blocks[start + k] = '.';

          for (let k = 0; k < length; k++)
            blocks[blockStart + k] = `${id}`;

          break;
        }
      } else {
        blockStart = -1;
        contiguous = 0;
      }
    }
  }

  for (const [idx, item] of blocks.entries()) {
    if (item !== '.')
      result += idx * +item;
  }

  return result;
};

const input = getInput();
console.log('P1:', p1(input));
console.log('P2:', p2(input));
