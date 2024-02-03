import itertools

from util.input import get_input_lines


def has_consecutive(password: str) -> bool:
    pairs = itertools.pairwise(password)
    return any(map(lambda pair: pair[0] == pair[1], pairs))


def has_pair(password: str) -> bool:
    pairs = itertools.pairwise(password)
    return any(map(lambda pair: password.count("".join(pair)) > 1, pairs))


def meets_vowel_count(password: str) -> bool:
    return sum([1 for char in password if char in "aeiou"]) >= 3


def no_disallowed_strings(password: str) -> bool:
    for d in ["ab", "cd", "pq", "xy"]:
        if d in password:
            return False

    return True


def has_mirror(password: str) -> bool:
    for i in range(len(password) - 2):
        substr = password[i : i + 3]
        if substr[0] == substr[2]:
            return True

    return False


def is_valid(password: str, p2=False) -> bool:
    if p2:
        return has_mirror(password) and has_pair(password)

    return (
        has_consecutive(password)
        and meets_vowel_count(password)
        and no_disallowed_strings(password)
    )


passwords = get_input_lines()

p1 = list(filter(lambda p: is_valid(p), passwords))
p2 = list(filter(lambda p: is_valid(p, True), passwords))


print("P1:", len(p1))
print("P2:", len(p2))
