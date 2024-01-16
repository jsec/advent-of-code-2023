import sys

from util.input import get_input_array

DIRECTIONS = [(0, 1), (0, -1), (1, 0), (-1, 0)]
slope_map = {"^": (-1, 0), "v": (1, 0), "<": (0, -1), ">": (0, 1)}


def find_neighbors(grid, paths, point, visited, p1):
    x, y = point
    char = grid[x][y]

    if p1 and char in "<^v>":
        dx, dy = slope_map[char]
        return [(x + dx, y + dy)]

    neighbors = []
    for dx, dy in DIRECTIONS:
        nx = x + dx
        ny = y + dy

        if (nx, ny) not in paths or (nx, ny) in visited:
            continue

        if p1:
            char = grid[nx][ny]

            if char in "<^v>":
                sx, sy = slope_map[char]
                if nx + sx == x and ny + sy == y:
                    continue

        neighbors.append((nx, ny))

    return neighbors


def walk(grid, paths, point, end, current_path, visited, p1) -> int:
    visited.add(point)
    current_path.append(point)

    if point == end:
        return len(current_path) - 1

    neighbors = find_neighbors(grid, paths, point, visited, p1)

    if not neighbors:
        return 0

    return max([walk(grid, paths, n, end, current_path.copy(), visited.copy(), p1) for n in neighbors])


def run(grid, p1: bool = True) -> int:
    sys.setrecursionlimit(100000)
    start = (0, grid[0].index("."))
    end = (len(grid) - 1, grid[-1].index("."))

    my = len(grid[0])
    mx = len(grid)

    paths = []
    for x in range(mx):
        for y in range(my):
            if grid[x][y] != "#":
                paths.append((x, y))

    return walk(grid, paths, start, end, [], set(), p1)


data = get_input_array()

print("P1:", run(data))
print("P2:", run(data, p1=False))
