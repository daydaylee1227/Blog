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
 * @param {number} k
 * @return {number}
 */

// 二叉搜索树其实就是中序遍历实现的,所以我们可以这么做
// 来实现中序遍历
// 中序遍历的思路,先遍历左子树，然后根节点，然后是右子树。
// 用递归来实现的话,我们可以用stack来维护,每次先遍历当前根结点所有左子树
// 然后遍历完后,取出stack中最小的根结点,判断是否符合结果,不符合结果的话,继续操作。
// 然后把遍历当前节点的左节点，然后是右节点。

// const kthSmallest = (root, k) => {
//     let stack = [], node = root
//     while (node || stack.length) {
//       // 将左侧的所有节点放入stack
//       while (node) {
//         stack.push(node)
//         node = node.left
//       }
//       // 当前中间节点出栈
//       node = stack.pop()
//       if (--k === 0) { // 找到结果
//         return node.val
//       }
//       // 把当前右侧节点放入栈
//       node = node.right
//     }
//     return null
//   }

// 递归的思路:
// 先遍历左子树,当curret node 是叶子节点时,判断当前的属于第k大即可。
const kthSmallest = (root, k) => {
    let res = null
    const dfs = (root) => {
      if (root && !res && k > 0) {
        dfs(root.left)
        if (--k === 0) {
          res = root.val
          return 
        }
        dfs(root.right)
      }
    }
    dfs(root)
    return res
  }