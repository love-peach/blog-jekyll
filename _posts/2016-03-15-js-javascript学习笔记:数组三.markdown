---
layout: post
title: "javascript学习笔记:数组(三)"
date: 2016-03-15 00:05:00
categories: article js
tags: [数组,转载]
whichPage: js
bannerImg: /img/illustration/2016.jpg
---
JavaScript是一种弱类型语言，不像其它程序语言需要严格定义数据类型。在JavaScript中数组可以任意修改变动，这样也就出现了一个问题，如果边遍历数组边操作数组（比如删除当前项，则所有之后的数组元素下标都将向前移动）是一件很危险的事情。

JavaScript的数组是一个拥有堆栈和队列自身优点的global对象。也就是说JavaScript数组可以表现的像栈(LIFO)和队列(FIFO)一样操作。这也是JavaScript数组强大的可操作性的体现。

今天一起来学习JavaScript数组的栈和队列的操作方法。


## 堆栈和队列

要了解JavaScript数组的堆栈和队列方法的操作，需要先对堆栈和队列基础知识有所了解。在继续后面的内容之前，我们先简单的了解一下堆栈和队列的概念。

**栈和队列**都是动态的集合，在栈中，可以去掉的元素是最近插入的那一个。栈实现了后进先出。在队列中，可以去掉的元素总是在集合中存在的时间最长的那一个。队列实现了先进先出的策略。

**堆栈的基本概念**

先上张图：

