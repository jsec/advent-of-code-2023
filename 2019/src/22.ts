import { range } from 'remeda';

import { getInputLines } from './util/input';

interface Technique {
  type: string,
  value: number,
}

const parse = (line: string): Technique => {
  if (line.includes('new')) {
    return {
      type: 'new',
      value: 0,
    };
  }

  const split = line.split(' ');

  if (line.includes('increment')) {
    return {
      type: 'increment',
      value: Number.parseInt(split[3]!),
    };
  }

  return {
    type: 'cut',
    value: Number.parseInt(split[1]!),
  };
};

const cut = (deck: number[], index: number): number[] => deck.slice(index).concat(deck.slice(0, index));

const increment = (deck: number[], step: number, cardCount: number): number[] => {
  const result = range(0, cardCount);

  for (let index = 0; index < deck.length; index++) {
    const index_ = (index * step) % deck.length;
    result[index_] = deck[index]!;
  }

  return result;
};

const shuffle = (techniques: Technique[], cardCount: number): number[] => {
  let deck = range(0, cardCount);

  for (const t of techniques) {
    switch (t.type) {
      case 'new': { {
        deck = deck.reverse();
        break;
      }
      }
      case 'cut': { {
        deck = cut(deck, t.value);
        break;
      }
      }
      case 'increment': { {
        deck = increment(deck, t.value, cardCount);
        break;
      }
      }
    }
  }

  return deck;
};

const techniques = getInputLines().map(parse);
const shuffled = shuffle(techniques, 10_007);

console.log('P1:', shuffled.indexOf(2019));
