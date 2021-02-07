/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */

// https://leetcode-cn.com/problems/merge-intervals/
// 贪心
// 既然是需要把重复的区间合并
// 我们按照区间的左边端点排序,做到升序
// 然后判断两个区间是否是重叠
// 需要判断下一个区间的左端点是不是在上一个区间内即可

// 这样子的话，我们依次去遍历即可。

const merge = (intervals) => {
    const res = []
    intervals.sort((a, b) => a[0]-b[0])
    let left_number = intervals[0][0],
      rigth_number = intervals[0][1],
      len = intervals.length
    
    for (let i = 1; i < len; i++) {
      const item = intervals[i]
      if (item[0] > rigth_number) {
        res.push([left_number, rigth_number])
        left_number = item[0]
        rigth_number = item[1]
      } else {
        rigth_number = Math.max(rigth_number, item[1])
      }
    }
    res.push([left_number, rigth_number])
    return res
  }
