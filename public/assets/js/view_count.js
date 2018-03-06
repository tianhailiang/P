function create_token(code){
    var c=String.fromCharCode(code.charCodeAt(0)+code.length);
    for(var i=1;i<code.length;i++){
        c+=String.fromCharCode(code.charCodeAt(i)+code.charCodeAt(i-1));
    }
    return escape(c);
}
function article_count (token,catid,articleid,uuid) {
    $.ajax({
        url: ajaxUrlPrefix.nodeapi + '/cmsapi/article_count',
        type:'GET',
        data:{
            catid : catid,
            id :articleid,
            uuid: uuid,
            token:token
        },
        success:function(res){
            if (res.code == 0) {
                $('#detail_views_num').html(res.data.num);
                $.cookie('uuid', res.data.uuid,{ path: "/",domain: '.jjl.cn'});
            }
        }
    });
}
$(function(){
    var catid = '100';
    var articleid = $("#detail_id").val();
    var uuid = $.cookie('uuid') ? $.cookie('uuid') : '';
    article_count(create_token("apitokenjjl.cn2018"),catid,articleid,uuid);
});
