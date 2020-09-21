/**
 * 
 //   https://leetcode-cn.com/problems/two-sum/
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    // O(n) 做法
    let handleMap = new Map(),
        tmp,
        result;
    nums.some((ele,index) => {
        tmp = target - ele
        if( handleMap.get(ele) !== void 0){
            result = [handleMap.get(ele),index]
            return true;
        }else {
            handleMap.set(tmp,index)
        }
    })
    return result;
};