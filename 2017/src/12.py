from util.input import get_input_lines


def parse_input(data):
    _, children = data.split(" <-> ")
    return [int(c.strip()) for c in children.split(", ")]


def traverse_group(pipes, idx, group):
    if idx in group:
        return group

    group.add(idx)
    for conn in pipes[idx]:
        traverse_group(pipes, conn, group)

    return group


def p2(pipes):
    count = 1

    group = traverse_group(pipes, 0, set())

    for idx, _ in enumerate(pipes):
        if idx not in group:
            group = traverse_group(pipes, idx, group)
            count += 1

    return count


pipes = [parse_input(line) for line in get_input_lines()]

print("P1:", len(traverse_group(pipes, 0, set())))
print("P2:", p2(pipes))
