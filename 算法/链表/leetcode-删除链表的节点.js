/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} val
 * @return {ListNode}
 */
// https://leetcode-cn.com/problems/shan-chu-lian-biao-de-jie-dian-lcof/

// 创建一个哨兵节点
// 让它指向headNode.next = head
// 找一个currentNode = headNode
// 判断下一个节点val === val
const deleteNode = (head, val) => {
    const newHead = new ListNode('-1') 
    newHead.next = head
    let curNode = newHead
    while (curNode.next) {
      if (curNode.next.val === val) {
        curNode.next = curNode.next.next
        break
      }
      curNode = curNode.next
    }
    return newHead.next
  }