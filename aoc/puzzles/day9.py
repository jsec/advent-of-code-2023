import itertools

from aoc.util import string_to_list


def get_next(seq: list[int], rev: bool = False) -> int:
    p = 0
    while seq:
        p += seq[-1]
        seq = [b - a for a, b in itertools.pairwise(seq)]

    return p


def puzzle1(data: list[str]) -> int:
    seq = [string_to_list(line) for line in data]
    return sum(get_next(s) for s in seq)
