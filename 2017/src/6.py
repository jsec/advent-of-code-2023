from util.input import get_split_input


def run(banks) -> tuple[int, int]:
    states = []
    cycles = 0

    while True:
        max_val = max(banks)
        idx = banks.index(max_val)
        banks[idx] = 0

        for _ in range(max_val):
            if idx == len(banks) - 1:
                idx = 0
            else:
                idx += 1

            banks[idx] += 1

        cycles += 1

        key = "-".join([str(x) for x in banks])

        if key in states:
            prev_idx = states.index(key)
            return cycles, cycles - prev_idx - 1

        states.append(key)


banks = [int(num) for num in get_split_input("\t")]

p1, p2 = run(banks)

print("P1:", p1)
print("P2:", p2)
