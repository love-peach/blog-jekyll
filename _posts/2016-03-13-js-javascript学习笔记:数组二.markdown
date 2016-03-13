---
layout: post
title: "javascript学习笔记:数组(二)"
date: 2016-03-13 
categories: article js
tags: [数组,转载]
whichPage: js
bannerImg: /img/illustration/2016.jpg
---

很多时候我们需要对JavaScript中数据类型(`Function`、`String`、`Number`、`Undefined`、`Boolean`和`Object`)做判断。在JavaScript中提供了typeof操作符可以对这些常用的数据类型做判断。但要使用typeof来判断数据是不是一个数组，就不起作用了。那在实际生产中要如何来检测数据是不是一个数组呢？

今天的学习任务就是**如何来检测一个数据是不是数组？**



## typeof操作符

typeof可以解决大部分数据类型的检测，如：

{% highlight js %}
console.log(typeof function () {return;}); // function
console.log(typeof "a"); // string
console.log(typeof 123); // number
console.log(typeof a); //undefined
console.log(typeof true); // boolean
console.log(typeof NaN); // number
console.log(typeof !NaN); //boolean
console.log(typeof {name:"大漠",age: "37"}); // object
console.log(typeof ["大漠","37"]); // object
console.log(typeof null); // object
{% endhighlight %}

上面的代码示例告诉我们， `typeof {name:"大漠",age: "37"}` 和 `typeof ["大漠","37"]` 返回的都是 `object`。事实再次证明`typeof`没办法对数组进行检测，那么这里引出一个问题？如何判断数据是个数组类型？

## 检测数组方法

