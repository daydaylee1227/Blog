// 爬楼梯
// https://leetcode-cn.com/problems/climbing-stairs/
/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function(n) {

    // 第一步：定义dp数组,dp[i] 表示的含义:到第i阶方案数

    let dp = []

    // 第二步： 确定状态转移方程
    // 很容易得到,到第i阶梯有两种方式
    // 第一种, 从i-1向上走一步即可
    // 第二中，从i-2向上走二步即可
    // 所以 dp[i] = dp[i-1] + dp[i-2]

    // 第三步,初始化dp数组
    dp[1] = 1,dp[2] = 2
    for(let i = 3; i <= n; i++) {
        dp[i] = dp[i-1] + dp[i-2]
    }

    return dp[n]
};