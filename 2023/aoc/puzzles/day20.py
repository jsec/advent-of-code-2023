import itertools
from collections import deque
from math import lcm


def broadcast(modules, source, dest, cmods, fmods, value):
    if dest in fmods:
        if value:
            return

        fmods[dest] = not fmods[dest]
        nxt = fmods[dest]

    elif dest in cmods:
        cmods[dest][source] = value
        nxt = not all(cmods[dest].values())
    elif dest in modules:
        nxt = value
    else:
        return

    for r in modules[dest]:
        yield dest, r, nxt


def button(modules, fmods, cmods):
    queue: deque[tuple[str, str, bool]] = deque([("press", "broadcaster", False)])
    high_count = 0
    low_count = 0

    while queue:
        source, dest, value = queue.popleft()
        if value:
            high_count += 1
        else:
            low_count += 1

        queue.extend(broadcast(modules, source, dest, cmods, fmods, value))

    return high_count, low_count


def detect_cycle(modules, fmods, cmods):
    p = set()

    for rx_s, rx_d in modules.items():
        if rx_d == ["rx"]:
            assert rx_s in cmods  # noqa: S101
            break

    for source, dest in modules.items():
        if rx_s in dest:
            assert source in cmods  # noqa: S101
            p.add(source)

    for i in itertools.count(1):
        queue: deque[tuple[str, str, bool]] = deque([("press", "broadcaster", False)])

        while queue:
            source, dest, value = queue.popleft()

            if not value:
                if dest in p:
                    yield i

                p.discard(dest)
                if not p:
                    return

            queue.extend(broadcast(modules, source, dest, cmods, fmods, value))


def run(data: list[str], p2: bool = False) -> int:
    modules = {}
    fmods = {}
    cmods = {}

    for definition in data:
        name, receivers = definition.split(" -> ")
        receivers = receivers.strip().split(", ")

        if name[0] == "%":
            name = name[1:]
            fmods[name] = False
        elif name[0] == "&":
            name = name[1:]
            cmods[name] = {}

        modules[name] = receivers

    # Add sources for conjugation mods
    for n, r in modules.items():
        for d in filter(lambda x: x in cmods, r):
            cmods[d][n] = False

    # Part 1
    if not p2:
        high = low = 0
        for _ in range(1000):
            dh, dl = button(modules, fmods, cmods)
            high += dh
            low += dl

        return high * low

    return lcm(*detect_cycle(modules, fmods, cmods))
