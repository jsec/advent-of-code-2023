import re
from pathlib import Path


def find_file(filename: str) -> Path:
    return Path().cwd() / "aoc" / "data" / filename


def get_input_array(filename: str) -> list[str]:
    with open(find_file(filename)) as file:
        return [line.rstrip() for line in file]


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
