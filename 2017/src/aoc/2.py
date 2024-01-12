from util.input import get_input_lines

rows = [[int(i) for i in line.split("\t")] for line in get_input_lines()]

print(rows)
