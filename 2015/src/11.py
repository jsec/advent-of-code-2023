import re

from util.input import get_input
from util.list import sliding_window

chars = list("abcdefghijklmnopqrstuvwxyz")
increasing_chars = list(map(lambda x: "".join(x), sliding_window(chars, 3)))
repeating_chars = [x * 2 for x in chars]


def get_next_char(password, idx):
    char = password[idx]

    if char == "z":
        password[idx - 1] = get_next_char(password, idx - 1)
        return "a"

    return chars[chars.index(char) + 1]


def reset_values(password, idx):
    for i in range(idx + 1, len(password)):
        password[i] = "a"


def run(password_str) -> str:
    password = list(password_str)
    idx = len(password) - 1
    valid, _ = verify(password_str)

    while valid is False:
        char = get_next_char(password, idx)

        if char == "i":
            char = "j"
            reset_values(password, idx)

        if char == "l":
            char = "m"
            reset_values(password, idx)

        if char == "o":
            char = "p"
            reset_values(password, idx)

        password[idx] = char

        valid, _ = verify("".join(password))

    return "".join(password)


def verify(password) -> tuple[bool, str]:
    if any(c in password for c in ["i", "l", "o"]):
        return False, "Invalid characters"

    if len(re.findall(r"(.)\1", password)) < 2:
        return False, "Not enough repeating characters"

    if not any(inc in password for inc in increasing_chars):
        return False, "No increasing character string"

    return True, "Valid"


p1 = run(get_input())

print("P1:", p1)
print("P2:", run("vzbxxzaa"))
