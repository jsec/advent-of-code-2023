from util.input import get_input_lines
from util.list import flatten


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

programs = {}

for line in data:
    split = line.split(" -> ")
    name, weight = split[0].split(" ")
    weight = int(weight.replace("(", "").replace(")", ""))

    program = Program(name, weight)

    if len(split) > 1:
        program.children = list(split[1].strip().split(", "))

    programs[name] = program

root_program = get_root_program(programs)

print("P1:", root_program)
