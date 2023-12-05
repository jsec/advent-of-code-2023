import math
import re
from collections import deque


class CardGame:
    def __init__(self, data: str):
        self.winning_cards = []
        self.player_cards = []
        self.init_game(data)

    def init_game(self, data: str):
        card_list = [x.strip() for x in data.split(":")[1].strip().split("|")]
        self.winning_cards = self.sanitize_card_list(card_list[0])
        self.player_cards = self.sanitize_card_list(card_list[1])

    def sanitize_card_list(self, cards: str) -> list[int]:
        sanitized = re.sub(" +", " ", cards).split(" ")
        return [int(x) for x in sanitized]

    def point_total(self) -> int:
        return int(math.pow(2, self.matched_card_count() - 1))

    def cards_won(self, idx: int) -> list[int]:
        count = self.matched_card_count()
        return [idx + i for i in range(1, count + 1)]

    def matched_card_count(self) -> int:
        return len(list(filter(lambda x: x in self.winning_cards, self.player_cards)))


def puzzle1(data: list[str]) -> int:
    point_totals = [CardGame(line).point_total() for line in data]
    return sum(point_totals)


def puzzle2(data: list[str]) -> int:
    games = [CardGame(line) for line in data]

    result = 0
    cards = {}

    for idx, game in enumerate(games):
        cards[idx] = game

    q = deque(cards.keys())

    while q:
        result += 1
        card_id = q.popleft()
        q.extend(cards[card_id].cards_won(card_id))

    return result
