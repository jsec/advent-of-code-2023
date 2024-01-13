package aoc

import (
	"fmt"
	"regexp"
	"slices"
	"strconv"
	"strings"

	"github.com/jsec/advent-of-code/util"
)

type Passport struct {
	byr int
	iyr int
	eyr int
	hgt string
	hcl string
	ecl string
	pid string
	cid string
}

func (p *Passport) IsValid() bool {
	EYE_COLORS := []string{"amb", "blu", "brn", "gry", "grn", "hzl", "oth"}

	if p.byr < 1920 || p.byr > 2002 {
		return false
	}

	if p.iyr < 2010 || p.iyr > 2020 {
		return false
	}

	if p.eyr < 2020 || p.eyr > 2030 {
		return false
	}

	if p.hgt != "" {
		unit := p.hgt[len(p.hgt)-2:]

		if unit != "in" && unit != "cm" {
			return false
		}

		height, err := strconv.Atoi(p.hgt[:len(p.hgt)-2])

		if err != nil {
			return false
		}

		if unit == "cm" && (height < 150 || height > 193) {
			return false
		}

		if unit == "in" && (height < 59 || height > 76) {
			return false
		}
	}

	if len(p.hcl) != 7 || p.hcl[0] != '#' {
		return false
	}

	if !slices.Contains(EYE_COLORS, p.ecl) {
		return false
	}

	if len(p.pid) != 9 {
		return false
	}

	var re = regexp.MustCompile(`^[0-9]+$`)
	if !re.MatchString(p.pid) {
		return false
	}

	return true
}

func CreatePassport(input string) (Passport, error) {
	fields := strings.Split(input, " ")

	p := Passport{}

	for _, field := range fields {
		field, value := func() (string, string) {
			s := strings.Split(field, ":")
			return s[0], s[1]
		}()

		switch field {
		case "byr":
			byr, err := strconv.Atoi(value)
			if err != nil {
				return Passport{}, err
			}
			p.byr = byr
		case "iyr":
			iyr, err := strconv.Atoi(value)
			if err != nil {
				return Passport{}, err
			}
			p.iyr = iyr
		case "eyr":
			eyr, err := strconv.Atoi(value)
			if err != nil {
				return Passport{}, err
			}
			p.eyr = eyr
		case "hgt":
			p.hgt = value
		case "hcl":
			p.hcl = value
		case "ecl":
			p.ecl = value
		case "pid":
			p.pid = value
		case "cid":
			p.cid = value
		}
	}

	return p, nil
}

func Day4() {
	input := util.SplitInput("\n\n")
	fmt.Println("P1:", d4p1(input))
	fmt.Println("P2:", d4p2(input))
}

func d4p1(input []string) int {
	sum := 0

	for _, passport := range input {
		passport = strings.ReplaceAll(passport, "\n", " ")
		if isValidP1(passport) {
			sum += 1
		}
	}
	return sum
}

func d4p2(input []string) int {
	sum := 0

	for _, i := range input {
		i = strings.ReplaceAll(i, "\n", " ")

		if !isValidP1(i) {
			continue
		}

		passport, err := CreatePassport(i)
		if err != nil {
			fmt.Println(err.Error())
			return -1
		}

		if passport.IsValid() {
			sum += 1
		}
	}
	return sum
}

func isValidP1(passport string) bool {
	fields := strings.Split(passport, " ")
	if len(fields) == 8 {
		return true
	}

	if len(fields) < 7 {
		return false
	}

	for _, field := range fields {
		name := field[:3]
		if name == "cid" {
			return false
		}
	}

	return true
}
