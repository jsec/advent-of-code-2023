from aoc.puzzles.day16 import p1, p2
from aoc.util import get_input_matrix


def test_puzzle1_sample():
    data = get_input_matrix("16-test.txt")
    result = p1(data)
    assert result == 46


def test_puzzle1():
    data = get_input_matrix("16.txt")
    print("DAY 16, PUZZLE 1 ANSWER:", p1(data))


def test_puzzle2_sample():
    data = get_input_matrix("16-test.txt")
    result = p2(data)
    assert result == 51


def test_puzzle2():
    data = get_input_matrix("16.txt")
    print("DAY 16, PUZZLE 2 ANSWER:", p2(data))
