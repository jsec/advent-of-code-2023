from aoc.puzzles.day6 import Race, puzzle1, puzzle2
from aoc.util import get_input_array


def test_puzzle1_sample_data():
    data = get_input_array("day6-sample.txt")
    result = puzzle1(data)
    assert result == 288


def test_puzzle1():
    data = get_input_array("day6.txt")
    print("DAY 6, PUZZLE 1 ANSWER:", puzzle1(data))


def test_puzzle2_sample_data():
    data = Race(71530, 940200)
    result = puzzle2(data)
    assert result == 71503


def test_puzzle2():
    data = Race(51926890, 222203111261225)
    print("DAY 6, PUZZLE 2 ANSWER:", puzzle2(data))
