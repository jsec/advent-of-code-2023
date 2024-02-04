from itertools import permutations

from util.input import get_input_lines


def setup():
    names = set()
    map = {}

    facts = [line[:-1] for line in get_input_lines()]

    for fact in facts:
        split = fact.split()

        name = split[0]
        effect = split[2]
        amount = int(split[3])
        neighbor = split[-1]

        names.add(name)
        if name not in map:
            map[name] = {}

        map[name][neighbor] = amount if effect == "gain" else amount * -1

    return names, map


def run(names, map):
    acc = []
    for order in permutations(names):
        happiness = 0

        for idx, name in enumerate(order):
            idx_l = idx - 1 if idx != 0 else len(order) - 1
            idx_r = idx + 1 if idx < len(order) - 1 else 0

            left = order[idx_l]
            right = order[idx_r]

            happiness += map[name][left] + map[name][right]

        acc.append(happiness)

    return max(acc)


names, map = setup()

print("P1:", run(names, map))

me = "me"
map[me] = {}

for name in names:
    map[name][me] = 0
    map[me][name] = 0

names.add(me)

print("P2:", run(names, map))
