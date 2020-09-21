


/**
 * //https://leetcode-cn.com/problems/top-k-frequent-words/
 * @param {string[]} words
 * @param {number} k
 * @return {string[]}
 */
var topKFrequent = function(words, k) {

    let mapTemp = new Map()
    words.forEach((item) => {
        mapTemp.has(item) ? ( mapTemp.set(item,mapTemp.get(item) + 1 ) ) : ( mapTemp.set(item,1) )
    })
    // 将map中的键解构,按照一定顺序完成排序
    let ansList = [...mapTemp].sort( (a,b) => b[1]-a[1] || a[0].localeCompare(b[0]) )
    ansList = ansList.map(item=>item[0])
    // 返回前k个元素即可
    return ansList.slice(0,k)
}
