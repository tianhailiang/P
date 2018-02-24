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
        console.log('aaaaaaaaa')
        console.log('msg ajax', msg);
        if(msg.code === 0){
          //window.location= '/';
          alert('成功');
        } else {
          alert('注册出错啦');
        }
      },
      error:function(XMLHttpRequest, textStatus, errorThrown){
        console.log("获取失败，请重试！CODE:"+XMLHttpRequest.status)
      }
    });

  }
}