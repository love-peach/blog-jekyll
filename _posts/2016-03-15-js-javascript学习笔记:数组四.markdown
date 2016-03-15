---
layout: post
title: "javascrip学习笔记:数组四"
date: 2016-03-15 23:53:00
categories: article js
tags: [数组,转载]
whichPage: js
bannerImg: /img/illustration/2016.jpg
---

在实际的业务当中，很多时候要对定义好的数组重新排序。在JavaScript中自带了两个方法，可以对数组进行排序操作。这两个方法就是 `sort()` 和 `reverse()` 。今天就来学习这两个方法相关的知识。



## sort()方法

`sort()`方法对数组的元素做原地的排序，并返回这个数组。默认情况下， `sort()` 方法是按升序排列数组项。即最小的值位于最前面，最大的值排列在最后面。为了实现排序， `sort()` 方法会调用每个数组项的 `toString()` 转型方法，然后比较得到的字符串，以确定如何排序。

先来看一个简单的示例：

{% highlight js%}
var arr = ['hello','jame','Jack','dog']; // 定义一个数组
console.log(arr.sort()); // ["Jack", "dog", "hello", "jame"]
{% endhighlight %}

正如前面所言， `sort()` 方法未调用任何参数时，是按升序排列的，也就是按字母的顺序排列，所以我们看到结果也是正确的。

接下来，再看一个数字的数组排列的示例：

{% highlight js%}
var arr = [1,5,10,22]; // 定义一个数组
console.log(arr.sort()); // [1, 10, 22, 5]
{% endhighlight %}

可见，即使示例中数组的顺序没有任何问题，但 `sort()` 方法对数组进行重新排序操作之后，顺序反而不对了。这究竟是为何呢？

查了相关文档才知道， `sort()` 方法：如果省略参数，数组项会先根据 `toString()` 函数将其值转换成字符串在进行比较，是按UNICODE进行比较的，然后根据这个进行排序。正如最前面的示例，"Jack"会排在"dog"前面。当数字进行排序的时候，"5"会出现在"10"和"22"之后，因为他们先会被转换为字符串，而“10”和“22”都比“5”要靠前。

我们可以使用 `charCodeAt()` 来验证一下：

{% highlight js%}
"Jack".charCodeAt() ==> 74
"dog".charCodeAt()  ==> 100
"5".charCodeAt()    ==> 53
"10".charCodeAt()   ==> 49
"22".charCodeAt()   ==> 50
{% endhighlight %}

如此一来，这不是最佳方案。幸好， `sort()` 方法可以接受一个比较函数 `compareFunction` 作为参数，以便我们指定哪个值位于哪个值的前面。

如果指明了 `compareFunction` ，那么数组会按照调用该函数的返回值进行排序。比较函数 `compareFunction` 接收两个参数 `a` 和 `b` ，`a` 和 `b` 是两个将要被比较的元素：

- compareFunction(a,b)返回的值小于0：那么a就小于b，也就是说a排在了b的前面
- compareFunction(a,b)返回的值大于0: 那么a就大于b，也就是说a排在了b的后面
- compareFunction(a,b)返回的值等于0：那么a就等于b，也就是说a和b的位置保持不变

`compareFunction(a,b)` 函数：

{% highlight js%}
function compareFunction (a, b) {
    if (a < b) {
        return -1; // a排在b的前面
    } else if (a > b) {
        return 1; // a排在b的后面
    } else {
        return 0; // a和b的位置保持不变
    }
}
{% endhighlight %}

这个函数可适用于大多数数据类型，只要将 `compareFunction(a,b)` 函数作为参数传给 `sort()` 方法即可。因到前面的示例：

{% highlight js%}
var arr = [1,5,10,22]; // 定义一个数组
arr.sort(compareFunction); // 将compareFunction函数作为参数传给 sort()
console.log(arr); // [1, 5, 10, 22]
{% endhighlight %}

数组 `arr` 仍然保持了正确的升序排列。其实可以通过 `compareFunction(a,b)`对数组作降序排列，只需要将 `compareFunction` 函数的返回值做个调整即可：

{% highlight js%}
function compareFunction (a, b){
    if (a < b) {
        return 1; // a排在b的后面
    } else if (a > b) {
        return -1; // a排在b的前面
    } else {
        return 0; // a 和 b 保持位置不变
    }
}

