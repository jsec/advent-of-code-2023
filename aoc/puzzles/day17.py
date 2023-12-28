import itertools
from collections import defaultdict
from heapq import heappop, heappush

import networkx as nx

DIRS = {0: (0, -1), 1: (1, 0), 2: (0, 1), 3: (-1, 0)}
Q = []
lookup = {}
G = nx.Graph()
count = itertools.count()


def remove_from_lookup(item):
    i = lookup.pop(item)
    i[-1] = "DEAD"


def add_to_queue(item, p=0):
    if item in lookup:
        remove_from_lookup(item)
    c = next(count)
    e = [p, c, item]
    lookup[item] = e
    heappush(Q, e)


def pop():
    while Q:
        p, c, item = heappop(Q)
        if item != "DEAD":
            del lookup[item]
            return item

    raise KeyError("cannot pop from an empty queue")


def run(data, p2: bool = False) -> int:
    heatmap = [[int(x) for x in line.strip()] for line in data]
    for y in range(len(heatmap)):
        for x in range(len(heatmap[0])):
            for heading in range(4):
                for straight_steps in range(1, 4):
                    add_to_queue((x, y, heading, straight_steps), 1000000)

    add_to_queue((0, 0, 1, 0))
    if p2:
        add_to_queue((0, 0, 2, 0))

    paths = defaultdict(lambda: 1000000)
    paths[(0, 0, 1, 0)] = 0

    if p2:
        paths[(0, 0, 2, 0)] = 0

    if p2:
        paths[(0, 0, 1, 0)] = 0
    else:
        paths[(0, 0, 1, 0)] = 0

    # Poor man's Djikstra, we'll call it Dykstra
    while True:
        item = pop()
        x, y, heading, cons = item
        if x == len(heatmap[0]) - 1 and y == len(heatmap) - 1:
            return paths[item]

        if p2:
            potential_moves = []
            if cons >= 4:
                potential_moves = [((heading + 1) % 4, 1), ((heading - 1) % 4, 1)]
            if cons < 10:
                potential_moves.append((heading, cons + 1))
        else:
            potential_moves = [((heading + 1) % 4, 1), ((heading - 1) % 4, 1)]
            if cons < 3:
                potential_moves.append((heading, cons + 1))

        for move in potential_moves:
            dh, dc = move
            dx, dy = x + DIRS[dh][0], y + DIRS[dh][1]
            di = (dx, dy, dh, dc)
            if 0 <= dx < len(heatmap[0]) and 0 <= dy < len(heatmap):
                dp = paths[item] + heatmap[dy][dx]
                if dp < paths[di]:
                    paths[di] = dp
                    add_to_queue(di, dp)
