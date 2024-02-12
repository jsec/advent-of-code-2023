from util.input import get_input


def p1(steps: int) -> int:
    buffer = [0]
    pos = 0

    for i in range(1, 2018):
        pos = (pos + steps) % len(buffer)
        pos += 1
        buffer.insert(pos, i)

    idx = buffer.index(2017)
    return buffer[idx + 1]


def p2(steps: int) -> int:
    res = 0
    i = 0
    for r in range(1, 50000001):
        i = (i + steps) % r + 1

        if i == 1:
            res = r

    return res


steps = int(get_input())

print("P1:", p1(steps))
print("P2:", p2(steps))
