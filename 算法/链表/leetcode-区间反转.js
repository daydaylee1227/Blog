/**
         * Definition for singly-linked list.
         * function ListNode(val) {
         *     this.val = val;
         *     this.next = null;
         * }
         */
        /**
         * @param {ListNode} head
         * @param {number} m
         * @param {number} n
         * @return {ListNode}
         */
        // 链接：https://leetcode-cn.com/problems/reverse-linked-list-ii/
        // 需要记录两个节点,tail和front节点
        // 下面有注释部分

        var reverseBetween = function (head, m, n) {
            let count = n-m,
                newNode = new ListNode('head');
            tmp = newNode;
            tmp.next = head;              // 哨兵节点,这样子同时也保证了newNode下一个节点就是head
            for(let i = 0; i < m -1; i++ ){
                tmp = tmp.next;
            }
            // 此时循环后,tmp保留的就是反转区间前一个节点,需要用front保留下来
            let front, prev, curr,tail;
            front = tmp;   // 保留的是区间首节点
            // 同时tail指针的作用是将反转后的链接到最后节点

            prev = tail = tmp.next;    // 保留反转后的队尾节点 也就是tail
            curr = prev.next
            for(let i = 0; i < count; i++ ) {
                let next = curr.next;
                curr.next = prev;
                prev = curr
                curr = next
            }
            // 将原本区间首节点链接到后结点
            tail.next = curr
            // font是区间前面一个节点,需要链接的就是区间反转的最后一个节点
            front.next = prev

            return newNode.next     // 最后返回newNode.next就行,一开始我们指向了head节点
            
        };