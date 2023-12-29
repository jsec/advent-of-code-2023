from aoc.puzzles.day21 import p1, p2
from aoc.util import get_input_array


def test_p1_sample() -> None:
    data = get_input_array("21-test.txt")
    result = p1(data, 6)
    assert result == 16


def test_solution() -> None:
    data = get_input_array("21.txt")
    print("DAY 21, PUZZLE 1 ANSWER:", p1(data, 64))
    print("DAY 21, PUZZLE 2 ANSWER:", p2(data, 26501365))
