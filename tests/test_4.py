from aoc.puzzles.day4 import puzzle1, puzzle2
from aoc.util import get_input_array


def test_puzzle1_sample_data():
    data = get_input_array("day4-sample.txt")
    result = puzzle1(data)
    assert result == 13


def test_puzzle1():
    data = get_input_array("day4.txt")
    print("DAY 4, PUZZLE 1 ANSWER:", puzzle1(data))


def test_puzzle2_sample_data():
    data = get_input_array("day4-sample.txt")
    result = puzzle2(data)
    assert result == 30


def test_puzzle2():
    data = get_input_array("day4.txt")
    print("DAY 4, PUZZLE 2 ANSWER:", puzzle2(data))
