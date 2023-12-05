from aoc.puzzles.day1 import puzzle_1, puzzle_2
from aoc.util import get_input_array


def test_puzzle1_sample_data():
    data = ["1abc2", "pqr3stu8vwx", "a1b2c3d4e5f", "treb7uchet"]

    result = puzzle_1(data)
    assert result == 142


def test_puzzle1():
    data = get_input_array("day1.txt")
    print("DAY 1, PUZZLE 1 ANSWER:", puzzle_1(data))


def test_puzzle2_sample_data():
    data = [
        "two1nine",
        "eightwothree",
        "abcone2threexyz",
        "xtwone3four",
        "4nineeightseven2",
        "zoneight234",
        "7pqrstsixteen",
    ]

    result = puzzle_2(data)
    assert result == 281


def test_puzzle2():
    data = get_input_array("day1.txt")
    print("DAY 1, PUZZLE 2 ANSWER:", puzzle_2(data))
