import { getInput } from './util/input'
import { TreeNode } from './util/tree'

interface Command {
  children?: string[]
  op: string
  param?: string
}

class FileNode extends TreeNode {
  public children: FileNode[]
  public isDirectory: boolean
  public name: string
  public size: number

  constructor(parent: FileNode | null, name: string, size: number, isDirectory = false) {
    super(parent)

    this.children = []
    this.name = name
    this.size = size
    this.isDirectory = isDirectory
  }
}

const parseCommand = (line: string): Command => {
  if (line.startsWith('cd')) {
    const [op, param] = line.split(' ')
    return {
      op: op!,
      param: param!,
    }
  }

  return {
    children: line.split('\n').slice(1),
    op: 'ls',
  }
}

const list = (currentNode: FileNode, children: string[]) => {
  for (const child of children) {
    const [param, key] = child.split(' ')

    const isDirectory = param === 'dir'

    const size = isDirectory ? 0 : parseInt(param!)
    currentNode.children.push(new FileNode(currentNode, key!, size, isDirectory))
  }
}

const changeDir = (currentNode: FileNode, dir: string): FileNode => {
  if (dir === '..') {
    return currentNode.parent as FileNode
  }

  return currentNode.children.find(c => c.name === dir)!
}

const buildDisk = (commands: Command[]): FileNode => {
  const disk = new FileNode(null, '/', 0, true)
  let currentNode = disk

  for (const command of commands) {
    switch (command.op) {
      case 'ls':
        list(currentNode, command.children!)
        break
      case 'cd':
        currentNode = changeDir(currentNode, command.param!)
    }
  }

  return disk
}

const getSizes = (disk: FileNode): number[] => {
  const sizes: number[] = []

  const traverse = (node: FileNode): number => {
    if (node.isDirectory) {
      const size: number = node.children.reduce((a, c) => a + traverse(c), 0)

      sizes.push(size)
      return size
    }

    return node.size
  }

  traverse(disk)

  return sizes
}

const p1 = (disk: FileNode): number => {
  return getSizes(disk)
    .filter(s => s <= 100000)
    .reduce((a, c) => a + c, 0)
}

const p2 = (disk: FileNode, capacity: number, targetFree: number): number => {
  const sizes = getSizes(disk).sort((a, b) => a - b)
  const free = capacity - sizes.at(-1)!

  return sizes.find(size => size >= targetFree - free)!
}

const commands = getInput()
  .split('\n$')
  .map(l => l.trim())
  .slice(1)
  .map(parseCommand)

const disk = buildDisk(commands)

console.log('P1:', p1(disk))
console.log('P2:', p2(disk, 70000000, 30000000))
