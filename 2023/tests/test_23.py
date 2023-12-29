from aoc.puzzles.day23 import run
from aoc.util import get_input_array


def test_p1_sample() -> None:
    data = get_input_array("23-test.txt")
    result = run(data)
    assert result == 94


def test_p1() -> None:
    data = get_input_array("23.txt")
    print("DAY 23, PUZZLE 1 ANSWER:", run(data))


def test_p2_sample() -> None:
    data = get_input_array("23-test.txt")
    result = run(data, p1=False)
    assert result == 154


def test_p2() -> None:
    data = get_input_array("23.txt")
    print("DAY 23, PUZZLE 2 ANSWER:", run(data, p1=False))
