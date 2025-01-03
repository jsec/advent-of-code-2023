from itertools import combinations
from math import prod

from utils.input import get_input_lines


def solve(input: list[int], count: int) -> int:
    for items in combinations(input, count):
        if sum(items) == 2020:
            return prod(items)

    return -1


input = [int(line) for line in get_input_lines()]

print("P1:", solve(input, 2))
print("P2:", solve(input, 3))
