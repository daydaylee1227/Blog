/**
 * https://leetcode-cn.com/problems/longest-substring-without-repeating-characters/
 * @param {string} s
 * @return {number}
 */

var lengthOfLongestSubstring = function (s) {
    let mapTemp = new Map(),
        max = 0
    const len = s.length
    for (let i = 0, j = 0; j < len; j++) {
        if (mapTemp.has(s[j])) {
            // 窗口的start更新
            i = Math.max(mapTemp.get(s[j]) + 1, i)
        }
        max = Math.max(max, j - i + 1)
        mapTemp.set(s[j], j)
    }
    return max
}