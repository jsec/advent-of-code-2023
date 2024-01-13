package aoc

import (
	"fmt"
	"strings"

	"github.com/jsec/advent-of-code/util"
)

func Day6() {
	input := util.SplitInput("\n\n")

	fmt.Println("P1:", d6p1(input))
}

func d6p1(input []string) int {
	sum := 0
	for _, group := range input {
		group = strings.ReplaceAll(group, "\n", "")
		sum += len(util.Dedupe(group))
	}

	return sum
}

func d6p2() int {
	return 4
}
