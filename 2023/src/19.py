from collections import defaultdict, namedtuple

from util.input import get_split_input

Rule = namedtuple("Rule", ["op", "dest"])
Ruleset = list[Rule]
Part = defaultdict[int]


def create_part(data: str) -> list[Part]:
    props = defaultdict(int)
    for prop in data[1:-1].split(","):
        c, value = prop.split("=")
        props[c] = int(value)

    return props


def create_rules(data: list[str]):
    rules = defaultdict(Ruleset)

    for line in data:
        ruleset: Ruleset = []
        idx = line.index("{")
        label = line[:idx]
        for spec in line[idx + 1 : -1].split(","):
            if ":" not in spec:
                ruleset.append(Rule(None, spec))
            else:
                op, dest = spec.split(":")
                ruleset.append(Rule(op, dest))
        rules[label] = ruleset

    return rules


def run_workflow(workflows, part: Part, label: str) -> bool:
    x, m, a, s = (part[i] for i in "xmas")
    ruleset = workflows[label]

    for rule in ruleset:
        dest = run_rule(rule, x, m, a, s)

        if dest is None:
            continue

        if dest in "AR":
            return dest == "A"

        return run_workflow(workflows, part, dest)


def run_rule(rule: Rule, x: int, m: int, a: int, s: int) -> str:
    if not rule.op:
        return rule.dest

    if eval(rule.op):
        return rule.dest

    return None


def p1(data) -> int:
    parts = [create_part(part) for part in data[1]]
    workflows = create_rules(data[0])

    runner = lambda part: run_workflow(workflows, part, "in")
    mapper = lambda part: sum(part.values())

    return sum(map(mapper, filter(runner, parts)))


PART_RANGE = range(1, 4001)


class RangedPart:
    def __init__(self, x=PART_RANGE, m=PART_RANGE, a=PART_RANGE, s=PART_RANGE):
        self.x = x
        self.m = m
        self.a = a
        self.s = s

    def copy(self):
        return RangedPart(self.x, self.m, self.a, self.s)

    def constrain(self, att, condition, value):
        passed = self.copy()
        failed = self.copy()
        rating = getattr(self, att)

        if condition == ">":
            p = range(value + 1, rating.stop)
            f = range(rating.stop, value + 1)
        elif condition == "<":
            p = range(rating.start, value)
            f = range(value, rating.stop)

        setattr(passed, att, p)
        setattr(failed, att, f)
        return passed, failed

    def __len__(self):
        return len(self.x) * len(self.m) * len(self.a) * len(self.s)


def run_ranged_workflow(workflows, dest, part: RangedPart):
    if dest == "A":
        return len(part)
    if dest == "R":
        return 0
    ruleset: Ruleset = workflows[dest]
    total = 0
    for rule in ruleset:
        if rule.op is None:
            total += run_ranged_workflow(workflows, rule.dest, part)
            continue

        att = rule.op[0]
        cond = rule.op[1]
        value = int(rule.op[2:])
        p, part = part.constrain(att, cond, value)
        total += run_ranged_workflow(workflows, rule.dest, p)
    return total + run_ranged_workflow(workflows, ruleset[-1].dest, part)


def p2(data) -> int:
    workflows = create_rules(data[0])
    return run_ranged_workflow(workflows, "in", RangedPart())


data = [line.strip().split("\n") for line in get_split_input("\n\n")]

print("P1:", p1(data))
print("P2:", p2(data))
