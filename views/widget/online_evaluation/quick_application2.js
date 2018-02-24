/**
 * Created by DXZ-Hui.Cao on 2017/10/20.
 */


$(function(){



  var validate_act = {
    //phone
    phone: function(phone){
      if(!/^(13[0-9]|15[0|1|2|3|5|6|7|8|9]|18[0-9 ]|177)\d{8}$/.test(phone)){
        return false;
      }
      return true;
    },
    email:function(email){
      if(!/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/.test(email)){
        return false;
      }
      return true;
    }

  };

  $("#quickName-act").on('blur',function(){
    // 姓名输入框 失去焦点事件
    if($(this).val()==''){

      $('#nameNumTip-act').html("请输入您的姓名");
    }else{

      $('#nameNumTip-act').html("");
    }
  });

  $("#quickPhone-act").on("blur",function(){
    //手机号失去焦点事件
    if($(this).val()==''){

      $('#phoneNumTip-act').html("请输入您的手机号码");
    }else{
      if(!validate_act.phone($(this).val())){
        $('#phoneNumTip-act').html("您输入的手机号码不正确");
      }else{
        $('#phoneNumTip').html("");
      }

    }
  });
  $("#quickemail-act").on("blur",function(){
    //邮箱失去焦点事件
    if($(this).val()==''){

      $('#emailNumTip-act').html("请输入您的邮箱");
    }else{
      if(!validate_act.email($(this).val())){
        $('#emailNumTip-act').html("您输入的邮箱不正确");
      }else{
        $('#emailNumTip-act').html("");
      }

    }
  });

  $("#quickPhoneCode-act").on("blur",function(){
    //验证码失去焦点事件
    if($(this).val()==''){
      $("#codeNumTip-act").html("请输入验证码");
    }else{
      $("#codeNumTip-act").html("");
    }
  });



  function countDown() {
    // 60s倒计时
    $(".quick-get-phone-code-act").unbind("click");
    var countDownTime = 60;
    var timer = window.setInterval(function () {
      countDownTime--;

      $(".quick-get-phone-code-act").html('（'+countDownTime+'）s');
      if (countDownTime == 0) {
        clearInterval(timer);
        countDownTime = 60;
        $(".quick-get-phone-code-act").html('重新获取');

      }
    }, 1000);
  }


  $(".quick-get-phone-code-act").click(function(){
    //获取验证码

    if (!validate.phone($.trim($("#quickPhone-act").val()))) {
      $('#phoneNumTip-act').html("您输入的手机号不正确");
      $("#quickPhone-act").val('');
    } else {
      countDown();
      //获取短信验证码

    }
    $.ajax({
      url: ajaxUrlPrefix.nodeapi+'/ucapi/ucapi_agent',
      type:'get',
      data:{
        m: 'sendcode',
        phone:$("#quickPhone-act").val()
      },
      dataType:'json',
      success:function(msg){

        if(msg.code === 0){
          alert('成功');
        } else {
          alert('出错啦');
        }
      },
      error:function(XMLHttpRequest, textStatus, errorThrown){
        console.log("获取失败，请重试！CODE:"+XMLHttpRequest.status)
      }
    });

  });


  $("#booking-btn").on('click',function(){
    if($("#quickDepartment-act").val()==''){
      // 判断国家
      $("#departmentNumTip-act").html("留学意向国家");
      return false;
    }else{
      $("#departmentNumTip-act").html('');
    }



    if($("#quickName-act").val()==''){
      //判断姓名
      $("#nameNumTip").html('请填写您的姓名');
      return false;

    }else{

      $("#nameNumTip-act").html('');
    }



    if(!validate_act.phone($.trim($("#quickPhone-act").val()))){
      //判断手机号
      $('#phoneNumTip-act').html("您输入的手机号不正确");
      return false;
    }else{
      $('#phoneNumTip-act').html('');
    };
    if(!validate_act.email($.trim($("#quickemail-act").val()))){
      //判断邮箱
      $('#emailNumTip-act').html("您输入的邮箱不正确");
      return false;
    }else{
      $('#emailNumTip-act').html('');
    }

    if($("#quickPhoneCode-act").val()==''){
      //判断验证码
      $('#codeNumTip-act').html("请您输入验证码");
      return false;
    }else{
      $('#codeNumTip-act').html('');
    }
    $.ajax({
      url: 'http://i.jjl.cn/api/onlineBooking',
      type:'POST',
      data:{
        name: $('#quickName-act').val(),
        phone: $('#quickPhone-act').val(),
        country: $('#quickDepartment-act').val(),
        email: $('#quickemail-act').val(),
        code:$("#quickPhoneCode-act").val()
      },
      dataType:'json',
      success:function(msg){
        console.log(msg);
        if(msg.code === 0){
          alert('成功');
        } else {
          alert(msg.message);

        }
      },
      error:function(XMLHttpRequest, textStatus, errorThrown){
        console.log("获取失败，请重试！CODE:"+XMLHttpRequest.status)
      }
    });

  });


})