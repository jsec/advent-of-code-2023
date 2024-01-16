package util

import "strings"

func Dedupe(input string) string {
	unique := []string{}

	for _, c := range input {
		cs := string(c)
		if Contains(unique, cs) {
			continue
		}

		unique = append(unique, cs)
	}

	return strings.Join(unique, "")
}

func Contains(strs []string, str string) bool {
	for _, s := range strs {
		if s == str {
			return true
		}
	}
	return false
}
