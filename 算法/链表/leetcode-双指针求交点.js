/**
         * Definition for singly-linked list.
         * function ListNode(val) {
         *     this.val = val;
         *     this.next = null;
         * }
         */

/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */

/**
 * 题目链接:https://leetcode-cn.com/problems/intersection-of-two-linked-lists-lcci/
 * 根据题意,两个链表相交的点是指: 
 * 两个指针指向的内容相同,则说明该结点记在A链表上又在B链表上,进而说明A和B是相交的
 * 不清楚O(n)做法,网上大概思路采用的是双指针的做法,理解大概是这样子的:
 * 设置两个指针,每条指针走完自己的路后,指向另外一个链表,那么两个节点相等的话，一定是同一个点。
 * 因为两个指针走的距离是一样的,而且每次都前进1，距离相等,速度相同,如果相等，一定是同一个点。
 */
var getIntersectionNode = function (headA, headB) {
    let p1 = headA,
        p2 = headB;
    while (p1 != p2) {
        p1 = p1 === null ? headB : p1.next
        p2 = p2 === null ? headA : p2.next
    }
    return p1
};