from aoc.puzzles.day11 import puzzle1, puzzle2
from aoc.util import get_input_array


def test_puzzle1_sample() -> None:
    data = [list(line) for line in get_input_array("11-test.txt")]
    result = puzzle1(data)
    assert result == 374


def test_puzzle1() -> None:
    data = [list(line) for line in get_input_array("11.txt")]
    print("DAY 11, PUZZLE 1 ANSWER:", puzzle1(data))


def test_puzzle2() -> None:
    data = [list(line) for line in get_input_array("11.txt")]
    print("DAY 11, PUZZLE 2 ANSWER:", puzzle2(data))
