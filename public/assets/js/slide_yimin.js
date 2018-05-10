/**
 * Created by DXZ-Hui.Cao on 2017/8/24.
 */

$(function(){
  var sUserAgent = navigator.userAgent.toLowerCase();
  if(sUserAgent .match(/ipad/i) == "ipad"){
    $(".my").hover(function () {
      $(this).find("img").css("display","none");
      $(this).find("p").css("display","block");
      $("#quick_links_pop").css("display", "none");
      $("#comment_con").css("display", "none");
      $("#r_comment").css("background", "#9a9a9a");
      var login_nickname = JSON.parse($.cookie('login_ss'));
      if(login_nickname){
        if(login_nickname.usertype==1){
          window.location.href=fn.no_urlgen('user_center', 'revcomment');
        }else if(login_nickname.usertype==2){
          window.location.href=fn.no_urlgen('advisor_center');
        }
      }else{
        getlogin();

      }
    },function(){
      $(this).find("p").css("display","none");
      $(this).find("img").css("display","block");
    });
  }else{
    $(".my").hover(function () {
      $(this).find("img").css("display","none");
      $(this).find("p").css("display","block");
      $("#quick_links_pop").css("display", "none");
      $("#comment_con").css("display", "none");
      $("#r_comment").css("background", "#9a9a9a");
    },function(){
      $(this).find("p").css("display","none");
      $(this).find("img").css("display","block");
    });
    $(".my").on("click",function(){
      var login_nickname = JSON.parse($.cookie('login_ss'));
      if(login_nickname){
        if(login_nickname.usertype==1){
          window.open(fn.no_urlgen('user_center', 'revcomment'));
        }else if(login_nickname.usertype==2){
          window.open(fn.no_urlgen('advisor_center'));
        }
      }else{
        getlogin();

      }
    })

  }


// right: 40px; margin-top: -200px; display: block; width: 170px;
  $(".zixun").on("click", function () {
    $("#quick_links_pop").css({"display": "block", "right": "40px", "margin-top": "-300px", "width": "170px"})
  })

//关闭弹框
  $(document).on("click","#guanbi_tanchu",function(){
    $(this).css("display", "none")
  })

  $(".ibar_closebtn").on("click",function(){
    $(this).parent("#quick_links_pop").css("display","none")
  })

  $("#r_comment").hover(function(){
    /* $("#comment_con").css("display", "block");*/
    $("#r_comment").css("background", "#C13232");
    /*  $("#quick_links_pop").css("display", "none");*/
  },function(){
    /* $("#comment_con").css("display", "none");*/
    $("#r_comment").css("background", "#9a9a9a");
  })
  $("#r_comment").on("click",function(){
    $("#comment_con").css("display", "block");
    $("#quick_links_pop").css("display", "none")
  })
  $("#comment_close").on("click", function () {
    $("#comment_con").css("display", "none");
    $("#r_comment").css("background", "#9a9a9a");
    return false
  })
  $("#zxzx").hover(function(){
    /*$("#quick_links_pop").css("display", "block");*/
    $("#comment_con").css("display", "none");
    $("#r_comment").css("background", "#9a9a9a");
  },function(){
    /*  $("#quick_links_pop").css("display", "none");*/
  });
  $("#zxzx").on("click",function(){
    $("#quick_links_pop").css("display", "block")
  })

  $(".weixin-slide").hover(function(){
    $(".weixin-slide-img").css("display","block");
    $("#quick_links_pop").css("display", "none");
    $("#comment_con").css("display", "none");
    $("#r_comment").css("background", "#9a9a9a");
  },function(){
    $(".weixin-slide-img").css("display","none")
  });
  $(".qq-slide").hover(function(){
    $(".qq-slide-img").css("display","block");
    $("#quick_links_pop").css("display", "none");
    $("#comment_con").css("display", "none");
    $("#r_comment").css("background", "#9a9a9a");
  },function(){
    $(".qq-slide-img").css("display","none")
  });
  $('#to_top').click(function(){
    $('html , body').animate({scrollTop: 0},'slow');
  });


})





