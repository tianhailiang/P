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
})