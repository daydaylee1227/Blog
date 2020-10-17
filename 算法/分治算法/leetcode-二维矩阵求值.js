
// https://leetcode-cn.com/problems/search-a-2d-matrix-ii/


const searchMatrix = (matrix, target) => {
    if(matrix === null || matrix.length === 0 || matrix[0].length === 0) {
        return false
    }
    let col = 0,row = matrix[0].length - 1
    while(col < matrix.length && row >=0) {
        if(matrix[col][row] < target) {
            col++
        }  else if(matrix[col][row] > target) {
            row--
        } else {
            return true
        }
    }
    return false
}
