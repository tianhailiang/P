
  $(document).ready(function () {

    $("form").Vaild();
    var sP = document.getElementById('sendcun');
    if (sP.addEventListener) {
      sP.addEventListener('click', sendphone, false)
    }else {
      sP.attachEvent('onclick', sendphone, false)
    }

    var bS = document.getElementById('loginuser');
    console.log('loginS', bS);
    if (bS.addEventListener) {
      console.log('ffff');
      bS.addEventListener('click', login_user, false);
    } else {
      console.log('eeeee');
      bS.attachEvent('onclick', login_user, false);
    }

    $('#weibo').on('click', function () {
      var h = window.location.href;//获取全部的url
      console.log('h', h);
      var hh = h.split("?");
      console.log('hh', hh[1])
      if (hh[1] !== undefined) {
        var str = hh[1].substr(1);
        var strs = str.split("=");
        console.log('strs', strs)
        var A = window.open(js_api_config.wwhost+ "/sina_login?h=" + strs[1], "TencentLogin", "width=450,height=320,menubar=0,scrollbars=1,resizable=1,status=1,titlebar=0,toolbar=0,location=1");
      } else {
        var A = window.open(js_api_config.wwhost+ "/sina_login?h=" + js_api_config.wwhost, "TencentLogin", "width=450,height=320,menubar=0,scrollbars=1,resizable=1,status=1,titlebar=0,toolbar=0,location=1");
      }
    })
    $('#qq').on('click', function () {
    //以下为按钮点击事件的逻辑。注意这里要重新打开窗口
    //否则后面跳转到QQ登录，授权页面时会直接缩小当前浏览器的窗口，而不是打开新窗口
      var h = window.location.href;//获取全部的url
      console.log('h', h);
      var hh = h.split("?");
      console.log('hh', hh)
      if (hh[1] !== undefined) {
        var str = hh[1].substr(1);
        var strs = str.split("=");
        console.log('strs', strs)
        var A = window.open(js_api_config.wwhost+"/qq_login?h=" + strs[1], "TencentLogin", "width=695,height=475,menubar=0,scrollbars=1,resizable=1,status=1,titlebar=0,toolbar=0,location=1");
      } else {
        var A = window.open(js_api_config.wwhost+"/qq_login?h=" + js_api_config.wwhost, "TencentLogin", "width=450,height=320,menubar=0,scrollbars=1,resizable=1,status=1,titlebar=0,toolbar=0,location=1");
      }
    })
    
  })
  var layeropen;
  function getlogin () {

        layeropen = layer.open({
	            type: 1,
	            shade: [0.4,'#000'],
	            shadeClose: true,
	            closeBtn: true,
	            area: ['420px', '400px'],
	            title: false,
	            border: [0],
	            bgcolor: "#fff",
	            scrollbar : false,
	            content: $('.l_u'),
	            success : function(){
	            	
              },
              cancel:function(){
                $("#phone").parent().removeClass("has-error").addClass("has-success");
                $("#phone").popover("destroy");
              },
              end:function() {
                $("#phone").parent().removeClass("has-error").addClass("has-success");
                $("#phone").popover("destroy");
              }
	      });
  }

  function sendphone () {
    if ($('#phone').val() === '') {
//            let butp = document.getElementById('phone')
      $('#phone').parent().addClass("has-error").removeClass("has-success");
      $('#phone').data("toogle", "left").data("placement", "right").data("container", "body").data("content", '请输入手机号码').popover({"trigger":"manual"}).popover("show");
      return
    }
    if (!/^1[3|4|5|7|8]\d{9}$/.test($("#phone").val())) {
//            let butp = document.getElementById('phone')
      $('#phone').parent().addClass("has-error").removeClass("has-success");
      $('#phone').data("toogle", "left").data("placement", "right").data("container", "body").data("content", '请输入正确手机号码').popover({"trigger":"manual"}).popover("show");
      return
    }
    $.ajax({
//          url: 'http://192.168.100.77/api/sendcode/' + $('#phone').val(),
//    url: 'http://www.51daxuetong.cn/api/sendcode/' + $('#phone').val(),
//      url: ajaxUrlPrefix.ucapi + '/api/index.php?m=sendcode&phone=' + $('#newEmail').val(),
      url: '/sendcode_s',
      type:'GET',
      data: {
        phone: $('#phone').val()
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

  function login_user () {
    if ($('#phone').val() === '') {
//            let butp = document.getElementById('phone')
      $('#phone').parent().addClass("has-error").removeClass("has-success");
      $('#phone').data("toogle", "left").data("placement", "right").data("container", "body").data("content", '请输入手机号码').popover({"trigger":"manual"}).popover("show");
      return
    }
    if (!/^1[3|4|5|7|8]\d{9}$/.test($("#phone").val())) {
//            let butp = document.getElementById('phone')
      $('#phone').parent().addClass("has-error").removeClass("has-success");
      $('#phone').data("toogle", "left").data("placement", "right").data("container", "body").data("content", '请输入正确手机号码').popover({"trigger":"manual"}).popover("show");
      return
    }
    if ($('#verify').val() === '') {
      layer.msg('请输入手机验证码');
      return
    }
    $.ajax({
      url: '/login_user',
      type:'POST',
      dataType:'json',
      data: {
        phone: $('#phone').val(),
        code: $('#verify').val(),
      },
      success:function(msg) {
        console.log('msg', msg);
        if (msg.code == 0) {
          layer.msg('登录成功');
          layer.close(layeropen);
          window.location.reload();
        } else {
          console.log(msg)
          layer.msg(msg.message)
        }
      }
    });
  }
//普通用户退出
function outlogin () {
    $.ajax({
      url: '/login_out',
      type: 'GET',
      datatype: 'json',
      success:function(msg){
        if (msg == 'ok') {
          console.log('登出')
          window.location.reload()
        }
      },
      error:function(XMLHttpRequest, textStatus, errorThrown){
        console.log("获取失败，请重试！CODE:"+XMLHttpRequest.status)
      }
    })
  }