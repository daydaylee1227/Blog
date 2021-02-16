/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
// https://leetcode-cn.com/problems/symmetric-tree/
// 解题思路
// 队列q：放入根节点两次，对称树总有
// 左节点的左子节点 = 右节点的右子节点
// 左节点的右子节点 = 右节点的左子节点
// 按照上面的顺序，依次向队列放入子节点
// 队列q中两两拿出节点比较
// 节点值不相等，不对称
// 一个节点为null，一个节点不为null，不对称
// 两个节点都为null，对称且无子节点，直接跳过
const isSymmetric = (root) => {
    const queue = [root, root]
    while (queue.length) {
      const m = queue.shift(), n = queue.shift()
      if (!m && !n) continue
      if (!m || !n || m.val !== n.val) return false
      queue.push(m.left, n.right, m.right, n.left)
    }
    return true
  }