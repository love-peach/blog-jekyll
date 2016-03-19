---
layout: post
title: "javascript学习笔记:数组(五)"
date: 2016-03-19 16:01:00
categories: article js
tags: [数组,转载]
whichPage: js
bannerImg: /img/illustration/2016.jpg
---
JavaScript为操作已经包含在数组中的项提供了很多方法。比如 `push()` 、 `pop()` 、 `shift()` 和 `unshift()` 实现数组的增删操作、` sort()` 和 `reverse()`对数组项进行排序操作。今天学习操作数组的其他方法：`concat()` 、`slice()` 和 `splice()`。


## concat()方法

`concat()` 方法可以简单的将其理解为合并数组。基于当前数组中的所有项创建一个新数组。简单的说， `concat()` 先给当前数组创建一个副本，然后将接收到的参数添加到这个副本（数组）的末尾，最后返回一个新的数组。来看个简单的示例

{% highlight js %}
var arr = [`大漠`,'30','W3cplus'];
console.log(arr); // ["大漠", "30", "W3cplus"]
var arr2 = arr.concat('Blog','2014');
console.log(arr2); // ["大漠", "30", "W3cplus", "Blog", "2014"]
{% endhighlight%}

上面代码演示的 `concat()` 方法传递的值不是数组，这些值就会简单添加到结果数组(` arr2` )的末尾。

