from aoc.puzzles.day17 import run
from aoc.util import get_input_array


def test_p1_sample() -> None:
    data = get_input_array("17-test.txt")
    result = run(data)
    assert result == 102


def test_p1() -> None:
    data = get_input_array("17.txt")
    print("DAY 17, PUZZLE 1 ANSWER:", run(data))


def test_p2_sample() -> None:
    data = get_input_array("17-test.txt")
    result = run(data, True)
    assert result == 94


def test_p2() -> None:
    data = get_input_array("17.txt")
    print("DAY 17, PUZZLE 1 ANSWER:", run(data, True))
