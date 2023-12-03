class Game:
    def __init__(self, line: str):
        self.line = line
        self.color_dict = {}
        self.parse_reveals()

    def parse_reveals(self):
        for reveal in [x.strip() for x in self.line.split(":")[1].split(";")]:
            self.update_max_values(reveal)

    def update_max_values(self, reveal: str):
        parsed_pairs = [item.strip().split() for item in reveal.strip().split(",")]
        for pair in parsed_pairs:
            count = int(pair[0])
            color = pair[1]

            if color not in self.color_dict:
                self.color_dict[color] = 0

            if self.color_dict[color] < count:
                self.color_dict[color] = count

    def is_possible(self, red: int, green: int, blue: int) -> bool:
        return self.color_dict["red"] <= red and self.color_dict["green"] <= green and self.color_dict["blue"] <= blue

    def get_power(self) -> int:
        return self.color_dict["red"] * self.color_dict["green"] * self.color_dict["blue"]


def puzzle_1(data: list[str]) -> int:
    acc = 0
    for idx, line in enumerate(data):
        game = Game(line)
        if game.is_possible(12, 13, 14):
            acc = acc + idx + 1

    return acc


def puzzle_2(data: list[str]) -> int:
    acc = 0
    for line in data:
        game = Game(line)
        acc += game.get_power()

    return acc
