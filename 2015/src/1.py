from util.input import get_input


def p1(steps: str) -> int:
    return steps.count("(") - steps.count(")")


def p2(steps: str) -> int:
    current = 0
    for idx, dir in enumerate(steps):
        delta = 1 if dir == "(" else -1
        current += delta

        if current < 0:
            return idx + 1

    return 0


directions = get_input()
print("P1:", p1(directions))
print("P2:", p2(directions))
