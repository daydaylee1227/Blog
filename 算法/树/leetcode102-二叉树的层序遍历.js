// https://leetcode-cn.com/problems/binary-tree-level-order-traversal/

// 中等难度

var levelOrder = function (root) {
    let res = [],
        que = [root],
        flag = 0;
    if (!root) return []
    while (que.length) {
        let temp = [],
            ans = []
        flag++;
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