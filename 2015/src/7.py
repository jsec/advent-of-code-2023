from functools import cache

from util.input import get_input_lines


def get_circuit():
    circuit = {}
    wires = [line.split(" -> ") for line in get_input_lines()]

    for wire in wires:
        op, name = wire
        circuit[name] = op

    return circuit


@cache
def parse_value(value):
    if value.lstrip("-").isnumeric():
        return int(value) & 0xFFFF

    return get_value(value)


@cache
def get_value(name) -> int:
    op = circuit[name]
    args = op.split(" ")

    if "AND" in op:
        return parse_value(args[0]) & parse_value(args[2])
    elif "OR" in op:
        return parse_value(args[0]) | parse_value(args[2])
    elif "NOT" in op:
        return ~parse_value(args[1]) & 0xFFFF
    elif "LSHIFT" in op:
        return parse_value(args[0]) << int(args[2]) & 0xFFFF
    elif "RSHIFT" in op:
        return parse_value(args[0]) >> int(args[2]) & 0xFFFF
    else:
        return parse_value(args[0])


circuit = get_circuit()
p1 = get_value("a")
print("P1:", p1)

circuit = get_circuit()
circuit["b"] = str(p1)

get_value.cache_clear()
parse_value.cache_clear()

print("P2:", get_value("a"))
