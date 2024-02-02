from util.input import get_input_lines


def get_wrapping_paper(dims: str) -> int:
    x, y, z = sorted([int(x) for x in dims.split("x")])
    return (2 * x * y) + (2 * x * z) + (2 * y * z) + (x * y)


def get_ribbon(dims: str) -> int:
    x, y, z = sorted([int(x) for x in dims.split("x")])
    return (x * y * z) + (2 * x + 2 * y)


data = get_input_lines()
p1 = sum([get_wrapping_paper(dims) for dims in data])
p2 = sum([get_ribbon(dims) for dims in data])

print("P1:", p1)
print("P2:", p2)
