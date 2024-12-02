import re
from collections import defaultdict

from util.input import get_split_input


def parse_input():
    mapping = defaultdict(list)
    raw_maps, molecule = get_split_input("\n\n")

    mappings = [map.split(" => ") for map in raw_maps.split("\n")]
    for src, rep in mappings:
        mapping[src].append(rep)

    return molecule, mapping


def p1(molecule, mapping) -> int:
    unique = set()

    print("mapping:", mapping)

    for key in mapping.keys():
        idxs = [m.start() for m in re.finditer(key, molecule)]

        for idx in idxs:
            for replacement in mapping[key]:
                new_molecule = molecule[:idx] + replacement + molecule[idx + 1 :]
                print("new molecule:", new_molecule)
                unique.add(new_molecule)

    return len(unique)


molecule, mapping = parse_input()

print("P1:", p1(molecule, mapping))
