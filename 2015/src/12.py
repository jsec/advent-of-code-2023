import json
import re

from util.input import get_input


def p1(data):
    return sum([int(num) for num in re.findall(r"-?\d+", data)])


def no_reds(struct):
    result = 0

    if isinstance(struct, list):
        child_sums = [no_reds(child) for child in struct]
        return sum(child_sums)
    elif isinstance(struct, dict):
        for key in struct.keys():
            if struct[key] == "red":
                return 0

            result += no_reds(struct[key])
    elif isinstance(struct, int):
        result += struct

    return result


data = get_input()

print("P1:", p1(data))
print("P2:", no_reds(json.loads(data)))
