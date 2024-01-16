import numpy as np


def shoelace_area(x, y):
    c = x[-1] * y[0] - y[-1] * x[0]
    a = np.dot(x[:-1], y[1:]) - np.dot(y[:-1], x[1:])
    return 0.5 * np.abs(a + c)


def polygon_area(x, y, path):
    s = len(path)
    a = shoelace_area(x, y)
    i = a + 1 - s // 2
    return i + s


def picks_theorem(area, path):
    return area + 1 - len(path) / 2
