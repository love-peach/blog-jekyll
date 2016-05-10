---
layout: post
title: "javascript学习笔记:数组(六)"
date: 2016-05-09 10:50:02
categories: article js
tags: [数组,转载]
whichPage: js
bannerImg: /img/illustration/2016.jpg
---

众所都之，数组项在一个数组中都有自己的位置。在JavaScript中提供了两个确定数组项位置的方法：indexOf()和lastIndexOf()。
今天我们主要一起学习这两个方法是如何使用，又是如何查找出数组项在数组中的确切位置。


## indexOf()方法

indexOf() 方法从数组的开头（位置为0）开始向后查询。indexOf()方法返回指定数组项在数组中找到的第一索引值。
如果通过indexOf()查找指定的数组项在数组中不存在，那么返回的值会是-1。

## 语法

indexOf()使用的语法非常的简单：

{% highlight js %}
arr.indexOf(searchElement[, fromIndex = 0])
{% endhighlight%}

- searchElement: 是指定要查找的数组项
- fromIndex: 开始查找的位置。

如果该索引值(fromIndex)大于或等于数组长度(length)，意味着不会在数组里查找，返回-1。如果参数中提供的索引值是一个负值，则将其作为数组末尾的一个抵消，
即-1表示从最后一个元素开始查找，-2表示从倒数第二个元素开始查找 ，以此类推。

注意：如果参数中提供的索引值是一个负值，仍然从前向后查询数组。如果抵消后的索引值仍小于0，则整个数组都将会被查询。其默认值为0。

## 示例

一起来看看使用示例：

{% highlight js %}
var arr = [0,1,2,3,4,5,6,5,4,3,2,1,0];
console.log(arr.length); // 13
arr.indexOf(2); // 2
arr.indexOf(7); // -1
arr.indexOf(9, 2); // -1
arr.indexOf(2, -1); // -1
arr.indexOf(2, -3); // 10
{% endhighlight%}

来看看相关的位置示意图：

### arr.indexOf(2)

arr.indexOf(2)表示的是从数组arr第0索引值开始查找第一个数组项2，并且返回其在数组中对应的索引值：

