// 给定一个 N 叉树，返回其节点值的层序遍历。 (即从左到右，逐层遍历)。

// https://leetcode-cn.com/problems/n-ary-tree-level-order-traversal/


// 常规题,就是按照这个BFS的套路,输出即可


var levelOrder = function (root) {
    if (!root) return []
    let result = [],
        que = [root];
    while (que.length) {
        let temp = [] // 存放的是下一次的结果
        let ans = []
        for (let i = 0; i < que.length; i++) {
            let node = que[i]
            ans.push(node.val)
            if(node.children && node.children.length )
                temp.push(...node.children)
        }
        result.push(ans)
        que = temp
    }
    return result
};