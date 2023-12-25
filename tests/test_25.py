from aoc.puzzles.day25 import run
from aoc.util import get_input_array


def test_p1_sample():
    data = get_input_array("25-test.txt")
    result = run(data)
    assert result == 54


def test_p1():
    data = get_input_array("25.txt")
    print("DAY 25, PUZZLE 1 ANSWER:", run(data))
