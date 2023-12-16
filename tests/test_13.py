from aoc.puzzles.day13 import run
from aoc.util import get_raw_input


def test_puzzle1_sample():
    data = [pattern.split("\n") for pattern in get_raw_input("13.txt").split("\n\n")]
    result = run(data)
    assert result == 405
