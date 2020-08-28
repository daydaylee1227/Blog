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



这里就分为**父容器**和**子容器**，我们先来看看父容器👇

#### 父容器

- justify-content:  **设置子元素在主轴方向上的对齐方式**
- align-items： **设置子元素在交叉轴方向上的对齐方式**

![父容器常见属性](..\..\images\html-css\flex\父容器常见属性.png)



----------



#### justify-content

这个属性设置在父容器上，**决定子元素在主轴方向上的对齐方式**，我们看看它们具体表现吧👇



----------



#### justify-content: flex-start

```
当你给父盒子(wrapper)设置属性
justify-content: flex-start
```

效果👇

![justify-content-flex-start](..\..\images\html-css\flex\justify-content-flex-start.png)

**结论**，子元素沿着主轴方向开始对齐。



-----



#### justify-content: flex-end

```
当你给父盒子(wrapper)设置属性
justify-content: flex-end
```

效果👇

![justify-content-flex-end](..\..\images\html-css\flex\justify-content-flex-end.png)

**结论**，子元素沿着主轴方向终点对齐。



---------



#### justify-content: center

```
当你给父盒子(wrapper)设置属性
justify-content: center
```

效果👇

![justify-content-center](..\..\images\html-css\flex\justify-content-center.png)

**结论**，子元素在主轴方向上水平居中。



--------------



#### justify-content: space-between

```
当你给父盒子(wrapper)设置属性
justify-content: space-between
```

效果👇

![justify-content-space-between](..\..\images\html-css\flex\justify-content-space-between.png)

**结论**，子元素在主轴方向上**两端对齐，项目之间间隔相等**。



-----------





#### justify-content: space-around

```
当你给父盒子(wrapper)设置属性
justify-content: space-around
```

效果👇

![justify-content-space-around](..\..\images\html-css\flex\justify-content-space-around.png)

**结论**，子元素在主轴方向上**均匀排列每个元素，每个元素周围分配相同的空间**。



----------



#### align-items

这个属性设置在父容器上，**决定子元素在交叉轴方向上的对齐方式**，我们看看它们具体表现吧👇



---------



#### align-items: flex-start

```
当你给父盒子(wrapper)设置属性
align-items: flex-start
```

![align-items-flex-start](..\..\images\html-css\flex\align-items-flex-start.png)

**结论**，子元素在交叉轴方向上起点对齐。



---------



#### align-items: flex-end

```
当你给父盒子(wrapper)设置属性
align-items: flex-end
```



![](..\..\\images\html-css\flex\align-items-flexend.png)



**结论**，子元素在交叉轴方向上终点对齐。



----------



#### align-items: center

```
当你给父盒子(wrapper)设置属性
align-items: center
```



![align-items-center](..\..\\images\html-css\flex\align-items-center.png)



**结论**，子元素在交叉轴方向上居中对齐。



-----------



#### align-items: baseline

```
当你给父盒子(wrapper)设置属性
align-items: baseline
```

![align-items--baseline](C:\Users\litiantian03\Desktop\Blog\images\html-css\flex\align-items--baseline.png)

**结论**，子元素在交叉轴方向上以文字基线对齐，具体不清楚的，可以自行百度。



-------



#### align-items: stretch

```
当你给父盒子(wrapper)设置属性
align-items: stretch
```

![align-items--stretch](..\..\images\html-css\flex\align-items-stretch.png)

**结论**，这个属性是默认的，如果项目未设置高度或者设为 auto，将占满整个容器的高度。



------------



#### 子容器

