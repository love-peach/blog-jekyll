//页面中需要做两件事，１给导航栏命名，并给li取id,2在子页面中放隐藏的input
$(document).ready(function () {
    autoActive('whichPages', 'navbar');
    function autoActive(flagName, navbarId) {
        var pagesValueArray = creadNavArray(navbarId);
        console.log(pagesValueArray);
        autoAddClass(flagName, pagesValueArray);
    }

//根据当前页面唯一值，判断是哪个页面，添加高亮样式
    function autoAddClass(flagName, pagesValueArray) {
        var pageValue = $('input[name=' + flagName + ']').val();
        for (var i = 0, j = pagesValueArray.length; i < j; i++) {
            if (pageValue == pagesValueArray[i]) {
                $('#' + pagesValueArray[i]).addClass('active');

            }
        }
    }

//将导航栏的id存入到一个数组中
    function creadNavArray(navbarId) {
        var navArray = [];
        var navbar = $('#' + navbarId + ' li');
        for (var i = 0, j = navbar.length; i < j; i++) {
            var navbarChildrenId = navbar.eq(i).attr('id');
            navArray.push(navbarChildrenId);
        }
        return navArray;
    }
});
