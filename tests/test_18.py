from aoc.puzzles.day18 import p1, p2
from aoc.util import get_input_array


def test_p1_sample() -> None:
    data = get_input_array("18-test.txt")
    result = p1(data)
    assert result == 62


def test_p2_sample() -> None:
    data = get_input_array("18-test.txt")
    result = p2(data)
    assert result == 952408144115


def test_solution() -> None:
    data = get_input_array("18.txt")
    print("DAY 18, PUZZLE 1 ANSWER:", p1(data))
    print("Day 18, PUZZLE 2 ANSWER:", p2(data))
