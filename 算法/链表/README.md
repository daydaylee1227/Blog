

## 前言

数据结构中的链表还是很重要的，所以这章节把剑指offer 和 LeetCode 中的相关题目做一个汇总，分享给大家🤭

说真的，有时候，想要表达清楚自己的想法有点小困难，奈何又是个文笔不是很好的粗汉子，有些概念上问题，还是引用别处的解释比较好，所以还望大家谅解。



对于时间复杂度和空间复杂度，不太了解的话，可以看看下面这篇文章

[如何理解算法时间复杂度的表示法，例如 O(n²)、O(n)、O(1)、O(nlogn) 等？](https://www.zhihu.com/question/21387264/answer/422323594)

[算法的时间与空间复杂度（一看就懂）](https://zhuanlan.zhihu.com/p/50479555)



对于这个问题，开始我们的链表之旅吧。

链表题目将收入GitHub中，思路和代码都有，有兴趣的小伙伴可以来玩👇

[数据结构-链表](https://github.com/daydaylee1227/Blog/tree/master/%E7%AE%97%E6%B3%95/%E9%93%BE%E8%A1%A8)



## 链表 Linked List

一种常见的基础数据结构，也是一种线性表，但是并不会按线性表的顺序存储数据，而是在每一个节点里存到下一个节点的指针(Pointer)。

链表在插入的时候可以达到 O(1) 的复杂度，比另一种线性表 —— 顺序表快得多，但是查找一个节点或者访问特定编号的节点则需要 O(n)的时间，而顺序表相应的时间复杂度分别是 O(log n)  和 O(1)。

优缺点：

>使用链表结构可以克服数组链表需要预先知道数据大小的缺点，链表结构可以充分利用计算机内存空间，实现灵活的内存动态管理。但是链表失去了数组随机读取的优点，同时链表由于增加了结点的指针域，空间开销比较大。

**链表允许插入和移除表上任意位置上的节点，但是不允许随机存取。**

链表有很多种不同的类型：

- 单向链表
- 双向链表
- 循环链表

链表通常可以衍生出循环链表，静态链表，双链表等。对于链表使用，需要注意**头结点**的使用。

![单链表](https://user-images.githubusercontent.com/34484322/90314571-4e723100-df47-11ea-8afa-8e9a7921fa4e.png)



**链表创建**

```js
//单链表插入、删除、查找
        class LinkedList {
            constructor(val) {
                val = val === undefined ? 'head' : val;
                this.head = new ListNode(val)
            }

            // 找val值节点，没有找到返回-1
            findByVal(val) {
                let current = this.head
                while (current !== null && current.val !== val) {
                    current = current.next
                }
                return current ? current : -1
            }

            // 插入节点,在值为val后面插入
            insert(newVal, val) {
                let current = this.findByVal(val)
                if (current === -1) return false
                let newNode = new ListNode(newVal)
                newNode.next = current.next
                current.next = newNode
            }

            // 获取值为nodeVal的前一个节点,找不到为-1,参数是val
            // 适用于链表中无重复节点
            findNodePreByVal(nodeVal) {
                let current = this.head;
                while (current.next !== null && current.next.val !== nodeVal)
                    current = current.next
                return current !== null ? current : -1
            }

            // 根据index查找当前节点, 参数为index
            // 可以作为比较链表是否有重复节点

            findByIndex(index) {
                let current = this.head,
                    pos = 1
                while (current.next !== null && pos !== index) {
                    current = current.next
                    pos++
                }

                return (current && pos === index) ? current : -1
            }

            // 删除某一个节点,删除失败放回false
            remove(nodeVal) {
                if(nodeVal === 'head') return false
                let needRemoveNode = this.findByVal(nodeVal)
                if (needRemoveNode === -1) return false
                let preveNode = this.findNodePreByVal(nodeVal)
                
                preveNode.next = needRemoveNode.next
            }


            //遍历节点

            disPlay() {
                let res = new Array()
                let current = this.head
                while (current !== null) {
                    res.push(current.val)
                    current = current.next
                }
                return res
            }

            // 在链表末尾插入一个新的节点
            push(nodeVal) {
                let current = this.head
                let node = new ListNode(nodeVal)
                while (current.next !== null)
                    current = current.next
                current.next = node
            }
            // 在头部插入
            frontPush(nodeVal) {
                let newNode = new ListNode(nodeVal)
                this.insert(nodeVal,'head')
            }
        }
```

当然了，可能还有一些其他的方法我是没有想到的，剩下的可以自行去完成

**链表类的使用**

```js
		let demo = new LinkedList() // LinkedList {head: ListNode}
        // console.log((demo.disPlay())) 
        demo.push('1232')
        demo.insert(123, 'head');
        demo.push('last value')
        demo.frontPush('start')
        demo.remove('head')
        // demo.remove('last value')
        // console.log(demo.remove('head'))
        // demo.push('2132')
        // demo.insert('不存在的值', '插入失败') //return -1
        console.log(demo.findByIndex(1))
        console.log((demo.disPlay()))
```

上面的代码片段是测试用到，测试过了，基本上没有上面大问题，当然了，有些细枝末节的地方还是得注意的，比如`findByIndex`这个函数中`pos = 0` 还是 `pos  = 1`问题，取决于自己，还有的话，`remove`函数到底能不能删除'head'头节点，这都是没有准确的标准的，这个可以根据自己情况而定，

一定记住，不是唯一标准，你认为可以删除'head'的话，也没有问题。



**双向链表**

双链表以类似的方式工作，但`还有一个引用字段`，称为`“prev”`字段。有了这个额外的字段，您就能够知道当前结点的前一个结点。

让我们看一个例子：

![双链表](https://user-images.githubusercontent.com/34484322/90314608-86797400-df47-11ea-9bb1-83012d8b325a.png)

绿色箭头表示我们的“prev”字段是如何工作的。

**结构类似👇**

```js
class doubleLinkNode {
            constructor (val) {
                this.val = val
                this.prev = null
                this.next = null
            }
        }
```

与单链接列表类似，我们将使用`头结点`来表示整个列表。

对于插入和删除，相比较单链表而言，会稍微复杂一些，因为我们还需要处理“prev”字段。



**添加操作-双链表**

举个例子吧，当然了，最好的形式就是画图来解决。

![](https://user-images.githubusercontent.com/34484322/90314599-7c577580-df47-11ea-9e51-10caf9a2e173.png)

让我们在现有结点 6 之后添加一个新结点 9：

第一步：链接 `cur`（结点 9）与 `prev`（结点 6）和 `next`（结点 15）

![](https://user-images.githubusercontent.com/34484322/90314613-8da08200-df47-11ea-8914-4078e320b9f8.png)

第二步：用 `cur`（结点 9）重新链接 `prev`（结点 6）和 `next`（结点 15）

![](https://user-images.githubusercontent.com/34484322/90314617-909b7280-df47-11ea-90db-e6a86c853b49.png)

**所以说，做链表题，画图最重要了，画完图，代码也就出来了**

留下来一个问题，如果我们想在`开头`或`结尾`插入一个新结点怎么办？

**删除操作-双链表**

举个例子吧👇

![](C:\Users\DayDay\Desktop\Blog\images\算法\delete-doubleNode1.png)

我们的目标是从双链表中删除结点 6

因此，我们将它的前一个结点 23 和下一个结点 15 链接起来：

![](C:\Users\DayDay\Desktop\Blog\images\算法\delete-doubleNode2.png)

结点 6 现在不在我们的双链表中



留个问题:如果我们要删除`第一个结点`或`最后一个结点`怎么办？

画图🤭



代码就不写了，网上很多都可以代码，可以看看人家怎么写的



## 小结

让我们简要回顾一下单链表和双链表的表现。

它们在很多操作中是相似的

-  它们都能够`在 O(1) 时间内删除第一个结点`。
- 它们都能够`在 O(1) 时间内在给定结点之后或列表开头添加一个新结点`。
- 它们都无法在常量时间内`随机访问数据`。

但是删除给定结点(包括最后一个结点)时略有不同。

- 在单链表中，它无法获取给定结点的前一个结点，因此在删除给定结点之前我们必须花费 `O(N)` 时间来找出前一结点。
- 在双链表中，这会更容易，因为我们可以使用“prev”引用字段获取前一个结点。因此我们可以在 `O(1)` 时间内删除给定结点。

对比一下链表与其他数据结构(数组，队列，栈)之间`时间复杂度`的比较：

![](C:\Users\DayDay\Desktop\Blog\images\算法\compare-链表.png)

经过这次比较，我们不难得出结论：

> 如果你需要经常添加或删除结点，链表可能是一个不错的选择。
>
> 如果你需要经常按索引访问元素，数组可能是比链表更好的选择。



接下来也就是本文的重点，从理论到实际出发，看看有哪些题型吧👇



## 基本题型

接下来的题型梳理是按照个人刷题顺序的，难易程度，也会做个划分，可以参考一下。

主要做题网站👇

- [剑指offer](https://www.nowcoder.com/ta/coding-interviews)

- [力扣leetcode](https://leetcode-cn.com/problemset/all/)



### [合并两个有序链表⭐](https://leetcode-cn.com/problems/merge-two-sorted-lists/)

题目描述：将两个升序链表合并为一个新的 **升序** 链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。 

> 链接：[[力扣]合并两个有序链表](https://leetcode-cn.com/problems/merge-two-sorted-lists/)

**示例：**

```
输入：1->2->4, 1->3->4
输出：1->1->2->3->4->4
```

非递归思路:

- 模拟题+链表

- 思路当然简单，重要的是模拟过程，在算法程度上，这种题目可以较为模拟题，模拟你思考的过程，每次比较两个l1.val 与l2.val的大小，取小的值，同时更新小的值指向下一个节点
- 主要注意的就是循环终止的条件：当两者其中有一个为空时，即指向null
- 最后需要判断两个链表哪个非空，在将非空的链表与tmp哨兵节点连接就好。



```js
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
```



递归思路:
**递归解法要注意递归主题里每次返回值较小得节点，这样才能保证我们最后得到得是链表得最小开头**

一开始的做法就是模拟+链表，但是看见讨论区中有递归写法，绝对还是好好看一遍。一题多解还是很重要的，这也在某种程度上发散了思维，还是提倡多解。

- 递归出口：任意一个链表为空时,直接return 另外一个链接，也就是拼接过程
- 从两个链表中依次取出节点比较，小的那一个就拎出来作为下一个链表节点



[代码点这里☑️](https://github.com/daydaylee1227/Blog/blob/master/%E7%AE%97%E6%B3%95/%E9%93%BE%E8%A1%A8/leetcode-%E5%90%88%E5%B9%B6%E4%B8%A4%E4%B8%AA%E6%9C%89%E5%BA%8F%E9%93%BE%E8%A1%A8.js)

----



### 返回倒数第k个节点⭐

题目描述：实现一种算法，找出单向链表中倒数第 k 个节点。返回该节点的值。

> 链接：[[力扣]返回倒数第k个节点](https://leetcode-cn.com/problems/kth-node-from-end-of-list-lcci/)

双指针写法👇

搞俩个前后指针，先让后指针走k,接着两个指针就相差k步,最后遍历后指针，当后指针为null时，前指针就是答案，因为一开始他们两就是相差k距离

[代码点这里☑️](https://github.com/daydaylee1227/Blog/blob/master/算法/链表/leetcode-返回倒数第k个节点.js)



------



### [反转链表⭐](https://leetcode-cn.com/problems/reverse-linked-list/)

题目描述：反转一个单链表。



> 链接：[[leetcode]反转一个链表](https://leetcode-cn.com/problems/reverse-linked-list/)

**示例:**

```
输入: 1->2->3->4->5->NULL
输出: 5->4->3->2->1->NULL
```

思路：迭代 三个指针 prev curr next 前指针 当前指针 下一个指针

- 每次把当前curr指针指向上一个pre
- next保存下一个节点信息

小技巧：一开始把哨兵节点设置为null，curr设置为head

一直迭代下取，知道curr当前节点为尾节点

```js
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
```

递归写法

之前讲过思路了，我们之间看代码吧

```js
var reverseList = function(head) {
    let reverse = (prev,curr) => {
        if(!curr)return prev;
        let next = curr.next;
        curr.next = prev;
        return reverse(curr,next);
    }
    return reverse(null,head);
};

```

[代码点这里☑️](https://github.com/daydaylee1227/Blog/blob/master/算法/链表/leetcode-反转链表.js)



-------



### [区间反转⭐⭐](https://leetcode-cn.com/problems/reverse-linked-list-ii/)

题目描述：反转从位置 *m* 到 *n* 的链表。请使用一趟扫描完成反转。

**说明:**
1 ≤ *m* ≤ *n* ≤ 链表长度。

> 链接：[[leetcode]反转链表II](https://leetcode-cn.com/problems/reverse-linked-list-ii/)

**示例:**

```
输入: 1->2->3->4->5->NULL, m = 2, n = 4
输出: 1->4->3->2->5->NULL
```

跟上一题差不多，换汤不换药，所以我们还是可以用迭代的做法来完成。

需要记录两个节点,tail和front节点

![](https://user-images.githubusercontent.com/34484322/90314636-b294f500-df47-11ea-89b5-fc8d63d24ec1.png)

两个节点作用就是为了最后区间反转后，好重新连接成一个新的链表。



```js
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
```



[点这里代码🤭](https://github.com/daydaylee1227/Blog/blob/master/算法/链表/leetcode区间反转.js)



-------



### [两两交换链表中的节点](https://leetcode-cn.com/problems/swap-nodes-in-pairs/)⭐⭐

题目描述：给定一个链表，两两交换其中相邻的节点，并返回交换后的链表。**你不能只是单纯的改变节点内部的值**，而是需要实际的进行节点交换。



> 链接：[leetcode两两交换链表中的节点](https://leetcode-cn.com/problems/swap-nodes-in-pairs/)

**示例:**

```markdown
给定 1->2->3->4, 你应该返回 2->1->4->3.
```



迭代思路，套路，加个tmp哨兵节点就行哒，还不懂的话，画图解决一切，实在看不懂的话，看这个图

![](C:\Users\DayDay\Desktop\Blog\images\算法\两两交换节点.png)



```js
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
```

当然了，面试的时候要真的写，画图应该可以的吧，看着图来写，就轻松了，讲真的，我递归写法✍想不出来，我好蠢🤭

[代码点这里☑️](https://github.com/daydaylee1227/Blog/blob/master/算法/链表/leetcode-两两交换链表中的节点.js)



--------



### [K 个一组翻转链表⭐⭐⭐](https://leetcode-cn.com/problems/reverse-nodes-in-k-group/)

题目描述：给你一个链表，每 *k* 个节点一组进行翻转，请你返回翻转后的链表。

说明：k 是一个正整数，它的值小于或等于链表的长度。如果节点总数不是 *k* 的整数倍，那么请将最后剩余的节点保持原有顺序。

> 链接：[[K 个一组翻转链表](https://leetcode-cn.com/problems/reverse-nodes-in-k-group/)](https://leetcode-cn.com/problems/swap-nodes-in-pairs/)

示例 :

```
给定这个链表：1->2->3->4->5
当 k = 2 时，应当返回: 2->1->4->3->5
当 k = 3 时，应当返回: 3->2->1->4->5
```

先看题解,leetcode⭐⭐⭐难题的话，不需要去浪费时间自己去思考，可以看看别人的思路，把别人思路搞明白，最后转换为自己的思路很重要。看完真的就顿悟了，就知道该怎么实现了。

- 因为是k个分组，所以得有一个count计数，记录节点个数。
- `start`指针代表的含义就是`start`记录的信息是当前分组的起始节点位置的前一个节点。
- `end`指针代表的含义就是要区间翻转的后一个节点。
- 翻转后，`start`指向翻转后链表, 区间`（start，end）`中的最后一个节点, 返回`start` 节点。
- 此时还需要将翻转后的分组中最后一个节点指向下一个分组，也就是`front.next = cur`
- 也就是图中值为1节点指向end

![K 个一组翻转链表](https://user-images.githubusercontent.com/34484322/90314636-b294f500-df47-11ea-89b5-fc8d63d24ec1.png)

在来举个例子，`head=[1,2,3,4,5,6,7,8], k = 3`

![K 个一组翻转链表](![K 个一组翻转链表2](https://user-images.githubusercontent.com/34484322/90314709-58486400-df48-11ea-953b-d499ae782751.png))

看不到就自己画个图，然后结合代码多看几遍吧，难题就要多看着写几遍，自然就有感觉了。

**关键点分析**

- 建立一个newNode
- 对链表进行k个单位分组，记录每一组的起始和最后节点位置
- 对每一组进行相应的翻转，记得更换位置
- 返回newNode.next



```js
		var reverseKGroup = (head, k) => {
            
            let  reverseList = (start, end) => {
                let [pre, cur] = [start, start.next],
                    front = cur;
                // 终止条件就是cur当前节点不能等于end节点
                
                // 翻转的套路
                while( cur !== end) {
                    let next = cur.next
                    cur.next = pre
                    pre = cur
                    cur = next
                }
                front.next = end         // 新翻转链表需要连接,也就是front指向原来区间后一个节点
                start.next = pre        // 新翻转的开头需要连接start.next
                return front     // 返回翻转后需要连接链表,也就是front指向
            }
            
            let newNode = new ListNode('start')
            newNode.next = head;
            let [start, end] = [newNode,newNode.next],
                count = 0;
            while(end !== null ) {
                count++
                if( count % k === 0) {
                    // k个节点翻转后,又重新开始,返回值就是end节点前面一个
                    start = reverseList(start, end.next)
                    end = start.next
                }else{
                    //不是一个分组就指向下一个节点
                    end = end.next
                }
            }
            return newNode.next
        };
```



好家伙，面试的时候，要我写这个，不让我画图的话，我抽象不出来💢💢

[代码点这里🤭](https://github.com/daydaylee1227/Blog/blob/master/算法/链表/leetcode-K 个一组翻转链表.js)



------------



### [合并K个排序链表⭐⭐⭐](https://leetcode-cn.com/problems/merge-k-sorted-lists/)

题目描述：合并 *k* 个排序链表，返回合并后的排序链表。请分析和描述算法的复杂度。

> 链接：[[合并K个排序链表](https://leetcode-cn.com/problems/merge-k-sorted-lists/)](https://leetcode-cn.com/problems/swap-nodes-in-pairs/)

**示例:**

```
输入:
[
  1->4->5,
  1->3->4,
  2->6
]
输出: 1->1->2->3->4->4->5->6
```



------



### [[回文链表]⭐](https://leetcode-cn.com/problems/palindrome-linked-list/)

题目描述：请判断一个链表是否为回文链表。

> 链接：[leetcode-回文链表](https://leetcode-cn.com/problems/palindrome-linked-list/)

**示例:**

```
输入:
[
  1->4->5,
  1->3->4,
  2->6
]
输出: 1->1->2->3->4->4->5->6
```

**示例 1:**

```
输入: 1->2
输出: false
```

**示例 2:**

```
输入: 1->2->2->1
输出: true
```

解题思路：

找到链表中点，然后将后半部分反转，就可以依次比较得出结论了。

关键就是怎么去找中点呢？

**快慢指针**

这个在链表中应用太广泛了，思路就是:设置一个中间指针 mid，在一次遍历中，head 走两格，mid 走一格，当 head 取到最后一个值或者跳出时，mid 就指向中间的值。

```
let mid = head
// 循环条件：只要head存在则最少走一次
while(head !== null && head.next !== null) {
    head = head.next.next // 指针一次走两格
    mid = mid.next// 中间指针一次走一格
}
```

![](C:\Users\DayDay\Desktop\Blog\images\算法\链表求中间节点.jpg)



遍历的时候通过迭代来反转链表，mid 之前的 node 都会被反转。
使用迭代来反转。



```
while(head !== null && head.next !== null) {
        pre = mid
        mid = mid.next
        head = head.next.next
        pre.next = reversed
        reversed = pre
    }
```



例如：

```
奇数：1 -> 2 -> 3 -> 2 ->1
遍历完成后：mid = 3->2->1
reversed = 2->1
```



```
偶数：1 -> 2 -> 2 ->1
遍历完成后：mid = 2->1
reversed = 2->1
```

完整代码:

```js
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
```





------



### [[链表相交]⭐](https://leetcode-cn.com/problems/intersection-of-two-linked-lists-lcci/)

题目描述：给定两个（单向）链表，判定它们是否相交并返回交点。请注意相交的定义基于节点的引用，而不是基于节点的值。换句话说，如果一个链表的第k个节点与另一个链表的第j个节点是同一节点（引用完全相同），则这两个链表相交。



> 链接：[[leetcode-链表相交]](https://leetcode-cn.com/problems/intersection-of-two-linked-lists-lcci/)

示例 1：

```
输入：intersectVal = 8, listA = [4,1,8,4,5], listB = [5,0,1,8,4,5], skipA = 2, skipB = 3
输出：Reference of the node with value = 8
输入解释：相交节点的值为 8 （注意，如果两个列表相交则不能为 0）。从各自的表头开始算起，链表 A 为 [4,1,8,4,5]，链表 B 为 [5,0,1,8,4,5]。在 A 中，相交节点前有 2 个节点；在 B 中，相交节点前有 3 个节点。
```

示例 2：

```
输入：intersectVal = 2, listA = [0,9,1,2,4], listB = [3,2,4], skipA = 3, skipB = 1
输出：Reference of the node with value = 2
输入解释：相交节点的值为 2 （注意，如果两个列表相交则不能为 0）。从各自的表头开始算起，链表 A 为 [0,9,1,2,4]，链表 B 为 [3,2,4]。在 A 中，相交节点前有 3 个节点；在 B 中，相交节点前有 1 个节点。
```

示例 3：

```
输入：intersectVal = 0, listA = [2,6,4], listB = [1,5], skipA = 3, skipB = 2
输出：null
输入解释：从各自的表头开始算起，链表 A 为 [2,6,4]，链表 B 为 [1,5]。由于这两个链表不相交，所以 intersectVal 必须为 0，而 skipA 和 skipB 可以是任意值。
解释：这两个链表不相交，因此返回 null。
```

思路：

- 设置两个指针,每条指针走完自己的路后,指向另外一个链表,那么两个节点相等的话，一定是同一个点。
- 因为两个指针走的距离是一样的,而且每次都前进1，距离相等,速度相同,如果相等，一定是同一个点。

```js
var getIntersectionNode = function (headA, headB) {
    let p1 = headA,
        p2 = headB;
    while (p1 != p2) {
        p1 = p1 === null ? headB : p1.next
        p2 = p2 === null ? headA : p2.next
    }
    return p1
};
```



[代码点这里🤭](https://github.com/daydaylee1227/Blog/blob/master/算法/链表/leetcode-双指针求交点.js)



--------



## 抛砖引玉**

选一部分题目出来，希望对大家算是一个抛砖引玉的过程吧，也算是对自我的总结，接下来还会继续刷题的，需要继续跟着我刷题的话，可以看看下面噢👇

[GitHub点这里](https://github.com/daydaylee1227/Blog/tree/master/算法/链表)



## **❤️ 感谢大家**

如果你觉得这篇内容对你挺有有帮助的话：

1. 点赞支持下吧，让更多的人也能看到这篇内容（收藏不点赞，都是耍流氓 -_-）

2. 欢迎在留言区与我分享你的想法，也欢迎你在留言区记录你的思考过程。

3. 觉得不错的话，也可以看看往期文章：

   [[诚意满满👍\]Chrome DevTools调试小技巧，效率➡️🚀🚀🚀](https://juejin.im/user/5ef326ab6fb9a07ebe237664/posts)

   [[实用👍\]推荐一些非常棒的前端网站](https://juejin.im/post/5f0dce476fb9a07e5b62d134)

   [[干货👍\]从详细操作js数组到浅析v8中array.js](https://juejin.im/post/5f02e7725188252e8272cd47)

   [[1.2W字👍\]写给女友的秘籍-浏览器工作原理（上）篇](https://juejin.im/post/5f007d32f265da22b64936bf)

   [[1.1W字\]写给女友的秘籍-浏览器工作原理（渲染流程）篇](https://juejin.im/post/5f05d12a5188252e8406e37b)

   [[建议👍\]再来100道JS输出题酸爽继续（共1.8W字+巩固JS基础）](https://juejin.im/post/5efb4ca5f265da23016c5c80)

   [[诚意满满✍\]带你填一些JS容易出错的坑](https://juejin.im/post/5f0884c9e51d453462004fae)