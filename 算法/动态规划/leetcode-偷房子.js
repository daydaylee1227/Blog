/**
 * @param {number[]} nums
 * @return {number}
 */

// 第一步：定义状态dp[i][j]
// 这里就利用二维状态,既然可以选择偷或者是不偷
// dp[i][0] 表示不偷当前第i个房间,获取最高金币数
// dp[i][1] 表示的是偷第i房间,获取最高金币数
// 第二步：确定状态转移方程
// 第i个房间偷的话,dp[i][1] = nums[i] + dp[i-1][0]
// 第i个房间不偷的话, dp[i][0] = Math.max(dp[i-1][0],dp[i-1][1])
// 第三步：初始化状态
// dp[0][0] = 0
// dp[0][1] = nums[0]


// 但是这个题目难点在于它第一个房子跟最后一个房子是连在一起的
// 所以我们需要做些改变
var rob = function (nums) {
    const n = nums.length;
    if (n === 0) return 0;
    if (n === 1) return nums[0];
  
    function dpHandle(nums) {
      const n = nums.length;
      if (n === 0) return 0;
      if (n === 1) return nums[0];
      let dp = Array.from(new Array(n), () => new Array(n).fill(0));
      dp[0][0] = 0;
      dp[0][1] = nums[0];
      for (var i = 1; i < n; i++) {
        dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1]);
        dp[i][1] = dp[i - 1][0] + nums[i];
      }
      return Math.max(dp[n - 1][0], dp[n - 1][1]);
    }
    const ans1 = dpHandle(nums.slice(1))
    const ans2 = dpHandle(nums.slice(0, nums.length - 1))
    return Math.max(ans1, ans2)
  };
  