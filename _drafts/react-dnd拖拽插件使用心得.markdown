---
layout: post
title: "react-dnd拖拽插件使用心得"
date: 2016-03-14 19:46
categories: article tools
tags: [拖拽,react]
whichPage: tools
bannerImg: /img/illustration/2016.jpg
---

最近公司准备做个菜品后台管理系统，我负责前台UI界面的显示。其中，有一个需求是，希望想百度外卖那样，做成可拖拽的菜品管理交互方式。h5有关于拖拽的api，但是，由于公司用的时react，如何把拖拽做到react里面，对目前的我来说还做不到，于是上网查了一下，有个react-dnd拖拽插件。在使用的过程中遇到的坑，记录在此。

重点是熟悉 `DragSource`　和　`DropTarget` 的用法，参数的含义，以及如何互相通信。它们都有三个必须参数：　`type` , `spec` , `collect` ，和一个可选参数　`options` (一般不用)。**注意**在使用这个两个方法时，别忘了把你的应用程序的顶层组件在一个`DragDropContext`。

**type参数**

如果两个可拖拽的组件的type属性相同，并且spec中都有isDragging方法，那么拖拽其中一个组件时，触法isDragging方法，另一个组件也会触法。如果，想要两个组件单独触发各自的方法，需要将函数写在beginDrag方法中。

**spec参数**

一个带有特定方法的纯 Object，里面是一些响应拖拽事件的方法。DragSource 和　DropTarget 的spec里面的相应拖拽方法不同，分开说。

> **DragSource#Spec**

> 有四个方法：

> beginDrag(props, monitor, component)

> 必须。当拖动开始，beginDrag执行。你必须返回一个普通的JavaScript对象来描述这个正在被拖动的数据。例如 
{% highlight js%}
beginDrag(props) {
    return {
        name: props.name,//这里面的值可以被drop方法获取到。
    };
},
{%endhighlight%}

> endDrag(props, monitor, component)

> 可选。当拖动停止，enddrag执行。可以通过 `monitor.getDropResult()` 获取到drop方法中的返回结果。例如
{% highlight js%}
endDrag(props,monitor) {
    const item = monitor.getItem();
    const dropResult = monitor.getDropResult();

    if (dropResult) {
        console.log( // eslint-disable-line no-alert
            `You dropped ${item.name} into ${dropResult.name}!`
        );
    }
}

//在DropTarget#Spec参数中
drop(props, monitor, component) {
    const item = monitor.getItem();
    console.log(item.id);
    return { name: 'Dustbin' };
}
{% endhighlight%}

> canDrag(props, monitor)

> isDragging(props, monitor)
 
> **DropTarget#Spec**

> 有三个方法：

> drop(props, monitor, component)

> hover(props, monitor, component)

> canDrop(props, monitor)


props 组件当前的 props

monitor 是一个 DragSourceMonitor/DropTargetMonitor 实例，用来查询当前 drag state 的信息。

monitor.didDrop() monitor.getDropResult() monitor.getItem()

[DragSourceMonitor](http://gaearon.github.io/react-dnd/docs-drag-source-monitor.html) 

[DropTargetMonitor](http://gaearon.github.io/react-dnd/docs-drop-target-monitor.html) 

component 表示当前组件，可以省略。

**collect参数**