/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */


// dp[i][j] 表示的就是到第i格第j列时的方案数
// dp[i][j] = dp[i-1][j] + dp[i][j-1]
const uniquePaths = (m, n) => {
    const dp = Array.from(new Array(m), () => (new Array(n).fill(0)))
    for (let i = 0; i < m; i++) {
      for (let j = 0; j < n; j++) {
        if (i === 0 || j === 0) {
          dp[i][j] = 1
        } else {
          dp[i][j] = dp[i-1][j] + dp[i][j-1]
        }
      }
    }
    return dp[m-1][n-1]
  }