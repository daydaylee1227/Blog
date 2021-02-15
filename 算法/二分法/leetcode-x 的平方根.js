/**
 * @param {number} x
 * @return {number}
 */

// https://leetcode-cn.com/problems/sqrtx/

// 二分法
// 这里需要注意的就是枚举的起点 
// 分别是 1, right = x >> 1

const mySqrt = (x) => {
    if( x < 2) return x
    let left = 1, right = x >> 1, mid = 1
    while (left <= right) {
      mid = (left + right) >> 1
      if (mid * mid < x) {
        left = mid + 1
      } else if( mid * mid > x ){
        right = mid - 1
      } else {
        return mid 
      }
    }
    return right
  }