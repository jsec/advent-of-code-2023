from collections import namedtuple
from functools import reduce

from util.input import get_input_array
from util.string import string_to_list

Race = namedtuple("Race", ["time", "distance"])


def get_wins(race: Race) -> int:
    result = 0

    for duration in range(1, race.time):
        distance = (race.time - duration) * duration
        if distance > race.distance:
            result += 1

    return result


def parse_input(data: str) -> list[int]:
    return string_to_list(data.split(":")[1])


def part1(data: list[str]) -> int:
    times, distances = (parse_input(line) for line in data)
    races = [Race(time, distance) for time, distance in list(zip(times, distances))]
    result = reduce((lambda x, y: x * y), [get_wins(race) for race in races])
    return result


data = get_input_array()

print("P1:", part1(data))

p2 = get_wins(Race(51926890, 222203111261225))
print("P2:", p2)
