/**
 * // Definition for a Node.
 * function Node(val, children) {
 *    this.val = val;
 *    this.children = children;
 * };
 */

/**
 * @param {Node} root
 * @return {number[]}
 */

// N叉树的前序遍历 这个题目最好用两种写法来完成这个思路
var preorder = function (root) {
    let res = [],
        stack = []
    if(!root) return []
    stack.push(root)
    while(stack.length) {
        let node = stack.pop()
        if(!node) return 
        res.push(node.val)
        for(let i = node.children.length-1; i >= 0; i--){
            stack.push(node.children[i])
        }
    }
    return res
}; 