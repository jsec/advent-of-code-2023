from aoc.puzzles.day7 import puzzle1, puzzle2
from aoc.util import get_input_array


def test_puzzle1_sample_data():
    data = get_input_array("day7-sample.txt")
    result = puzzle1(data)
    assert result == 6440


def test_puzzle1():
    data = get_input_array("day7.txt")
    print("DAY 7, PUZZLE 1 ANSWER:", puzzle1(data))
