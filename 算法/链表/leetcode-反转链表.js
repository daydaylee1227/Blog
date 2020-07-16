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
        // 三个指针 prev curr next
        // 唯一需要注意的就是 需要拿一个节点每次保存下一个节点
        var reverseList = function (head) {
            if(!head) return null
            let prev = null,
                curr = head
            while( curr != null) {
                let next = curr.next;
                curr.next = prev
                prev = curr
                curr = next
            }
            return prev
        };

        //递归调用

        var reverseList = function(head) {
            let reverse = (prev,curr) => {
                if(!curr)return prev;
                let next = curr.next;
                curr.next = prev;
                return reverse(curr,next);
            }
            return reverse(null,head);
        };
        