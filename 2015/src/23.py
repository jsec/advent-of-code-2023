from util.input import get_input_lines


def run(program, regs):
    ptr = 0

    while ptr < len(program):
        cmd, *params = program[ptr].split()

        match cmd:
            case "inc":
                r = params[0]
                regs[r] += 1
                ptr += 1
            case "hlf":
                r = params[0]
                regs[r] *= 0.5
                ptr += 1
            case "tpl":
                r = params[0]
                regs[r] *= 3
                ptr += 1
            case "jmp":
                value = params[0]
                length = int(value[1:])
                ptr += length if value[0] == "+" else length * -1
            case "jie":
                r, value = params
                if regs[r[:-1]] % 2 == 0:
                    length = int(value[1:])
                    ptr += length if value[0] == "+" else length * -1
                else:
                    ptr += 1
            case "jio":
                r, value = params
                if regs[r[:-1]] == 1:
                    length = int(value[1:])
                    ptr += length if value[0] == "+" else length * -1
                else:
                    ptr += 1

    return regs


program = get_input_lines()

regs = {"a": 0, "b": 0}
p1 = run(program, regs)

regs = {"a": 1, "b": 0}
p2 = run(program, regs)

print("P1:", p1["b"])
print("P2:", p2["b"])
