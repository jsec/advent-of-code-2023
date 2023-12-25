import sys

DIRECTIONS = [(0, 1), (0, -1), (1, 0), (-1, 0)]
slope_map = {"^": (-1, 0), "v": (1, 0), "<": (0, -1), ">": (0, 1)}


def find_neighbors(grid, paths, point, visited):
    x, y = point
    char = grid[x][y]

    if char in "<^v>":
        dx, dy = slope_map[char]
        return [(x + dx, y + dy)]

    neighbors = []
    for dx, dy in DIRECTIONS:
        nx = x + dx
        ny = y + dy

        if (nx, ny) not in paths:
            continue

        if (nx, ny) in visited:
            continue

        if (nx, ny) not in paths or (nx, ny) in visited:
            continue

        char = grid[nx][ny]

        if char in "<^v>":
            sx, sy = slope_map[char]
            if nx + sx == x and ny + sy == y:
                continue

        neighbors.append((nx, ny))

    return neighbors


def walk(grid, paths, point, current_path, visited) -> int:
    visited.add(point)
    current_path.append(point)

    neighbors = find_neighbors(grid, paths, point, visited)

    if not neighbors:
        return len(current_path) - 1

    return max([walk(grid, paths, n, current_path.copy(), visited.copy()) for n in neighbors])


def print_grid(grid, path):
    my = len(grid[0])
    mx = len(grid)

    print()
    print("grid:")

    for x in range(mx):
        line = ""
        for y in range(my):
            if (x, y) in path:
                line += "0"
            else:
                line += grid[x][y]

        print(line)


def run(grid):
    sys.setrecursionlimit(100000)
    start = (0, grid[0].index("."))

    my = len(grid[0])
    mx = len(grid)

    paths = []
    for x in range(mx):
        for y in range(my):
            if grid[x][y] != "#":
                paths.append((x, y))

    return walk(grid, paths, start, [], set())
