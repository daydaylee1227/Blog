/**
 * @param {number[]} g
 * @param {number[]} s
 * @return {number}
 */

// https://leetcode-cn.com/problems/assign-cookies/
// 对两个数组排序
// 因为需要满足最多的小朋友
// 我们需要考虑的是: 对于第i个小朋友,
// 我们去找一个最小对满足对糖果给他即可


const findContentChildren = (g, s) => {
    g.sort((a, b) => (a - b))
    s.sort((a, b) => a - b) 
    let gIndex = 0,
      sIndex = 0,
      count = 0
    
    while (gIndex < g.length && sIndex < s.length) {
      
      while (g[gIndex] > s[sIndex] && sIndex < s.length) {
        sIndex++
      }
      if (sIndex < s.length) {
        count++
        sIndex++
        gIndex++
      }
    }
    return count
  }