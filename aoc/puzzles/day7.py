from typing import Counter

cards = ["A", "K", "Q", "J", "T", "9", "8", "7", "6", "5", "4", "3", "2", "1"]
scores = [13, 12, 11, 0, 9, 8, 7, 6, 5, 4, 3, 2, 1]

card_score_map = dict(zip(cards, scores))

# Card counts for winning hands
FiveOfAKind = [5]
FourOfAKind = [1, 4]
FullHouse = [2, 3]
ThreeOfAKind = [1, 1, 3]
TwoPair = [1, 2, 2]
OnePair = [1, 1, 1, 2]


class Hand:
    def __init__(self, data: str) -> None:
        cards, bid = data.split()
        self.cards = list(cards)
        self.bid = int(bid)
        self.counts = sorted(Counter(self.cards).values())
        self.strength = self.get_strength(self.cards)
        self.card_strengths = [card_score_map[card] for card in self.cards]

    def get_strength(self, cards: list[str]) -> int:
        if self.counts == FiveOfAKind:
            return 70
        elif self.counts == FourOfAKind:
            return 60
        elif self.counts == FullHouse:
            return 50
        elif self.counts == ThreeOfAKind:
            return 40
        elif self.counts == TwoPair:
            return 30
        elif self.counts == OnePair:
            return 20
        else:
            return 10


def puzzle1(data: list[str]) -> int:
    hands = [Hand(line) for line in data]
    hands.sort(key=lambda h: (h.strength, h.card_strengths))
    return sum([hand.bid * (idx + 1) for idx, hand in enumerate(hands)])


def puzzle2(data: list[str]) -> int:
    return 4
