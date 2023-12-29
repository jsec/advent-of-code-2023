import numpy as np


def p1(data: str):
    beams = parse_input(data)
    return sum([load(tilt(beam)) for beam in beams])


def p2(data: str, cycles: int):
    beams = cycle(parse_input(data), cycles)
    return sum([load(beam) for beam in beams])


def parse_input(data: str):
    beams = [line.strip() for line in data.splitlines()]
    return roll(beams)


def cycle(beams: list[str], target: int):
    count = 0
    cache = {}
    cache_hit = False

    while count < target:
        for i in [0, 3, 3, 3]:  # counter-clockwise rotations for N, W, S, E
            beams = [tilt(beam) for beam in roll(beams, i)]

        # get back to north-orientation
        beams = roll(beams, 3)

        count += 1
        key = "".join(beams)

        if not cache_hit and (cache_hit := key in cache):
            cycle_length = count - cache[key]
            count += cycle_length * ((target - count) // cycle_length)
        else:
            cache[key] = count

    return beams


def roll(beams: list[str], n: int = 1) -> list[str]:
    arr = np.rot90([list(beam) for beam in beams], n)
    return ["".join(beam) for beam in arr]


def tilt(beam: str):
    return "#".join("".join(sorted(p, reverse=True)) for p in beam.split("#"))


def load(beam: str) -> int:
    result = 0
    for idx, char in enumerate(beam):
        if char == "O":
            result += len(beam) - idx
    return result
