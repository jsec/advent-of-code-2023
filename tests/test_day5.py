from aoc.puzzles.day5 import puzzle1, puzzle2
from aoc.util import get_split_input


def test_puzzle1_sample_data():
    data = get_split_input("day5-sample.txt", "\n\n")
    result = puzzle1(data)
    assert result == 35


def test_puzzle1():
    data = get_split_input("day5.txt", "\n\n")
    print("DAY 5, PUZZLE 1 ANSWER:", puzzle1(data))


def test_puzzle2_sample_data():
    data = get_split_input("day5-sample.txt", "\n\n")
    puzzle2(data)


def test_puzzle2():
    data = get_split_input("day5.txt", "\n\n")
    puzzle2(data)
