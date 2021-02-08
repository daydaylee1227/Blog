/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */

// https://leetcode-cn.com/problems/next-permutation/

/**
 * 思路: 如何让后面的数字更大呢
 *       1. 我们是不是需要考虑，让后面更大的数字去跟前面更小的数字替换呢
 *      从低位挑一个大一点的数，换掉前面的小一点的一个数。
 *       于是，从右往左，寻找第一个比右邻居小的数。（把它换到后面去） 
 * 
 *      2. 如何保证变大的幅度更小呢,将右侧比它大数字替换。
 *         然后我们从第i+1个位置到len - 1区间,我们可以做的就是翻转，为啥可以这么做呢，前面已经保证了升序
 *      
 */

const  nextPermutation = (nums) => {
    let pre = nums.length - 2;
    while (pre >= 0 && nums[pre] >= nums[pre + 1]) {
      pre--
    }
    if (pre >= 0) {  // 找到区间内右侧比左边大数字
      let next = nums.length - 1
      while (next >= pre && nums[pre] >= nums[next]) {
        next--
      }
      [nums[pre], nums[next]] = [nums[next], nums[pre]]
    }
    // 为了使增大的最小,我们可以考虑将后续的区间翻转
    let l = pre + 1
    let r = nums.length - 1
    while (l < r) {
      [nums[l], nums[r]] = [nums[r], nums[l]]
      l++
      r--
    }
  }
