import re
from pathlib import Path

import numpy as np


def find_file(filename: str) -> Path:
    return Path().cwd() / "aoc" / "data" / filename


def get_input_array(filename: str) -> list[str]:
    with open(find_file(filename)) as file:
        return [line.strip() for line in file]


def get_input_matrix(filename: str) -> list[list[str]]:
    return [list(line) for line in get_input_array(filename)]


def get_split_input(filename: str, delimiter: str) -> list[str]:
    with open(find_file(filename)) as file:
        return file.read().split(delimiter)


def get_raw_input(filename: str) -> str:
    with open(find_file(filename)) as file:
        return file.read()


def remove_extra_spaces(text: str) -> str:
    return re.sub(" +", " ", text).strip()


def string_to_list(text: str) -> list[int]:
    return list(map(int, remove_extra_spaces(text).split(" ")))


def transpose(arr):
    return list(zip(*arr))[::-1]


def range_intersection(x, y):
    return range(max(x[0], y[0]), min(x[-1], y[-1]) + 1)


def find_item_in_matrix(matrix, value):
    for x, line in enumerate(matrix):
        for y, item in enumerate(line):
            if item == value:
                return (x, y)

    return (-1, -1)


def flatten(lists):
    for item in lists:
        try:
            yield from flatten(item)
        except TypeError:
            yield item


def shoelace_area(x, y):
    c = x[-1] * y[0] - y[-1] * x[0]
    a = np.dot(x[:-1], y[1:]) - np.dot(y[:-1], x[1:])
    return 0.5 * np.abs(a + c)


def polygon_area(x, y, path):
    s = len(path)
    a = shoelace_area(x, y)
    i = a + 1 - s // 2
    return i + s


def picks_theorem(area, path):
    return area + 1 - len(path) / 2
