/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */

// 空间复杂度有要求的话，我们可以参数hash一下
// 用Map分别计算一下x方向和y方向出现的下表

const setZeroes = (matrix) => {
    const xSet = new Map(), ySet = new Map(), xLen = matrix.length,
      yLen = matrix && matrix[0].length
    
    for (let i = 0; i < xLen; i++) {
      for (let j = 0; j < yLen; j++) {
        if (matrix[i][j] === 0) {
          xSet.set(i)
          ySet.set(j)
        }
      }
    }
    for (let i = 0; i < xLen; i++) {
      for (let j = 0; j < yLen; j++) {
        if (xSet.has(i)) {
          matrix[i][j] = 0
        }
        if (ySet.has(j)) {
          matrix[i][j] = 0
        }
      }
    }
  }