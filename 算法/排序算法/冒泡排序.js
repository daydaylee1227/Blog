// 时间复杂度O(n*n)

// 思路
// 最外层循环控制的内容是循环次数
// 每一次比较的内容都是相邻两者之间的大小关系




let BubbleSort = function (arr, flag = 0) {
    let len = arr.length

    for (let i = 0; i < len - 1; i++) {
        for (let j = 0; j < len - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
            }
        }
    }
    return flag ? arr.reverse() : arr
}

let arr = [2, 9, 6, 7, 4, 3, 1, 7]
console.log(BubbleSort(arr, 1))