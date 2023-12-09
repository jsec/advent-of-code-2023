from aoc.puzzles.day9 import puzzle1
from aoc.util import get_input_array


def test_puzzle1_sample_data():
    data = get_input_array("day9-sample.txt")
    result = puzzle1(data)
    assert result == 114


def test_puzzle1():
    data = get_input_array("day9.txt")
    print("DAY 9, PUZZLE 1 ANSWER:", puzzle1(data))
