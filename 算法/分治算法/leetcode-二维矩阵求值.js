
// https://leetcode-cn.com/problems/search-a-2d-matrix-ii/

// 思路, 每次分行和分列去二分答案

const searchMatrix = (matrix, target) => {
    
    if(matrix === null || matrix.length === 0 || matrix[0].length === 0) {
        return false
    }
    const shortLen = Math.min(matrix.length, matrix[0].length)
    for(let i = 0; i < shortLen; i++) {
        const verticalFound = binarySearch(matrix, target, i, true)
        const horizontalFound = binarySearch(matrix, target, i, false)
        if(verticalFound || horizontalFound) {
            return true
        }
    }
    return false
}
const binarySearch = (matrix, target, start, vertical) => {
    let left = start,
        right = vertical ? matrix[0].length - 1 : matrix.length - 1
    while(right >= left) {
        let mid = parseInt((left + right) / 2)
        if(vertical) {
            if(matrix[start][mid] < target) {
                left = mid + 1
            } else if (matrix[start][mid] > target) {
                right = mid - 1
            } else {
                return true
            }
        } else {
            if(matrix[mid][start] < target) {
                left = mid + 1
            } else if (matrix[mid][start] > target) {
                right = mid - 1
            } else {
                return true
            }
        }
    } 
    return false   
}


