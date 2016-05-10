---
layout: post
title: "javascript学习笔记:数组(七)"
date: 2016-05-09 10:54:02
categories: article js
tags: [数组,转载]
whichPage: js
bannerImg: /img/illustration/2016.jpg
---

使用数组总是会碰到数组的遍历（迭代）操作。说到迭代，可能会立马想起for语句对数组进行迭代。
其实ES5为数组定义了五个迭代方法：`forEach()` , `every()` , `some()` , `filter()` , `map()` .



比如需要迭代出下面数组peoples年龄(age)大于30的人名(name)。

{% highlight js %}
var peoples = [
    {
        name: 'Agraj',
        gender:'M',
        age: 29,
        address:
        {
            city: 'Delhi',
            pincode: '110064'
        }
    },
    {
        name: 'Mark',
        gender:'M',
        age: 35,
        address:
        {
            city: 'West Bengal',
            pincode: '220013'
        }
    },
    {
        name: 'Lance',
        gender:'M',
        age: 39,
        address:
        {
            city: 'Chandigarh',
            pincode: '201201'
        }
    },
    {
        name: 'Vikas',
        gender:'M',
        age: 21,
        address:
        {
            city: 'Noida',
            pincode: '201301'
        }
    },
    {
        name: 'Kanika',
        gender:'F',
        age: 21,
        address:
        {
            city: 'Noida',
            pincode: '201301'
        }
    }
];

for (var i = 0; i < peoples.length; i++ ) {
    if (peoples[i].age > 30) {
        console.log(peoples[i].name + ':' + peoples[i].age);
    }
}
{% endhighlight %}

Chrome浏览器输出的结果：

{% highlight js %}
Mark: 35
Lance: 39
{% endhighlight %}

其实ES5为数组定义了五个迭代方法：

- forEach()：没有返回值，只是针对每个数组项调用指定的函数(callbackfn)
- every(): 返回一个布尔值(true或false)，判断每个数组项是否符合指定函数的条件，符合为true，反之为false
- some(): 返回一个布尔值(true或false),判断每个数组项是否符合指定函数的条件，只要有任何一项返回为true，就会返回true
- filter(): 每个数组项调用指定的函数，条件为true的将返到一个新数组中
- map(): 每个数组项调用指定的函数，返回每次函数调用的结果组成一个新数组

这五个数组迭代的方法中，其中forEach()、every()和some()方法不生成一个新数组，而filter()和map()方法将会生成一个新数组（符合条件）。
并且这些方法都会调用指定的函数callbackfn。回调函数callbackfn语法如下：

{% highlight js %}
function callbackfn (value, index, array) {...}
{% endhighlight %}

可以使用三个参数来声明回调函数callbackfn:

- value: 数组元素的值
- index: 数组元素在数组中的索引值
- array: 包含该元素的数组对象

今天主要一起了解这五个数组迭代方法是如何使用？在接下来的内容中都将以开头的数组为例。

## forEach()方法
   
forEach() 方法让数组的每一项都执行一次给定的函数。

### 语法:

{% highlight js %}
array.forEach(callbackfn[, thisArg]);
{% endhighlight %}

### 参数:
   
   参数      | 说明 
------------|----------------------------------------------------------------------------------------------------------
 array      | 必选。一个数组对象。比如示例中的peoples数组      |
 callbackfn | 必选。最多可以接受三个参数的函数。对于数组中的每个元素，forEach 都会调用 callbackfn 函数一次.   |
 thisArg    | 可选。callbackfn 函数中的 this 关键字可引用的对象。如果省略 thisArg，则 undefined 将用作 this 值。    |
 
forEach() 方法按升序为数组中含有效值的每一项执行一次callbackfn 函数，那些已删除或者从未赋值的项将被跳过（但不包括哪些值为 undefined 的项）。

### 示例

开头使用for语句遍历出年龄大于30岁的名称，并且输出people的name和age。其实使用forEach()方法也可以实现：
{% highlight js%}
peoples.forEach(function (people) {
    if (people.age > 30) {
        console.log(people.name + ':' + people.age);
    }
});
{% endhighlight %}

