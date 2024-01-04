package aoc

import (
	"fmt"
	"strconv"
	"strings"

	"github.com/jsec/advent-of-code/util"
)

type Password struct {
	password string
	char     string
	min      int
	max      int
}

func (p Password) IsValidByCount() bool {
	c := strings.Count(p.password, p.char)
	return (c >= p.min && c <= p.max)
}

func (p Password) IsValidByIndex() bool {
	first := string(p.password[p.min-1]) == p.char
	second := string(p.password[p.max-1]) == p.char

	return ((first && !second) || (!first && second))
}

func Day2() {
	input := util.GetInputLines()
	fmt.Println("P1:", part1(input))
	fmt.Println("P2", part2(input))
}

func part1(input []string) int {
	count := 0

	for _, i := range input{
		password := parseLine(i)
		if password.IsValidByCount() {
			count += 1
		}
	}

	return count
}

func part2(input []string) int {
	count := 0

	for _, i := range input{
		password := parseLine(i)
		if password.IsValidByIndex() {
			count += 1
		}
	}

	return count
}

func parseLine(line string) Password {
	sp := strings.Split(line, ":")
	pw := strings.TrimSpace(sp[1])
	rules := strings.Split(sp[0], " ")
	char := strings.TrimSpace(rules[1])
	counts := strings.Split(strings.TrimSpace(rules[0]), "-")
	minimum, _ := strconv.Atoi(counts[0])
	maximum, _ := strconv.Atoi(counts[1])

	return Password{
		password: pw,
		char:     char,
		min:      minimum,
		max:      maximum,
	}
}
