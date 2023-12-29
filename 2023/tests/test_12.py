from aoc.puzzles.day12 import puzzle1, puzzle2
from aoc.util import get_input_array


def test_puzzle1_sample():
    data = get_input_array("12-test.txt")
    result = puzzle1(data)
    assert result == 21


def test_puzzle1():
    data = get_input_array("12.txt")
    print("DAY 12 PUZZLE 1 ANSWER:", puzzle1(data))


def test_puzzle2():
    data = get_input_array("12.txt")
    print("DAY 12 PUZZLE 2 ANSWER:", puzzle2(data))
