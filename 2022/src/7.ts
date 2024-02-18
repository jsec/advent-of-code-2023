import { getInput } from './util/input'
import { Tree, TreeNode } from './util/tree'

interface Command {
  children?: string[]
  op: string
  param?: string
}

const parse = (line: string): Command => {
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

const list = (
  tree: Tree<number>,
  children: string[],
  currentNode: TreeNode<number>
): Tree<number> => {
  for (const child of children) {
    const [param, key] = child.split(' ')

    // Check if the child is a directory listing
    if (param === 'dir') {
      const existing = tree.findByKey(key!)

      if (!existing) {
        tree.insert(key!, 0, currentNode)
        continue
      }
    }

    const size = parseInt(param!)
    tree.insert(key!, size, currentNode)
  }

  return tree
}

const changeDir = (tree: Tree<number>, command: Command): TreeNode<number> => {
  // some cd stuff
}

const buildTree = (commands: Command[]): Tree<number> => {
  const root = new TreeNode('/', 0)
  let tree = new Tree(root)
  const currentNode = root

  for (const command of commands) {
    switch (command.op) {
      case 'ls':
        tree = list(tree, command.children!, currentNode)
        break
      case 'cd':
    }
    if (command.op === 'ls') {
      for (const child of command.children) {
        const [size]
      }
    }
    console.log(command)
  }
}

const commands = getInput()
  .split('\n$')
  .map(l => l.trim())
  .slice(1)
  .map(parse)

buildTree(commands)
