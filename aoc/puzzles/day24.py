import itertools
from dataclasses import dataclass

import numpy as np


@dataclass
class Hail:
    x: float
    y: float
    z: float
    vx: float
    vy: float
    vz: float

    def __init__(self, line) -> None:
        pos, vel = line.strip().split(" @ ")
        self.x, self.y, self.z = (float(i) for i in pos.strip().split(", "))
        self.vx, self.vy, self.vz = (float(i) for i in vel.strip().split(", "))


def solve(h1: Hail, h2: Hail, t_min: float, t_max: float):
    h1_slope = h1.vy / h1.vx
    h2_slope = h2.vy / h2.vx

    if h1_slope == h2_slope:
        return False

    ix, iy = np.linalg.solve([[-h1_slope, 1], [-h2_slope, 1]], [h1.y - h1_slope * h1.x, h2.y - h2_slope * h2.x])

    # Check if intersection happened in the past
    if (ix - h1.x) / h1.vx < 0 or (ix - h2.x) / h2.vx < 0:
        return False

    # Check if intersection happened within test range
    return t_min <= ix <= t_max and t_min <= iy <= t_max


def p1(data, t_min, t_max) -> int:
    print()
    hail = [Hail(line) for line in data]
    results = [solve(h1, h2, t_min, t_max) for h1, h2 in itertools.combinations(hail, 2)]

    return len(list(filter(lambda x: x, results)))
