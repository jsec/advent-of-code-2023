package aoc

import (
	"fmt"
	"strings"

	"github.com/jsec/advent-of-code/util"
)

func Day5() {
	input := util.GetInputLines()
	fmt.Println("P1:", d5p1(input))
}

func d5p1(input []string) int {
	sum := 0
	for _, s := range input {
		if isValid(s) {
			sum += 1
		}
	}

	return sum
}

func isValid(s string) bool {
	vowels := vowelCount(s)
	if vowels < 3 {
		return false
	}

	if !hasConsecutiveChars(s) {
		return false
	}

	badSubstrings := []string{"ab", "cd", "pq", "xy"}
	for _, b := range badSubstrings {
		if strings.Contains(s, b) {
			return false
		}
	}

	return true
}

func vowelCount(s string) int {
	count := 0
	for _, c := range s {
		switch c {
		case 'a', 'e', 'i', 'o', 'u':
			count += 1
		}
	}

	return count
}

func hasConsecutiveChars(s string) bool {
	found := false

	for i, c := range s[:len(s)-1] {
		if string(s[i+1]) == string(c) {
			found = true
		}
	}

	return found
}
