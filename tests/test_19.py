from aoc.puzzles.day19 import p1, p2
from aoc.util import get_split_input


def get_data(filename):
    return [line.strip().split("\n") for line in get_split_input(filename, "\n\n")]


def test_p1_sample() -> None:
    data = get_data("19-test.txt")
    result = p1(data)
    assert result == 19114


def test_p1() -> None:
    data = get_data("19.txt")
    print("DAY 19, PUZZLE 1 ANSWER:", p1(data))


def test_p2_sample() -> None:
    data = get_data("19-test.txt")
    result = p2(data)
    assert result == 167409079868000


def test_p2() -> None:
    data = get_data("19.txt")
    print("DAY 19, PUZZLE 2 ANSWER:", p2(data))
