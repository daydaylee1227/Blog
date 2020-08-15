// 给定一个二叉树，找出其最小深度。




// 非递归的写法,思路 BFS

// 遍历这个树的每一层,当这个一层级的节点都没有左右节点时,直接返回结果
// 遍历每一层的节点,当这个stack种,某个节点的左右节点都是空时,即找到目标节点。
var minDepth = function (root) {
    if (!root) return 0
    let stack = [root],
        ans = 0
    while (stack.length) {
        let temp = []
        ans++
        for (let i = 0; i < stack.length; i++) {
            if (stack[i].left == null && stack[i].right == null) return ans;
            if (stack[i].left) temp.push(stack[i].left)
            if (stack[i].right) temp.push(stack[i].right)
        }
        stack = temp;
    }
    return ans
};


// 递归的写法

// 1. 判断当前节点是否是根，并且为空,是的话,返回0
// 2. 当前节点的左右节点都是null,也就是叶子节点时,此时就是目标节点,最小深度,返回1
// 3. 当前节点的左节点不为null,找左子树的深度
// 4. 当前节点的右节点不为null,找右子树的深度
// 5. 比较两者,返回的就是3和4条件的最小值,并且加1
var minDepth = function (root) {
    if (root == null) return 0
    if (root.left == null && root.right == null) return 1
    let max = 10000;
    if (root.left) max = Math.min(max, minDepth(root.left))
    if (root.right) max = Math.min(max, minDepth(root.right))
    return max + 1
};