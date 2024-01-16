def transpose(arr):
    return list(zip(*arr))[::-1]


def range_intersection(x, y):
    return range(max(x[0], y[0]), min(x[-1], y[-1]) + 1)


def find_item_in_matrix(matrix, value):
    for x, line in enumerate(matrix):
        for y, item in enumerate(line):
            if item == value:
                return (x, y)

    return (-1, -1)


def flatten(lists):
    for item in lists:
        try:
            yield from flatten(item)
        except TypeError:
            yield item
