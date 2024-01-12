import itertools

from util.input import get_input_lines

inputs = [line.replace("\t", " ") for line in get_input_lines()]
rows = [[int(x) for x in i.split(" ")] for i in inputs]

p1 = 0
for row in rows:
    p1 += max(row) - min(row)

print("P1:", p1)

p2 = 0
for row in rows:
    perms = itertools.permutations(row, 2)
    for p in list(perms):
        if p[0] % p[1] == 0:
            p2 += p[0] / p[1]

print("P2:", int(p2))
