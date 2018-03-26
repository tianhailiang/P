/**
 * Created by DXZ-Shuqin.Wang on 2018/3/26.
 */
$(function() {
    $(window).on('scroll', function () {
        var $scroll = $(this).scrollTop();
        console.log('$scroll',$scroll);
        if ($scroll >= 470) {
            $('.detail_bar').slideDown();
        } else {
            $('.detail_bar').slideUp();
        }
    });
})