除此之外， concat()` 传递的值还有其他的使用方法：同时传递一个或多个数组，如下所示：

{% highlight js %}
var arr = ["大漠","30"];
console.log(arr); // ["大漠", "30"]
var arr2 = arr.concat(1,["blog","w3cplus"],["a","b","c"]);
console.log(arr2); // ["大漠", "30", 1, "blog", "w3cplus", "a", "b", "c"]
{% endhighlight%}


另外,concat()还可以传递空值（也就是说没有传递参数），此时它只是复制当前数组，并且返回一个副本。如下所示：

{% highlight js %}
var arr = [1,2];
console.log(arr); // [1, 2]
var arr2 = arr.concat();
console.log(arr2); // [1, 2]
{% endhighlight%}

从上面几个示例，不难看出：concat()方法是在数组的副本上进行操作并返回新构建的数组，所以并不会影响到原来的数组。


## concat() vs. push()

前面说过push()方法可以也可以给数组传参数，同样是在数组的末尾添加一个或多个值（数组）。那么与concat()有什么不同之处呢？别的先不多说，先来看一个示例：

{% highlight js %}
// push()方法
var arr = ['a','b'];
console.log(arr); // ["a", "b"]
arr.push('c','d');
console.log(arr); // ["a", "b", "c", "d"]

// concat()方法
var arr = ['a','b'];
console.log(arr); // ["a", "b"]
arr.concat('c','d');
console.log(arr); // ["a", "b"]
var arr2 = arr.concat('c','d');
console.log(arr2); // ["a", "b", "c", "d"]
{% endhighlight %}

Chrome输出的结果告诉我们：push()和concat()方法都可以将传的参数添加到数组的后面，只不过push()是在原数组上操作（改变的是原数组），concat()不会改变原数组，创建原数组的副本，并且把传的参数添加到新数组后面。

如果传的是数组又将是一个什么情形呢？还是看实例吧。

{% highlight js %}
// push()方法
var arr = ['a','b'];
console.log(arr); // ["a", "b"]
arr.push(['c','d'],[1,2,3]);
console.log(arr); // ["a", "b", Array[2], Array[3]]

// concat()
var arr = ['a','b'];
console.log(arr); // ["a", "b"]
var arr2 = arr.concat(['c','d'],[1,2,3]);
console.log(arr2); // ["a", "b", "c", "d", 1, 2, 3]
{% endhighlight %}

push()传递的参数是数组时，将整个数组传给原数组末尾，如示例中得到的结果 `["a", "b", Array[2], Array[3]]` ，而 `concat()` 传递的参数是数组时，将参数中数组的每一个数组项添加到原数组的末尾，如示例中得到的结果 `["a", "b", "c", "d", 1, 2, 3]`。

## slice()方法 

concat()方法可以在原数组基础上创建一个副本数组，其实slice()方法它也能基于当前数组创建一个新数组，而且对原数组也并不会有任何影响。

slice()接受一个或两个参数，即要返回项的起始和结束位置。当只给slice()传递一个参数时，该方法返回从该参数指定位置开始到当前数组末尾的所有项。如下面示例：

{% highlight js %}
// 测试数组函数，将输出数组的length和第个key:value
var test = function(array) {
  console.log('length:'+ array.length);
  array.forEach(function(element, index, array) {
    console.log(index + ':' + element);
  });
};

var arr = [0,1,2,3,4,5,6];
test(arr); 
var arr2 = arr.slice(3);
test(arr);
test(arr2);
{% endhighlight %}

假设将数组arr的每个数组项存放在一个小格子中，并且按数组的索引号从左向右存放。slice()方法执行之后，将会按传递的参数之前的值从格子中移除，如下图所示：

![slice()使用方法](http://cdn.w3cplus.com/cdn/farfuture/nVyy2EKBGO9TiZh8-6M-MwgI0SYv9ZsiojM_G8MXDUQ/mtime:1456844759/sites/default/files/blogs/2016/1603/array-slice-2.png)

slice()还可以传两个参数，该方法返回起始和结束位置之间的项，但不包括结束位置的项，如：

{% highlight js %}
var arr = [0,1,2,3,4,5,6];
test(arr);
var arr2 = arr.slice(2,5);
test(arr);
test(arr2);
{% endhighlight %}

同样使用小格子存放的方式来演示整个处理过程：

![slice()使用方法2](http://cdn1.w3cplus.com/cdn/farfuture/dbFn6eRBroe-8HI25Iwx0c_tNudRON5qs1u_cZpQ64g/mtime:1456845425/sites/default/files/blogs/2016/1603/array-slice-4.png)

`slice()` 传递的参数还可以是负值。当参数中有一个 **负值** 时，则用数组长度加上该数来确定相应的位置。比如传递的值是-3，数组的 `length` 为6，此时`slice(-3)` 对应的就是 `slice(3)`。或者可以从数组的末尾开始计算起，最末尾的是-1。来看看示例：

{% highlight js %}
var arr = [0,1,2,3,4,5,6];
test(arr);
var arr2 = arr.slice(-3);
test(arr);
test(arr2);
{% endhighlight %}

同样使用小格子存放的方式来演示整个处理过程：

![slice()使用方法3](http://cdn.w3cplus.com/cdn/farfuture/XxXQonXV3XGi9p_VSddT3WwYN88dw88qL_y0QCMycbU/mtime:1456847865/sites/default/files/blogs/2016/1603/array-slice-6.png)

当然第二个参数也可以是负数，而且还可以正数和负数混合使用。但有一点需要特别注意：slice()传递的两个参数时，第一个参数和第二个参数位置相同或者第一个参数在第二个参数之后时，得到的新数组是一个空值（负值也是类似，但负值与数值长度之和再作对比）。简言之，结束位置小于或等于开始位置，将返回一个空数组。如下面的示例：

{% highlight js %}
var arr = [0,1,2,3,4,5,6];
test(arr);
var arr2 = arr.slice(-3,4);
test(arr);
test(arr2);
{% endhighlight %}

![slice()使用方法4](http://cdn1.w3cplus.com/cdn/farfuture/gq27W1zmKtX2IdaSvH61kQ7_Y_Bo3lpWg2ZY3rn2UVA/mtime:1456848597/sites/default/files/blogs/2016/1603/array-slice-7.png)


slice()方法和concat()方法类似，会在原数组上构建一个新数组，并不会影响原数组


## splice()方法

splice()方法在处理数组的各方法中恐怕是最强大的了，它有很多种用法：

- 删除： 可以删除任意数量的数组项
- 插入： 可以向指定位置插入任意数量的数组项
- 替换： 可以向指定位置插入任意数量的数组项，且同时删除任意数量的数组项

**删除**

在 `splice()` 方法中指定两个参数，第一个参数是指定开始删除数组项位置，第二个数是指删除数组项的个数。如下面这个示例：

{% highlight js %}
var arr = [0,2,3,4,5,6];
test(arr);
var arr2 = arr.splice(2,3);
test(arr);
test(arr2);
{% endhighlight %}

从示例中不难看出，`splice()` 方法做删除动作之后，将会影响原数组(比如示例中的 `arr`)，并且将原数组中删除掉的数组项重构成一个新数组(比如示例中新得到的数组 `arr2`)。

**插入**

`splice()` 方法指定三个参数，第一个参数为插入的起始位置，第二个参数为0(要删除的数组项数量，因为删除数量是为0，所以不做删除)，第三个参数是要插入的数组项。如果要插入多个项，可以再传入第四、第五、以至任意多个项。如下面的示例：

{% highlight js %}
var arr = [0,1,2,3,4,5,6];
test(arr);
var arr2 = arr.splice(2,0,'a','b','c','d');
test(arr);
test(arr2);
{% endhighlight %}

上例从第二个位置开始插入字符串a、b、c、d字符串。从而原数组增加新的四个数组项，数组arr的length就变成了11；由于删除数量是0，所以返回给新数组arr2是空值（也就是一个空数组）。

**替换**

`splice()` 方法做替换其实和做插入非常类似，只是将第二参数设置为大于0（删除数的数量）。如下例所示：

{% highlight js %}
var arr = [0,1,2,3,4,5,6];
test(arr);
var arr2 = arr.splice(2,4,'a','b','c','d');
test(arr);
test(arr2);
{% endhighlight %}

结果告诉我们，在原数组arr上第二个位置开始删除了2、3、4和5个数组项，并且用a、b、c、d这几个值替换到删除掉的几个数组项的位置。同时把删除掉的几个数组项重新构成了新数组arr2。

`splice()` 方法始终会返回一个数组，该数组中包含从原始数组中删除的项（如果没有删除任何项，则返回一个空数组）。

`splice()` 方法和 `slice()` 方法类似，起始位置可以是负值，当起始位置为负值时，则用数组长度 `length` 加上该数来确定相应的位置。如下所示：

{% highlight js %}
var arr = [0,1,2,3,4,5,6];
test(arr);
var arr2 = arr.splice(-2,4,'a','b','c','d');
test(arr);
test(arr2);
{% endhighlight %}

## 总结

文章介绍了数组的三个操作方法concat()、slice()和splice()。concat()和slice()方法都不会影响原数组，会在原数组上构建出一个新数组。其中concat()方法在原数组末尾添加所传的数组项（简单点看有类似于push()方法），构建一个新数组；slice()方法可以从指定的位置开始删除指定的数组项，并且将删除的数组项构建成一个新数组。splice()方法就更强大了，可以对一个数组做删除、插入和替换。而且splice()方法还会影响原数组，并且将返回的值构建出一个新数组。



转载地址： [JavaScript学习笔记：数组(五)](http://www.w3cplus.com/javascript/array-part-5.html)