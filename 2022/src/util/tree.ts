export interface ITreeNode {
  children: ITreeNode[]
  parent: ITreeNode | null
}

export class TreeNode implements ITreeNode {
  public children: ITreeNode[]
  public parent: ITreeNode | null

  constructor(parent: ITreeNode | null) {
    this.parent = parent
    this.children = []
  }
}
