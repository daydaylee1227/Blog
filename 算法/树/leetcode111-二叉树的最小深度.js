// 给定一个二叉树，找出其最小深度。




// 非递归的写法,思路
// 遍历这个树的每一层,当这个一层级的节点都没有左右节点时,直接返回结果

var minDepth = function (root) {
    if (!root) return 0
    let stack = [root],
        ans = 0
    while(stack.length) {
        let temp = []
        ans++
        for(let i = 0; i < stack.length; i++) {
            if(stack[i].left == null && stack[i].right == null) return ans;
            if(stack[i].left) temp.push(stack[i].left)
            if(stack[i].right) temp.push(stack[i].right)
        }
        stack = temp;
    }
    return ans
};