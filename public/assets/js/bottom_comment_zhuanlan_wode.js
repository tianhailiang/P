/**
 * Created by DXZ-Weijiu.Wang on 2017/9/15.
 */

$(document).ready(function () {
  $("#tab_main").on("click", function () {
    $("div[id^='con_']").hide();
    $("#con_main").show();
  });
  $("#tab_zhuanlan").on("click", function () {
    $("div[id^='con_']").hide();
    $("#con_zhuanlan").show();
  });
});
var newpage = 2
function jiazaigengduo (uid) {

  $.ajax({
    url: '/soapi/user/adviser_special_more',
    type:'GET',
    data:{
      page_more: parseInt(newpage++),
      u_id:uid
    },
    //dataType:'json',
    dataType:'jsonp',
    jsonpCallback:'cb',
    success:function(msg){
      console.log('msg ajax', msg);
      if(msg.data.list.length > 0){
        //alert('成功');
        for (var i = 0;i < msg.data.list.length;i++) {
          var val = '<div class="art-box clearfix" >'+
                      '<div class="adviser-head" style="background:url('+fn.avaterimg(msg.data.list[i].uid,'small',msg.data.list[i].user_info.status,msg.data.list[i].user_info.version)+') no-repeat 0 0;background-size: 60px 76px;"></div>'+
                      '<div class="adviser-info" >'+
                        '<div class="adviser-info-name" >'+msg.data.list[i].user_info.realname+'</div>'+
                        '<div class="adviser-info-date clearfix" >'+
                          '<span class="adviser-info-date-s">'+msg.data.list[i].add_time+'</span>'+
                          '<span>来自：'+msg.data.list[i].category_id+'</span>'+
                        '</div>'+
                        '<div class="adviser-info-title" >'+msg.data.list[i].title+'</div>'+
                        '<div class="offer-xialas">'+
                          '<span class="offer-xialadd iconfont">&#xe60b;</span>'+
                          '<ul class="offer-xiala">'+
                            '<li>'+
                              '<a class="dui-text-warning-s report-btn" data-artId="'+msg.data.list[i].id+'" data-catid="'+msg.data.list[i].category_id+'">举报</a>'+
                            '</li>'+
                            '<li>'+
                              '<a class="dui-text-warning-s share-btn" data-url="'+fn.urlgen('article',msg.data.list[i].id.toString())+'" data-title ="'+msg.data.list[i].id.title+'">分享</a>'+
                            '</li>'+
                          '</ul>'+
                        '</div>'+
                        '<p class="adviser-info-p">'+
                          '<a href="'+fn.urlgen('article',msg.data.list[i].id.toString())+'" class="dui-text-warning">'+msg.data.list[i].introduce+'<span>【查看详情】</span></a>'+
                        '</p>'+
                        '<ul class="adviser-info-ul clearfix" id="adviser-info-ul_'+ msg.data.list[i].id +'"></ul>'+
                      '</div>'+
                    '</div>'+
                    '<div class="bot_comment clearfix">'+
                      '<ul>'+
                        '<li onclick="showbottom(1, '+msg.data.list[i].id+')" id="yuedu_li_'+msg.data.list[i].id+'">'+
                          '<i class="iconfont " id="yuedu_'+msg.data.list[i].id+'">&#xe9ca;</i>'+
                          '<span id="yuedu_span_'+msg.data.list[i].id+'">阅读（<em id="yuedu_em_'+ msg.data.list[i].id +'">'+ msg.data.list[i].views +'</em>）</span>'+
                        '</li>'+
                        '<li onclick="showbottom(2, '+msg.data.list[i].id+')" id="shoucang_li_'+msg.data.list[i].id+'">'+
                          '<i class="iconfont " id="shoucang_'+msg.data.list[i].id+'">&#xe7ed;</i>'+
                          '<span id="shoucang_span_'+msg.data.list[i].id+'">收藏（<em id="shoucang_em_'+ msg.data.list[i].id +'">'+ msg.data.list[i].favorites +'</em>）</span>'+
                        '</li>'+
                        '<li onclick="showbottom(3, '+msg.data.list[i].id+')" id="pinglun_li_'+msg.data.list[i].id+'">'+
                          '<i class="iconfont " id="pinglun_'+msg.data.list[i].id+'">&#xe61f;</i>'+
                          '<span id="pinglun_span_'+msg.data.list[i].id+'">评论（<em id="pinglun_em_'+ msg.data.list[i].id +'">'+ msg.data.list[i].comments +'</em>）</span>'+
                        '</li>'+
                        '<li class="dian" onclick="showbottom(4, '+msg.data.list[i].id+')" id="dianzan_li_'+msg.data.list[i].id+'">'+
                          '<i class="iconfont " id="dianzan_'+msg.data.list[i].id+'">&#xe651;</i>'+
                          '<span id="dianzan_span_'+msg.data.list[i].id+'">点赞（<em id="dianzan_em_'+ msg.data.list[i].id +'">'+ msg.data.list[i].votes +'</em>）</span>'+
                        '</li>'+
                      '</ul>'+
                    '</div>';
          $("#con_zhuanlan").append(val);
          if (msg.data.list[i].img_list.length > 0) {
            for (var y = 0; y< msg.data.list[i].img_list.length;y++) {
              var val1 = '<li><img src="'+fn.imageThumb(msg.data.list[i].img_list[y],'150x150')+'" ></li>';
              $('#adviser-info-ul_' + msg.data.list[i].id).append(val1);
            }
          }
        }
        $('.report-btn').on("click",report); //点击举报
        $('.share-btn').on('click',share); //点击分享
      } else {
        //alert('没有信息了');
        $('#jiazaigengduo1').hide()
        $('#jiazaigengduo').html('加载完毕')
      }
    },
    error:function(XMLHttpRequest, textStatus, errorThrown){
      console.log("获取失败，请重试！CODE:"+XMLHttpRequest.status)
    }
  });

}
var favorite = true;
var article = true;
function showbottom (type, index, usertype) {
  if (type === 1) {
    // $("#yuedu_" + index).html('&#xe60e');
    // $("#yuedu_li_" + index).css('color', '#C13232');
    // $("#yuedu_span_" + index).css('color', '#C13232');
  }else if (type === 2) {
    //$("#shoucang_" + index).html('&#xe634;');
    //$("#shoucang_li_" + index).css('color', '#C13232');
    //$("#shoucang_span_" + index).css('color', '#C13232');
    var uid = JSON.parse(cookie('login_ss'));
    if ( uid === null) {
      console.log('uid1', uid)
      window.location = fn.curlgen('login');
      // getlogin();
      return false;
    }
    var shoucang = $("#shoucang_em_" + index).html()
    if (favorite) {
      favorite = false;
      $.ajax({
        url: '/soapi/favorite_article',
        type:'POST',
        data:{
          article_id: index
        },
        //dataType:'json',
        dataType:'jsonp',
        jsonpCallback:'cb',
        success:function(msg){
          console.log('aaaaaaaaa')
          console.log('msg ajax', msg);
          if(msg.code === 0){
            //window.location= '/';
            //alert('成功');
            //$("#shoucang_" + index).html('&#xe634;');
            //$("#shoucang_li_" + index).css('color', '#C13232');
            //$("#shoucang_span_" + index).css('color', '#C13232');
            if (msg.data.action === 'add') {
              shoucang = parseInt(shoucang) + 1;
              $("#shoucang_em_" + index).html(shoucang);
              //layer.msg('收藏成功');
              // window.location.reload();
            } else {
              $('#art_box_' + index).css('display','none');
              // shoucang = parseInt(shoucang) - 1;
              // $("#shoucang_em_" + index).html(shoucang);
              //layer.msg('取消收藏成功');
              window.location.reload();
            }
            // $("#shoucang_li_" + index).removeAttr('onclick');
          } else {
            alert(msg.err);
          }
          favorite = true;
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
          favorite = true;
          console.log("获取失败，请重试！CODE:"+XMLHttpRequest.status)
        }
      });
    }
    
  }else if (type === 3) {
    console.log('cccccccc')
    /*$("#pinglun_" + index).html('&#xe601;');
    $("#pinglun_li_" + index).css('color', '#C13232');
    $("#pinglun_span_" + index).css('color', '#C13232');*/

    /*if ($("#comment_div_" + index).css('display') === 'none') {
     $("#comment_div_" + index).css('display', 'block');
     }else {
     $("#comment_div_" + index).css('display', 'none');
     $("#pinglun_" + index).html('&#xe61f;');
     $("#pinglun_li_" + index).css('color', '#666666');
     $("#pinglun_span_" + index).css('color', '#666666');
     }*/
    /*console.log('usertype',usertype)
    console.log('1111111')
    if (usertype === 1) {//用户
      console.log('2222222')
      window.location = '/case/' + index
    } else if (usertype === 2) {//顾问
      window.location= '/advisor_center/case/' + index
    } else if (usertype === 3) {//参赞

      window.location= '/case/' + index
    }*/
    //window.location= '/advisor_center/article/' + index
    /*$("#pinglun_li_" + index).on('click', function () {
      window.location= '/article/' + index
    })*/

  }else if (type === 4) {
    var uid = JSON.parse(cookie('login_ss'));
    console.log('uid', uid)
    if ( uid === null) {
      console.log('uid1', uid)
      window.location = fn.curlgen('login');
      // getlogin();
      return false;
    }
    var dianzan = $("#dianzan_em_" + index).html()
    if (article) {
      article = false;
      $.ajax({
        url: '/soapi/article_vote',
        type:'POST',
        data:{
          item_id: index,
          item_type : 'article'
        },
        //dataType:'json',
        dataType:'jsonp',
        jsonpCallback:'cb',
        success: function(msg) {
          console.log('aaaaaaaaa');
          console.log('msg ajax', msg);
          if(msg.code === 0){
            //window.location= '/';
            //alert('成功');
            //$("#dianzan_" + index).html('&#xe604;');
            //$("#dianzan_li_" + index).css('color', '#C13232');
            //$("#dianzan_span_" + index).css('color', '#C13232');
            if (msg.data.action === 'add') {
              dianzan = parseInt(dianzan) + 1;
              $("#dianzan_em_" + index).html(dianzan);
              //layer.msg('点赞成功');
              // window.location.reload();
            } else {
              dianzan = parseInt(dianzan) - 1;
              $("#dianzan_em_" + index).html(dianzan);
              //layer.msg('取消点赞成功');
              // window.location.reload();
            }
            // $("#dianzan_li_" + index).removeAttr('onclick');
          } else {
            alert(msg.err);
          }
          article = true;
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
          article = true;
          console.log("获取失败，请重试！CODE:"+XMLHttpRequest.status)
        }
      });
    }
    
  }
}


