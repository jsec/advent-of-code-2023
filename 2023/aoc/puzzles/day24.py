import itertools
from dataclasses import dataclass

import numpy as np
import sympy


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


def p2(data):
    hail = [Hail(line) for line in data]
    rock_x, rock_y, rock_z, rock_vx, rock_vy, rock_vz = sympy.symbols("rock_x rock_y rock_z rock_vx rock_vy rock_vz")
    eqs = []

    sample = 10 if len(data) >= 10 else len(data) - 1

    for h in hail[:sample]:
        eqs.append(sympy.Eq((rock_x - h.x) * (h.vy - rock_vy), (rock_y - h.y) * (h.vx - rock_vx)))
        eqs.append(sympy.Eq((rock_y - h.y) * (h.vz - rock_vz), (rock_z - h.z) * (h.vy - rock_vy)))

    try:
        result = sympy.solve(eqs)[0]
    except sympy.core.sympify.SympifyError as e:
        print(f"No solutions found: {e}")

    return sum([result[rock_x], result[rock_y], result[rock_z]])
