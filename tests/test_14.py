from aoc.puzzles.day14 import p1
from aoc.util import get_raw_input


def test_puzzle1_sample():
    data = get_raw_input("14-test.txt")
    result = p1(data)
    assert result == 136


def test_puzzle1():
    print("DAY 14, PUZZLE 1 ANSWER:", p1(get_raw_input("14.txt")))
