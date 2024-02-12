from collections import defaultdict

from util.input import get_input_lines


def run(instructions):
    regs = defaultdict(int)
    max_seen = 0

    for i in instructions:
        dest, effect, value, _, cmp, op, cmp_value = i
        if eval("regs[cmp] " + op + cmp_value):  # noqa: S307, PGH001
            if effect == "inc":
                regs[dest] += int(value)
                max_seen = max(max_seen, regs[dest])
            else:
                regs[dest] -= int(value)

    return max(regs.values()), max_seen


instructions = [line.split(" ") for line in get_input_lines()]

p1, p2 = run(instructions)

print("P1:", p1)
print("P1:", p2)
