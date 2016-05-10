---
layout: post
title: "javascript学习笔记:数组(八)"
date: 2016-05-09 15:29:00
categories: article js
tags: [数组,转载]
whichPage: js
bannerImg: /img/illustration/2016.jpg
---

很多时候需要累加数组项的得到一个值(比如说求和)。如果你碰到一个类似的问题，你想到的方法是什么呢？会不会和我一样，想到的就是使用for或while循环，
对数组进行迭代，依次将他们的值加起来。比如：



{% highlight js%}
var arr = [1,2,3,4,5,6];
Array.prototype.sum = function (){
    var sumResult = 0;
    for (var i = 0; i < this.length; i++) {
        sumResult += parseInt(this[i]);
    }
    return sumResult;
}

arr.sum(); // 21
{% endhighlight %}

或者

{% highlight js%}
var arr =  [1,2,3,4,5,6];

Array.prototype.sum = function () {
    var sumResult = 0;
    var i = this.length;
    while (i--) {
        sumResult += parseInt(this[i]);
    }
    return sumResult;
}

arr.sum(); // 21
{% endhighlight %}

虽然上面使用for和while都能实现需要的效果，但在JavaScript中有没有更好的方案呢？回答是肯定的，在JavaScript中(ESMAScript 5)提供了
另外两个数组的方法reduce()和reduceRight()，这两个数组会迭代数组的所有数组项，然后返回一个最终值。接下来的内容，主要来学习这两种方法。

## reduce()方法
   
reduce()方法接收一个函数callbackfn作为累加器（accumulator），数组中的每个值（从左到右）开始合并，最终为一个值。
   
### 语法

{% highlight js %}
array.reduce(callbackfn,[initialValue])
{% endhighlight %}

reduce()方法接收callbackfn函数，而这个函数包含四个参数：
 
{% highlight js %}
function callbackfn(preValue,curValue,index,array){}
{% endhighlight %}

- preValue: 上一次调用回调返回的值，或者是提供的初始值（initialValue）
- curValue: 数组中当前被处理的数组项
- index: 当前数组项在数组中的索引值
- array: 调用 reduce()方法的数组

而 `initialValue` 作为第一次调用 `callbackfn` 函数的第一个参数。

`reduce()` 方法为数组中的每一个元素依次执行回调函数 `callbackfn` ，不包括数组中被删除或从未被赋值的元素，接受四个参数：初始值（或者上一次回调函数的返回值），当前元素值，当前索引，调用 `reduce()` 的数组。

回调函数第一次执行时， `preValue` 和 `curValue` 可以是一个值，如果 `initialValue` 在调用 `reduce()` 时被提供，那么第一个 `preValue` 等于 `initialValue` ，并且 `curValue` 等于数组中的第一个值；如果 `initialValue` 未被提供，那么 `preValue` 等于数组中的第一个值，`curValue` 等于数组中的第二个值。

来看一个示例：

{% highlight js %}
var arr = [0,1,2,3,4];

arr.reduce(function (preValue,curValue,index,array) {
    return preValue + curValue;
}); // 10
{% endhighlight %}

示例中的回调函数被执行四次，每次参数和返回的值如下：

  &nbsp; | preValue | curValue | index|    array     | 返回值 
---------|----------|----------|------|--------------|-------
第一次回调 |     0    |     1    |  1   | [0,1,2,3,4]  | 1    
第二次回调 |     1    |     2    |  2   | [0,1,2,3,4]  | 3    
第三次回调 |     3    |     3    |  3   | [0,1,2,3,4]  | 6    
第四次回调 |     6    |     4    |  4   | [0,1,2,3,4]  | 10   


上面的示例reduce()方法没有提供initialValue初始值，接下来再上面的示例中，稍作修改，提供一个初始值，这个值为5。这个时候reduce()方法会执行五次回调，每次参数和返回的值如下：

{% highlight js %}
var arr = [0,1,2,3,4];

arr.reduce(function (preValue,curValue,index,array) {
    return preValue + curValue;
}, 5); //15
{% endhighlight %}


  &nbsp; | preValue | curValue | index|    array     | 返回值 
---------|----------|----------|------|--------------|-------
第一次回调 |     5    |     0    |  0   | [0,1,2,3,4]  | 5    
第二次回调 |     5    |     1    |  1   | [0,1,2,3,4]  | 6    
第三次回调 |     6    |     2    |  2   | [0,1,2,3,4]  | 8    
第四次回调 |     8    |     3    |  3   | [0,1,2,3,4]  | 11    
第五次回调 |     11   |     4    |  4   | [0,1,2,3,4]  | 15  

## reduceRight()方法

reduceRight()方法的功能和reduce()功能是一样的，不同的是reduceRight()从数组的末尾向前将数组中的数组项做累加。

`reduceRight()` 首次调用回调函数 `callbackfn` 时， `prevValue` 和 `curValue` 可以是两个值之一。如果调用 `reduceRight(`) 时提供了 `initialValue` 参数，
则 `prevValue` 等于 `initialValue` ， `curValue`  等于数组中的最后一个值。如果没有提供 `initialValue` 参数，则 `prevValue` 等于数组最后一个值， `curValue` 等于数组中倒数第二个值。

来看实例：

{% highlight js %}
var arr = [0,1,2,3,4];

arr.reduceRight(function (preValue,curValue,index,array) {
    return preValue + curValue;
}); // 10
{% endhighlight %}

回调将会被调用四次，每次调用的参数及返回值如下：

  &nbsp; | preValue | curValue | index|    array     | 返回值 
---------|----------|----------|------|--------------|-------
第一次回调 |     4    |     3    |  3   | [0,1,2,3,4]  | 7    
第二次回调 |     7    |     2    |  2   | [0,1,2,3,4]  | 9    
第三次回调 |     9    |     1    |  1   | [0,1,2,3,4]  | 10    
第四次回调 |     10   |     0    |  0   | [0,1,2,3,4]  | 10  

如果提供一个初始值initialValue为5:

{% highlight js%}
var arr = [0,1,2,3,4];

arr.reduceRight(function (preValue,curValue,index,array) {
    return preValue + curValue;
}, 5); // 15
{% endhighlight %}

回调将会被调用五次，每次调用的参数及返回的值如下：

  &nbsp; | preValue | curValue | index|    array     | 返回值 
---------|----------|----------|------|--------------|-------
第一次回调 |     5    |     4    |  4   | [0,1,2,3,4]  | 9    
第二次回调 |     9    |     3    |  3   | [0,1,2,3,4]  | 12    
第三次回调 |     12   |     2    |  2   | [0,1,2,3,4]  | 14    
第四次回调 |     14   |     1    |  1   | [0,1,2,3,4]  | 15    
第五次回调 |     15   |     0    |  0   | [0,1,2,3,4]  | 15 
 
## 总结
 
reduce()和reduceRight()两个方法功能都是类似的，可以让数组调用一个回调函数callbackfn作为累加器。实际上根据这个回调函数，可以实现不同的功能，
比如说，对数组项求合；将多个数组合并到一个数组等等。甚至配合数组其他的方法你还可以做更多功能的处理。如果感兴趣的话不仿尝试一二。

转载地址: [JavaScript学习笔记：数组(八)](http://www.w3cplus.com/javascript/array-part-8.html)
