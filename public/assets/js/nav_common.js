/**
 * Created by DXZ-Shuqin.Wang on 2018/3/14.
 */
/**
 * Created by DXZ-Hui.Cao on 2017/8/25.
 */
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
        window.open(fn.no_urlgen(getSoUrl(so_type,'文章'), 'q=' + so_key_word));
    }
});
$(document).keyup(function(event){
    if(event.keyCode ==13){
        $("#searchBtn").trigger("click");
    }
});
