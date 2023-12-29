from aoc.puzzles.day22 import run
from aoc.util import get_input_array


def test_p1_sample() -> None:
    data = get_input_array("22-test.txt")
    result = run(data)
    assert result == 5


def test_p1() -> None:
    data = get_input_array("22.txt")
    print("DAY 22, PUZZLE 1 ANSWER:", run(data))
