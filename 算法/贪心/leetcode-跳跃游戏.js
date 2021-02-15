/**
 * @param {number[]} nums
 * @return {boolean}
 */

// https://leetcode-cn.com/problems/jump-game/

  // 只需要判断是不是可以到达最后一个位置
  // 我们维护一个变量,判断这个变量是不是大于n-1即可
  // 这里我们需要注意的就是 当枚举到第i个节点时,如果大于 最大value, 则失败
const canJump = (nums) => {
    let value = 0, len = nums.length
    for (let i = 0; i < len; i++) {
      if (value < i) {
        break
      }
      value = Math.max(value, i + nums[i])
    }
    return value >= len - 1
  }