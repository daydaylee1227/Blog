/**
 * @param {number[][]} grid
 * @return {number}
 */

// https://leetcode-cn.com/problems/minimum-path-sum/

// dp[i][j] 第i行第j列最小值
// dp[i][j] = Math.min(dp[i][j - 1] + grid[i][j], dp[i-1][j]+grid[i][j])

const minPathSum = (grid) => {
    let col = grid.length, raw = grid[0].length
    let dp =  Array.from(new Array(col), () => new Array(raw).fill(0))
    for (let i = 0; i < col; i++) {
      for (let j = 0; j < raw; j++) {
        if (i === 0 || j === 0) {
          const minI = i - 1 <= 0 ? 0 : i - 1
          const minJ = j-1 <= 0 ? 0 : j-1
          dp[i][j] = i === 0 ? (grid[i][j] + dp[i][minJ]) : (dp[minI][j]+grid[i][j])
        } else {
          dp[i][j] = Math.min(dp[i - 1][j] + grid[i][j], dp[i][j - 1] + grid[i][j])
        }
      }
    }
    return dp[col-1][raw-1]
  }
