/**
         * Definition for singly-linked list.
         * function ListNode(val) {
         *     this.val = val;
         *     this.next = null;
         * }
         */
        /**
         * @param {ListNode} head
         * @param {number} k
         * @return {number}
         */
        // 题目链接:https://leetcode-cn.com/problems/kth-node-from-end-of-list-lcci/
        // 双指针写法
        // 搞俩个前后指针，先让后指针走k,接着两个指针就相差k步,最后遍历右指针
        // 右指针为空时,返回左指针

        // 将数据存入数组写法
        // 依次遍历链表把数据写入数组,最后返回结果就行 res[res.length-k]
        

        var kthToLast = function (head, k) {
        
            let pre = head,     // 前指针
                last = head,   //  后指针
                pos = k;
            while (pos > 0) {
                last = last.next
                pos--
            }
            while( last !== null) {   //将后指针遇到链表尾部时就返回前指针
                pre = pre.next
                last = last.next
            }
            
            return pre.val;
        };