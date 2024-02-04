from util.input import get_input_lines

ticker = [
    ("children", 3),
    ("cats", 7),
    ("samoyeds", 2),
    ("pomeranians", 3),
    ("akitas", 0),
    ("vizslas", 0),
    ("goldfish", 5),
    ("trees", 3),
    ("cars", 2),
    ("perfumes", 1),
]


def parse(lines):
    sues = []
    for line in lines:
        sue = dict()
        name, items = line.split(": ", 1)
        sue["name"] = name.split()[1]
        facts = items.split(", ")
        for fact in facts:
            item, quantity = fact.split(": ")
            sue[item] = int(quantity)

        sues.append(sue)

    return sues


def p1(item: str, quantity: int):
    return lambda sue: item not in sue or sue[item] == quantity


def p2(item: str, quantity: int):
    if item in ["cats", "trees"]:
        return lambda sue: item not in sue or sue[item] > quantity
    elif item in ["pomeranians", "goldfish"]:
        return lambda sue: item not in sue or sue[item] < quantity
    else:
        return lambda sue: item not in sue or sue[item] == quantity


def run(sues: list[dict], part2=False):
    for item, quantity in ticker:
        if part2:
            sues = list(filter(p2(item, quantity), sues))
        else:
            sues = list(filter(p1(item, quantity), sues))

        if len(sues) == 1:
            break

    return sues[0]["name"]


sues = parse(get_input_lines())
sues_copy = sues.copy()

print("P1:", run(sues))
print("P2:", run(sues_copy, part2=True))
