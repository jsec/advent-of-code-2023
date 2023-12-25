from aoc.puzzles.day24 import p1
from aoc.util import get_input_array


def test_p1_sample():
    data = get_input_array("24-test.txt")
    result = p1(data, 7, 27)
    assert result == 2


def test_p1():
    data = get_input_array("24.txt")
    print("DAY 24, PUZZLE 1 ANSWER:", p1(data, 200000000000000, 400000000000000))
