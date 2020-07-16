

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

![单链表](C:\Users\DayDay\Desktop\Blog\images\算法\单链表.png)



**链表创建**

```js
		class ListNode {
            constructor(val){
                this.val = val;
                this.next = null;
            }
        }
        //单链表插入、删除、查找
        class LinkedList {
            constructor() {
                this.head = new ListNode('head')
            }
            
            // 找val值节点，没有找到返回-1
            findByVal (val) {
                let current = this.head
                while(current !== null && current.val !== val ) {
                    current = current.next
                }
                return current ? current : -1
            }
            
            // 插入节点,在值为val后面插入
            insert (newVal, val) {
                let current = this.findByVal(val)
                if(current === -1) return false
                let newNode = new ListNode(newVal)
                newNode.next = current.next
                current.next = newNode
            }

            // 获取值为nodeVal的前一个节点,找不到为-1,参数是val
            // 适用于链表中无重复节点
            findNodePreByVal (nodeVal) {
                let current = this.head;
                while (current.next !== null && current.next.val !== nodeVal)
                    current = current.next
                return current !== null ? current : -1
            }

            // 根据index查找当前节点, 参数为index
            // 可以作为比较链表是否有重复节点

            findByIndex (index) {
                let current = this.head,
                    pos = 1
                while (current.next !== null && pos !== index) {
                    current = current.next
                    pos++
                }

                return current.next !== null ? current : -1
            }

            // 删除某一个节点,删除失败放回false
            remove (nodeVal) {
                if(nodeVal === 'head' && this.head.next === null) {
                    return false; // 一个节点'head'不能删除
                }
                let needRemoveNode = this.findByVal(nodeVal)
                if(needRemoveNode === -1) return false
                let preveNode = this.findNodePreByVal(nodeVal)
                if(nodeVal === 'head') {
                    
                    this.head = this.head.next.next;
                }else
                    preveNode.next = needRemoveNode.next
            }


            //遍历节点

            disPlay () {
                let res = new Array()
                let current = this.head
                while( current !== null ) {
                    res.push(current.val)
                    current = current.next
                }
                return res
            }
            
            // 在链表末尾插入一个新的节点
            push (nodeVal) {
                let current = this.head
                let node = new ListNode(nodeVal)
                while(current.next !== null)
                    current = current.next
                current.next = node
            }
        }
```

当然了，可能还有一些其他的方法我是没有想到的，剩下的可以自行去完成

**链表类的使用**

```js
		let demo = new LinkedList() // LinkedList {head: ListNode}
        // console.log((demo.disPlay())) 
        demo.push('1232')
        demo.insert(123,'head');
        demo.push('last value')
        // console.log(demo.remove('head'))
        demo.push('2132')
        demo.insert('不存在的值','插入失败')  //return -1
        console.log(demo.findByIndex(4))
        console.log((demo.disPlay())) 
```

上面的代码片段是测试用到，测试过了，基本上没有上面大问题，当然了，有些细枝末节的地方还是得注意的，比如`findByIndex`这个函数中`pos = 0` 还是 `pos  = 1`问题，取决于自己，还有的话，`remove`函数到底能不能删除'head'头节点，这都是没有准确的标准的，这个可以根据自己情况而定，

一定记住，不是唯一标准，你认为可以删除'head'的话，也没有问题。



**双向链表**

双链表以类似的方式工作，但`还有一个引用字段`，称为`“prev”`字段。有了这个额外的字段，您就能够知道当前结点的前一个结点。

让我们看一个例子：

![双链表](C:\Users\DayDay\Desktop\Blog\images\算法\双链表.png)

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

![](C:\Users\DayDay\Desktop\Blog\images\算法\demo-doubleNode1.png)

让我们在现有结点 6 之后添加一个新结点 9：

第一步：链接 `cur`（结点 9）与 `prev`（结点 6）和 `next`（结点 15）

![](C:\Users\DayDay\Desktop\Blog\images\算法\demo-doubleNode2.png)

第二步：用 `cur`（结点 9）重新链接 `prev`（结点 6）和 `next`（结点 15）

![](C:\Users\DayDay\Desktop\Blog\images\算法\demo-doubleNode3.png)

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



### 合并两个有序链表⭐

题目描述：将两个升序链表合并为一个新的 **升序** 链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。 

> 链接：[[力扣]合并两个有序链表](https://leetcode-cn.com/problems/merge-two-sorted-lists/)



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



代码点这里