import math

import networkx as nx

from util.input import get_input_array


def run(data) -> int:
    G = nx.Graph()

    for line in data:
        label, connections = line.strip().split(":")
        for conn in connections.strip().split(" "):
            G.add_edge(label, conn, weight=1)

    _, groups = nx.stoer_wagner(G)
    return math.prod([len(g) for g in groups])


data = get_input_array()

print("P1:", run(data))
