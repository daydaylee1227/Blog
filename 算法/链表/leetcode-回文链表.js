/**
         * Definition for singly-linked list.
         * function ListNode(val) {
         *     this.val = val;
         *     this.next = null;
         * }
         */
        /**
         * @param {ListNode} head
         * @return {boolean}
         */
        // 解题思路：
        // 找到链表中点， 然后将后半部分反转， 就可以依次比较得出结论了。
        // 关键就是怎么去找中点呢？
        // 设置一个中间指针 mid， 在一次遍历中， head 走两格， mid 走一格， 当 head 取到最后一个值或者跳出时， mid 就指向中间的值。
        var isPalindrome = function (head) {
            if (head === null || head.next === null) return true;
            let mid = head,
                pre = null,
                reversed = null; // reversed翻转的链表

            while (head !== null && head.next !== null) {
                // 常规翻转的套路
                pre = mid
                mid = mid.next
                head = head.next.next
                pre.next = reversed
                reversed = pre
            }
            // 判断链表数是不是奇数,是的话mid往后走一位
            if (head) mid = mid.next
            while (mid) {
                if (reversed.val !== mid.val) return false
                reversed = reversed.next
                mid = mid.next
            }
            return true
        };