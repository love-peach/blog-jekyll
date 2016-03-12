---
layout: post
title: "emmet语法介绍"
date: 2016-03-12 14:18
categories: article tools
tags: [emmit,转载]
whichPage: tools
bannerImg: /img/illustration/photographGirl.jpg
---
Emmet插件以前被称作为Zen Coding，而现在的 Emmet 则是 Zen Coding 的升级版，它是一个文本编辑器的插件，它可以帮助您快速编写HTML和CSS代码，从而加速Web前端开发。
只需敲下极少的代码摁下 **Ｔab** 键，即可生成完整的代码。


## doctype补全

{% highlight html%}
html:5 或者　!
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>

</body>
</html>

html:xt 生成 HTML4 过渡型
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en">
<head>
    <meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
    <title>Document</title>
</head>
<body>

</body>
</html>

html:4s 生成 HTML4 严格型
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html lang="en">
<head>
    <meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
    <title>Document</title>
</head>
<body>

</body>
</html>
{% endhighlight %}

## element标签名

{% highlight html %}
div

<div></div>
{% endhighlight %}

## ID选择符

{% highlight html %}
div#some-id 或者 #some-id

<div id="some-id"><div>
{% endhighlight %}

## CLASS类选择符

{% highlight html %}
div.some-class 或者 .some-class

<div class="some-class"></div>
{% endhighlight %}

## > 嵌套，直接子节点

{% highlight html %}
div>ul>li

<div>
    <ul>
        <li></li>
    </ul>
</div>
{% endhighlight %}

## + 兄弟节点

{% highlight html %}
div+p+bq

<div></div>
<p></p>
<blockquote></blockquote>
{% endhighlight %}

## ^ 切换上下文，返回上一级

{% highlight html %}
div+div>p>span+em^bq

<div></div>
<div>
    <p><span></span><em></em></p>
    <blockquote></blockquote>
</div>

<!--可以多个一起使用，每一个返回一级-->
div+div>p>span+em^^^bq

<div></div>
<div>
    <p><span></span><em></em></p>
</div>
<blockquote></blockquote>
{% endhighlight %}

## * 重复多个

{% highlight html %}
ul>li*5

<ul>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
</ul>
{% endhighlight %}

## ( ) 分组，用来分组子集，不推荐过多使用

{% highlight html %}
div>(header>ul>li*2>a)+footer>p

<div>
    <header>
        <ul>
            <li><a href=""></a></li>
            <li><a href=""></a></li>
        </ul>
    </header>
    <footer>
        <p></p>
    </footer>
</div>

<!-- ()可以嵌套使用 -->
(div>dl>(dt+dd)*3)+footer>p

<div>
    <dl>
        <dt></dt>
        <dd></dd>
        <dt></dt>
        <dd></dd>
        <dt></dt>
        <dd></dd>
    </dl>
</div>
<footer>
    <p></p>
</footer>
{% endhighlight %}

## [ ] 用户自定义属性

{% highlight html %}
div[title="Hello world!"]

<div title="Hello world!" data-name="haha"></div>
<!--
1.方括号内可以一次性写多个属性，以空格隔开，比如：[title=’H W’ data-name=haha]
2.属性可以不写属性值，比如：[title data-name]
3.属性值可以使用单引号或者双引号
4.属性值如果没有空格，可以省略引号
-->

{% endhighlight%}

## $ 数字

{% highlight html %}
ul>li.item$*5

<ul>
    <li class="item1"></li>
    <li class="item2"></li>
    <li class="item3"></li>
    <li class="item4"></li>
    <li class="item5"></li>
</ul>
{% endhighlight%}

## $ 可以使用多个$，不足会使用0占位

{% highlight html %}
ul>li.item$$$*5

<ul>
    <li class="item001"></li>
    <li class="item002"></li>
    <li class="item003"></li>
    <li class="item004"></li>
    <li class="item005"></li>
</ul>
{% endhighlight%}

## @控制数字开始值和顺序
   
{% highlight html %}
@- 倒序
ul>li.item$@-*5

<ul>
    <li class="item5"></li>
    <li class="item4"></li>
    <li class="item3"></li>
    <li class="item2"></li>
    <li class="item1"></li>
</ul>

@n 改变数字开始位置
ul>li.item$@3*5

<ul>
    <li class="item3"></li>
    <li class="item4"></li>
    <li class="item5"></li>
    <li class="item6"></li>
    <li class="item7"></li>
</ul>

@-n 降序并改变开始位置
ul>li.item$@-3*5

<ul>
    <li class="item7"></li>
    <li class="item6"></li>
    <li class="item5"></li>
    <li class="item4"></li>
    <li class="item3"></li>
</ul>

{% endhighlight %}

## {}文本节点

{% highlight html %}
a{Click me}

<a href="">Click me</a>

注意如下的区别（受>影响）
a{click}+b{here}

<a href="">click</a><b>here</b>

a>{click}+b{here}

<a href="">click<b>here</b></a>


{% endhighlight %}

## lorem 生成一段虚拟文字，一般用来快速填充html，查看效果

{% highlight html %}
lorem

Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias et nemo repudiandae. Esse ex molestias numquam, possimus quaerat quas sint tempora? Asperiores dicta ducimus facilis impedit neque ratione ut vel!

lorem10 //生成10个单词

Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore, totam.

p*4>lorem

<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui dicta minus molestiae vel beatae natus eveniet ratione temporibus aperiam harum alias officiis assumenda officia quibusdam deleniti eos cupiditate dolore doloribus!</p>
<p>Ad dolore dignissimos asperiores dicta facere optio quod commodi nam tempore recusandae. Rerum sed nulla eum vero expedita ex delectus voluptates rem at neque quos facere sequi unde optio aliquam!</p>
<p>Tenetur quod quidem in voluptatem corporis dolorum dicta sit pariatur porro quaerat autem ipsam odit quam beatae tempora quibusdam illum! Modi velit odio nam nulla unde amet odit pariatur at!</p>
<p>Consequatur rerum amet fuga expedita sunt et tempora saepe? Iusto nihil explicabo perferendis quos provident delectus ducimus necessitatibus reiciendis optio tempora unde earum doloremque commodi laudantium ad nulla vel odio?</p>

ul.generic-list>lorem10.item*4  //10是只每行10个单词

<ul class="generic-list">
    <li class="item">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam vero.</li>
    <li class="item">Laboriosam quaerat sapiente minima nam minus similique illum architecto et!</li>
    <li class="item">Incidunt vitae quae facere ducimus nostrum aliquid dolorum veritatis dicta!</li>
    <li class="item">Tenetur laborum quod cum excepturi recusandae porro sint quas soluta!</li>
</ul>

{% endhighlight %}

参考链接(有演示动画哦)：　[Web 前端利器Emmet 的HTML用法总结](http://devework.com/emmet-html.html)

转载链接：[emmet语法](http://www.zkboys.com/2016/03/11/emmet%E8%AF%AD%E6%B3%95/)

