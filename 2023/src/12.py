from functools import cache

from util.input import get_input_array


@cache
def find_arrangements(row, springs, result=0):
    if not springs:
        return "#" not in row

    cur, rest = springs[0], springs[1:]
    for n in range(len(row) - sum(rest) - len(rest) - cur + 1):
        if "#" in row[:n]:
            break

        if (p := n + cur) <= len(row) and "." not in row[n:p] and row[p : p + 1] != "#":
            result += find_arrangements(row[p + 1 :], rest)

    return result


def part2(data: list[str]) -> int:
    rows = [line.split() for line in data]
    result = 0

    for r in rows:
        row = r[0]
        springs = tuple(map(int, r[1].split(",")))
        result += find_arrangements(row, springs)

    return result


def part1(data: list[str]) -> int:
    rows = [line.split() for line in data]
    result = 0

    for r in rows:
        row = r[0]
        springs = tuple(map(int, r[1].split(",")))
        result += find_arrangements("?".join([row] * 5), springs * 5)

    return result


data = get_input_array()

print("P1:", part1(data))
print("P2:", part2(data))
