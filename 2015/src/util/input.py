def get_input() -> str:
    with open("input.txt") as file:
        return file.read()


def get_input_lines() -> list[str]:
    with open("input.txt") as file:
        return [line.strip() for line in file.readlines()]


def get_split_input(delimiter: str) -> list[str]:
    with open("input.txt") as file:
        return file.read().split(delimiter)
