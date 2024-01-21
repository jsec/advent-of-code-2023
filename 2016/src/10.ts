import { getInputLines } from './util/input'

class Bot {
  private chips: number[]
  private factory: Factory
  private highId: string
  private highType: string
  private id: string
  private lowId: string
  private lowType: string

  constructor(id: string, factory: Factory, lowType: string, lowId: string, highType: string, highId: string) {
    this.id = id
    this.chips = []
    this.factory = factory
    this.highId = highId
    this.highType = highType
    this.lowId = lowId
    this.lowType = lowType
  }

  handle(chip: number): void {
    this.chips.push(chip)

    if (this.chips.length < 2) {
      return
    }

    const low = Math.min(...this.chips)
    const high = Math.max(...this.chips)

    // P1
    if (low === 17 && high === 61) {
      console.log('P1:', this.id)
    }

    this.factory.send(this.lowType, this.lowId, low)
    this.factory.send(this.highType, this.highId, high)
    this.chips = []
  }
}

class Factory {
  public bots: Record<string, Bot> = {}
  public outputs: Record<string, number[]> = {}

  constructor(setups: string[]) {
    for (const setup of setups) {
      const split = setup.split(' ')

      const id = split[1]!
      const lowType = split[5]!
      const lowId = split[6]!
      const highType = split[10]!
      const highId = split[11]!

      if (lowType === 'output') {
        this.outputs[lowId] = []
      }

      if (highType === 'output') {
        this.outputs[highId] = []
      }

      this.bots[id] = new Bot(id, this, lowType, lowId, highType, highId)
    }
  }

  public run(commands: string[]): void {
    for (const c of commands) {
      const split = c.split(' ')
      this.send('bot', split[5]!, parseInt(split[1]!))
    }

    // P2
    const p2 = [0, 1, 2].reduce((a, c) => a * this.outputs[c][0], 1)
    console.log('P2:', p2)
  }

  public send(type: string, id: string, chip: number): void {
    if (type == 'bot') {
      this.bots[id]!.handle(chip)
    }
    else {
      this.outputs[id]!.push(chip)
    }
  }
}

const input = getInputLines()

const values = input.filter(i => i.startsWith('value'))
const setups = input.filter(i => i.startsWith('bot'))

const factory = new Factory(setups)
factory.run(values)
