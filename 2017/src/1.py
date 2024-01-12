from util.input import get_input
from util.list import circular_pairwise

data = [int(x) for x in list(get_input().strip())]

p1 = 0
for x, y in circular_pairwise(data):
    if x == y:
        p1 += x

print("P1:", p1)

p2 = 0
length = int(len(data) / 2)
for idx, num in enumerate(data):
    if idx >= length and num == data[idx - length]:
        p2 += num
    elif idx < length and num == data[idx + length]:
        p2 += num

print("P2:", p2)
