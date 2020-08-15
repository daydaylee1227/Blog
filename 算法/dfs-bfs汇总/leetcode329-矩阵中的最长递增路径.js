// https://leetcode-cn.com/problems/longest-increasing-path-in-a-matrix/


// 矩阵中的最长递增路径

//  DFS经典问题 需要做的就是剪枝

// 0和1、1和0、0和-1、-1和0，四个方向

const dx = [0, 1, 0, -1];
const dy = [1, 0, -1, 0];
const longestIncreasingPath = (matrix) => {
    if (matrix.length == 0) return 0;
    const m = matrix.length;
    const n = matrix[0].length;
    const dp = new Array(m);
    for (let i = 0; i < m; i++) dp[i] = new Array(n);
    // 每次长度至少长度为1
    let res = 1;

    //// 对坐标(i,j)进行dfs
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            res = Math.max(res, dfs(matrix, i, j, m, n, dp));
        }
    }
    return res;
};

const dfs = (matrix, i, j, m, n, dp) => {
    // 记忆化搜索
    if (dp[i][j]) return dp[i][j];
    let max = 1;

    // 以(i,j)为起点的路径，长度保底是1
    for (let k = 0; k < 4; k++) { //循环四次 就是有上下左右四个方向可以走
        const x = i + dx[k];
        const y = j + dy[k];
        // 判断接下来的坐标是否合法
        //  0<=x && x < m
        //  0 <= y <= n
        if (x >= 0 && x < m && y >= 0 && y < n && matrix[x][y] > matrix[i][j]) {
            max = Math.max(max, 1 + dfs(matrix, x, y, m, n, dp));
        }
    }
    // 当前情况下, 需要求的就是(i,j)方格的最大值
    return dp[i][j] = max;
};