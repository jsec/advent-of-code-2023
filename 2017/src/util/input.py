def get_input() -> str:
    with open("input.txt") as file:
        return file.read()


def get_input_lines() -> list[str]:
    with open("input.txt") as file:
        return [line.strip() for line in file.readlines()]
