/**
 * Created by zhangjinpei on 16-2-16.
 */

//导航栏滑动一定距离收起
var scrollSpace = 10;
var $navbar = $('#navbar');
var scrollFunc = function (e) {
    e = e || window.event;
    var currentScrollTop = $(window).scrollTop();

    if (currentScrollTop > 380) {
        $navbar.addClass('nav-hidden');
        if (e.wheelDelta) {  //判断浏览器IE，谷歌滑轮事件
            if (e.wheelDelta > scrollSpace) { //当滑轮向上滚动时
                $navbar.removeClass('nav-hidden');
            }
            if (e.wheelDelta < scrollSpace) { //当滑轮向下滚动时
                $navbar.addClass('nav-hidden');
            }
        } else if (e.detail) {  //Firefox滑轮事件
            if (e.detail > scrollSpace) { //当滑轮向上滚动时
                $navbar.removeClass('nav-hidden');
            }
            if (e.detail < scrollSpace) { //当滑轮向下滚动时
                $navbar.addClass('nav-hidden');
            }
        }

    }

};

//给页面绑定滑轮滚动事件
if (document.addEventListener) {//firefox
    document.addEventListener('DOMMouseScroll', scrollFunc, false);
}
//滚动滑轮触发scrollFunc方法  //ie 谷歌
window.onmousewheel = document.onmousewheel;
document.onmousewheel = scrollFunc;