import itertools


def circular_pairwise(lst):
    s = itertools.cycle(lst)
    next(s)
    return zip(lst, s)


def flatten(lists):
    return [x for xs in lists for x in xs]
