        /**
         * Definition for singly-linked list.
         * function ListNode(val, next) {
         *     this.val = (val===undefined ? 0 : val)
         *     this.next = (next===undefined ? null : next)
         * }
         */
        /**
         * @param {ListNode} l1
         * @param {ListNode} l2
         * @return {ListNode}
         */
        // 题目链接：https://leetcode-cn.com/problems/merge-two-sorted-lists/
        // 递归思路
        // 递归解法要注意递归主题里每次返回值较小得节点，这样才能保证我们最后得到得是链表得最小开头
        // 递归出口：任意一个链表为空时,直接return 另外一个链接，也就是拼接过程
        // 从两个链表中依次取出节点比较，小的那一个就拎出来作为下一个链表节点，
    var mergeTwoLists = function (l1, l2) {
        if(l1 == null ) return l2
        if(l2 == null ) return l1
        if(l1.val > l2.val) {
            l2.next = mergeTwoLists(l1, l2.next)
            return l2
        }else{
            l1.next = mergeTwoLists(l1.next, l2)
            return l1
        }
    };

     // 非递归思路,模拟题+链表
          // - 模拟题+链表
         //  - 思路当然简单，重要的是模拟过程，在算法程度上，这种题目可以较为模拟题，模拟你思考的过程，每次比较两个l1.val 与l2.val的大小，取小的值，同时更新小的值指向下一个节点
        // - 主要注意的就是循环终止的条件：当两者其中有一个为空时，即指向null
       //  最后需要判断两个链表哪个非空，在将非空的链表与tmp哨兵节点连接就好。
    var mergeTwoLists = function (l1, l2) {
        let newNode = new ListNode('start'),  // 做题套路,头节点
            tmp = newNode;    // tmp作为哨兵节点    
        while (l1 && l2) {   // 循环结束的条件就是两者都要为非null
            if(l1.val >= l2.val) {
                tmp.next = l2
                l2 = l2.next
            }else{
                tmp.next = l1
                l1 = l1.next
            }
            tmp = tmp.next    // 哨兵节点更新指向下一个节点
        }
        // 最后需要判断哪个链表还存在非null
        tmp.next = l1 == null ? l2 : l1;
        return newNode.next;
    };
