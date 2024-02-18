export class TreeNode<T> {
  public children: TreeNode<T>[]
  public parent?: string

  constructor(public key: string, public value: T) {
    this.children = []
  }

  addChild(child: TreeNode<T>): void {
    this.children.push(child)
    child.parent = this.key
  }
}

export class Tree<T> {
  private root: TreeNode<T>
  public nodes: TreeNode<T>[]

  constructor(root: TreeNode<T>) {
    this.root = root
    this.nodes = [this.root]
  }

  find(callback: (node: TreeNode<T>) => boolean, start?: TreeNode<T>): TreeNode<T> | null {
    if (!start) {
      start = this.root
    }

    const visited = new Set<TreeNode<T>>()
    const stack: TreeNode<T>[] = []

    stack.push(start)

    while (stack.length > 0) {
      const current = stack.pop()!

      if (!visited.has(current)) {
        if (callback(current)) {
          return current
        }

        visited.add(current)
        for (const child of current.children) {
          stack.push(child)
        }
      }
    }

    return null
  }

  findByKey(key: string): TreeNode<T> | null {
    return this.find(node => node.key === key)
  }

  insert(key: string, value: T, parent?: TreeNode<T>): TreeNode<T> {
    const node = new TreeNode(key, value)
    this.nodes.push(node)

    if (parent) {
      parent.addChild(node)
    }

    return node
  }
}
