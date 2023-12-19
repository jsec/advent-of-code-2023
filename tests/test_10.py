from aoc.puzzles.day10 import p1
from aoc.util import get_input_matrix


def test_puzzle1_sample() -> None:
    data = get_input_matrix("10-test.txt")
    result = p1(data)
    assert result == 8


def test_puzzle1():
    data = get_input_matrix("10.txt")
    print("DAY 10, PUZZLE 1 ANSWER:", p1(data))
