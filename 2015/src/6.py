import numpy as np

from util.input import get_input_lines


def run(steps: list[str], p2=False):
    grid = np.full((1000, 1000), 0)

    for step in steps:
        pos1 = 1
        pos2 = 3

        split = step.split(" ")
        if "toggle" not in split:
            pos1 += 1
            pos2 += 1

        x1, y1 = [int(x) for x in split[pos1].split(",")]
        x2, y2 = [int(x) for x in split[pos2].split(",")]

        for x in range(x1, x2 + 1):
            for y in range(y1, y2 + 1):
                if p2:
                    if "toggle" in split:
                        grid[x][y] += 2
                    elif "on" in split:
                        grid[x][y] += 1
                    else:
                        grid[x][y] = grid[x][y] - 1 if grid[x][y] > 0 else 0
                else:
                    if "toggle" in split:
                        grid[x][y] = 1 if grid[x][y] == 0 else 0
                    elif "on" in split:
                        grid[x][y] = 1
                    else:
                        grid[x][y] = 0

    return grid


steps = get_input_lines()

p1 = np.count_nonzero(run(steps))
p2 = np.sum(run(steps, p2=True))

print("P1:", p1)
print("P2:", p2)
