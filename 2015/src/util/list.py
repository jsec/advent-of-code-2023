import itertools


def sliding_window(lst, size):
    acc = []

    if len(lst) <= size:
        return lst

    for i in range(len(lst) - size + 1):
        acc.append(lst[i : i + lst])

    return acc


def all_combinations(lst):
    return itertools.chain.from_iterable(
        itertools.combinations(lst, i + 1) for i in range(len(lst))
    )
