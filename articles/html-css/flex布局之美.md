## 前言

最近在项目中，遇到布局问题，有时候，需要堆叠很多的样式，去排版，一定程度上增加了代码量，那么有没有更加方便的布局方式呢？👇

`flex布局`在某种程度上，解决了我们布局的一个难题，接下来的篇幅将介绍它的使用





## flex基本概念

要想熟练掌握flex布局的话，你需要理解两个概念：`轴`和`容器`。

![](..\..\\images\html-css\flex\flex布局基本概念.png)

从上面图来看，我们将flex布局分为两部分讲，`轴`和`容器`。

**轴**

- 主轴（mian axis）
- 交叉轴（cross axis）

**容器**

- 父容器（container)
- 子容器（item）



打个预防针，`flex布局`涉及到12个CSS属性，父容器,子容器各6个。

接下来先梳理常见的属性，不常见的放在进阶部分来梳理。



### 轴

我们知道，`轴`包括`主轴`和`交叉轴`,那么它们的方向是如何决定呢？我们直接从一张图看懂它👇

![](..\..\images\html-css\flex\flex轴的概念.png)

默认情况下，**主轴**的方向是从左向右的，**交叉轴**垂直于主轴，逆时针方向90度，那么接下来我们看**flex-direction**是如何决定主轴的。讲这个之前，我们需要明白👇

- 交叉轴是由主轴决定的，主轴又是由flex-direction决定的。

- flex-direction属性设置在父容器上，这样子才可以生效。



```css
flex-direction: row | row-reverse | column | column-reverse
```

首先布局如下👇

```html
<div class="wrapper">
        <div class="flex1">子盒子#flex1: 1 </div>
        <div class="flex2">子盒子#flex2: 1 </div>
</div>
```



接下来，我们看看他们的效果吧👇

---------



#### flex-direction: row

```
当你给父盒子(wrapper)设置属性
flex-direction: row
```

效果👇

![flex-direction: row](..\..\images\html-css\flex\flex-direction-row.png)

**结论**

- flex容器的主轴被定义为与文本方向相同。 主轴起点和主轴终点与内容方向相同。
- 简单理解就是**主轴沿着水平方向向右**



--------



#### flex-direction: row-reverse

```
当你给父盒子(wrapper)设置属性
flex-direction: row-reverse
```

效果👇

![flex-direction: row-reverse](..\..\images\html-css\flex\flex-direction-row-reverse.png)

我们可以看到这两个盒子的位置发生了变化，这个就是主轴起点和主轴终点位置**置换**的原因。





**结论**

- 表现和row相同，但是置换了主轴起点和主轴终点。
- 简单理解就是**主轴沿着水平方向向左**，与文本方向相反。



----------



#### flex-direction: column

```
当你给父盒子(wrapper)设置属性
flex-direction: column
```

效果👇

![flex-direction: column](..\..\images\html-css\flex\flex-direction-column.png)

可以看到，子盒子的布局发生了变化，形成了在Y轴上的布局方式,并且书写方式跟布局一样。



**结论**

- flex容器的主轴和块轴相同。主轴起点与主轴终点和书写模式的前后点相同
- 简单的理解，就是主轴变成Y轴方向，方向从上到下布局。





-------------------



#### flex-direction: column-reverse

```
当你给父盒子(wrapper)设置属性
flex-direction: column-reverse
```

效果👇

![flex-direction: column-reverse](..\..\images\html-css\flex\flex-direction-column-reverse.png)

可以看到，子盒子的布局跟column差不多，唯一不同的是，方向上发生了变化。



**结论**

- 表现和`column`相同，但是置换了主轴起点和主轴终点
- 简单的理解，就是主轴变成Y轴方向，方向从下到上，与书写的方向相反。



----------





### 容器

