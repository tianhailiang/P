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
        //$(this).find('.go-down').html('&#xe633;');
    }, function () {
        $(this).find('.search-type-ul').slideUp(100);
        //$(this).find('.go-down').html('&#xe632;')
    });
    $('.search-type-ul').on('click','li',function () {
        $('.search-type-text').text($(this).text());
        $(this).prependTo($('.search-type-ul'));
        $('.search-type-ul').hide();
    });
//点击搜索
    $("#searchBtn").click(function () {
        var so_type = $("#searchType").text();
        var so_key_word = $.trim($("#search").val());
        if (so_key_word.length == 0 || so_key_word == '请输入你想了解的关键字') {
            alert('请输入你想了解的关键词');
            $('#search').focus();
        }
        else {
            if (!checkSpecialCode(so_key_word)) {
                window.open(fn.no_urlgen(getSoUrl(so_type, '文章'), 'q=' + so_key_word));
            }
        }
    });
    $(document).keyup(function(event){
        if(event.keyCode ==13){
            var curIdName = document.activeElement.id;
            if (curIdName == 'search') { //顶部搜索框
                $("#searchBtn").trigger("click");
            }
        }
    });
    function checkSpecialCode(val){
        var special_code = new RegExp("[~'!@#$%^&*()-+_=:]",'g');
        if (val.match(special_code)) {
            alert('搜索内容不能包括特殊字符');
            return true;
        }
    }
    //热门标签搜索
    $(document).click(function(e){
        $('#hot-tags-box').hide();
    });
    $('#search').on('click', function (e) {
        var e = e || event;
        e.stopPropagation();
        e.cancelBubble = true;
        $('#hot-tags-box').show();
        $('.search-type-ul').hide();
    });
    $('#hot-tags-box').on('click',function (e) {
        var e = e || event;
        e.stopPropagation();
    });
    $('#hot-tags-box').on('click','span', function (e) {
        var e = e || event;
        e.stopPropagation();
        var so_type = $("#searchType").text();
        var so_key_word = $(this).html();
        window.open(fn.no_urlgen(getSoUrl(so_type, '文章'), 'q=' + so_key_word));
    })
});
