/**
 * @param {number[]} height
 * @return {number}
 */

// https://leetcode-cn.com/problems/container-with-most-water/
// 利用的就是双指针,我们需要求的就是最大的值,所以我们就可以去维护一个区域
// 最重要的就是从首位开始遍历
// 什么时候需要移动两个指针呢 这个应该是我们需要考虑的点
// 如果我们移动数字较大的那个指针，那么前者「两个指针指向的数字中较小值」不会增加，后者「指针之间的距离」// 会减小，那么这个乘积会减小。因此，我们移动数字较大的那个指针是不合理的。因此，我们移动 数字较小的那个// 指针。

const maxArea = (height) => {
    let max = 0,
      i = 0, j = height.length - 1
    while (i < j) {
      const minHeight = height[i] < height[j] ? height[i] : height[j]
      max = Math.max(max, (j - i) * (minHeight))
      if (height[i] < height[j]) {
        i++
      } else {
        j--
      }
    }
    return max
  }c