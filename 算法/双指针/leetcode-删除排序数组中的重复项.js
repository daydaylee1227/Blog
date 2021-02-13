/**
 * @param {number[]} nums
 * @return {number}
 */

// https://leetcode-cn.com/problems/remove-duplicates-from-sorted-array/

// 为了符合题目的要求,我们只能在现有的数组上完成这个操作
// 我们拿一个指针去模拟数字是不是相同的即可,不相同的话
// count记录的就是不同的数字

const removeDuplicates = (nums) => {
    let len = nums.length, count = 0
    for (let i = 1; i < len; i++) {
      if (nums[i] !== nums[i - 1]) {
        nums[++count] = nums[i]
      }
    }
    return count + 1
  }
