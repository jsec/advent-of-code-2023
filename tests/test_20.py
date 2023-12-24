from aoc.puzzles.day20 import run
from aoc.util import get_input_array


def test_p1_sample() -> None:
    data = get_input_array("20-test.txt")
    result = run(data)
    assert result == 32000000


def test_p1() -> None:
    data = get_input_array("20.txt")
    print("DAY 20, PUZZLE 1 ANSWER:", run(data))


def test_p2() -> None:
    data = get_input_array("20.txt")
    print("DAY 20, PUZZLE 2 ANSWER:", run(data, p2=True))
