const { rotate } = require('./util/array')
const { getInput } = require('./util/input')

class Board {
  constructor(input) {
    this.cards = input.split('\n').map(line =>
      line.replace(/\s+/g, ' ').trim().split(' ').map(square => {
        return {
          called: false,
          number: parseInt(square.trim()),
        }
      })
    )
  }

  checkNumber(called) {
    for (let x = 0; x < this.cards.length; x++) {
      const row = this.cards[x]
      for (let y = 0; y < row?.length; y++) {
        if (row[y]?.number === called) {
          this.cards[x][y].called = true
          return true
        }
      }
    }

    return false
  }

  get isWinner() {
    // Check if any rows are winners
    const winningRows = this.cards.map(row => row.every(num => num.called)).filter(winner =>
      winner === true
    )

    if (winningRows.length > 0) {
      return true
    }

    // Check if any columns are winners
    const winningColumns = rotate(this.cards).map(row => row.every(num => num.called)).filter(
      winner => winner === true,
    )
    if (winningColumns.length > 0) {
      return true
    }

    return false
  }

  get unmarkedSum() {
    let sum = 0

    for (const row of this.cards) {
      for (const square of row) {
        if (!square.called) {
          sum += square.number
        }
      }
    }

    return sum
  }
}

const p1 = (numbers, boards) => {
  for (const number of numbers) {
    for (const board of boards) {
      const match = board.checkNumber(number)
      if (match && board.isWinner) {
        return board.unmarkedSum * number
      }
    }
  }

  return -1
}

const p2 = (numbers, boards) => {
  let lastBoard

  for (const number of numbers) {
    boards.forEach(b => b.checkNumber(number))
    boards = boards.filter(b => !b.isWinner)

    if (boards.length === 1) {
      lastBoard = boards[0]
    }

    if (boards.length === 0) {
      return lastBoard?.unmarkedSum * number
    }
  }
}

const input = getInput()

const [numberList, ...cardList] = input.split('\n\n')
const numbers = numberList.trim().split(',').map(i => parseInt(i))
const boards = cardList.map(c => new Board(c))

const ans1 = p1(numbers, boards)
console.log('P1:', ans1)

const ans2 = p2(numbers, boards)
console.log('P2:', ans2)
