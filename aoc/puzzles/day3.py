import re
from typing import ClassVar


class Schematic2:
    directions: ClassVar[list[tuple]] = [(-1, -1), (-1, 0), (-1, 1), (0, -1), (0, 1), (1, -1), (1, 0), (1, 1)]

    def __init__(self, data: list[str]):
        self.data = [line.replace(".", "x") for line in data]
        self.symbol_map = self.find_symbols()
        self.number_map = self.find_numbers()
        self.ratios = []

    def find_symbols(self):
        symbols = []
        for line_idx, line in enumerate(self.data):
            for char_idx, char in enumerate(line):
                if char == "*":
                    symbols.append((line_idx, char_idx))

        return symbols

    def find_numbers(self):
        number_map = {}
        for idx, line in enumerate(self.data):

            for match in re.finditer(r"\d+", line):
                start = int(match.start(0))
                group = match.group(0)
                gear = int(match.group(0))

                if gear not in number_map:
                    number_map[gear] = []

                for i in range(start, start + len(group)):
                    number_map[gear].append((idx, i))

        return number_map

    def analyze(self):
        for symbol in self.symbol_map:
            adjacent_numbers = []
            x, y = symbol
            nodes = [(x + xn, y + yn) for xn, yn in self.directions]
            for node in nodes:
                found_numbers = list(filter(lambda x: node in self.number_map[x], self.number_map))
                adjacent_numbers.append(found_numbers)

            adjacent_numbers = list(dict.fromkeys([i for n in adjacent_numbers for i in n]))
            if len(adjacent_numbers) == 2:
                self.ratios.append(adjacent_numbers[0] * adjacent_numbers[1])

        return sum(self.ratios)


class Schematic:
    directions: ClassVar[list[tuple]] = [(-1, -1), (-1, 0), (-1, 1), (0, -1), (0, 1), (1, -1), (1, 0), (1, 1)]

    def __init__(self, data: list[str]):
        self.data = [line.replace(".", "x") for line in data]
        self.number_map = self.find_numbers()
        self.part_numbers = []
        self.x_max = len(data)
        self.y_max = len(data[0])

    def find_numbers(self):
        return [
            {int(match.start(0)): int(match.group(0)) for match in re.finditer(r"\d+", line.replace(".", " "))}
            for line in self.data
        ]

    def analyze(self):
        for idx, line_map in enumerate(self.number_map):
            for num_idx in line_map:
                if self.is_part_number(idx, num_idx, len(str(line_map[num_idx]))):
                    self.part_numbers.append(line_map[num_idx])

        return sum(self.part_numbers)

    def is_part_number(self, x: int, y: int, length: int) -> bool:
        nodes = []
        for _ in range(length):
            nodes.append([(xn + x, yn + y) for xn, yn in self.directions])
            y += 1

        # Flatten list
        nodes = list(filter(lambda x: self.check_index(x[0], x[1]), [i for s in nodes for i in s]))
        return len(nodes) > 0

    def check_index(self, x: int, y: int) -> bool:
        if x < 0 or x >= self.x_max:
            return False

        if y < 0 or y >= self.y_max:
            return False

        return not self.data[x][y].isalnum()


def puzzle_1(data: list[str]) -> int:
    schematic = Schematic(data)
    return schematic.analyze()


def puzzle_2(data: list[str]) -> int:
    schematic = Schematic2(data)
    return schematic.analyze()
