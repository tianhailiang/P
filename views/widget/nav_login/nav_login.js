/**
 * Created by DXZ-Weijiu.Wang on 2017/9/22.
 */

$(document).ready(function () {

  $("form").Vaild();
  $('.i-checks').iCheck({
    checkboxClass: 'icheckbox_square-green',
    radioClass: 'iradio_square-green'
  });
  var lS = document.getElementById('loginSubmit');
  console.log('loginS', lS);
  if (lS.addEventListener) {
    console.log('ffff');
    lS.addEventListener('click', loginS, false);
  } else {
    console.log('eeeee');
    lS.attachEvent('onclick', loginS, false);
  }
})

function loginS () {
  console.log('login_ssssss')
  if ($('#newEmail').val() === '') {
    $('#newEmail').parent().addClass("has-error").removeClass("has-success");
    $('#newEmail').data("toogle", "left").data("placement", "right").data("container", "body").data("content", '请输入手机号').popover({"trigger":"manual"}).popover("show");
    return
  }
  if ($('#password').val() === '') {
    $('#password').parent().addClass("has-error").removeClass("has-success");
    $('#password').data("toogle", "left").data("placement", "right").data("container", "body").data("content", '请输入密码').popover({"trigger":"manual"}).popover("show");
    return
  }
  /*if (!$("input[type='checkbox']").is(':checked')) {
    layer.msg('请同意注册协议');
    return
  }*/
  if ($('#newEmail').val() !== '' && $('#password').val() !== ''&& /^[a-zA-Z0-9]{6,16}$/.test($("#password").val()) && /^1[3|4|5|7|8]\d{9}$/.test($("#newEmail").val())) {
    console.log('ajax')
    $.ajax({
      url: '/login_s',
      type:'POST',
      data:{
        username: $('#newEmail').val(),
        password: $('#password').val()
      },
      dataType:'json',
      success:function(msg){
        //console.log('aaaaaaaaa')
        //console.log('msg ajax', msg);
        if(msg.code === 0){
          //var h = location.search;//获取？后面的字符串
          var h = window.location.href;//获取全部的url
          console.log('h', h);
          var hh = h.split("?");
          console.log('hh', hh);
          if (hh[1] !== undefined) {
            var str = hh[1].substr(1);
            console.log('str', str);
            var strs = str.split("=");
            console.log('strs', strs[1]);
            window.location = strs[1];
          } else {
            console.log('tiao');
            window.location = '/';
          }
          alert('成功');
        } else {
          alert('登录出错啦');
        }
      },
      error:function(XMLHttpRequest, textStatus, errorThrown){
        console.log("获取失败，请重试！CODE:"+XMLHttpRequest.status)
      }
    });

  }
}