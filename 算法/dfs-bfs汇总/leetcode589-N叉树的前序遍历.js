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

// 第一种就是递归的思路
// 模拟递归思路即可
var preorder = function (root) {
    let res = []
    if (!root) return []

    function resolve(root) {
        if (!root) return  
        res.push(root.val)
        for (let i = 0; i < root.children.length; i++)
            resolve(root.children[i])
    }
    resolve(root);
    return res
};




// 第二种就是非递归的思路 利用栈,每次把节点存进去
// 需要注意的就是从后往前遍历子节点

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
