function avatarGroup (arr) {
    var html = '';
    var fansNum = arr.length;
    var fansInfoText = '<span>等'+ fansNum +'人点赞</span>'
    for (var i = 0; i<fansNum;i++) {
        html+='<img src="http://images.jjl.cn/avatar/000/00/02/27_avatar_small_1521010157.jpg" alt="" style="margin-left:-8px;">';
    }
    return html+'等'+ fansNum +'人点赞';
}
var avatarArr=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30];
$.ajax({
    url: 'http://192.168.202.171:8080/so/api/article/vote_list',
    data: {
        article_id: 15412
    },
    type: 'GET',
    success:function(msg){
        console.log(msg);
      },
      error:function(XMLHttpRequest, textStatus, errorThrown){
        console.log("获取失败，请重试！CODE:"+XMLHttpRequest.status)
      }
})
$('#avatar-block').html(avatarGroup(avatarArr));