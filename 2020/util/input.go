package util

import (
	"os"
	"strings"
)

func GetInput() string {
	input, err := os.ReadFile("input.txt")
	if err != nil {
		return ""
	}

	return strings.TrimSpace(string(input))
}

func GetInputLines() []string {
	return strings.Split(GetInput(), "\n")
}
