from collections import defaultdict, deque

from aoc.util import find_item_in_matrix

DIRECTIONS = [(-1, 0), (1, 0), (0, -1), (0, 1)]


def check_bounds(x: int, y: int, max_x: int, max_y: int) -> bool:
    return x >= 0 and x < max_x and y >= 0 and y < max_y


def walk(m: list[str], x: int, y: int, total_steps: int) -> int:
    max_x = len(m[0])
    max_y = len(m)

    plots = defaultdict(int)
    q: deque[tuple[int, int, int]] = deque([(x, y, 0)])

    while q:
        x, y, steps = q.popleft()
        steps += 1

        if steps > total_steps:
            continue

        for dx, dy in ((x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)):
            if (dx, dy) not in plots and m[dx % max_x][dy % max_y] != "#":
                plots[dx, dy] = steps
                q.append((dx, dy, steps))

    return sum(1 for p in plots.values() if p % 2 == total_steps % 2)


def p1(m: list[str], steps: int) -> int:
    x, y = find_item_in_matrix(m, "S")
    return walk(m, x, y, steps)


def p2(m: list[str], steps: int) -> int:
    max_steps = 26501365

    map_size = len(m)
    x, y = find_item_in_matrix(m, "S")

    # print()
    iters, rem = divmod(steps, map_size)
    # print("size:", s)
    # print("rem:", rem)
    a, b, c = (walk(m, x, y, map_size * i + rem) for i in range(0, 3))

    a1 = (a - 2 * b + c) // 2
    b1 = b - a - a1
    c1 = a

    # print("a:", a)
    # print("b:", b)
    # print("c:", c)
    # print("iters:", iters)

    return a1 * iters * iters + b1 * iters + c1
