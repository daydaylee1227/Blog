/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */




// 一个简单的思路就是,用数字去分别记录 0 1 2 出现次数
// 然后分别将出现的次数塞进去
const sortColors = (nums) => {
    let countNum = Array(3).fill(0), len = nums.length, res = []
    for (let i = 0; i < len; i++) {
      countNum[nums[i]]++
    }
    let index = 0 
    for (let i = 0; i < 3; i++) {
      let count = countNum[i]
      let j = 0
      while (j < count) {
        j++
        nums[index++] = i
      }
    }
  }
