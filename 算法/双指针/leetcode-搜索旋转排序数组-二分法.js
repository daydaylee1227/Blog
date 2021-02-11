/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */

// https://leetcode-cn.com/problems/search-in-rotated-sorted-array/

// 如果数组是有序的话，那么利用二分法
// 回顾一下二分: 单调性,有固定范围的区间。
// 现在问题是,对于一顿区间是有序的,我们如何去做呢
// 思路
// 通过 判断 nums[left] <= nums[mid]
// 如果左侧区间单调, 判断判断这个target是不是在左侧
// 不在的话，left = mid + 1
// 在的话， right = mid - 1 
// 同理对于左侧不单调的区间,我们需要在右侧做判断

const search = (nums, target) => {
    let len = nums.length, left = 0, right = len - 1, mid 
    while (left <= right) {
      mid = left + right >> 1
      if (nums[mid] === target) return mid
      // 左侧单调
      if (nums[mid] >= nums[left]) {
        // 判断这个数字是不是在左侧的区间内
        if (target >= nums[left] && target <= nums[mid]) {
          right = mid - 1
        } else {
          left = mid + 1
        }
      } else { 
        // 右侧区间单调
        if (target >= nums[mid] && target <= nums[right]) {
          left = mid + 1
        } else {
          right = mid - 1
        }
      }
    }
    return -1
  }