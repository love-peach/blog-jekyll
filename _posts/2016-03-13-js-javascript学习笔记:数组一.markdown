---
layout: post
title: "javascript学习笔记:数组(一)"
date: 2016-03-13 18:11:00
categories: article js
tags: [css样式,转载]
whichPage: js
bannerImg: /img/illustration/2016.jpg
---

数组(Array)是JavaScript最常用类型之一。初学者也最容易将数组(Array)和对象(Object)混淆，而且和其它语言中的数组又有着相当大的区别。作为一位初学者，为了能理清楚数组，把自己学习过程中做了一些笔记。


## 什么是数组？

数组(Array)简单的理解就是按次序排列的一组值。每个值的位置都有自己的编号，而且这个编号是从0开始。先来看一个简单的数组示例，看其长成啥样：

{% highlight js %}
var arr = [1,'china',2];
//上面的 1 , china 和 2 就构成了一个数组。
{% endhighlight%}

JavaScript的数组的每一项可以保存任何类型的数据。也就是说，在数组的第一个位置可以保存字符串，第二个位置可以保存数值，第三个位置保存对象，依此类推。比如：

{% highlight js %}
var arr = [35, "大漠", new Date(), function(){}, , null];
//上面这个数组中依次存放了数值、字符串、对象、函数、undefined(空值)和null。
{% endhighlight%}

## 创建数组

在实际生产中，创建数组的方式基本有两种。

**第一种　使用Array构造函数**

可以使用Array构造函数来创建数组，如下所示：

{% highlight js %}
var arr = new Array(); // output: []
//上面的代码就是创建了一个空的数组[]。可以通过数组的length属性验证。
console.log(arr.length); //output: 0


//如果预先知道要创建的数组的项目数量，可以在构造函数中传递该数量：
var arr = new Array(5); // output: [undefined × 5];
//这个时候，该数量会自动变成数组的length值：
console.log(arr.length); //output: 5


//也可以向构造函数Array直接传入需要创建的数组中应该包含的数组项：
var arr = new Array('a', 'b', 'c'); // output: ["a", "b", "c"]

{% endhighlight%}

从上面几个简单的示例，我们可以得知，通过Array构造函数创建数组，我们可以：

- 创建一个空数组： new Array()
- 创建一定数量的数组： new Array(5)
- 创建指定数组项目的数组： new Array('a','b','c')

需要注意的是，当只给new Array()传递一个值创建数组时，问题会变得比较复杂。如果传递的是一个数值，则会按该数值创建包含给定项数的数组；如果传递的是其它类型的参数时，则会创建包含那个值的只有一项的数组。来看个简单的示例：

{% highlight js %}
var arr1 = new Array(3); // 创建一个包含3项的数组
var arr2 = new Array('3'); // 创建一个包含1项的数组，该项的值为字符串"3"

console.log(arr1); //[undefined × 3]
console.log(arr2); // ["3"]
console.log(arr1.length); // 3
console.log(arr2.length); // 1
{% endhighlight %}

在实际生产中，使用Array构造函数创建数组时，还可以省略new操作符。如：

{% highlight js %}
var arr1 = Array('china');  // "china" arr1.length=1
var arr2 = new Array('china'); // "china" arr2.length=1
{% endhighlight %}

**第二种　使用[]创建数组**

除了使用Array构造函数创建数组之外，还可以直接使用[]（数组字面量表示法）创建数组。采用这种方式创建数组时，数组的每个数组项之间以逗号(,)分隔开，如下所示：

{% highlight js %}
var arr1 = ['a','b']; //创建一个包含两个字符串的数组
var arr2 = []; //创建一个空数组
{% endhighlight %}

## 数组元素的访问

前面也说过，数组每一项都有对应的索引号，而且其索引号从0开始，到数组的length值结束。在实际生产中，总是需要访问数组的数组项，我们就可以通过数组的索引号来访问数组元素。如：

