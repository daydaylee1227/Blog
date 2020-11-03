

// 中序遍历

// 递归实现

// https://leetcode-cn.com/problems/binary-tree-inorder-traversal/
//   * function TreeNode(val, left, right) {
//   *     this.val = (val===undefined ? 0 : val)
//   *     this.left = (left===undefined ? null : left)
//   *     this.right = (right===undefined ? null : right)
//   * }


const inorderTraversal  = (root, arr = []) => {
    if(root) {
      inorderTraversal(root.left, arr)
      arr.push(root.val)
      inorderTraversal(root.right, arr)
    }
    return arr
  }
  
  // 非递归实现
  
  const inorderTraversal = (root, arr = []) => {
    const stack = [], res = []
    let current = root
    while(current || stack.length > 0) {
      while (current) {
        stack.push(current)
        current = current.left
      }
      current = stack.pop()
      res.push(current.val)
      current = current.right
    }
    return res
  }
  