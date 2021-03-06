$(function(){
    var articleid = $("#detail_id").val();
    $.ajax({
        url: ajaxUrlPrefix.nodeapi+'/vote_list',
        data: {
            article_id: articleid
        },
        type: 'GET',
        dataType:'json',
        success:function(msg){
            if (msg.code == 0 && msg.data.length>0) {
                var avatarArr = msg.data;
                $('#fans-block').html(avatarGroup(avatarArr));
            }
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
            console.log("获取失败，请重试！CODE:"+XMLHttpRequest.status)
        }
    })
})
function avatarGroup (arr) {
    var html = '<div class="avatar-block">';
    var fansNum = arr.length;
    var maxNum = fansNum < 25 ? fansNum : 25;//限制显示25个
    for (var i = 0; i<maxNum;i++) {
        html+='<img src="'+ arr[i].avatar_file +'" alt="" style="margin-left:-8px;">';
    }
    return html+'<span style="padding-left:2px;">等'+ fansNum +'人点赞</span></div>';
}