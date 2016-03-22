/**
 * Created by zhangjinpei on 16-2-16.
 */

//导航栏滑动一定距离收起
//var scrollSpace = 10;
//var $navbar = $('#navbar');
//var scrollFunc = function (e) {
//    e = e || window.event;
//    var currentScrollTop = $(window).scrollTop();
//
//    if (currentScrollTop > 380) {
//        $navbar.addClass('nav-hidden');
//        if (e.wheelDelta) {  //判断浏览器IE，谷歌滑轮事件
//            if (e.wheelDelta > scrollSpace) { //当滑轮向上滚动时
//                $navbar.removeClass('nav-hidden');
//            }
//            if (e.wheelDelta < scrollSpace) { //当滑轮向下滚动时
//                $navbar.addClass('nav-hidden');
//            }
//        } else if (e.detail) {  //Firefox滑轮事件
//            if (e.detail > scrollSpace) { //当滑轮向上滚动时
//                $navbar.removeClass('nav-hidden');
//            }
//            if (e.detail < scrollSpace) { //当滑轮向下滚动时
//                $navbar.addClass('nav-hidden');
//            }
//        }
//
//    }
//
//};
//
////给页面绑定滑轮滚动事件
//if (document.addEventListener) {//firefox
//    document.addEventListener('DOMMouseScroll', scrollFunc, false);
//}
////滚动滑轮触发scrollFunc方法  //ie 谷歌
//window.onmousewheel = document.onmousewheel;
//document.onmousewheel = scrollFunc;


window.onload = function () {

    //首页背景图切换;如果存在backstretch方法才执行
    if (typeof(jQuery.backstretch) == 'function') {
        $(".backstretch").backstretch(
            [
                "http://itxuye.qiniudn.com/1.jpg",
                "http://itxuye.qiniudn.com/2.jpg",
                "http://itxuye.qiniudn.com/3.jpg",
                "http://itxuye.qiniudn.com/5.jpg",
                "http://itxuye.qiniudn.com/7.jpg",
                "http://itxuye.qiniudn.com/8.jpg"
            ],
            {
                duration: 4000,
                fade: 1000
            }
        );
    }



    //首页技能进度条事件

    $(window).scroll(function () {
        var scrollHeight = $(window).scrollTop();
        var $skillSchedule = $('.skill-schedule');

        if (scrollHeight > 900) {
            progressAnimate($skillSchedule);
        }
    });
    function progressAnimate(schedule) {
        var numberData = [];
        for (var i = 0; i < schedule.length; i++) {
            var number = schedule.eq(i).attr('title');
            numberData.push(number);
            schedule.eq(i).css({width: number});
        }
    }

    $('.skill-graphs li').click(function () {
        var index = $(this).index();
        $('.skill-intraduce p').eq(index).css({left: 0, opacity: 1}).siblings().css({left: '100%', opacity: 0});
    });


    //为超链接加上target='_blank'属性
    //$('p a[href^="http"]').each(function () {
    //    $(this).attr('target', '_blank');
    //});


    //瀑布流布局
    var $parent = $('.photo-content-list');
    var $liBox = $parent.find('li');
    autoWaterFall($parent, $liBox);

    function autoWaterFall(parent, liBox) {
        var hArr = [];//存放每一列高度的数组
        var liArr = $(liBox);//获取所有的li
        var liWidth = liArr.eq(0).innerWidth();//取到每个li的宽度
        var cols = Math.floor($(parent).parent().innerWidth() / liWidth);//计算
        for (var i = 0; i < liArr.length; i++) {
            if (i < cols) {
                hArr.push(liArr.eq(i).height());
            } else {
                var minH = Math.min.apply(null, hArr);
                var minIndex = getMinIndex(hArr, minH);

                liArr.eq(i).css({position: 'absolute', top: minH, left: minIndex * liWidth});
                hArr[minIndex] += liArr.eq(i).innerHeight();
                console.log(minIndex);
            }
        }

        //给父盒子高度，防止塌陷
        var maxH = Math.max.apply(null, hArr);
        $(parent).css({height: maxH});

        //获取最小列高的index
        function getMinIndex(arr, val) {
            for (var i in arr) {
                if (arr[i] == val) {
                    return i;
                }
            }
        }
    }
}