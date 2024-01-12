import re


def remove_extra_spaces(text: str) -> str:
    return re.sub(" +", " ", text).strip()
