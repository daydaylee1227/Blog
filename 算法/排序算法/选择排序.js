// 选择排序

// 时间复杂度O(n*n)
// 思路
// 每一次从待排序的数组元素中选择最大(最小)的一个元素作为首元素,直到排完为止

// 有n个数,需要排序n-1次
// 第一次选择最小值,放在第一位
// 第二次选择最小值,放在第二位
// ....
// 第n-1次选择最小值,放在第n-1位

let selectSort = function (arr, flag = 0) {
    let len = arr.length,
        temp = 0;

    // 一共需要排序len-1次
    for (let i = 0; i < len - 1; i++) {
        temp = i;
        for (let j = i + 1; j < len; j++) {
            if (arr[j] < arr[temp])
                temp = j;
        }
        // 每一趟保证第i位为最小值
        if (temp !== i) {
            [arr[i], arr[temp]] = [arr[temp], arr[i]]
        }
    }

    return flag ? arr.reverse() : arr
}



let arr = [2, 9, 6, 7, 4, 3, 1, 7, 0, -1, -2]
console.log(selectSort(arr, 1))