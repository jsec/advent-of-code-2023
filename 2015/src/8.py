import fileinput
import re


def p1():
    result = 0

    for line in fileinput.input("input.txt"):
        line = line.strip()
        result += len(line)
        result -= len(eval(line))

    return result


def p2():
    result = 0

    for line in fileinput.input("input.txt"):
        line = line.strip()
        result += line.count("\\") + line.count('"') + 2

    return result


print("P1:", p1())
print("P2:", p2())
