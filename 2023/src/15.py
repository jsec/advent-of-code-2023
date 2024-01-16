from collections import defaultdict
from functools import reduce

from util.input import get_input_array

hash_char = lambda acc, char: (acc + ord(char)) * 17 % 256
hash_key = lambda lst: reduce(hash_char, lst, 0)


boxes = defaultdict(dict)


def part2(data: str) -> int:
    steps = data.split(",")
    for step in steps:
        if "=" in step:
            label, length = step.split("=")
            boxes[hash_key(label)][label] = int(length)
        else:
            label = step[:-1]
            boxes[hash_key(label)].pop(label, None)

    return sum((idx + 1) * (slot + 1) * length for idx in boxes for slot, length in enumerate(boxes[idx].values()))


data = get_input_array()[0]

p1 = sum(map(hash_key, data.split(",")))

print("P1:", p1)
print("P2:", part2(data))
