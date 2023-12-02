from aoc.util.input import get_input


def get_digits(word: str) -> str:
    digits = list(filter(str.isdigit, word))
    return digits[0] + digits[-1]


def puzzle_1(data) -> int:
    nums = [int(get_digits(word)) for word in data]
    return sum(nums)
