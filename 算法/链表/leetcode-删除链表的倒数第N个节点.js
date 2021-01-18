/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
//https://leetcode-cn.com/problems/remove-nth-node-from-end-of-list/
// 首先遍历一遍,得到链表长度count
// 删除倒数第n个节点 === 删除 第count - n个节点
const removeNthFromEnd = (head, n) => {
    const newHead = new ListNode('-1')
    newHead.next = head
    let curNode = newHead
    let count = 0
    while (curNode.next) {
      count++
      curNode = curNode.next
    }
    curNode = newHead
    let countDelete = 0
    while (curNode) {
      countDelete++
      if (count - n === countDelete - 1) {
        curNode.next = curNode.next.next
        break
      }
      curNode = curNode.next
    }
    return newHead.next
  }