package util

import (
	"fmt"
	"strconv"
)

// Usage:
// mapped := Map(input, func(item int) int { return item + 1 })
func Map[T, V any](ts []T, fn func(T) V) []V {
	result := make([]V, len(ts))

	for i, t := range ts {
		result[i] = fn(t)
	}

	return result
}

func StringsToInts(a []string) []int {
	return Map(a, func(i string) int {
		value, err := strconv.Atoi(i)

		if err != nil {
			fmt.Println("Error converting value:", i)
			return -1
		}

		return value
	})
}
