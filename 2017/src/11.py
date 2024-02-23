from util.algo import manhattan_3d
from util.input import get_split_input


def run(data):
    x = 0
    y = 0
    z = 0

    distances = []

    for d in data:
        match d:
            case 'n':
                y += 1
                z -= 1
            case 's':
                y -= 1
                z += 1
            case 'ne':
                x += 1
                z -= 1
            case 'sw':
                x -= 1
                z += 1
            case 'nw':
                x -= 1
                y += 1
            case 'se':
                x += 1
                y -= 1

        distances.append(int(manhattan_3d(x, y, z) / 2))

    return distances

distances = run(get_split_input(','))

print('P1:', distances[-1])
print('P2:', max(distances))
