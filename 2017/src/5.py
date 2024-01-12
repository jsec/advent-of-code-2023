from util.input import get_input_lines

data = [int(line) for line in get_input_lines()]

curr = 0
jumps = 0

while curr < len(data):
    idx = curr
    curr += data[curr]

    if data[idx] >= 3:
        data[idx] -= 1
    else:
        data[idx] += 1

    jumps += 1

print("P1:", jumps)
