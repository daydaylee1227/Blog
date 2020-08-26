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
            // 链接：https://leetcode-cn.com/problems/reverse-nodes-in-k-group/
            
        // - 因为是k个分组，所以得有一个count计数，记录节点个数。
        // - `start`指针代表的含义就是`start`记录的信息是当前分组的起始节点位置的前一个节点。
        // - `end`指针代表的含义就是要区间翻转的后一个节点。
        // - 翻转后，`start`指向翻转后链表, 区间`（start，end）`中的最后一个节点, 返回`start` 节点。
        // - 此时还需要将翻转后的分组中最后一个节点指向下一个分组，也就是`front.next = cur`
        // - 也就是图中值为1节点指向end
        
        var reverseKGroup = (head, k) => {

            let reverseList = (start, end) => {
                let [pre, cur] = [start, start.next],
                front = cur;
                // 终止条件就是cur当前节点不能等于end节点

                // 翻转的套路
                while (cur !== end) {
                    let next = cur.next
                    cur.next = pre
                    pre = cur
                    cur = next
                }
                front.next = end // 新翻转链表需要连接,也就是front指向原来区间后一个节点
                start.next = pre // 新翻转的开头需要连接start.next
                return front // 返回翻转后需要连接链表,也就是front指向
            }

            let newNode = new ListNode('start')
            newNode.next = head;
            let [start, end] = [newNode, newNode.next],
            count = 0;
            while (end !== null) {
                count++
                if (count % k === 0) {
                    // k个节点翻转后,又重新开始,返回值就是end节点前面一个
                    start = reverseList(start, end.next)
                    end = start.next
                } else {
                    //不是一个分组就指向下一个节点
                    end = end.next
                }
            }
            return newNode.next
        };