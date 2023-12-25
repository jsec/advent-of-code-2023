from aoc.puzzles.day23 import run
from aoc.util import get_input_array


def test_p1_sample() -> None:
    data = get_input_array("23-test.txt")
    result = run(data)
    assert result == 94


def test_p1() -> None:
    data = get_input_array("23.txt")
    print("DAY 23, PUZZLE 1 ANSWER:", run(data))
