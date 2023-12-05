import math
import re


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
        matched_cards = len(list(filter(lambda x: x in self.winning_cards, self.player_cards)))
        return int(math.pow(2, matched_cards - 1))


def puzzle1(data: list[str]) -> int:
    point_totals = [CardGame(line).point_total() for line in data]
    return sum(point_totals)


def puzzle2(data: list[str]) -> int:
    return 4
