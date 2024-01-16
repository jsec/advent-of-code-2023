package aoc

import (
	"fmt"

	mapset "github.com/deckarep/golang-set/v2"
	"github.com/jsec/advent-of-code/util"
)

type House struct {
	x int
	y int
}

func Day3() {
	input := util.GetInput()
	fmt.Println("P1:", d3p1(input))
	fmt.Println("P2:", d3p2(input))
}

func d3p1(input string) int {
	x, y := 0, 0

	set := mapset.NewSet[House]()
	set.Add(House{x: x, y: y})

	for _, d := range input {
		x, y = moveSanta(string(d), x, y)
		set.Add(House{x: x, y: y})
	}

	return set.Cardinality()
}

func d3p2(input string) int {
	x1, x2, y1, y2 := 0, 0, 0, 0

	set := mapset.NewSet[House]()
	set.Add(House{x: x1, y: y1})

	for idx, d := range input {
		if idx%2 == 0 {
			x1, y1 = moveSanta(string(d), x1, y1)
			set.Add(House{x: x1, y: y1})
		} else {
			x2, y2 = moveSanta(string(d), x2, y2)
			set.Add(House{x: x2, y: y2})
		}
	}

	return set.Cardinality()
}

func moveSanta(s string, x, y int) (dx, dy int) {
	switch s {
	case ">":
		x += 1
	case "<":
		x -= 1
	case "^":
		y -= 1
	case "v":
		y += 1
	}

	return x, y
}
