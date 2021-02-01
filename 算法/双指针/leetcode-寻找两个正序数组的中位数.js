/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
//寻找两个正序数组的中位数
// https://leetcode-cn.com/problems/median-of-two-sorted-arrays/submissions/
// 简单的思路： 双指针，因为已经是排序好的数组啦
// 两个指针分别指向两个数组,然后对数组中数据对比,小的数放进result,指针向后

const findMedianSortedArrays = (num1, num2) => {
    let result = []
    // 模拟双指针
    while (num2.length && num1.length) {
      if (num1[0] < num2[0]) {
        result.push(num1.shift())
      } else {
        result.push(num2.shift())
      }
    }
    while (num1.length) {
      result.push(num1.shift())
    }
    while (num2.length) {
      result.push(num2.shift())
    }
    const len = result.length
    if (len % 2) {
      return result[(len - 1) /2 ]
    } else {
      return (result[len / 2] + result[len / 2 -1]) / 2
    }
  }