虽然typeof操作符无法检测数组，但事实上检测数组方法有很多种。@Tom、@John、@Rick、@Ken和@Eric在[Quora的一篇文章](https://www.quora.com/Whats-the-best-way-to-tell-the-different-between-an-Array-and-other-kinds-of-objects-in-JavaScript)中总结了五种不同的检测数组的方法。接下来我们一起来了解和学习这几种检测数组的方法。

## ECMAScript 5的isArray函数

{% highlight js %}
function isArray(obj) {
    return Array.isArray(obj);
}
var arr = ["大漠","w3cplus"]; //创建一个数组
isArray(arr); // true
{% endhighlight %}

毫无疑问，这看起来最完美的解决方案，因为他是原生的。ECMAScript 5将 `Array.isArray()`引入JavaScript。但[其兼容性令你会感到些许的失望](http://kangax.github.io/compat-table/es5/)：IE9+、 Firefox 4+、Safari 5+、Opera 10.5+和Chrome都实现了这个方法,但是在IE8之前的版本是不支持的。

在这个基础上对构造函数做一下检测，而且这个检测过程非常的快，而且也非常的准确。事实上对我们的使用太准确了。但在工作是不能确定一个变量是继承自一个数组。这样一来，在某种程度上对构造函数做检测对于我们自己来说是很需要的，也是非常有益的：

{% highlight js %}
function isArray(obj) {
    return (typeof obj !== 'undefined' && obj && obj.constructor === Array);
}
{% endhighlight %}

## 对象自身的constructor属性

上面的示例中，检测构造函数时使用了对像自身的`constructor`属性。其实`constructor`属性返回一个指向创建了该对象原型的函数引用。使用该属性也可以检测数组类型。

{% highlight js %}
var arr = ["大漠","W3cplus"];
console.log(arr.constructor === Array); // true
{% endhighlight %}

## instanceof操作符

除了使用对像自身的`constructor`属性检测一个数组之外，还可以使用`instanceof`操作符来检测一个数组。

`instanceof` 操作符可以用来判断某个构造函数的 `prototype` 属性是否存在另外一个要检测对象的原型链上。也就是判断 `instanceof` 前面的对象是否是后面的类或对象的实例。

注：这个操作符和JavaScript中面向对象有点关系，了解这个就先得了解JavaScript中的面向对象。

来回忆下 `instanceof` 运算符的使用方式。`a instanceof b`，如果返回 `true`，表示 `a` 是 `b` 的一个实例。那么如果 `a instanceof Array` 返回 `true`，是不是就说明 `a` 是 数组类型呢？

{% highlight js %}
var arr = ["大漠","W3cplus"];
console.log(arr instanceof Array); // true
{% endhighlight %}

## 跨frame实例化对象带来的问题

`constructor` 和 `instanceof` 貌似很好的两个检测数组的方法，但实际上还是有些漏洞的，当你在多个`frame`中回来跳的时候，这两种方法就惨了。由于每一个 `frame` 都有自己的一套执行环境，跨 `frame` 实例化的对象彼此并不共享原型链，通过 `instanceof` 操作符和 `constructor` 属性检测的方法自然会失败。

{% highlight js %}
// 创建iframe并添加到DOM中
var iframe = document.createElement('iframe'); //创建iframe
document.body.appendChild(iframe); //将创建的iframe添加到body中
otherArray = window.frames[window.frames.length - 1].Array;
var arr = new otherArray("大漠","W3cplus"); //声明数组["大漠","W3cplus"]
console.log(arr instanceof Array);        // false
console.log(arr.constructor === Array);   // false
{% endhighlight %}


## 对象原生toString检测

`Object.prototype.toString`的行为：首先，取得对象的一个内部属性`[[Class]]`，然后依据这个属性，返回一个类似于"`[object Array]`"的字符串作为结果(看过ECMA标准的应该都知道，`[[]]`用来表示语言内部用到的、外部不可直接访问的属性，称为“内部属性”)。利用这 个方法，再配合`call`，我们可以取得任何对象的内部属性`[[Class]]`，然后把类型检测转化为字符串比较，以达到我们的目的。

{% highlight js %}
isArray = function(obj) {
    return Object.prototype.toString.call(obj) == "[object Array]";
}
var arr = ["大漠","W3cplus"];
console.log(isArray(arr)); // true
{% endhighlight %}

`call`改变`toString`的`this`引用为待检测的对象，返回此对象的字符串表示，然后对比此字符串是否是`[object Array]`，以判断其是否是Array的实例。为什么不直接`o.toString()`?嗯，虽然Array继承自`Object`，也会有`toString`方法，但是这个方法有可能会被改写而达不到我们的要求，而`Object.prototype`则是老虎的屁股，很少有人敢去碰它的，所以能一定程度保证其“纯洁性”：)

JavaScript 标准文档中定义: `[[Class]]` 的值只可能是下面字符串中的一个：`Arguments`, `Array`, `Boolean`, `Date`, `Error`, `Function`, `JSON`, `Math`, `Number`, `Object`, `RegExp`, `String`。

## 其它方法

@Rick Waldron提供的：

{% highlight js %}
isArray = function(obj) {
    return Object.prototype.toString.call(obj) == "[object Array]";
}
var arr = ["大漠","W3cplus"];
console.log(isArray(arr)); // true
{% endhighlight %}

@Shamasis Bhattacharya 提供的:

{% highlight js %}
var isArray = function (subj) {
    try {
        subj && (subj.length = -1);
        return false;
    }
    catch (er) {
        return true;
    }
};
var arr = [1,2,3];
isArray(arr); // true
{% endhighlight %}

道格拉斯提供的：

{% highlight js %}
var is_array = function (value) {
    return value &&
        typeof value === 'object' &&
        typeof value.length === 'number' &&
        typeof value.splice === 'function' &&
        !(value.propertyIsEnumerable('length'));
};
var arr = [1,2,3];
is_array(arr); // true
{% endhighlight %}

## 最佳检测方法

其实也没有什么是最佳检测方法，只有最合适的检测方法。综合上面各种检测数组的方法，稍做一些处理：

{% highlight js %}
var isArray = (function () {
    if (Array.isArray) {
        return Array.isArray;
    } 
    var objectToStringFn = Object.prototype.toString,
        arrayToStringResult = objectToStringFn.call([]); 

    return function (subject) {
        return objectToStringFn.call(subject) === arrayToStringResult;
    };
}());

var arr = [];
isArray(arr); // true
{% endhighlight %}

最优化的方法就是不管Array.isArray'是否能用，都可以回到对象原生toString检测和对象原生toString`检测上。

## 总结

这篇文章主要总结了如何检测一个数组。

- `typeof`运算符不能检测数组
- ECMAScript 5的`isArray`函数是原生的检测方法，但低版本浏览器不支持
- 对象自身的`constructor`属性和`instanceof`操作符虽然也能检测数组，但在frame中会产生问题
- 对象原生`toString`检测也能检测数组

最后在文中引用了其他同行写的检测数组的函数源码以及总结了一个觉得最合适的检测数组的函数。首先它试图使用内置的`isArray`来检测，这也是原生的，在浏览器中运行绝对是非常的快。对于不支持`isArray`的浏览器，我们也采用了对象的`toString`功能来检测一个数组。