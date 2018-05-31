/**
 * Created by DXZ-Shuqin.Wang on 2018/3/14.
 */
$(function() {
    /*获取搜索url函数*/
    function getSoUrl (stationType,searchType) {
        var soUrlObj = {
            "留学": {
                "文章": 'so_article',
                "顾问": 'so_advisor'
            },
            "移民": {
                "文章": 'yimin_so_article',
                "顾问": 'yimin_so_advisor'
            }
        };
        return soUrlObj[stationType][searchType]
    }
    $('.search-type-box').hover(function () {
        $(this).find('.search-type-ul').slideDown(100);
        $(this).find('.go-down').html('&#xe633;');
    }, function () {
        $(this).find('.search-type-ul').slideUp(100);
        $(this).find('.go-down').html('&#xe632;')
    });
    $('.search-type-ul').on('click','li',function () {
        $('.search-type-text').text($(this).text());
        $(this).prependTo($('.search-type-ul'));
        $('.search-type-ul').hide();
    });
//顶部点击搜索
    $("#searchBtn").click(function () {
        var so_type = $("#searchType").text();
        var so_key_word = $.trim($("#search").val());
        if (so_key_word.length == 0 || so_key_word == '请输入你想了解的关键字') {
            alert('请输入你想了解的关键词');
            $('#search').focus();
        }
        else {
            if (!checkSpecialCode(so_key_word)) {
                window.open(fn.no_urlgen(getSoUrl('移民', so_type), 'q=' + so_key_word));
            }
        }
    });
//页面输入框聚焦
    $("#search-page").focus(function(){
        var checkedType = $('#page-search-type input[name="page-search-type"]:checked').val();
        var nowText = $(this).val();
        console.log(nowText)
        if (checkedType == '文章') {
            if (nowText == '') {
                $(this).attr('placeholder','请输入您感兴趣的文章关键词')
            }
        }
        else if (checkedType == '顾问') {
            if (nowText == '') {
                $(this).attr('placeholder','请输入您感兴趣的顾问姓名')
            }
        }
    });
//页面点击搜索
    $('#page-search-type input[name="page-search-type"]').on('click',function () {
        var chooseType = $(this).val();
        if (chooseType == '文章') {
            $("#search-page").val('');
            $("#search-page").attr('placeholder','请输入您感兴趣的文章关键词');
        }
        else if (chooseType == '顾问') {
            $("#search-page").val('');
            $("#search-page").attr('placeholder','请输入您感兴趣的顾问姓名');
        }
    });
    $("#searchBtn-page").click(function () {
        var so_key_word = $.trim($("#search-page").val());
        var so_type = $('#page-search-type input[name="page-search-type"]:checked ').val();
        if (so_key_word.length == 0 || so_key_word == '请输入你想了解的关键字') {
            alert($("#search-page").attr('placeholder'));
            //console.log($("#search-page").attr('placeholder'))
            $('#search-page').focus();
        }
        else {
            if (!checkSpecialCode(so_key_word)) {
                window.open(fn.no_urlgen(getSoUrl('移民', so_type), 'q=' + so_key_word));
            }
        }
    });
//回车键搜索
    $(document).keyup(function(event){
        if(event.keyCode ==13){
            var curIdName = document.activeElement.id;
            if (curIdName == 'search') { //顶部搜索框
                $("#searchBtn").trigger("click");
            }
            else if (curIdName == 'search-page') {
                $("#searchBtn-page").trigger("click");
            }
        }
    });
//页面选择搜索类型js
    $(".page-search-type").find("input[type^='radio']").on('change',function () {
        $(this).addClass('checked').siblings('input').removeClass('checked');
    });
    function checkSpecialCode(val){
        var special_code = new RegExp("[~'!@#$%^&*()-+_=:]",'g');
        if (val.match(special_code)) {
            alert('搜索内容不能包括特殊字符');
            return true;
        }
    }
});