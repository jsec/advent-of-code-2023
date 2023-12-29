from aoc.puzzles.day3 import puzzle_1, puzzle_2
from aoc.util import get_input_array


def test_puzzle1_sample_data():
    data = get_input_array("day3-sample1.txt")
    result = puzzle_1(data)
    assert result == 4361


def test_puzzle1():
    data = get_input_array("day3.txt")
    print("DAY 3, PUZZLE 1 ANSWER:", puzzle_1(data))


def test_puzzle2_sample_data():
    data = get_input_array("day3-sample1.txt")
    result = puzzle_2(data)
    assert result == 467835


def test_puzzle2():
    data = get_input_array("day3.txt")
    print("DAY 3, PUZZLE 2 ANSWER:", puzzle_2(data))
