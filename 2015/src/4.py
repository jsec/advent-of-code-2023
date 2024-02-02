import hashlib

from util.input import get_input


def create_hash(salt: str, num: int) -> str:
    key = "{0}{1}".format(salt, str(num))
    return hashlib.md5(key.encode()).hexdigest()


def run(salt: str, start: str) -> int:
    num = 0
    hash = create_hash(salt, num)

    while not hash.startswith(start):
        num += 1
        hash = create_hash(salt, num)

    return num


salt = get_input().strip()
print("P1:", run(salt, "00000"))
print("P1:", run(salt, "000000"))
