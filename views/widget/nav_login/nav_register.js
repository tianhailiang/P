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
  var sP = document.getElementById('sendcun');
  if (sP.addEventListener) {
    sP.addEventListener('click', sendphone, false)
  }else {
    sP.attachEvent('onclick', sendphone, false)
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
  if ($('#que_password').val() === '') {
    $('#que_password').parent().addClass("has-error").removeClass("has-success");
    $('#que_password').data("toogle", "left").data("placement", "right").data("container", "body").data("content", '请输入确认密码').popover({"trigger":"manual"}).popover("show");
    return
  }
  if ($('#verify').val() === '') {
    layer.msg('请请输入手机验证码');
    return
  }
  if (!$("input[type='checkbox']").is(':checked')) {
    layer.msg('请同意注册协议');
    return
  }
  if ($('#newEmail').val() !== '' && $('#password').val() !== ''&& /^[a-zA-Z0-9]{6,16}$/.test($("#password").val()) && /^1[3|4|5|7|8]\d{9}$/.test($("#newEmail").val())) {
    console.log('ajax')
    $.ajax({
      url: '/register_s',
      type:'POST',
      data:{
        phone: $('#newEmail').val(),
        password: $('#password').val()
        //code: $('#verify').val()
      },
      dataType:'json',
      success:function(msg){
        console.log('aaaaaaaaa')
        console.log('msg ajax', msg.code);
        alert(msg.code)
        if(msg.code === 0){
          //window.location= '/';
          alert('成功');
          window.location = '/login'
        } else {
          alert(msg.message);
        }
      },
      error:function(XMLHttpRequest, textStatus, errorThrown){
        console.log("获取失败，请重试！CODE:"+XMLHttpRequest.status)
      }
    });

  }
}

function sendphone () {
  if ($('#newEmail').val() === '') {
//            let butp = document.getElementById('phone')
    $('#newEmail').parent().addClass("has-error").removeClass("has-success");
    $('#newEmail').data("toogle", "left").data("placement", "right").data("container", "body").data("content", '请输入手机号码').popover({"trigger":"manual"}).popover("show");
    return
  }
  if (!/^1[3|4|5|7|8]\d{9}$/.test($("#newEmail").val())) {
//            let butp = document.getElementById('phone')
    $('#newEmail').parent().addClass("has-error").removeClass("has-success");
    $('#newEmail').data("toogle", "left").data("placement", "right").data("container", "body").data("content", '请输入手机号码').popover({"trigger":"manual"}).popover("show");
    return
  }
  $.ajax({
//          url: 'http://192.168.100.77/api/sendcode/' + $('#phone').val(),
//    url: 'http://www.51daxuetong.cn/api/sendcode/' + $('#phone').val(),
    url: '/sendcode_s',
    type:'GET',
    data:{
      phone: $('#newEmail').val()
    },
    dataType:'json',
    withCredentials:true,
    success:function(msg){
      console.log('msg', msg);
      if (msg.code === 0) {
        layer.msg('短信发送成功，请查阅手机');
      } else {
        layer.msg('数据错误');
      }
    },
    error:function(XMLHttpRequest, textStatus, errorThrown){
      console.log("获取失败，请重试！CODE:"+XMLHttpRequest.status);
      layer.msg("获取失败，请重试！CODE:"+XMLHttpRequest.status);
    }
  });
  var downcount = 60;
  var time = setInterval(function (){
    if (downcount === 0) {
      $("#sendcun").attr("value", "发送验证码");
      $("#sendcun").removeAttr("disabled");
      clearInterval(time);
      return
    }else {
      $("#sendcun").attr("disabled", "disabled");
      $("#sendcun").attr("value", downcount + "s");
      downcount--;
    }
  }, 1000);
}