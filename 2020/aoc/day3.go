package aoc

import (
	"fmt"

	"github.com/jsec/advent-of-code/util"
)

func Day3() {
	input := util.GetInputLines()
	fmt.Println("P1:", d3p1(input))
	fmt.Println("P2:", d3p2(input))
}

func run(input []string, mx, my int) int {
	y := 0
	acc := 0

	for i := 0; i < len(input); i += mx {
		dy := y % len(input[0])
		if input[i][dy] == '#' {
			acc += 1
		}

		y += my
	}

	return acc
}

func d3p1(input []string) int {
	return run(input, 1, 3)
}

func d3p2(input []string) int {
	slopes := [][]int{{1, 1}, {1, 3}, {1, 5}, {1, 7}, {2, 1}}
	acc := 1
	for _, slope := range slopes {
		acc *= run(input, slope[0], slope[1])
	}
	return acc
}
