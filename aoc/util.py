from pathlib import Path


def find_file(filename: str) -> Path:
    return Path().cwd() / "aoc" / "data" / filename


def get_input_array(filename: str) -> list[str]:
    with open(find_file(filename)) as file:
        return [line.rstrip() for line in file]
