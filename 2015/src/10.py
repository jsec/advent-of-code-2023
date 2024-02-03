from util.input import get_input


def calculate(data):
    count = 1
    acc = ""

    for idx, char in enumerate(data):
        if idx == len(data) - 1:
            acc += str(count) + char
            return acc

        if char == data[idx + 1]:
            count += 1
            continue

        acc += str(count) + char
        count = 1

    return ""


def run(data: str, iterations: int) -> int:
    for _ in range(iterations):
        data = calculate(data)

    return len(data)


data = get_input().strip()

print("P1:", run(data, 40))
print("P1:", run(data, 50))
