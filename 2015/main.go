package main

import (
	"fmt"
	"os"
	"strconv"
)

func main() {
	args := os.Args[1:]
	if len(args) == 0 {
		fmt.Println("No day specified")
		return
	}

	day, err := strconv.Atoi(args[0])
	if err != nil {
		fmt.Println(err.Error())
		return
	}

	Run(day)
}