var arr = [1, 5, 10, 22]; //定义一个数组
arr.sort(compareFunction); // 将compareFunction函数作为参数传给sort()
console.log(arr); // [22, 10, 5, 1]
{% endhighlight %}

注：compareFunction(a, b) 必须总是对相同的输入返回相同的比较结果，否则排序的结果将是不确定的。

上面也说到了， `sort()` 方法传入 `compareFunction(a,b)` 参数时，返回的值可能有3个，所以下面这样的写法是错误的：

{% highlight js%}
function compareFunction (a, b) {
    return a < b; 
}

var arr = [21, 0, 3, 11, 4, 5, 6, 7, 8, 9, 10];
arr.sort(compareFunction);
console.log(arr); // [5, 21, 11, 10, 9, 8, 7, 6, 4, 3, 0]
{% endhighlight %}

可能得的结果是 [5, 21, 11, 10, 9, 8, 7, 6, 4, 3, 0]，这并不是正确的结果，那是因为return a < b只返回了两种值 true或false，相当于1或0，而没有-1。

对于数字类型或valueOf()方法返回数值类型的对象类型，可以使用一个更简单的比较函数。

{% highlight js%}
// ascSort(a,b)传给sort()，数字数组作升序排列
function ascSort (a, b) {  // a和b是数组中相邻的两个数组项
    return a - b; 
    // 如果 return -1, 表示a小于b，a排列在b的前面
    // 如果 return 1, 表示a大于b,a排列在b的后面
    // 如果 return 0, 表示a等于b,a和b的位置保持不变
}

// desSort(a,b)传给sort()，数字数组作降序排列
function desSort (a, b) { // a和b是数组中相邻的两个数组项
    return b - a;
    // 如果 return -1, 表示b小于a，b排列在a的前面
    // 如果 return 1, 表示b大于a, b排列在a的后面
    // 如果 return 0, 表示 b等于a, b和a的位置保持不变
}
{% endhighlight %}

来看看结果是不是我们想要的结果：

{% highlight js%}
var arr = [1,4,10,3], 
    arr2 = [100,12,99,3,2]; //定义数组
arr.sort(ascSort); // 将ascSort函数传给sort()
arr2.sort(desSort); // 将desSort函数传给sort()
console.log(arr); // [1, 3, 4, 10]
console.log(arr2); // [100, 99, 12, 3, 2]
{% endhighlight %}

## 字符数组排列

创建一个字符串数组，并且使用sort()对字符串进行重新排序：

{% highlight js%}
var stringArray = ['blue', 'Humpback', 'Beluga'];
stringArray.sort();
console.log('字符串数组stringArray:' + stringArray);
{% endhighlight %}

Chrome输出的结果：

{% highlight js%}
字符串数组stringArray:Beluga,Humpback,blue
{% endhighlight %}

## 数字字符串数组排列

创建一个数字字符串数组之后对数组进行排序，对比数字数组分别指定与不指定比较函数的结果：

{% highlight js%}
var numericStringArray = ['80', '9', '700'];

function compareFunction (a, b) {
    return a - b;
}

console.log('不指定比较函数的数字字符串数组排列：' + numericStringArray.sort());
console.log('指定比较函数的数字字符串数组排列：' + numericStringArray.sort(compareFunction));
{% endhighlight %}

Chrome输出的结果：

{% highlight js%}
不指定比较函数的数字字符串数组排列：700,80,9
指定比较函数的数字字符串数组排列：9,80,700
{% endhighlight %}

## 数字数组排列

{% highlight js%}
var numberArray = [80, 9, 700];

function compareFunction (a, b) {
    return a - b;
}

console.log('不指定比较函数的数字数组排列：' + numberArray.sort());
console.log('指定比较函数的数字数组排列：' + numberArray.sort(compareFunction));
{% endhighlight %}

Chrome输出的结果：

{% highlight js%}
不指定比较函数的数字字符串数组排列：700,80,9
指定比较函数的数字字符串数组排列：9,80,700
{% endhighlight %}

## 数字和数字字符串混合数组排列

创建一个数字和数字字符串混合数组之后进行排序，对比数组分别指定与不指定比较函数的结果：

{% highlight js%}
var mixedNumericArray = ['80', '9', '700', 40, 1, 5, 200];

function compareFunction (a, b){
    return a - b;
}

