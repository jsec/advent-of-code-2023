from aoc.puzzles.day13 import solve
from aoc.util import get_raw_input


def get_data(filename: str):
    return [pattern.strip().splitlines() for pattern in get_raw_input(filename).split("\n\n")]


sample_data = get_data("13-test.txt")
puzzle_data = get_data("13.txt")


def test_puzzle1_sample():
    result = solve(sample_data)
    assert result == 405


def test_puzzle1():
    print("DAY 13, PUZZLE 1 ANSWER:", solve(puzzle_data))


# def test_puzzle2():
#     print("DAY 14, PUZZLE 2 ANSWER:", solve(puzzle_data))
