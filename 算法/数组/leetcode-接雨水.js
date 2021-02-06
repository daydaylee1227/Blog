/**
 * @param {number[]} height
 * @return {number}
 */

//  思路:
//  答案是如何构造的呢
//  我们需要找到的就是一段区间内的中间值，也就是一段区间的差值来完成的。
//   比如当前的答案,我们需要去判断它的左右的最大值,然后减去当前柱子的高度

const trap = (height) => {
    let res = 0, len = height.length, max = 0
    let left_height = Array(len).fill(0),
      right_height = Array(len).fill(0)
    
    for (let i = 0; i < len; i++) {
      left_height[i] = max = Math.max(max, height[i])
    }
    max = 0
    for (let i = len - 1; i >= 0; i--) {
      right_height[i] = max = Math.max(max, height[i])
    }
    for (let i = 0; i < len; i++) {
      res += Math.min(left_height[i], right_height[i]) - height[i]
    }
    return res
  }