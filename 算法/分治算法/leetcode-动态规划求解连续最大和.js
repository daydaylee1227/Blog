
//https://leetcode-cn.com/problems/contiguous-sequence-lcci/


const maxSubArray = function(nums) {
    const len = nums.length
    if(len === 0) return nums[0]
    const dp = new Array(len)
    let ans = nums[0]
    dp[0] = nums[0]
    for(let i = 1; i < len; i++) {
        dp[i] = Math.max(nums[i], dp[i-1] + nums[i])
        ans = Math.max(dp[i], ans)
    }
    return ans
}