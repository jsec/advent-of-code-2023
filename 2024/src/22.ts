import { getInputLines } from './utils/input.js';

const MODULUS = 16_777_216n;

const nextSecret = (secret: bigint) => {
  secret = ((secret << 6n) ^ secret) % MODULUS;
  secret = ((secret >> 5n) ^ secret) % MODULUS;
  secret = ((secret << 11n) ^ secret) % MODULUS;

  return secret;
};

const iterate = (value: bigint) => {
  let secret = value;

  for (let i = 0; i < 2000; i++) {
    secret = nextSecret(secret);
  }

  return secret;
};

const p2 = (input: bigint[]) => {
  const sequenceMap = new Map<string, number>();

  for (const num of input) {
    let secret = num;
    const seen = new Set<string>();
    const window = [];

    for (let i = 0; i < 2000; i++) {
      const last = Number(secret) % 10;
      secret = nextSecret(secret);
      const next = Number(secret) % 10;
      window.push(next - last);

      if (window.length > 4) {
        window.shift();
      }

      if (window.length === 4) {
        const hash = window.join(',');

        if (!seen.has(hash)) {
          seen.add(hash);

          if (sequenceMap.has(hash)) {
            sequenceMap.set(hash, sequenceMap.get(hash)! + next);
          } else {
            sequenceMap.set(hash, next);
          }
        }
      }
    }
  }

  return Math.max(...sequenceMap.values());
};

const input = getInputLines().map(BigInt);

console.log('P1:', input.reduce((sum, current) => sum + iterate(current), 0n));
console.log('P2:', p2(input));
