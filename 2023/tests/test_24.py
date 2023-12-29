from aoc.puzzles.day24 import p1, p2
from aoc.util import get_input_array


def test_p1_sample():
    data = get_input_array("24-test.txt")
    result = p1(data, 7, 27)
    assert result == 2


def test_p1():
    data = get_input_array("24.txt")
    print("DAY 24, PUZZLE 1 ANSWER:", p1(data, 200000000000000, 400000000000000))


def test_p2_sample():
    data = get_input_array("24-test.txt")
    result = p2(data)
    assert result == 47


def test_p2():
    data = get_input_array("24.txt")
    print("DAY 24, PUZZLE 2 ANSWER:", p2(data))
