from util.input import get_input

dance = ["a", "b", "c", "d", "e", 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p']

# There's something wrong with this cycle length
def get_cycle_length(dance: list[str], steps: list[str], iterations: int) -> int:
    original = dance.copy()
    cycles = 0

    for _ in range(iterations):
        dance = run(dance, steps)
        print('original:', original)
        print('dance:', dance)
        print()
        if dance == original and cycles > 1:
            return cycles - 1

        cycles += 1

    return 0


def run(dance: list[str], steps: list[str]) -> list[str]:
    for step in steps:
        cmd, params = step[0], step[1:]
        match cmd:
            case 's':
                for _ in range(int(params)):
                    d = dance.pop(-1)
                    dance.insert(0, d)
            case 'x':
                a, b = (int(x) for x in params.split('/'))
                dance[a], dance[b] = dance[b], dance[a]
            case 'p':
                x, y = params.split('/')
                a, b = dance.index(x), dance.index(y)
                dance[a], dance[b] = dance[b], dance[a]

    return dance

steps = get_input().split(',')

dance2 = dance.copy()

p1 = run(dance, steps)
print('P1:', ''.join(p1))

max_iter = 1000000000
i = max_iter % get_cycle_length(dance2, steps, max_iter)
print('cycle length:', i)
p2_steps = steps[-i:]

p2 = run(dance2, p2_steps)
print('P2:', ''.join(p2))
