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
    $('#fix_bar_comment').on('click', function () {
        var detail_bar_h = $('#detail_bar').height();
        var commentTop = $('#saytext-box').offset().top;
        $(window).scrollTop(commentTop-detail_bar_h-30);
        $('#saytext').focus();
    })
})