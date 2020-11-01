// 层次遍历

// 递归实现

//   https://leetcode-cn.com/problems/binary-tree-level-order-traversal/
//   * function TreeNode(val, left, right) {
//   *     this.val = (val===undefined ? 0 : val)
//   *     this.left = (left===undefined ? null : left)
//   *     this.right = (right===undefined ? null : right)
//   * }

const levelOrder = function(root) {
    if(!root) return []
    let res = []
    dfs(root, 0, res)
    return res
  };
  
  function dfs(root, step, res){
    if(root){
        if(!res[step]) res[step] = []
        res[step].push(root.val)
        dfs(root.left, step + 1, res)
        dfs(root.right, step + 1, res)
      }
  }
  
  
  // 非递归实现
  
  // 取跟节点为目标节点，开始遍历
  // 1.左孩子入栈 -> 直至左孩子为空的节点
  // 2.栈顶节点的右节点为空或右节点被访问过 -> 节点出栈并访问他，将节点标记为已访问
  // 3.栈顶节点的右节点不为空且未被访问，以右孩子为目标节点，再依次执行1、2、3
  
  const levelOrder = (root) => {
    let queue = [], res = []
    if (root) queue.push(root);
    while (queue.length) {
        let next_queue = [],
            now_res = []
        while (queue.length) {
            root = queue.shift()
            now_res.push(root.val)
            root.left && next_queue.push(root.left)
            root.right && next_queue.push(root.right)
        }
        queue = next_queue
        res.push(now_res)
    }
    return res
  }