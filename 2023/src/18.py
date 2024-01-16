from util.algo import polygon_area
from util.input import get_input_array

directions = {"R": (1, 0), "L": (-1, 0), "U": (0, -1), "D": (0, 1)}
hex_directions = {"0": "R", "1": "D", "2": "L", "3": "U"}


def paint(start, item, swap):
    x, y = start
    heading, size, color = item.split(" ")
    size = int(size)

    if swap:
        heading = hex_directions[color[-2]]
        size = int(color[2:-2], 16)

    dx, dy = directions[heading]
    return [(x + dx * i, y + dy * i) for i in range(1, int(size) + 1)]


def run(plan, swap=False) -> int:
    xv = []
    yv = []
    trench = []
    current = (0, 0)
    for step in plan:
        res = paint(current, step, swap)
        trench += res
        current = trench[-1]
        xv.append(current[0])
        yv.append(current[1])

    return int(polygon_area(xv, yv, trench))


def p2(plan: list[str]) -> int:
    return run(plan, swap=True)


data = get_input_array()

print("P1:", run(data))
print("P2:", run(data, swap=True))
