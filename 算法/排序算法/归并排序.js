//归并排序思路
// 时间复杂度: O(nlog(n))
//将两个有序数列合并成一个有序数列，我们称之为“归并”

// 基本思想与过程：先递归的分解数列，再合并数列（分治思想的典型应用）
//（1）将一个数组拆成A、B两个小组，两个小组继续拆，直到每个小组只有一个元素为止。

//（2）按照拆分过程逐步合并小组，由于各小组初始只有一个元素，可以看做小组内部是有序的，
//合并小组可以被看做是合并两个有序数组的过程。
// (3)对左右两个小数列重复第二步，直至各区间只有1个数。




const merge = (left, right) => { // 合并数组

    let result = []
    // 使用shift()方法偷个懒,删除第一个元素,并且返回该值
    while (left.length && right.length) {
        if (left[0] <= right[0]) {
            result.push(left.shift())
        } else {
            result.push(right.shift())
        }
    }
    while (left.length) {
        result.push(left.shift())
    }

    while (right.length) {
        result.push(right.shift())
    }
    return result
}

let mergeSort = function (arr) {
    if (arr.length <= 1)
        return arr
    let mid = Math.floor(arr.length / 2)
    // 拆分数组
    let left = arr.slice(0, mid),
        right = arr.slice(mid);
    let mergeLeftArray = mergeSort(left),
        mergeRightArray = mergeSort(right)
    return merge(mergeLeftArray, mergeRightArray)
}

let arr = [2, 9, 6, 7, 4, 3, 1, 7, 0, -1, -2]
console.log(mergeSort(arr))


