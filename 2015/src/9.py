import itertools

from util.input import get_input_lines


def parse_input(line: str):
    (src, _, dest, _, dist) = line.split(" ")
    return src, dest, int(dist)


routes = [parse_input(line) for line in get_input_lines()]
print(routes)

locations = set()
distances = dict()

for line in get_input_lines():
    (src, _, dest, _, dist) = line.split(" ")
    locations.add(src)
    locations.add(dest)
    distances.setdefault(src, dict())[dest] = int(dist)
    distances.setdefault(dest, dict())[src] = int(dist)

lengths = []
for path in itertools.permutations(locations):
    length = sum(map(lambda x, y: distances[x][y], path[:-1], path[1:]))
    lengths.append(length)

print("P1:", min(lengths))
print("P2:", max(lengths))
