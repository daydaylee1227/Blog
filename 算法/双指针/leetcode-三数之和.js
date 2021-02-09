/**
 * @param {number[]} nums
 * @return {number[][]}
 */

// https://leetcode-cn.com/problems/3sum/
// 最暴力得解法就是 O(n^3) 直接去枚举每个人
  // 如何优化呢,我们能不能这么想以一个人为中心去枚举
  // 接下来,就在后面的区间内去查找他们
  // sum < 0 则left指针就向右走
  // sum > 0 则right指针就向左走
  // 最后需要注意的就是答案不能重复,需要去重
const  threeSum = (nums) => {
    let res = [], len = nums.length
    let cur = 0
    nums.sort((a, b) => a - b)
    while (cur < len - 1) {
      let left = cur + 1, right = len - 1
      while (left < right) {
        let sum = nums[cur] + nums[left] + nums[right]
        if (sum === 0) {
          res.push([nums[cur], nums[left], nums[right]])
        }
        if (sum <= 0) {
          // 结果更小,需要指针向右
          // 这里需要判断小于等于, 去掉一些重复的答案
          while (nums[left] === nums[++left]) { }
        } else {
          while (nums[right] === nums[--right]) { }
        }
      }
      // 当前枚举C位,重复的需要清空
      while (nums[cur] === nums[++cur]) {}
    }
    return res 
  }