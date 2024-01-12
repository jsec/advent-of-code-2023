import itertools


def circular_pairwise(lst):
    s = itertools.cycle(lst)
    next(s)
    return zip(lst, s)
