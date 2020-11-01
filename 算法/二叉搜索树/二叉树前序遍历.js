

// 前序遍历

// 递归实现

//   https://leetcode-cn.com/problems/binary-tree-preorder-traversal/
//   * function TreeNode(val, left, right) {
//   *     this.val = (val===undefined ? 0 : val)
//   *     this.left = (left===undefined ? null : left)
//   *     this.right = (right===undefined ? null : right)
//   * }


let preorderTraversal  = (root, arr = []) => {
    if(root) {
      arr.push(root.val)
      preorderTraversal(root.left, arr)
      preorderTraversal(root.right, arr)
    }
    return arr
  }
  
  // 非递归实现
  
  let preorderTraversal = (root, arr = []) => {
    const stack = [], res = []
    let current = root
    while(current || stack.length > 0) {
      while (current) {
        res.push(current.val)
        stack.push(current)
        current = current.left
      }
      current = stack.pop()
      current = current.right
    }
    return res
  }
  
  var preorderTraversal = function (root) {
    const result = [];
    const stack = [];
    let current = root;
    while (current || stack.length > 0) {
      while (current) {
        result.push(current.val);
        stack.push(current);
        current = current.left;
      }
      current = stack.pop();
      current = current.right;
    }
    return result;
  };