from aoc.puzzles.day15 import part1, part2
from aoc.util import get_input_array


def test_part1_sample():
    data = "rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7"
    assert part1(data) == 1320


def test_part1():
    data = get_input_array("15.txt")
    print("DAY 15, PUZZLE 1 ANSWER:", part1(data[0]))


def test_part_2_sample():
    data = "rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7"
    assert part2(data) == 145


def test_part2():
    data = get_input_array("15.txt")
    print("DAY 15, PUZZLE 2 ANSWER:", part2(data[0]))