![堆栈的基本概念](http://cdn.w3cplus.com/cdn/farfuture/1b41GAmMcH4JyXG3kB1_8Hs98W07cQquqiLv0rGndIk/mtime:1456055242/sites/default/files/blogs/2016/1602/20150101235414.png)

栈是一种LIFO（Last-In-First-Out，后进先出）的数据结构，也就是最新添加的项最早被移除。而栈中项的插入（叫做推入）和移除（叫做弹出），只发生在一个位置——栈的顶部。

最开始栈中不含有任何数据，叫做空栈，此时栈顶就是栈底。然后数据从栈顶进入，栈顶栈底分离，整个栈的当前容量变大。数据出栈时从栈顶弹出，栈顶下移，整个栈的当前容量变小。

比如说，我们在一个箱子中放了很多本书，如果你要拿出第二书，那么你要先把第一本书拿出来，才能拿第二本书出来；拿出第二本书之后，再把第一本书放进去。

ECMAScript为数组专门提供了 `push()` 和 `pop()` 方法，以便实现类似栈的行为。 `push()` 方法可以接收任意数量的参数，把它们逐个添加到数组末尾，并返回修改后数组的长度。而 `pop()` 方法则从数组末尾移除最后一项，减少数组的length值，然后返回移除的项。

**队列的基本概念**

栈数据结构的访问规则是LIFO(后进先出)，而队列数据结构的访问规则是FIFO(Fist-In-First-Out,先进先出)。队列在列表的末端添加项，从列表的前端移除项。如下图所示：

![队列的基本概念](http://cdn1.w3cplus.com/cdn/farfuture/FAUUjCsNmZNckVpKGyRm4kXiyd1puJdn0Xyz4STl9xI/mtime:1456055242/sites/default/files/blogs/2016/1602/20150101235139.png)


比如说火车站排队买票，先到的先买，买好的先走。

入队列操作其实就是在队尾追加一个元素，不需要任何移动，时间复杂度为O(1)。出队列则不同，因为我们已经架设下标为0的位置是队列的队头，因此每次出队列操作所有元素都要向前移动。如下图所示：

![入队出队](http://cdn.w3cplus.com/cdn/farfuture/zi5ytLrCFEjexpDZvoyDUVESM2uhwfFV2TXgbM0-XxQ/mtime:1456056511/sites/default/files/blogs/2016/1602/js-duilie.png)

ECMAScript为数组专门提供了 `shift()` 和 `unshift()` 方法，以便实现类似队列的行为。由于 `push()` 是向数组末端添加数组项的方法，因此要模拟队列只需一个从数组前端取得数组项的方法。实现这一操作的数组方法就是 `shift()` ，它能够移除数组中的第一个项并返回该项，同时将数组长度减`1`。

顾名思义， `unshift()` 与 `shift()` 的用途相反：它能在数组前端添加任意个数组项并返回新数组的长度。因此，同时使用 `unshift()` 和 `pop()` 方法，可以从相反的方向来模拟队列，即在数组的前端添加数组项，从数组末端移除数组项。


## push()方法

该方法是向数组末尾添加一个或者多个元素，并返回新的长度。

push()方法可以接收任意数量的参数，把它们逐个添加到数组的末尾，并返回修改后数组的长度。如：

{% highlight js %}
var arr = []; //创建一个空数组
console.log(arr); // []
console.log("入栈"); // 入栈
arr.push(1); // 将1添加到数组arr中
console.log(arr); // [1]
arr.push(2); //将2添加到数组arr中
console.log(arr); //[1,2]
arr.push([3,4]); // 将数组[3,4]添加到arr中
console.log(arr); // [1,2,[3,4]]
console.log(arr.length); // 3
{% endhighlight %}

## pop()方法

pop()方法刚好和push()方法相反。pop()方法删除数组的最后一个元素，把数组的长度减1，并且返回它被删除元素的值，如果数组变为空，则该方法不改变数组，返回undefine值。如下代码演示：

{% highlight js %}
var arr = [1,2,3,4]; //创建一个数组
console.log(arr); // [1,2,3,4]
console.log(arr.length); // 4
console.log("出栈，后进先出"); // 出栈，后进先出
arr.pop();
console.log(arr); //  // [1,2,3]
arr.pop();
console.log(arr); // [1,2]
arr.pop();
console.log(arr); // [1]
arr.pop();
console.log(arr); // []
{% endhighlight %}


## unshift()方法

unshift()方法是向数组的开头添加一个或多个元素，并且返回新的长度。

{% highlight js %}
var arr = []; //创建一个空的数组
console.log(arr); // []
console.log("入队"); // 入队
arr.unshift(1,2,3,4); // 将1,2,3,4推入到数组arr
console.log(arr); // [1,2,3,4]
console.log(arr.length); // 4
{% endhighlight %}

## shift()方法

`shift()` 方法和 `unshift()` 方法恰恰相反。该方法用于把数组的第一个元素从其中删除，并返回被删除的值。如果数组是空的，`shift()` 方法将不进行任何操作，返回`undefined` 的值。

{% highlight js %}
var arr = [1,2,3,4]; // 创建一个数组
console.log(arr); // [1,2,3,4]
arr.shift(); // 取得第一项
console.log(arr); // [2,3,4]
arr.shift(); // 取得第一项
console.log(arr); // [3,4]
arr.shift(); // 取得第一项
console.log(arr); // [4]
arr.shift(); // 取得第一项
console.log(arr); // []
{% endhighlight %}


**简单得回忆一下：**

- `push()` 方法可以在数组的末属添加一个或多个元素
- `shift()` 方法把数组中的第一个元素删除
- `unshift()` 方法可以在数组的前端添加一个或多个元素
- `pop()` 方法把数组中的最后一个元素删除

## JavaScript实现类似栈和队列的行为

了解这几种方法之后，我们就可以将它们结合起来，轻松的实现类似栈和队列的行为。

**实现类似栈的行为**

将push()和pop()结合在一起，我们就可以实现类似栈的行为：

{% highlight js %}
//创建一个数组来模拟堆栈
var a=new Array();
console.log(a);
//push: 在数组的末尾添加一个或更多元素，并返回新的长度
console.log("入栈");
a.push(1)
console.log(a);//----->1
a.push(2);
console.log(a);//----->1,2
a.push(3);
console.log(a);//----->1,2,3
a.push(4);
console.log(a);//----->1,2,3,4
console.log("出栈，后进先出");
console.log(a);
//pop：从数组中把最后一个元素删除，并返回这个元素的值
a.pop();//----->4
console.log(a);
a.pop();//----->3
console.log(a);
a.pop();//----->2
console.log(a);
a.pop();//----->1
console.log(a);
{% endhighlight %}

**实现类似队列的行为**

将 `shift()` 和 `push()` 方法结合在一起，可以像使用队列一样使用数组。即在数组的后端添加项，从数组的前端移除项：

{% highlight js %}
//创建一个数组来模拟队列
var a=new Array();
console.log(a);
//push: 在数组的末尾添加一个或更多元素，并返回新的长度
console.log("入队");
a.push(1)
console.log(a);//----->1
a.push(2);
console.log(a);//----->1,2
a.push(3);
console.log(a);//----->1,2,3
a.push(4);
console.log(a);//----->1,2,3,4
console.log("出队，先进先出");
console.log(a);
//shift：从数组中把第一个元素删除，并返回这个元素的值
a.shift();//----->1
console.log(a);
a.shift();//----->2
console.log(a);
a.shift();//----->3
console.log(a);
a.shift();//----->4
console.log(a);
{% endhighlight %}


除此之外，还可以同时使用unshift()和pop()方法，从相反的方向来模拟队列，即在数组的前端添加项，从数组的后端移除项。如下面的示例所示：

{% highlight js %}
//创建一个数组来模拟队列
var a=new Array();
console.log(a);
//unshift: 在数组的前端添加一个或更多元素，并返回新的长度
console.log("入队");
a.unshift(1)
console.log(a);//----->1
a.unshift(2);
console.log(a);//----->2,1
a.unshift(3);
console.log(a);//----->3,2,1
a.unshift(4);
console.log(a);//----->4,3,2,1
console.log("出队，先进先出");
console.log(a);
//pop：从数组中把最一个元素删除，并返回这个元素的值
a.pop();//----->4
console.log(a);
a.pop();//----->3
console.log(a);
a.pop();//----->2
console.log(a);
a.pop();//----->1
console.log(a);
{% endhighlight %}


## push()方法和unshift()方法的性能测试

> 以下这部分内容来自于[《JavaScript学习：JavaScript的数组实现队列与堆栈的方法》]()一文。

Array的push()与unshift()方法都能给当前数组添加元素，不同的是，push()是在末尾添加，而unshift()则是在开头添加，从原理就可以知道，unshift()的效率是较低的。原因是，它每添加一个元素，都要把现有元素往下移一个位置。但到底效率差异有多大呢?下面来简单测试一下。

{% highlight js %}
/*
关于代码中"var s=+newDate();"的技巧说明
解释如下:=+这个运算符是不存在的;
+相当于.valueOf();
+new Date()相当于new Date().valueOf()
//4个结果一样返回当前时间的毫秒数
  alert(+new Date());
  alert(+new Date);
  var s=new Date();
  alert(s.valueOf());
  alert(s.getTime());
*/
var arr = [ ];
var startTime = +new Date(); //+new Date()相当于new Date().valueOf()，返回当前时间的毫秒数
// push性能测试 
for (var i = 0; i < 100000; i++) { 
　　arr.push(i); 
}
var endTime = +new Date();
console.log("调用push方法往数组中添加100000个元素耗时"+(endTime-startTime)+"毫秒"); 

startTime = +new Date(); 
arr = [ ]; 
// unshift性能测试 
for (var i = 0; i < 100000; i++) { 
　　arr.unshift(i); 
}
endTime = +new Date();
console.log("调用unshift方法往数组中添加100000个元素耗时"+(endTime-startTime)+"毫秒"); 
{% endhighlight %}

这段代码分别执行了100000次push()和unshift()操作，在chrome浏览器运行一次，得到的结果如下图所示：

![性能测试结果](http://cdn1.w3cplus.com/cdn/farfuture/J1McwjYcFiAfjQqDbfETpfyyizoE8nnMWhPDUXtWXcQ/mtime:1456062650/sites/default/files/blogs/2016/1602/20150101235610.png)

可见，unshift()比push()要慢差不多100倍!因此，平时还是要慎用unshift()，特别是对大数组。那如果一定要达到unshift()的效果，可以借助于Array的reverse()方法，Array的reverse()的方法能够把一个数组反转。先把要放进数组的元素用push()添加，再执行一次reverse()，就达到了unshift()的效果。比如：

{% highlight js%}
//创建一个数组来模拟堆栈
var a=new Array();
//使用push方法在数组的末尾添加元素
a.push(1)
a.push(2);
a.push(3);
a.push(4);
console.log("数组反转之前数组中的元素顺序");
console.log(a);//----->1,2,3,4
//Array有一个叫做reverse的方法，能够把一个数组反转。先把要放进数组的元素用push添加，再执行一次reverse，就达到了unshift的效果
a.reverse();//使用reverse方法将数组进行反转
console.log("数组反转之后数组中的元素顺序");
console.log(a);
{% endhighlight %}

在chrome浏览器控制台输出的效果如下图所示：

![反转](http://cdn2.w3cplus.com/cdn/farfuture/yzi0Bp1Lxnl1dOpag7U2PpCzaKYXwRBjFCWH--ivRVA/mtime:1456062650/sites/default/files/blogs/2016/1602/20150101235638.png)


从运行结果来看，数组元素的顺序已经反转过来了。

reverse()方法的性能测试

{% highlight js%}
var arr = [ ], s = +new Date; 
for (var i = 0; i < 100000; i++) { 
　　    arr.push(i); 
}
//调用reverse方法将数组里面的100000元素的顺序反转
arr.reverse(); 
console.log("调用reverse方法将数组里面的100000元素的顺序反转耗时："+(+new Date - s)+"毫秒");
{% endhighlight %}


在chrome浏览器控制台输出的效果如下图所示：

![反转耗时](http://cdn.w3cplus.com/cdn/farfuture/FknHzXaOoX_Y03JawgI3Z27QEIWH86sfszloAzRF1Qw/mtime:1456062650/sites/default/files/blogs/2016/1602/20150101235657.png)

从运行效果中可以看到，reverse()方法的性能极高，可以放心使用。


## 总结

![总结图片][总结图片]

转载地址：[JavaScript学习笔记：数组(三)](http://www.w3cplus.com/javascript/array-part-3.html)

[总结图片]: {{site.cloudSrc}}/img/js/jss-shuzu.png

