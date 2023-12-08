from aoc.puzzles.day8 import puzzle1, puzzle2
from aoc.util import get_input_array


def test_puzzle1_sample_data():
    data = get_input_array("day8-sample.txt")
    result = puzzle1(data)
    assert result == 6


def test_puzzle1():
    data = get_input_array("day8.txt")
    print("DAY 8, PUZZLE 1 ANSWER:", puzzle1(data))


def test_puzzle2_sample_data():
    data = get_input_array("day8-sample2.txt")
    result = puzzle2(data)
    assert result == 6


def test_puzzle2():
    data = get_input_array("day8.txt")
    print("DAY 8, PUZZLE 2 ANSWER:", puzzle2(data))
