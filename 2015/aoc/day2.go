package aoc

import (
	"fmt"
	"slices"
	"strings"

	"github.com/jsec/advent-of-code/util"
)

func Day2() {
	input := util.Map(util.GetInputLines(), func(s string) []int {
		return util.StringsToInts(strings.Split(s, "x"))
	})

	fmt.Println("P1:", d2p1(input))
	fmt.Println("P2:", d2p2(input))
}

func d2p1(input [][]int) int {
	sum := 0

	for _, d := range input {
		l := d[0]
		w := d[1]
		h := d[2]

		sa := 2*l*w + 2*w*h + 2*l*h
		slices.Sort(d)
		a := d[0] * d[1]

		sum += sa + a
	}

	return sum
}

func d2p2(input [][]int) int {
	sum := 0

	for _, d := range input {
		bows := d[0] * d[1] * d[2]
		slices.Sort(d)
		wrap := 2*d[0] + 2*d[1]

		sum += bows + wrap
	}

	return sum
}
