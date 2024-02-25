import itertools
from typing import Callable


def sliding_window(lst: list, size: int):
    return [lst[i : i + size] for i in range(len(lst) - size + 1)]


def all_combinations(lst: list):
    return itertools.chain.from_iterable(
        itertools.combinations(lst, i + 1) for i in range(len(lst))
    )


def pairwise_map(lst: list, func: Callable):
    pairs = itertools.pairwise(lst)

    return list(map(func, pairs))
