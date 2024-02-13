from util.input import get_input_lines


def run(instructions):
    regs = {}
    sound = 0
    idx = 0

    while idx >= 0 and idx < len(instructions):
        inst = instructions[idx]
        cmd = inst[0]
        reg = inst[1]
        value = ''

        if len(inst) == 3:
            value = inst[2]

        if reg not in regs:
            regs[reg] = 0

        match cmd:
            case 'snd':
                sound = regs[reg]
            case 'set':
                regs[reg] = regs[value] if value.isalpha() else int(value)
            case 'add':
                regs[reg] += regs[value] if value.isalpha() else int(value)
            case 'mul':
                regs[reg] *= regs[value] if value.isalpha() else int(value)
            case 'mod':
                divisor = regs[value] if value.isalpha() else int(value)
                regs[reg] = regs[reg] % divisor
            case 'rcv':
                if regs[reg] != 0:
                    return sound
            case 'jgz':
                if regs[reg] > 0:
                    idx += int(value)
                    continue

        idx += 1

    return sound

instructions = [line.split(' ') for line in get_input_lines()]

print('P1:', run(instructions))
