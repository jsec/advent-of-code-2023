import itertools
from typing import Counter

from util.input import get_input_array

card_list = ["A", "K", "Q", "J", "T", "9", "8", "7", "6", "5", "4", "3", "2"]
scores = [13, 12, 11, 0, 9, 8, 7, 6, 5, 4, 3, 2, 1]

card_score_map = dict(zip(card_list, scores))

# Card counts for winning hands
FiveOfAKind = [5]
FourOfAKind = [1, 4]
FullHouse = [2, 3]
ThreeOfAKind = [1, 1, 3]
TwoPair = [1, 2, 2]
OnePair = [1, 1, 1, 2]


class Hand:
    def __init__(self, cards: str, bid: int = 0, joker: bool = False) -> None:
        self.cards = list(cards)
        self.bid = int(bid)
        self.strength = self.analyze(self.cards, joker)
        self.card_strengths = [card_score_map[card] for card in self.cards]

    def analyze(self, cards: list[str], joker: bool) -> int:
        if not joker:
            return self.calculate_strength(cards)

        joker_hands = list(self.generate_joker_hands("".join(self.cards)))
        joker_hands.sort(key=lambda h: (h.strength, h.card_strengths))

        return joker_hands[-1].strength

    def generate_joker_hands(self, card_str: str):
        for p in map(iter, itertools.product("".join(card_list), repeat=card_str.count("J"))):
            yield Hand("".join(c if c != "J" else next(p) for c in card_str))

    def calculate_strength(self, cards: list[str]) -> int:
        counts = sorted(Counter(cards).values())
        if counts == FiveOfAKind:
            return 70
        elif counts == FourOfAKind:
            return 60
        elif counts == FullHouse:
            return 50
        elif counts == ThreeOfAKind:
            return 40
        elif counts == TwoPair:
            return 30
        elif counts == OnePair:
            return 20
        else:
            return 10


def part1(data: list[str]) -> int:
    hands = [Hand(line.split(" ")[0], int(line.split(" ")[1])) for line in data]
    hands.sort(key=lambda h: (h.strength, h.card_strengths))
    return sum([hand.bid * (idx + 1) for idx, hand in enumerate(hands)])


def part2(data: list[str]) -> int:
    hands = [Hand(line.split(" ")[0], int(line.split(" ")[1]), True) for line in data]
    hands.sort(key=lambda h: (h.strength, h.card_strengths))
    return sum([hand.bid * (idx + 1) for idx, hand in enumerate(hands)])


data = get_input_array()

print("P1:", part1(data))
print("P2:", part2(data))
