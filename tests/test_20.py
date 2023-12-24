from aoc.day20 import run
from aoc.util import get_input_array


def test_p1_sample() -> None:
    data = get_input_array("20-test.txt")
    result = run(data, 1000)
    assert result == 32000000


def test_p1() -> None:
    data = get_input_array("20.txt")
    print("DAY 20, PUZZLE 1 ANSWER:", run(data, 1000))