Chrome浏览器输出的结果：

{% highlight js%}
Mark:35
Lance:39
{% endhighlight %}

在此基础上，你可以做很多事情，比如说，将数组peoples中的name遍历出来，然后重新创建一个新数组names，可以这样做：

{% highlight js%}
var names = [];
var peoplesDb = peoples.forEach(function (people, index) {
    names.push(people.name);
});
console.log(names); // ["Agraj", "Mark", "Lance", "Vikas", "Kanika"]
{% endhighlight %}

### 内部实现

看看forEach()方法内部实现的方法：

{% highlight js%}
Array.prototype.forEach = function(fun /*, thisp*/) {
    var len = this.length;
    if (typeof fun != "function")
        throw new TypeError();

    var thisp = arguments[1];
    for (var i = 0; i < len; i++)
    {
        if (i in this)
        fun.call(thisp, this[i], i, this);
    }
};
{% endhighlight %}

## every()方法

every() 方法测试数组的所有元素是否都符合指定函数的条件，只要有有一个元素不符合，返回的都会是false。

### 语法

{% highlight js%}
array.every(callbackfn[, thisArg])
{% endhighlight %}

every()方法为数组中的每个元素执行一次 callbackfn 函数，直到它找到一个使 callbackfn 返回 false（表示可转换为布尔值 false 的值）的元素。
如果发现了一个这样的元素，every() 方法将会立即返回 false。否则，callbackfn 为每一个元素返回 true，every() 就会返回 true。callbackfn 
只会为那些已经被赋值的索引调用。不会为那些被删除或从来没被赋值的索引调用。

### 示例

还是上面开头的数组，如果每一位的年龄都大于或等于30,就会返回“都大于或等于30岁了”,反之返回“不是所有人都大于30岁了”。

{% highlight js%}
function bigAge(ele,index,arr){
    return (ele.age >= 30);
}

var isBigPeople = peoples.every(bigAge);

if (isBigPeople) {
    console.log('都大于或等于30岁了');
} else {
    console.log('不是所有人都大于30岁了');
}

{% endhighlight %}

Chrome浏览器输出的结果：

{% highlight js%}
// 不是所有人都大于30岁了
{% endhighlight %}

### 内部实现

{% highlight js%}
Array.prototype.every = function(fun /*, thisp*/) {
    var len = this.length;
    if (typeof fun != "function")
        throw new TypeError();

    var thisp = arguments[1];
    for (var i = 0; i < len; i++)
    {
        if (i in this && !fun.call(thisp, this[i], i, this))
        return false;
    }

    return true;
};
{% endhighlight %}

## some()方法

some()方法和every()方法类似，不同的是，some()方法在调用指定的函数callbackfn指定的条件符合就会返回true，不符合则返回false。

### 语法

{% highlight js%}
array.some(callbackfn[, thisArg])
{% endhighlight %}

### 示例

只要数组中年龄age有一个大于或等于30，就会返回“有部分人还是年纪大了”，反之返回“你们都还很年轻”:

{% highlight js%}
function OldAge(ele,index,array){
    return (ele.age >= 30);
}

var isOldPeople = peoples.some(OldAge);

if (isOldPeople) {
    console.log('有部分人还是年纪大了');
} else {
    console.log('你们都还年轻');
}
{% endhighlight %}

### 内部实现

{% highlight js%}
Array.prototype.some = function(fun /*, thisp*/) {
    var len = this.length;
    if (typeof fun != "function")
        throw new TypeError();

    var thisp = arguments[1];
    for (var i = 0; i < len; i++)
    {
        if (i in this && fun.call(thisp, this[i], i, this))
        return true;
    }

    return false;
};
{% endhighlight %}

## map()方法

map()方法返回一个由原数组中的每个元素调用一个指定函数callbackfn后的返回值组成的新数组。如果符合callbackfn会返回符合条件的一个值，将所有返回的值再创建一个新数组。

### 语法

