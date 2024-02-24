import re

from util.input import get_input

json = get_input()

p1 = sum([int(num) for num in re.findall(r"-?\d+", json)])

print("P1:", p1)
