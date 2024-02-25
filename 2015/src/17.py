import itertools

from util.input import get_input_lines

bottles = [int(bottle) for bottle in get_input_lines()]


def run(capacity: int):
    count = 0
    found_min = False
    need_min = True
    min_subcount = 0

    for size in range(len(bottles)):
        subcount = 0
        for combo in itertools.combinations(bottles, size):
            if sum(combo) == capacity:
                subcount += 1

                if need_min:
                    found_min = True

        count += subcount

        if need_min and found_min:
            min_subcount = subcount
            need_min = False

    return count, min_subcount


p1, p2 = run(150)

print("P1:", p1)
print("P2:", p2)
