from aoc.puzzles.day1 import puzzle_1
from aoc.util.input import get_input


def test_puzzle1_sample_data():
    data = ["1abc2", "pqr3stu8vwx", "a1b2c3d4e5f", "treb7uchet"]

    result = puzzle_1(data)
    assert result == 142


def test_puzzle1():
    data = get_input("day1.txt")
    print(puzzle_1(data))


if __name__ == "__main":
    pass
