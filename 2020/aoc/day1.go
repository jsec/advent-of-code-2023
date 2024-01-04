package aoc

import (
	"fmt"

	"github.com/jsec/advent-of-code/util"
	"gonum.org/v1/gonum/stat/combin"
)

func Day1() {
	entries := util.StringsToInts(util.GetInputLines())
	fmt.Println("P1:", findProduct(entries, 2))
	fmt.Println("P2:", findProduct(entries, 3))
}

func findProduct(entries []int, length int) int {
	combinations := combin.Combinations(len(entries), length)
	for _, c := range combinations {
		sum := 0
		for _, idx := range c {
			sum += entries[idx]
		}

		if sum == 2020 {
			prod := 1
			for _, idx := range c {
				prod *= entries[idx]
			}

			return prod
		}
	}

	return -1
}
