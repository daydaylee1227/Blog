
        /**
         * Definition for singly-linked list.
         * function ListNode(val) {
         *     this.val = val;
         *     this.next = null;
         * }
         */
        /**
         * @param {ListNode} head
         * @return {ListNode}
         */
        
        /**
         * 链接：https://leetcode-cn.com/problems/swap-nodes-in-pairs/
         * 时间复杂度：O(n)
         * 空间复杂度：O(1)
         * 思路: (画图 画图 画图最好解决问题的！！！)
         * 添加一个哨兵节点
         * 三个节点外加一个哨兵节点之间作指针指向变换操作
        */
    var swapPairs = function (head) {
        let newNode = new ListNode('start');
            newNode.next = head,    // 链表头节点套路操作
            tmp = newNode;          // tmp哨兵节点,这里要从newNode节点开始,并不是从head开始的 

        while( tmp.next !== null && tmp.next.next !== null) {
            let start = tmp.next,
                end = start.next;
            tmp.next = end
            start.next = end.next
            end.next = start
            tmp = start
        }

        return newNode.next     // 返回的自然就是指向 链表头节点的next指针
    };