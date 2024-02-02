import itertools

from util.input import get_input_lines


def has_consecutive(password: str) -> bool:
    pairs = itertools.pairwise(password)
    return any(map(lambda pair: pair[0] == pair[1], pairs))


def meets_vowel_count(password: str) -> bool:
    return sum([1 for char in password if char in "aeiou"]) >= 3


def no_disallowed_strings(password: str) -> bool:
    for d in ["ab", "cd", "pq", "xy"]:
        if d in password:
            return False

    return True


def is_valid(password: str) -> bool:
    return (
        has_consecutive(password)
        and meets_vowel_count(password)
        and no_disallowed_strings(password)
    )


passwords = get_input_lines()

p1 = list(filter(lambda p: is_valid(p), passwords))
print("P1:", len(p1))