![arr.indexOf(2)示意图](http://cdn2.w3cplus.com/cdn/farfuture/2G0KNn9z6u18JZUuAW_4n7Qm6MBbEAcJGcddY6mLfas/mtime:1457198849/sites/default/files/blogs/2016/1603/indexof-1.png)

### arr.indexOf(7)

arr.indexOf(7)其要在数组确定数组项7的索引值，但整个数组arr并没有数组项7的存在，如此一来,indexOf()方法在arr数组中找不到数组项7。这样一来就arr.indexOf(7)就会返回的值为-1。

![arr.indexOf(7)示意图](http://cdn2.w3cplus.com/cdn/farfuture/yeDaH0eaHUrjyjnntlruWJwll9Qn01mhhJwd4xvP1qY/mtime:1457198850/sites/default/files/blogs/2016/1603/indexof-2.png)

### arr.indexOf(9, 2)

arr.indexOf(9, 2)表示从数组arr的第2个索引值位置开始查找数组项9，但整个数组arr中并没有数组项9的存在，这样一来，indexOf()方法在arr数组中找不到数组项9。那其最后返回的值为-1。

![arr.indexOf(9, 2)示意图](http://cdn2.w3cplus.com/cdn/farfuture/9csEevMNDSWeGTcD_OCn6CSNCYipW4rs2Jb0eRxMib8/mtime:1457198850/sites/default/files/blogs/2016/1603/indexof-3.png)

### arr.indexOf(2, -1)

arr.indexOf(2, -1)表示的是从数组arr最后一个（相当于arr.length - 1,也就是12）开始查找数组项第一个2。如果不存在将返回-1。

![arr.indexOf(2, -1)示意图](http://cdn1.w3cplus.com/cdn/farfuture/KggO6D_O4o1TNpXXmLarr_tb_QGQ4W7LO72Y4JLfxz4/mtime:1457198850/sites/default/files/blogs/2016/1603/indexof-4.png)

### arr.indexOf(2, -3)

arr.indexOf(2, -3)表示从数组arr倒数的第3个索引值（相当于arr.length-3,也就是10）开始查找数组项中第一个2。在这个示例中将返回的值为10。

![arr.indexOf(2, -3)示意图](http://cdn.w3cplus.com/cdn/farfuture/RxLtewJhBmH8Sv-bHjrw9zUHUaUO_D4AIUC250ul8mk/mtime:1457198850/sites/default/files/blogs/2016/1603/indexof-5.png)

从上面的示例可以告诉我们，如果indexOf()返回的值为-1时，就可以轻松的判断这个数组项是否在数组中存在。比如：

{% highlight js %}
var arr = ['a','b','c'];
function arrIndexOf (arrayItems, arrayItem) {
    if (arrayItems.indexOf(arrayItem) === -1) {
        console.log(arrayItem + '不在[' + arrayItems + ']数组中');
    }
    else if (arrayItems.indexOf(arrayItem) > -1){
        console.log(arrayItem + '在[' + arrayItems + ']数组中的索引值是：' + arrayItems.indexOf(arrayItem));
    }
}
arrIndexOf(arr, 'c'); // c在[a,b,c]数组中的索引值是：2
arrIndexOf(arr, 'd'); //d不在[a,b,c]数组中
{% endhighlight %}

## 兼容性处理

值得注意的是indexOf()方法并不是所有浏览器都支持（IE9+、Firefox2+、Safari 3+、Opera 9.5+和Chrome）。如果希望在能更好的让浏览器支持indexOf()方法，
你可以在你的代码顶部添加下面的这部分代码：

{% highlight js %}
if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function(elt /*, from*/) {
        var len = this.length;

        var from = Number(arguments[1]) || 0;
        from = (from < 0) ? Math.ceil(from) : Math.floor(from);
        if (from < 0) {
            from += len;
            for (; from < len; from++) {
                if (from in this && this[from] === elt) {
                    return from;
                }
            }
            return -1;
        };
    }
  }
{% endhighlight %}

## lastIndexOf()方法

lastIndexOf()方法和indexOf()刚好相反，从一个数组中末尾向前查找数组项，并且返回数组项在数组中的索引值，如果不存在，则返回的值是-1。

使用lastIndexOf()方法查找一个数组项时，如果数组项不在数组中时，其返回的值同样为-1。如此一来，也可以像使用indexOf()方法一样，
lastIndexOf()可以用来判断数组项是不是在数组中：

{% highlight js %}
var arr = ['a','b','c'];
function arrLastIndexOf (arrayItems, arrayItem) {
    if (arrayItems.lastIndexOf(arrayItem) === -1) {
        console.log(arrayItem + '不在[' + arrayItems + ']数组中');
    }
    else if (arrayItems.lastIndexOf(arrayItem) > -1){
        console.log(arrayItem + '在[' + arrayItems + ']数组中的索引值是：' + arrayItems.lastIndexOf(arrayItem));
    }
}
arrIndexOf(arr, 'c'); // c在[a,b,c]数组中的索引值是：2
arrIndexOf(arr, 'd'); //d不在[a,b,c]数组中
{% endhighlight %}

兼容性处理

还有lastIndexOf()也只在IE9+、Firefox2+、Safari 3+、Opera 9.5+和Chrome得到支持，如果希望自己的代码更健壮，
在使用lastIndexOf()方法的前面需要添加下面的代码：

{% highlight js %}
if (!Array.prototype.lastIndexOf) {
    Array.prototype.lastIndexOf = function(elt /*, from*/) {
        var len = this.length;
        var from = Number(arguments[1]);

        if (isNaN(from)) {
            from = len - 1;
        } else {
            from = (from < 0) ? Math.ceil(from) : Math.floor(from);

            if (from < 0) {
                from += len;
            } else if (from >= len){
                from = len - 1;
            }
        }

        for (; from > -1; from--) {
            if (from in this && this[from] === elt) {
                return from;
            }
        }
        return -1;
    };
}

{% endhighlight %}

## 总结

indexOf()和lastIndexOf()两个方法都是用来查找数组项在一个数组中的索引值，其中indexOf()是从前向后寻找，而lastIndexOf()是从后向前寻找。
如果数组项不在数组中，返回的值为-1。这样一来，可以使用indexOf()或lastIndexOf()的值是否全等于(===)-1来做判断。

转载地址: [JavaScript学习笔记：数组(六)](http://www.w3cplus.com/javascript/array-part-6.html)
