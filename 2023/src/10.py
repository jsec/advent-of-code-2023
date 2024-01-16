import math
from dataclasses import dataclass

from util.input import get_input_matrix

move_map = {
    "|": {"U": (-1, 0, "U"), "D": (1, 0, "D")},
    "-": {"L": (0, -1, "L"), "R": (0, 1, "R")},
    "L": {"D": (0, 1, "R"), "L": (-1, 0, "U")},
    "J": {"D": (0, -1, "L"), "R": (-1, 0, "U")},
    "7": {"U": (0, -1, "L"), "R": (1, 0, "D")},
    "F": {"U": (0, 1, "R"), "L": (1, 0, "D")},
    ".": {"U": (-1, 0, "U"), "D": (1, 0, "D"), "R": (0, 1, "R"), "L": (0, -1, "L")},
}


@dataclass
class Animal:
    x: int
    y: int
    heading: str

    def move(self, char: str):
        x, y, heading = move_map[char][self.heading]

        self.x += x
        self.y += y
        self.heading = heading

    def position(self):
        return (self.x, self.y)


class Grid:
    def __init__(self, grid: list[list[str]]) -> None:
        self.grid = grid
        self.start = self.find_animal()
        self.vertices = []

    def find_animal(self):
        for x, line in enumerate(self.grid):
            for y, char in enumerate(line):
                if char == "S":
                    return (x, y)

        raise Exception("No start found")

    def find_first_pipe(self):
        candidates = [(-1, 0, "U"), (1, 0, "D"), (0, -1, "L"), (0, 1, "R")]

        for c in candidates:
            dx, dy, heading = c
            x = self.start[0] + dx
            y = self.start[1] + dy
            try:
                char = self.grid[x][y]
                if char != "." and move_map[char][heading]:
                    return (x, y, heading)

            except KeyError:
                continue

        raise Exception("No connections found")

    def traverse(self):
        self.path = [self.start]
        x, y, heading = self.find_first_pipe()
        animal = Animal(x, y, heading)

        while animal.position() != self.start:
            self.path.append(animal.position())
            char = self.grid[animal.x][animal.y]
            if char in "J7FLS":
                self.vertices.append((animal.x, animal.y))
            animal.move(char)

    def inner_area(self):
        area = 0

        for ix, line in enumerate(self.grid):
            interior = False

            for iy, char in enumerate(line):
                if (ix, iy) not in self.path:
                    area += interior
                else:
                    interior = interior ^ (char in "|F7S")

        return area


grid = Grid(get_input_matrix())
grid.traverse()

p1 = math.ceil(len(grid.path) / 2)
p2 = grid.inner_area()

print("P1:", p1)
print("P2:", p2)
