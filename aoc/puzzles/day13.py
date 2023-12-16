import numpy as np

from aoc.util import get_raw_input

def find_reflections(pattern: list[str]) -> int:
    matrix = [list(line) for line in pattern]
    arr = np.array(matrix)
    # matrix = np.array([list(line) for line in pattern])
    print(arr)
    return 4


def run(data: list[list[str]]) -> int:
    for pattern in data:
        find_reflections(pattern)
    return 4


if __name__ == "__main__":
    data = [pattern.split("\n") for pattern in get_raw_input("13-test.txt").split("\n\n")]
    run(data)
