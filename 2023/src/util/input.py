def get_input_array() -> list[str]:
    with open("input.txt") as file:
        return [line.strip() for line in file]


def get_input_matrix() -> list[list[str]]:
    return [list(line) for line in get_input_array()]


def get_split_input(delimiter: str) -> list[str]:
    with open("input.txt") as file:
        return file.read().split(delimiter)


def get_raw_input() -> str:
    with open("input.txt") as file:
        return file.read()
