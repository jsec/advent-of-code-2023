from util.input import get_input_lines

duration = 2503


class Deer:
    def __init__(self, name: str, velocity: int, duration: int, rest: int) -> None:
        self.name = name
        self.velocity = velocity
        self.duration = duration
        self.rest = rest
        self.distances = []

    def race(self, time: int) -> None:
        distance = 0

        while time > 0:
            fly_time = min(self.duration, time)
            distance += self.velocity * fly_time
            time -= fly_time

            self.distances.append(distance)

            if time == 0 or time <= self.rest:
                break

            time -= self.rest


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

    distances = list(map(lambda d: d.distances[-1], deer))
    return max(distances)


deer = [create_deer(line) for line in get_input_lines()]

print("P1:", p1(deer))
