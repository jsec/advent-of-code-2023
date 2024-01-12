import itertools

from util.input import get_input_lines


def is_valid(phrase: list[str], p2=False) -> bool:
    if not p2:
        return len(phrase) == len(list(dict.fromkeys(phrase)))

    return not any(sorted(pair[0]) == sorted(pair[1]) for pair in itertools.combinations(phrase, 2))


def count(lst, fn) -> int:
    return len(list(filter(fn, lst)))


data = [line.split(" ") for line in get_input_lines()]

p1 = lambda phrase: is_valid(phrase)
p2 = lambda phrase: is_valid(phrase, p2=True)


print("P1:", count(data, p1))
print("P2:", count(data, p2))
