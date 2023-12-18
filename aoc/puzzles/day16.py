from collections import defaultdict
from dataclasses import dataclass

# fmt: off
move_map = {
        '.': {
            'L': (0, -1, 'L'),
            'R': (0, 1, 'R'),
            'U': (-1, 0, 'U'),
            'D': (1, 0, 'D')
            },
        '/': {
            'L': (1, 0, 'D'),
            'R': (-1, 0, 'U'),
            'U': (0, 1, 'R'),
            'D': (0, -1, 'L')
            },
        '\\': {
            'L': (-1, 0, 'U'),
            'R': (1, 0, 'D'),
            'U': (0, -1, 'L'),
            'D': (0, 1, 'R')
            },
        '-': {
            'L': (0, -1, 'L'),
            'R': (0, 1, 'R'),
            'U': (0, 1, 'R', 'L'),
            'D': (0, 1, 'R', 'L')
            },
        '|': {
            'L': (-1, 0, 'U', 'D'),
            'R': (-1, 0, 'U', 'D'),
            'U': (-1, 0, 'U'),
            'D': (1, 0, 'D'),
            }
        }


# fmt: on
@dataclass
class Beam:
    x: int
    y: int
    heading: str

    def move(self, char: str):
        new_beam = None
        next_pos = move_map[char][self.heading]
        if len(next_pos) == 4:
            new_beam = Beam(self.x, self.y, next_pos[3])

        self.x += next_pos[0]
        self.y += next_pos[1]
        self.heading = next_pos[2]

        return new_beam

    def out_of_bounds(self, x: int, y: int) -> bool:
        return self.x < 0 or self.x >= x or self.y < 0 or self.y >= y


class Grid:
    def __init__(self, grid: list[list[str]], start_x: int, start_y: int, heading: str) -> None:
        self.grid = grid
        self.energized = set()
        self.beams = [Beam(start_x, start_y, heading)]
        self.cache = defaultdict(list)

    def traverse(self):
        max_x = len(self.grid)
        max_y = len(self.grid[0])

        while len(self.beams) > 0:
            for beam in self.beams.copy():
                if beam.out_of_bounds(max_x, max_y):
                    self.beams.remove(beam)
                    continue

                if [beam.x, beam.y] in self.cache[beam.heading]:
                    self.beams.remove(beam)
                else:
                    self.cache[beam.heading].append([beam.x, beam.y])

                self.energized.add((beam.x, beam.y))

                new_beam = beam.move(self.grid[beam.x][beam.y])
                if new_beam:
                    self.beams.append(new_beam)

    def print_energized(self):
        acc = ""
        for x in range(len(self.grid)):
            for y in range(len(self.grid[0])):
                acc += "#" if (x, y) in self.energized else "."

            acc += "\n"

        for line in acc.split("\n"):
            print(line)


def solve(matrix: list[list[str]]) -> int:
    grid = Grid(matrix, 0, 0, "R")
    grid.traverse()
    return len(grid.energized)
