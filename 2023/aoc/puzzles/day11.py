import itertools

Universe = list[list[str]]


def get_distance(first: tuple[int, int], second: tuple[int, int]) -> int:
    return abs(first[0] - second[0]) + abs(first[1] - second[1])


def find_empty_rows(universe: Universe) -> list[int]:
    rows = []

    for idx, line in enumerate(universe):
        if all(p == "." for p in line):
            rows.append(idx)

    return rows


def find_empty_columns(universe: Universe) -> list[int]:
    columns = []

    for n in range(len(universe[0])):
        col = [line[n] for line in universe]
        if all(p == "." for p in col):
            columns.append(n)

    return columns


def solve(universe: Universe, expansion_rate: int):
    rows = find_empty_rows(universe)
    columns = find_empty_columns(universe)

    galaxies = []
    for idx, line in enumerate(universe):
        for pidx, point in enumerate(line):
            if point == "#":
                galaxies.append((idx, pidx))

    expanded_galaxies = []
    for galaxy in galaxies:
        x, y = galaxy
        r = len(list(filter(lambda p: p < x, rows)))
        c = len(list(filter(lambda p: p < y, columns)))

        updated = (x + (r * expansion_rate), y + (c * expansion_rate))
        expanded_galaxies.append(updated)

    return sum([get_distance(x, y) for x, y in itertools.combinations(expanded_galaxies, 2)])


def puzzle1(universe: Universe) -> int:
    return solve(universe, 1)


def puzzle2(universe: Universe) -> int:
    return solve(universe, 999999)
