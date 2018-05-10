/**
 * Created by DXZ-Shuqin.Wang on 2017/10/17.
 */
$(function () {
    var login_ss = null;
    if($.cookie('login_ss') != undefined){
        login_ss = JSON.parse($.cookie('login_ss'));
    }
    $('.guanzhu-btn').on('click', function() {
        if($(this).parent().hasClass('advisor-btn-gray')){
            return false;
        }
        if(login_ss == undefined){
            //layer.msg('你还没有登录')
            //   window.setTimeout(function(){
            getlogin();
            //   },1000);
            return false;
        }
        var uid = login_ss.uid;
        var to_uid = $(this).data('uid');
        var guanzhu_num_box = $('.guanzhu-num');
        var guanzhu_num = guanzhu_num_box.text();
        var thisObj = $(this);
        $.ajax({
            url: '/soapi/follow_people',
            type:'POST',
            data:{
                u_id: uid,
                to_uid: to_uid
            },
            dataType:'json',
            success:function(msg){
                if (msg.code == 0) {
                    if (msg.data.type == 'add') {
                        thisObj.text('已关注');
                        guanzhu_num_box.text(guanzhu_num*1+1);
                    }
                    else if ( msg.data.type == 'remove') {
                        thisObj.text('关注');
                        guanzhu_num_box.text(guanzhu_num*1-1);
                    }
                }
            },
            error:function(XMLHttpRequest, textStatus, errorThrown){
                console.log("获取失败，请重试！CODE:"+XMLHttpRequest.status)
            }
        });
    });
});