        /**
         * Definition for singly-linked list.
         * function ListNode(val) {
         *     this.val = val;
         *     this.next = null;
         * }
         *   输入：(2 -> 4 -> 3) + (5 -> 6 -> 4)
        *    输出：7 -> 0 -> 8
        *    原因：342 + 465 = 807
         */
        /**
         * @param {ListNode} l1
         * @param {ListNode} l2
         * @return {ListNode}
         */
        /**
         * 链接：https://leetcode-cn.com/problems/add-two-numbers/
         * 链表+模拟
         * 没有掺杂算法,手动去模拟加法过程就行，唯一坑点就是忘记！！！最后一位是否要进1
         * 一步一步来模拟这个过程就可以的,很少写链表,值得收获的就是temp = node
         * temp.next = new ListNode()
         * temp = temp.next
         * 下次写这个肯定很容易啦
         */

        // 个人代码
        var addTwoNumbers = function (l1, l2) {
            
            let flag = 0,   // 判断是不是进位的
                node = new ListNode('start'),  
                temp = node,    //过度的节点,也就是中间记录者
                sum = 0;       // 两个链表累计和
            while (l1 || l2 ) {
                sum = (l1 ? l1.val : 0) + (l2 ? l2.val : 0) + flag;
                temp.next = new ListNode(sum % 10)     // 新链表的取值
                temp = temp.next;                     // 指向新链表的下一个节点
                flag = sum >= 10 ? 1 : 0
                l1 && (l1 = l1.next)
                l2 && (l2 = l2.next)
            }
            flag && (temp.next = new ListNode(flag))
            return node.next;
        };