import ast
import collections
import math
from typing import Callable

Neighbors = collections.namedtuple("Neighbors", ("left", "right"))


class Network:
    def __init__(self, data: list[str]) -> None:
        self.nodes: dict[str, Neighbors] = self.create_network(data)

    def create_network(self, data: list[str]) -> dict[str, Neighbors]:
        self.directions = list(data[0])

        nodes = {}
        for line in data[2:]:
            node, neighbors = line.split("=")
            neighbors = neighbors.replace("(", "('").replace(", ", "', '").replace(")", "')").strip()
            neighbor_tuple = ast.literal_eval(neighbors)
            nodes[node.strip()] = Neighbors(left=neighbor_tuple[0], right=neighbor_tuple[1])

        return nodes

    def traverse(self, start: str, predicate: Callable[[str], bool]) -> int:
        current_node = start
        steps = 0

        while True:
            for direction in self.directions:
                steps += 1
                current_node = self.walk_graph(current_node, direction)

                if predicate(current_node):
                    return steps

    def traverse_multiple(self, start_predicate: Callable[[str], bool], end_predicate: Callable[[str], bool]) -> int:
        steps = 1
        start_node = next(filter(start_predicate, self.nodes))

        return math.lcm(steps, self.solve(start_node, end_predicate))

    def solve(self, start: str, predicate: Callable[[str], bool]) -> int:
        current = start
        dir_idx = 0

        while not predicate(current):
            current = self.walk_graph(current, self.directions[dir_idx % len(self.directions)])
            dir_idx += 1

        return dir_idx

    def walk_graph(self, current: str, direction: str) -> str:
        node = self.nodes[current]
        return node.right if direction == "R" else node.left


def puzzle1(data: list[str]) -> int:
    network = Network(data)
    return network.traverse("AAA", lambda n: n == "ZZZ")


def puzzle2(data: list[str]) -> int:
    network = Network(data)
    return network.traverse_multiple(lambda n: n.endswith("A"), lambda n: n.endswith("Z"))
