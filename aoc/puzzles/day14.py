import numpy as np


def parse_input(data: str):
    beams = [line.strip() for line in data.splitlines()]
    return roll(beams)


def roll(beams: list[str]):
    arr = np.rot90([list(beam) for beam in beams])
    return ["".join(beam) for beam in arr]


def p1(data: str):
    beams = parse_input(data)
    return sum([get_load(tilt(beam)) for beam in beams])


def tilt(beam: str):
    while beam.find(".O") >= 0:
        beam = beam.replace(".O", "O.")

    return beam


def get_load(beam: str) -> int:
    result = 0
    for idx, char in enumerate(beam):
        if char == "O":
            result += len(beam) - idx
    return result
