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


sues = parse(get_input_lines())

for item, quantity in ticker:
    sues = list(filter(lambda sue: item not in sue or sue[item] == quantity, sues))
    if len(sues) == 1:
        break

print("P1:", sues[0]["name"])