{% highlight js %}
var colors = ['blue','red','green']; //创建了一个字符串数组
console.log(colors[0]); // output: "blue"
console.log(colors[1]); // output: "red"
console.log(colors[2]); // output: "green"
{% endhighlight %}

colors[0]方括号[]中的索引表示要访问的数组元素。

在数组中除了可以通过索引访问数组的数组项之外，还可以通过其来修改数组中的数组项。如：

{% highlight js %}
var arr = ['a','b']; //创建了一个字符串数组
arr[0] = 'a'; //访问组数中的第一个数组项
arr[2] = 'c'; //给数组添加一个新的数组项
arr[1] = 'abc'; //将数组的第二个数组项`b`修改为`abc`
{% endhighlight %}

## 数组的length属性

数组的length属性主要用来保存数组的项目数（也就是数组的成员数量）。这个属性始终会返回0或更大的值，如下面的示列：

{% highlight js %}
[].length; //0
["red","blue","green"].length; //3
{% endhighlight %}

JavaScript使用一个32位整数，保存数组的元素个数。简单点说，数组的length属性的最大值是4294967295。

另外，数组的length属性是一个动态的值，等于键名中的最大整数加上1。

{% highlight js %}
var arr = ['a', 'b'];
arr.length // 2

arr[2] = 'c';
arr.length // 3

arr[9] = 'd';
arr.length // 10

arr[1000] = 'e';
arr.length // 1001
{% endhighlight %}

上面代码表示，数组的数字键不需要连续，length属性的值总是比最大的那个整数键大1。另外，这也表明数组是一种动态的数据结构，可以随时增减数组的成员。

length属性是可写的，如果人为设置一个小于当前成员个数的值，该数值的成员会自动减少到length设置的值。

{% highlight js %}
var arr = ['a','b','c'];
arr.length; // 3
arr.length = 2;
arr[2]; // undefined
arr // ['a','b']
{% endhighlight %}

上面的代码表示，当数组的length值为2时（即最大的整数键只能是1（也就是length-1））。那么arr[2]的值c就已经不在该数组中了，也就是说被自动删除了。我们再访问arr[2]时就会显示为undefined。

反之，如查将数组length属性值设置为大于数组项数的值，则新增的每一项都会取得undefined的值。如下面这样的示例：

{% highlight js %}
var arr = ['a','b','c']; //定义了一个包含三个项目的数组
arr.length; // 3
arr.length = 4; //设置数组arr的length值为4
arr[3]; //undefined 
{% endhighlight %}

在此，虽然arr数组包含3个数组项，但把它的length属性值设置为4。这个数组不存在位置3，所以访问这个位置的值就得到了特殊值undefined。

这样一来，我们就可以方便的利用length属性给数组末尾添加新的数组项。如下所示：

{% highlight js %}
var arr = ['a','b','c'];
arr.length; // 3
arr[arr.length] = 'd'; // 在位置3添加`d`
arr; // ["a", "b", "c", "d"]
arr.length; // 4
{% endhighlight %}

由于数组最后一项的索引始终是length-1,因此下一个新项的位置就是length。每当在数组末尾添加一项后，其length属性就会自动更新。

## 总结

这篇文章简单的总结了JavaScript数组的创建方式以及如何访问数组的项目。并且介绍了数组的length的属性，以及如何通过length简单的实现在数组的末属添加和删除数组项。简单归纳为：

- JavaScript数组是JavaScript数据类型之一
- JavaScript数组就是一组有序排列的值，而且每个值都有自己对应的索引编号值
- 可以通过new Array()、Array()或[]创建数组
- 可以通过数组的索引值访问数组的数组项
- 数组的length属性主要用来保存数组的项目数
- 可以简单的通过length属性值来删除数组的最后一个值或给数组最后添加一个数组项目值

转载链接：　[JavaScript学习笔记：数组(一)](http://www.w3cplus.com/javascript/array-part-1.html)
