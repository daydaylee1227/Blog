/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */


// 递归写法,每次去遍历树的左右节点
// 每次分别遍历左节点,以及右节点,然后对比两者,取最大值
var maxDepth = function (root) {
    if (!root) return 0;
    return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1
};


// 非递归写法,也就是BFS
// 广度优先遍历,queue维护的内容就是每一层的节点

// 用一个temp数组去维护它的下一层的所有节点

var maxDepth = function (root) {
    if(!root) return 0
    let queue = [root],
        res = 0;
    while(queue.length) {
        let temp = []
        for(let i = 0; i < queue.length; i++) {
            if(queue[i].left) temp.push(queue[i].left)
            if(queue[i].right) temp.push(queue[i].right)
        }
        res += 1
        queue = temp
    }
    return res
};