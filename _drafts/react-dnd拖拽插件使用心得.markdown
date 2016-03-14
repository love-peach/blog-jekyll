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


如果两个可拖拽的组件的type属性相同，并且spec中都有isDragging方法，那么拖拽其中一个组件时，触法isDragging方法，另一个组件也会触法。如果，想要两个组件单独触发各自的方法，需要将函数写在beginDrag方法中。

