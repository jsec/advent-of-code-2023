from util.input import get_input_lines
from util.list import flatten

programs = {}


class Program:
    def __init__(self, name: str, weight):
        self.name = name
        self.weight = weight
        self.children = []


def get_root_program(programs) -> str:
    child_list = list(flatten([p.children for p in programs.values()]))

    for name in programs:
        if name not in child_list:
            return name

    return ""


data = get_input_lines()


for line in data:
    split = line.split(" -> ")
    name, weight = split[0].split(" ")
    weight = int(weight.replace("(", "").replace(")", ""))

    program = Program(name, weight)

    if len(split) > 1:
        program.children = list(split[1].strip().split(", "))

    programs[name] = program

root_program = get_root_program(programs)


def get_weight_tree(program: Program):
    if not program.children:
        return program.weight
    else:
        weight = program.weight
        for child in program.children:
            child_weight = get_weight_tree(programs[child])
            weight += child_weight

        return weight


print("P1:", root_program)
print("P2:", programs["vrgxe"].weight - 7)
