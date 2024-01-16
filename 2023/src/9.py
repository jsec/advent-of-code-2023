import itertools

from util.input import get_input_array
from util.string import string_to_list


def get_next(seq: list[int], rev: bool = False) -> int:
    p = 0
    while seq:
        if rev:
            p += seq[0]
            seq = [a - b for a, b in itertools.pairwise(seq)]
        else:
            p += seq[-1]
            seq = [b - a for a, b in itertools.pairwise(seq)]

    return p


data = get_input_array()
seq = [string_to_list(line) for line in data]

p1 = sum(get_next(s) for s in seq)
p2 = sum(get_next(s, True) for s in seq)

print("P1:", p1)
print("P2:", p2)
