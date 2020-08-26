// https://leetcode-cn.com/problems/binary-tree-level-order-traversal/

// 中等难度
// - 这个题最简单的做法就是BFS
// - 每次遍历一层的时候，把它的子节点依次按顺序保存temp
// - 把子节点的结果作为新的结果，也就是que = temp



var levelOrder = function (root) {
    let res = [],
        que = [root];
    if (!root) return []
    while (que.length) {
        let temp = [],
            ans = []
        for (let i = 0; i < que.length; i++) {
            ans.push(que[i].val)
            if (que[i].left) temp.push(que[i].left)
            if (que[i].right) temp.push(que[i].right)
        }
        res.push(ans)
        que = temp
    }
    return res;
};