{% highlight js%}
array.map(callbackfn[, thisArg])
{% endhighlight %}

map()方法会给原数组中的每个元素都按顺序调用一次 callbackfn 函数。callbackfn每次执行后的返回值组合起来形成一个新数组。 callbackfn 函数只会在有值的索引上被调用；那些从来没被赋过值或者使用 delete 删除的索引则不会被调用。

### 示例

使用map()方法遍历数组peoples，并且让index在以前的index增加1:

{% highlight js %}
var usersDb = peoples.map(function (user, index) {
    user.id = index + 1; 
    return user; 
}); 
console.table(usersDb);
{% endhighlight %}

Chrome浏览器输出的结果：

![map输出结果图](http://cdn1.w3cplus.com/cdn/farfuture/RZNFpRy8TEHdV5sXTF_Ie6KKVWq03TIXKIikLNZLO8s/mtime:1457358741/sites/default/files/blogs/2016/1603/array-map.png)

### 内部实现

{% highlight js%}
Array.prototype.map = function(fun /*, thisp*/) {
    var len = this.length;
    if (typeof fun != "function")
        throw new TypeError();

    var res = new Array(len);
    var thisp = arguments[1];
    for (var i = 0; i < len; i++)
    {
        if (i in this)
        res[i] = fun.call(thisp, this[i], i, this);
    }

    return res;
};
{% endhighlight%}

## filter()方法

filter() 方法使用指定的函数callbackfn测试所有元素，并创建一个包含所有通过测试的元素的新数组。

### 语法

{% highlight js%}
array.filter(callbackfn[, thisArg])
{% endhighlight%}

filter() 为数组中的每个元素调用一次 callbackfn 函数，并利用所有使得 callbackfn 返回 true 或 等价于 true 的值 的元素创建一个新数组。callbackfn 只会在已经赋值的索引上被调用，对于那些已经被删除或者从未被赋值的索引不会被调用。那些没有通过 callbackfn 测试的元素会被跳过，不会被包含在新数组中。

### 示例

遍历出数组中gender为M的相关数组项：

{% highlight js %}
var guys = peoples.filter(function (user) {  
    return user.gender === 'M';
});
console.table(guys);
{% endhighlight %}
  
Chrome浏览器输出的结果：
![filter输出结果图](http://cdn.w3cplus.com/cdn/farfuture/AoIjNyGys8Qwl-J8kaTsQmyh9zVbQctHkxTQZIGkDBA/mtime:1457358738/sites/default/files/blogs/2016/1603/array-filter.png)

### 内部实现

{% highlight js%}
Array.prototype.filter = function(fun /*, thisp*/) {
    var len = this.length;
    if (typeof fun != "function")
        throw new TypeError();

    var res = new Array();
    var thisp = arguments[1];
    for (var i = 0; i < len; i++)
    {
        if (i in this)
        {
        var val = this[i]; // in case fun mutates this
        if (fun.call(thisp, val, i, this))
            res.push(val);
        }
    }

    return res;
};
{% endhighlight %}

## 总结

今天主要学习了数组的五个遍历方法： `forEach()` 、 `every()` 、 `some()` 、 `map()` 和 `filter()` 。其中 `forEach()` 、 `every()` 和 `some()` 方法不会改变原数组，
而 `map() `和 `filter()` 方法会根据指定的函数 `callbackfn` 创建一个新数组。其中 `filter()` 方法将符合 `callbackfn` 函数条件创建一个新数组，而 `some()` (原文是some,不过应该是map)
将数组的每一项都是在原数组中的对应项上运行传入的函数 `callbackfn` 。另外， `every()` 和 `some()` 方法根据指定的函数 `callbackfn` 返回 true 或 false 值，其中 `every()` 方法，
只要有一项不符合 `callbackfn` 指定的条件就会返回 false， `some()` 方法，将根据 `callbackfn` 函数指定的条件，只要符合就返回 true，不符合则返回则返回 false。

转载地址: [JavaScript学习笔记：数组(七)](http://www.w3cplus.com/javascript/array-part-7.html)