import { areEqualArrays, sortArray } from './utils/array.js';
import { getInputLines } from './utils/input.js';

const validateReport = (report: number[]) => {
  if (!areEqualArrays(report, sortArray(report)) && !areEqualArrays(report, sortArray(report, false))) {
    return false;
  }

  for (const [idx, value] of report.slice(0, -1).entries()) {
    const difference = Math.abs(value - report[idx + 1]!);

    if (difference < 1 || difference > 3) {
      return false;
    }
  }

  return true;
};

const reports = getInputLines()
  .map(line => line.split(' ').map(Number));

/// PART 1 ///
const p1 = reports
  .map(report => validateReport(report))
  .filter(Boolean)
  .length;

console.log('P1:', p1);

/// PART 2 ///
const p2 = reports
  .map((report) => {
    if (validateReport(report)) {
      return true;
    }

    for (let i = 0; i < report.length; i++) {
      const copy = [...report];
      copy.splice(i, 1);
      if (validateReport(copy)) {
        return true;
      }
    }

    return false;
  })
  .filter(Boolean)
  .length;

console.log('P2:', p2);
