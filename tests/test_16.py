from aoc.puzzles.day16 import solve
from aoc.util import get_input_matrix


def test_puzzle1_sample():
    data = get_input_matrix("16-test.txt")
    result = solve(data)
    assert result == 46


def test_puzzle1():
    data = get_input_matrix("16.txt")
    print("DAY 16, PUZZLE 1 ANSWER:", solve(data))
