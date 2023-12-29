from collections import namedtuple

Point = namedtuple("Point", ["x", "y", "z"])


def parse_input(data: list[str]):
    bricks = []

    for line in data:
        start, end = line.split("~")
        x1, y1, z1 = map(int, start.split(","))
        x2, y2, z2 = map(int, end.split(","))
        bricks.append((x1, y1, z1, x2, y2, z2))

    return bricks


def make_it_rain(bricks):
    locs = set()
    moved = False
    for x1, y1, _, x2, y2, z2 in bricks:
        for x in range(x1, x2 + 1):
            for y in range(y1, y2 + 1):
                locs.add((x, y, z2))

    updated_bricks = []
    for brick in bricks:
        has_support = False
        x1, y1, z1, x2, y2, z2 = brick
        for x in range(x1, x2 + 1):
            for y in range(y1, y2 + 1):
                if z1 == 1 or (x, y, z1 - 1) in locs:
                    has_support = True
                    break
            if has_support:
                break
        if not has_support:
            moved = True
            updated_bricks.append((x1, y1, z1 - 1, x2, y2, z2 - 1))
        else:
            updated_bricks.append(brick)

    return moved, updated_bricks


def part1(bricks) -> int:
    safe_count = 0
    for idx in range(len(bricks)):
        bricks_copy = bricks.copy()
        del bricks_copy[idx]
        res, _ = make_it_rain(bricks_copy)
        if not res:
            safe_count += 1

    return safe_count


def part2(bricks) -> int:
    collateral_damage = 0
    for idx in range(len(bricks)):
        bricks_copy = bricks.copy()
        del bricks_copy[idx]
        origin = bricks_copy.copy()
        bricks_moved = True
        while bricks_moved:
            bricks_moved, bricks_copy = make_it_rain(bricks_copy)

        for x, y in zip(bricks_copy, origin):
            if x != y:
                collateral_damage += 1

    return collateral_damage


def run(data, p1=True) -> int:
    bricks = parse_input(data)
    bricks.sort(key=lambda b: min([b[2], b[5]]))

    bricks_moved = True

    while bricks_moved:
        bricks_moved, bricks = make_it_rain(bricks)

    if p1:
        return part1(bricks)

    return part2(bricks)
