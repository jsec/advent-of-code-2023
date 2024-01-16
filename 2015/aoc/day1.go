package aoc

import (
	"fmt"

	"github.com/jsec/advent-of-code/util"
)

func Day1() {
	input := util.GetInput()

	fmt.Println("P1:", RunD1(input, false))
	fmt.Println("P2:", RunD1(input, true))
}

func RunD1(input string, p2 bool) int {
	floor := 0
	for idx, c := range input {
		if string(c) == "(" {
			floor += 1
		} else {
			floor -= 1
		}

		if p2 && floor < 0 {
			return idx
		}
	}

	return floor
}
