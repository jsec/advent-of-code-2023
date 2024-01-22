from util.input import get_input_lines


def generator(value, factor, div=1):
    while True:
        value = value * factor % 2147483647
        if value % div == 0:
            yield value & 0xFFFF


sa, sb = (int(x) for x in get_input_lines())

a = generator(sa, 16807)
b = generator(sb, 48271)

p1 = sum(next(a) == next(b) for _ in range(40000000))
print("P1:", p1)

a = generator(sa, 16807, 4)
b = generator(sb, 48271, 8)

p2 = sum(next(a) == next(b) for _ in range(5000000))
print("P2:", p2)
