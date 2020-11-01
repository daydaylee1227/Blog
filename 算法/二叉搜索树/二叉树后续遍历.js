

// 后续遍历

// 递归实现

// https://leetcode-cn.com/problems/binary-tree-inorder-traversal/
//   * function TreeNode(val, left, right) {
//   *     this.val = (val===undefined ? 0 : val)
//   *     this.left = (left===undefined ? null : left)
//   *     this.right = (right===undefined ? null : right)
//   * }


const postorderTraversal  = (root, arr = []) => {
    if(root) {
      postorderTraversal(root.left, arr)
      postorderTraversal(root.right, arr)
      arr.push(root.val)
    }
    return arr
  }
  
  // 非递归实现
  
  
  // 取跟节点为目标节点，开始遍历
  // 1.左孩子入栈 -> 直至左孩子为空的节点
  // 2.栈顶节点的右节点为空或右节点被访问过 -> 节点出栈并访问他，将节点标记为已访问
  // 3.栈顶节点的右节点不为空且未被访问，以右孩子为目标节点，再依次执行1、2、3
  
  
  const postorderTraversal = (root, arr = []) => {
  
    const stack = [], res = []
    let current = root, last = null  // last指针记录上一个节点
    while(current || stack.length > 0) {
      while (current) {
        stack.push(current)
        current = current.left
      }
      current = stack[stack.length - 1]
      if (!current.right || current.right == last) {
        current = stack.pop()
        res.push(current.val)
        last = current
        current = null              // 继续弹栈
      } else {
        current = current.right
      }
    }
    return res
  }
  
  
  