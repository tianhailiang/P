/**
 * Created by DXZ-Weijiu.Wang on 2017/9/22.
 */

$(document).ready(function () {

  // $("form").Vaild();
  $('.i-checks').iCheck({
    checkboxClass: 'icheckbox_square-green',
    radioClass: 'iradio_square-green'
  });
  var lS = document.getElementById('loginSubmit');
  if (lS.addEventListener) {
    lS.addEventListener('click', loginS, false);
  } else {
    lS.attachEvent('onclick', loginS, false);
  }
  $(".payMethod").find("input[type^='radio']").on('click',function () {
    $(this).addClass('checked').siblings('input').removeClass('checked');
  });
  function loginS () {
    console.log('login_ssssss')
    if ($('#newEmail').val() === '') {
      // $('#newEmail').parent().addClass("has-error").removeClass("has-success");
      // $('#newEmail').data("toogle", "left").data("placement", "right").data("container", "body").data("content", '请输入手机号').popover({"trigger":"manual"}).popover("show");
      $('#login_e_phone').css('display','block');
      return
    }
    if (!/^[A-Za-z0-9]{6}$/.test($('#newEmail').val()) && !/^1\d{10}$/.test($('#newEmail').val())) {
      // $('#newEmail').parent().addClass("has-error").removeClass("has-success");
      // $('#newEmail').data("toogle", "left").data("placement", "right").data("container", "body").data("content", '请输入正确手机号或工号后六位').popover({"trigger":"manual"}).popover("show");
      $('#login_e_phone').css('display','block');
      $('#login_error_text_phone').html('请输入正确手机号或工号后六位')
      return
    } else {
      $('#login_e_phone').css('display','none');
    }
    if ($('#password').val() === '') {
      // $('#password').parent().addClass("has-error").removeClass("has-success");
      // $('#password').data("toogle", "left").data("placement", "right").data("container", "body").data("content", '请输入密码').popover({"trigger":"manual"}).popover("show");
      $('#login_e_pass').css('display', 'block')
      return
    }
    if (!/^[a-zA-Z0-9]{8,16}$/.test($("#password").val())) {
      $('#login_e_pass').css('display', 'block')
      return
    } else {
      $('#login_e_pass').css('display', 'none')
    }
    /*if (!$("input[type='checkbox']").is(':checked')) {
     layer.msg('请同意注册协议');
     return
     }*/
    var sha1 = hex_sha1($('#password').val());
    console.log('sha1'+sha1);
    if ($('#newEmail').val() !== '' && $('#password').val() !== ''&& /^[a-zA-Z0-9]{8,16}$/.test($("#password").val()) && /^1\d{10}$/.test($("#newEmail").val()) || /^[A-Za-z0-9]{6}$/.test($('#newEmail').val())) {
      console.log('ajax');
      $.ajax({
        url: '/login_s',
        type:'POST',
        data:{
          username: $('#newEmail').val(),
          password: hex_sha1($('#password').val()),
          adviser_type: $('#guwen_login input[name="payMethod"]:checked ').val()//1 留学，2 移民
        },
        dataType:'json',
        success:function(msg){
          console.log('aaaaaaaaa')
          console.log('msg ajax', msg);
          if(msg.code === 0){
            //var h = location.search;//获取？后面的字符串
            var h = window.location.href;//获取全部的url
            console.log('h', h);
            var hh = h.split("?");
            console.log('hh', hh)
            if (hh[1] !== undefined) {
              var str = hh[1].substr(1);
              console.log('str', str);
              var strs = str.split("=");
              console.log('strs', strs[1]);
              window.location= strs[1];
            } else {
              window.location = '/';
            }
            //alert('成功');
          } else {
            alert('金吉列留学提醒您：'+msg.message);
          }
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
          console.log("获取失败，请重试！CODE:"+XMLHttpRequest.status)
        }
      });

    }
  };

  //清除记录密码功能
  window.load =function(){  　
    document.getElementById('newEmail').value='';
    document.getElementById('password').value='';
  };
})
