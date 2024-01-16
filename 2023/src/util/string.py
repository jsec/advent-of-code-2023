import re


def remove_extra_spaces(text: str) -> str:
    return re.sub(" +", " ", text).strip()


def string_to_list(text: str) -> list[int]:
    return list(map(int, remove_extra_spaces(text).split(" ")))
