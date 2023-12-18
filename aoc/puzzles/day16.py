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
    def __init__(self, grid: list[list[str]]) -> None:
        self.grid = grid
        self.beams = []

    def run(self, start_x: int, start_y: int, heading: str) -> int:
        self.beams = [Beam(start_x, start_y, heading)]
        cache = defaultdict(list)
        energized = set()

        max_x = len(self.grid)
        max_y = len(self.grid[0])

        while len(self.beams) > 0:
            for beam in self.beams.copy():
                if beam.out_of_bounds(max_x, max_y):
                    self.beams.remove(beam)
                    continue

                if [beam.x, beam.y] in cache[beam.heading]:
                    self.beams.remove(beam)
                else:
                    cache[beam.heading].append([beam.x, beam.y])

                energized.add((beam.x, beam.y))

                new_beam = beam.move(self.grid[beam.x][beam.y])
                if new_beam:
                    self.beams.append(new_beam)

        return len(energized)


def p1(matrix: list[list[str]]) -> int:
    grid = Grid(matrix)
    return grid.run(0, 0, "R")


def p2(matrix: list[list[str]]) -> int:
    starts = []
    max_x = len(matrix) - 1
    max_y = len(matrix[0]) - 1

    for x in range(max_x + 1):
        starts.append((x, 0, "R"))
        starts.append((x, max_y, "L"))

    for y in range(max_y + 1):
        starts.append((0, y, "D"))
        starts.append((max_x, y, "U"))

    grid = Grid(matrix)
    return max([grid.run(x, y, heading) for x, y, heading in starts])
