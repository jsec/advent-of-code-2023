package aoc

import (
	"crypto/md5"
	"encoding/hex"
	"fmt"
	"io"
	"strconv"

	"github.com/jsec/advent-of-code/util"
)

func Day4() {
	input := util.GetInput()
	fmt.Println("P1:", solveD4(input, 5, "00000"))
	fmt.Println("P2:", solveD4(input, 6, "000000"))
}

func hash(s string) string {
	h := md5.New()

	_, err := io.WriteString(h, s)
	if err != nil {
		fmt.Println(err.Error())
		return ""
	}

	return hex.EncodeToString(h.Sum(nil))
}

func solveD4(input string, l int, s string) int {
	num := 0
	candidate := input + strconv.Itoa(num)

	for {
		h := hash(candidate)
		if h[:l] == s {
			return num
		}

		num += 1
		candidate = input + strconv.Itoa(num)
	}
}
