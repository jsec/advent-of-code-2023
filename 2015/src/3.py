from util.input import get_input


def run(steps: str):
    pos = [0, 0]
    visited = set()
    visited.add(tuple(pos))

    for step in steps:
        match step:
            case ">":
                pos[0] -= 1
            case "<":
                pos[0] += 1
            case "^":
                pos[1] -= 1
            case "v":
                pos[1] += 1

        visited.add(tuple(pos))

    return list(visited)


steps = get_input()

print("P1:", len(run(steps)))

odds = run("".join([step for idx, step in enumerate(steps) if idx % 2 != 0]))
evens = run("".join([step for idx, step in enumerate(steps) if idx % 2 == 0]))

print("P2:", len(set(odds + evens)))
