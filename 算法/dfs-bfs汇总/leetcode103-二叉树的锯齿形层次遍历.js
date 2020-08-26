// https://leetcode-cn.com/problems/binary-tree-zigzag-level-order-traversal/






// BFS套路题
// 唯一需要注意的就是判断奇偶情况
var zigzagLevelOrder = function (root) {
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
        // 判断奇偶情况,然后翻转
        if (flag % 2 === 1) {
            res.push(ans)
        } else {
            res.push(ans.reverse())
        }
        que = temp // 套路,将这个层级的从新压入栈
    }
    return res;
};