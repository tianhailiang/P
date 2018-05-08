/**
 * Created by DXZ-Shuqin.Wang on 2018/3/26.
 */
$(function() {
    $(window).on('scroll', function () {
        var $scroll = $(this).scrollTop();
        if ($scroll >= 470) {
            $('.detail_bar').show();
        } else {
            $('.detail_bar').hide();
        }
    });
    var scrollToCmt = function () {
        var detail_bar_h = $('#detail_bar').height();
        var commentTop = $('#saytext-box').offset().top;
        $(window).scrollTop(commentTop-detail_bar_h-30);
        console.log('commentTop',commentTop,'detail_bar_h',detail_bar_h)
        $('#saytext').focus();
    };
    var hash = (window.location.href.split('#').length) > 1 ? true : false;
    $('#fix_bar_comment').on('click', function () {
        scrollToCmt();
    })
    if (hash) {
        scrollToCmt();
    }
})