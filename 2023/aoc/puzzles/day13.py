Pattern = list[list[str]]


def solve(data, diff=0) -> int:
    arrs = [[list(line) for line in pattern] for pattern in data]
    return sum([get_total(arr, diff) for arr in arrs])


def get_total(arr: Pattern, diff: int) -> int:
    result = 0
    multipliers = [(100, arr), (1, list(zip(*arr)))]
    for multiplier, pattern in multipliers:
        for index in range(1, len(pattern)):
            top = pattern[index:]
            bottom = pattern[:index][::-1]
            if verify(top, bottom, diff):
                result += multiplier * index

    return result


def verify(top: Pattern, bottom: Pattern, diff: int) -> bool:
    diff_sum = sum(char_t != char_b for line_t, line_b in zip(top, bottom) for char_t, char_b in zip(line_t, line_b))
    return diff == diff_sum