console.log('不指定比较函数的数组排列：' + mixedNumericArray.sort());
console.log('指定比较函数的数组排列' + mixedNumericArray.sort(compareFunction));
{% endhighlight %}

Chrome输出的结果：

{% highlight js%}
不指定比较函数的数组排列：1,200,40,5,700,80,9
指定比较函数的数组排列1,5,9,40,80,200,700
{% endhighlight %}

## 数字数组随机排列

除了给数字数组进行升序或降序排列之外，还可以定义一个随机函数，实现数组的随机排列。定义的随机函数返回正数或者负数，并表将随机函数传给sort()方法，此时sort()方法根据随机函数返回的正负数来决定两个值之前的位置。

{% highlight js%}
var randomArray = [9,0,23,8,3,5];

function randomSort(a, b) {
    return Math.random() - 0.5;
}

console.log(randomArray.sort(randomSort));
// [8, 5, 9, 0, 23, 3]
// [8, 3, 5, 0, 23, 9]
// [8, 5, 0, 3, 9, 23]
{% endhighlight %}

## 对象数组排列

对于对象数组排列，我们同样需要先写一个构造函数：

{% highlight js%}
function objectSort(property, desc) {
    //降序排列
    if (desc) {
        return function (a, b) {
            return (a[property] >  b[property]) ? -1 : (a[property] <  b[property]) ? 1 : 0;
        }   
    }
    return function (a, b) {
        return (a[property] <  b[property]) ? -1 : (a[property] >  b[property]) ? 1 : 0;
    }
}

var myArray = [
  { "name": "John Doe", "age": 29 }, 
  { "name": "Anna Smith", "age": 24 }, 
  { "name": "Peter Jones", "age": 39 }
]

console.log(myArray.sort(objectSort('name',true))); // 按object中的name的降序排列
{% endhighlight %}

来看看Chrome输出的前后结果：

![结果](http://cdn2.w3cplus.com/cdn/farfuture/DvUx6c6W1Hum1GHa0ZntihsjMNbuX9AzWrNhxyQqur0/mtime:1456318705/sites/default/files/blogs/2016/1602/array-object-sort-1.png)

另外，只需要改变比较函数objectSort()中的desc参数值为flase，数组就会按object指定的property属性降序排列：

{% highlight js %}
console.log(myArray.sort(objectSort('age',false))); //按objcet中的age升序排列
{% endhighlight %}

Chrome输出的前后结果：

![结果](http://cdn1.w3cplus.com/cdn/farfuture/nOf-Ygz51GDR2BKx29qh1iztvLSyPC9y82oP2a0bWHQ/mtime:1456318705/sites/default/files/blogs/2016/1602/array-object-sort-2.png)

除此之外，还有其的对比较函数，如下所示：

{% highlight js %}
function dynamicSort(property) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        var result = (a[property] <  b[property]) ? -1 : (a[property] >  b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}
console.log(myArray.sort(dynamicSort('age'))); // 按升序排列
console.log(myArray.sort(dynamicSort('-age'))); // 按降序排列
{% endhighlight %}

上面介绍的是按一个属性进行排序，但很多时候，希望按多个属性排序，那么比较函数需要做一定的调整：

{% highlight js %}
function dynamicSortMultiple() {
    var props = arguments;
    return function (obj1, obj2) {
        var i = 0, result = 0, numberOfProperties = props.length;
        while(result === 0 &&  i <  numberOfProperties) {
            result = dynamicSort(props[i])(obj1, obj2);
            i++;
        }
        return result;
    }
}

myArray.sort(dynamicSortMultiple('name','-age'));
{% endhighlight %}


## reverse()方法

reverse()方法相对而言要简单得多，它就是用来颠倒数组中元素的位置，并返回该数组的引用。比如我们有一个数组：

{% highlight js %}
var myArray = ["Airen","W3cplus","Blog"];
console.log(myArray.reverse()); // ["Blog", "W3cplus", "Airen"]
{% endhighlight %}

## 总结

本文主要介绍了数组中元素项的排序方法。而主要详细介绍的是sort()方法。通过给sort()方法传递不同的比较函数，我们可以实现字符串数组、数字数组、数字和数字字符串混合数组、对象数组等按顺序(升序或降序)排列。

转载链接： [JavaScript学习笔记：数组(四)](http://www.w3cplus.com/javascript/array-part-4.html)