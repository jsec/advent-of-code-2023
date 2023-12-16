import numpy as np


def solve(data: list[list[str]]) -> int:
    arrs = [np.array([list(line) for line in pattern]) for pattern in data]
    return sum([get_total(arr) for arr in arrs])


def get_total(arr: np.ndarray) -> int:
    refl_idx = find_reflection(arr)

    if refl_idx != -1 and verify_mirror(arr, refl_idx):
        return (refl_idx + 1) * 100

    transposed = np.rot90(arr)
    refl_idx = find_reflection(transposed)
    return len(transposed) - 1 - refl_idx


def find_reflection(arr: np.ndarray) -> int:
    for i in range(0, len(arr) - 1):
        if line_match(arr[i], arr[i + 1]) and verify_mirror(arr, i):
            return i

    return -1


def verify_mirror(arr: np.ndarray, idx: int) -> bool:
    pre = idx - 1
    post = idx + 2

    while pre >= 0 and post < len(arr):
        if not line_match(arr[pre], arr[post]):
            return False

        pre -= 1
        post += 1

    return True


def line_match(j: list[str], k: list[str]) -> bool:
    return all(x == y for x, y in zip(j, k))
