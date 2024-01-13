package aoc

import (
	"fmt"
	"slices"
	"strings"

	"github.com/jsec/advent-of-code/util"
)

func Day5() {
	input := util.GetInputLines()
	fmt.Println("P1:", d5p1(input))
	fmt.Println("P2:", d5p2(input))
}

func d5p1(input []string) int {
	scores := getScores(input)
	return slices.Max(scores)
}

func d5p2(input []string) int {
	scores := getScores(input)
	slices.Sort(scores)

	for i, s := range scores {
		if s != 0 && scores[i+1] != s+1 {
			return s + 1
		}
	}
	return -1
}

func getScores(input []string) []int {
	scores := make([]int, len(input))
	rows := util.RangeSlice(128)
	columns := util.RangeSlice(8)

	for _, pass := range input {
		score := getScore(pass, rows, columns)
		scores = append(scores, score)
	}

	return scores
}

func getScore(pass string, rows, columns []int) int {
	pass = strings.ReplaceAll(pass, "F", "L")
	pass = strings.ReplaceAll(pass, "B", "R")

	row := partition(rows, pass[:7])
	column := partition(columns, pass[7:])

	return row*8 + column
}

func partition(n []int, p string) int {
	for _, c := range p {
		length := len(n)
		if c == 'L' {
			n = n[:length/2]
		} else {
			n = n[length/2:]
		}
	}

	return n[0]
}
