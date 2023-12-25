import math

import networkx as nx


def run(data) -> int:
    G = nx.Graph()

    for line in data:
        label, connections = line.strip().split(":")
        for conn in connections.strip().split(" "):
            G.add_edge(label, conn, weight=1)

    _, groups = nx.stoer_wagner(G)
    return math.prod([len(g) for g in groups])
