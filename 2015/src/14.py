from util.input import get_input_lines

duration = 2503


class Deer:
    def __init__(self, name: str, velocity: int, duration: int, rest: int) -> None:
        self.name = name
        self.velocity = velocity
        self.duration = duration
        self.rest_duration = rest
        self.distance = 0
        self.splits = []
        self.points = 0

    def fly(self, duration: int) -> None:
        for _ in range(duration):
            self.distance += self.velocity
            self.splits.append(self.distance)

    def rest(self, duration: int) -> None:
        for _ in range(duration):
            self.splits.append(self.distance)

    def race(self, time: int) -> None:
        cycles = time // (self.duration + self.rest_duration)

        for _ in range(cycles):
            self.fly(self.duration)
            self.rest(self.rest_duration)

        remainder = time % (self.duration + self.rest_duration)

        if remainder <= self.duration:
            self.fly(remainder)
        else:
            self.fly(self.duration)
            self.rest(remainder - self.duration)

    def check_if_leading(self, idx: int, lead_distance: int) -> None:
        if self.splits[idx] == lead_distance:
            self.points += 1


def create_deer(line: str) -> Deer:
    split = line.split(" ")
    name = split[0]
    velocity = int(split[3])
    duration = int(split[6])
    rest = int(split[-2])

    return Deer(name, velocity, duration, rest)


def p1(deer) -> int:
    for d in deer:
        d.race(duration)

    distances = list(map(lambda d: d.distance, deer))
    return max(distances)


def p2(deer: list[Deer]) -> int:
    for i in range(duration):
        lead_distance = max(list(map(lambda d: d.splits[i], deer)))

        for d in deer:
            d.check_if_leading(i, lead_distance)

    points = list(map(lambda d: d.points, deer))
    return max(points)


deer = [create_deer(line) for line in get_input_lines()]

print("P1:", p1(deer))
print("P2:", p2(deer))
