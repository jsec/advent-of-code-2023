from aoc.puzzles.day10 import p1, p2
from aoc.util import get_input_matrix


def test_puzzle1_sample() -> None:
    data = get_input_matrix("10-test.txt")
    result = p1(data)
    assert result == 8


def test_puzzle1():
    data = get_input_matrix("10.txt")
    print("DAY 10, PUZZLE 1 ANSWER:", p1(data))


def test_puzzle2_sample() -> None:
    data = get_input_matrix("10-test-p2.txt")
    result = p2(data)
    assert result == 4


def test_p2_test1() -> None:
    data = get_input_matrix("10-test-p2-1.txt")
    result = p2(data)
    assert result == 8


def test_p2_test2() -> None:
    data = get_input_matrix("10-test-p2-2.txt")
    result = p2(data)
    assert result == 10


def test_puzzle2() -> None:
    data = get_input_matrix("10.txt")
    print("DAY 10, PUZZLE 2 ANSWER:", p2(data))
