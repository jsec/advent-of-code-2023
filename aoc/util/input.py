from pathlib import Path


def get_input(filename: str) -> list[str]:
    file_path = Path().cwd() / "aoc" / "data" / filename
    with open(file_path) as file:
        return [line.rstrip() for line in file]
