import { getInputLines } from './utils/input.js';

const MODULUS = 16_777_216n;

const calculate = (value: bigint) => {
  let secret = value;

  for (let i = 0; i < 2000; ++i) {
    secret = ((secret << 6n) ^ secret) % MODULUS;
    secret = ((secret >> 5n) ^ secret) % MODULUS;
    secret = ((secret << 11n) ^ secret) % MODULUS;
  }

  return secret;
};

const p1 = (input: bigint[]) => input.reduce((sum, current) => sum + calculate(current), 0n);

const input = getInputLines().map(BigInt);

console.log('P1:', Number(p1(input)));
