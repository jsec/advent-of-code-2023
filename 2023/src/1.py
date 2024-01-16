from util.input import get_input_array

number_dict = {
    "one": "1",
    "two": "2",
    "three": "3",
    "four": "4",
    "five": "5",
    "six": "6",
    "seven": "7",
    "eight": "8",
    "nine": "9",
}


def get_digits(word: str) -> int:
    digits = list(filter(str.isdigit, word))
    return int(digits[0] + digits[-1])


def get_digits_v2(word: str) -> int:
    values = []

    for idx, char in enumerate(word):
        if char.isdigit():
            values.append(char)
        else:
            for key in number_dict:
                if word[idx:].startswith(key):
                    values.append(number_dict[key])

    return int(values[0] + values[-1])


data = get_input_array()

p1 = sum([int(get_digits(word)) for word in data])
print("P1:", p1)

p2 = sum([int(get_digits_v2(word)) for word in data])
print("P2:", p2)
