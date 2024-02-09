from util.input import get_input


def get_score(group) -> int:
    score = 0
    current = 0

    for i in range(len(group)):
        match group[i]:
            case "{":
                current += 1
            case "}":
                score += current
                current -= 1

    return score

def clear_garbage(string) -> str:
    start = 0
    garbage = []

    idx = 0

    while idx < len(string):
        char = string[idx]

        if char == '!':
            idx += 2
            continue

        if char == '<' and start == 0:
            start = idx

        if char == '>':
            garbage.append((start, idx))
            start = 0

        idx += 1

    garbage.reverse()

    for s, e in garbage:
        string = string[0:s] + string[e + 1:]

    return string

def get_garbage_count(string) -> int:
    result = 0
    acc = 0
    should_count = False
    idx = 0

    while idx < len(string):
        char = string[idx]

        if char == '<' and not should_count:
            should_count = True
        elif char == '!':
            idx += 2
            continue
        elif char == '>':
            should_count = False
            result += acc
            acc = 0
        else:
            if should_count:
                acc += 1

        idx += 1

    return result

data = get_input()

p1 = get_score(clear_garbage(data))
p2 = get_garbage_count(data)

print('P1:', p1)
print('P2:', p2)
