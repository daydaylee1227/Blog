
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

class Person {
    constructor() {
        this._locate = () => console.log('instance', this)
    }
    _locate = () => console.log('instance1', this)
    static _locate = () => console.log('instance2', this)
}