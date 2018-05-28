/**
 * Created by DXZ-Shuqin.Wang on 2017/9/15.
 */
$.fn.checkItem=function()
{
    $($(this)[0]).find('span').html('&#xe661;');
    $($(this)[0]).siblings('.list-se').show();
    //$($(this)[0]).parents('li').addClass('checked up');
    //$($(this)[0]).parents('li').addClass('up');
    $(this).click(function(e)
    {
        //$('.list-se').children('li').removeClass('choose');
        //$(this).parents('li').addClass('checked').siblings().removeClass('checked');
        if ($(this).parents('li').hasClass('checked')) {
            e.preventDefault();
            window.location.reload();
        }
        if ($(this).parents('li').hasClass('up')) {
            $(this).find('span').html('&#xe60b;');
            $(this).parent('li').removeClass('up');
            $(this).siblings('.list-se').slideUp();
        }
        else {
            $(this).find('span').html('&#xe661;');
            $(this).parents('li').addClass('up');
            $(this).siblings('.list-se').slideDown().parent().siblings().children('.list-se').slideUp();
        }

    });
};
$.fn.checkList=function()
{
    $(this).click(function(e)
    {
        e.preventDefault();
        $(this).addClass('choose').siblings().removeClass('choose');
    });
};

   $(document).ready(function($)
    {
        $('.list ul li .title').checkItem();
        //$('.list-se li').checkList();
    });