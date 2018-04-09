
  $(function() {

    $("form").Vaild();

    //图片验证码
    $.ajax({
      url:"/param_code",
      type: "get",
      success: function(result){
        $('#param_code').html(result)
      },
      error:function(XMLHttpRequest, textStatus, errorThrown){
        console.log("获取失败，请重试！CODE:"+XMLHttpRequest.status)
      }
    });

    //登录
    var pac = document.getElementById('param_code');
    if (pac.addEventListener) {
      pac.addEventListener('click', showcode, false)
    }else {
      pac.attachEvent('onclick', showcode, false)
    }
    var sP = document.getElementById('sendcun');
    if (sP.addEventListener) {
      sP.addEventListener('click', sendphone, false)
    }else {
      sP.attachEvent('onclick', sendphone, false)
    }
    var bS = document.getElementById('loginuser');
    if (bS.addEventListener) {
      bS.addEventListener('click', login_user, false);
    } else {
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
        var A = window.open(js_api_config.wwhost+ "/sina_login?h=" + h, "TencentLogin", "width=450,height=320,menubar=0,scrollbars=1,resizable=1,status=1,titlebar=0,toolbar=0,location=1");
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
        var A = window.open(js_api_config.wwhost+"/qq_login?h=" + h, "TencentLogin", "width=450,height=320,menubar=0,scrollbars=1,resizable=1,status=1,titlebar=0,toolbar=0,location=1");
      }
    })
    // 注册
    var sP = document.getElementById('sendcun_reg');
    if (sP.addEventListener) {
      sP.addEventListener('click', sendphone_reg, false)
    }else {
      sP.attachEvent('onclick', sendphone_reg, false)
    }
    var bS = document.getElementById('loginuser_reg');
    if (bS.addEventListener) {
      bS.addEventListener('click', login_user_reg, false);
    } else {
      bS.attachEvent('onclick', login_user_reg, false);
    }
    $('#weibo_reg').on('click', function () {
      var h = window.location.href;//获取全部的url
      var hh = h.split("?");
      if (hh[1] !== undefined) {
        var str = hh[1].substr(1);
        var strs = str.split("=");
        var A = window.open(js_api_config.wwhost+ "/sina_login?h=" + strs[1], "TencentLogin", "width=450,height=320,menubar=0,scrollbars=1,resizable=1,status=1,titlebar=0,toolbar=0,location=1");
      } else {
        var A = window.open(js_api_config.wwhost+ "/sina_login?h=" + h, "TencentLogin", "width=450,height=320,menubar=0,scrollbars=1,resizable=1,status=1,titlebar=0,toolbar=0,location=1");
      }
    })
    $('#qq_reg').on('click', function () {
    //以下为按钮点击事件的逻辑。注意这里要重新打开窗口
    //否则后面跳转到QQ登录，授权页面时会直接缩小当前浏览器的窗口，而不是打开新窗口
      var h = window.location.href;//获取全部的url
      var hh = h.split("?");
      if (hh[1] !== undefined) {
        var str = hh[1].substr(1);
        var strs = str.split("=");
        var A = window.open(js_api_config.wwhost+"/qq_login?h=" + strs[1], "TencentLogin", "width=695,height=475,menubar=0,scrollbars=1,resizable=1,status=1,titlebar=0,toolbar=0,location=1");
      } else {
        var A = window.open(js_api_config.wwhost+"/qq_login?h=" + h, "TencentLogin", "width=450,height=320,menubar=0,scrollbars=1,resizable=1,status=1,titlebar=0,toolbar=0,location=1");
      }
    })
    
  })
  var portname;
  var hostname = window.location.hostname;
  portname = 'http://'+ window.location.hostname;
  if (hostname == 'www.jjl.cn') {
    if (js_api_config.version == 'development') {
      portname += ':4000'
    }
  }
  else if (hostname == 'yimin.jjl.cn') {
    if (js_api_config.version == 'development') {
      portname += ':4600'
    }
  }

  function showcode () {
    $.ajax({
      url:"/param_code?time="+new Date().getTime(),
      type: "get",
      success: function(result){
        // $('#param_code').html(result)
        $("#param_code")[0].innerHTML = result;
      },
      error:function(XMLHttpRequest, textStatus, errorThrown){
        console.log("获取失败，请重试！CODE:"+XMLHttpRequest.status)
      }
    });
  }

  var layeropen;
  function getlogin () {

        layeropen = layer.open({
	            type: 1,
	            shade: [0.4,'#000'],
	            shadeClose: true,
	            closeBtn: true,
	            area: ['421px', '500px'],
	            title: false,
	            border: [0],
	            bgcolor: "#fff",
	            scrollbar : false,
	            content: $('#l_u'),
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
  function getregister () {

    layeropen = layer.open({
          type: 1,
          shade: [0.4,'#000'],
          shadeClose: true,
          closeBtn: true,
          area: ['421px', '487px'],
          title: false,
          border: [0],
          bgcolor: "#fff",
          scrollbar : false,
          content: $('#r_u'),
          success : function(){
            
          },
          cancel:function(){
            $("#phone_reg").parent().removeClass("has-error").addClass("has-success");
            $("#phone_reg").popover("destroy");
          },
          end:function() {
            $("#phone_reg").parent().removeClass("has-error").addClass("has-success");
            $("#phone_reg").popover("destroy");
          }
    });
  }

  function getloginUser () {
    var h = window.location.href;
    console.log('h', h);
    var hh = h.split("/");
    console.log('hh[1]', hh[3]);
    var hhh = h.split("?");
    console.log('hhh', hhh[1])
    if (hh[3] != 'register' && hh[3] != 'forget' && hh[3] != 'login' && hh[3] != 'loginUser' && hh[3] != 'login?h=http:' && hh[3] != 'loginUser?h=http:') {
      console.log('11111')
//      window.location.href = '/login?h=' + h
      // window.open('/loginUser?h=' + h);
      window.open(fn.urlgen("loginUser")+'?h='+h);
    } else if (hhh[1] != undefined && hh[3] != 'register' && hh[3] != 'forget' && hh[3] != 'login' && hh[3] != 'loginUser') {
      console.log('aaaa')
      window.location.reload();
    } else {
      console.log('22222');
//      window.location.href = '/login'
      // window.open('/loginUser?h=');
      window.open(fn.urlgen('loginUser')+'?h=');
    }
  }
  //登录发送验证码
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
    if ($('#tupian').val() == '') {
      layer.msg('请输入图片验证码');
      return
    }
    if (!/^[a-zA-Z0-9]{4}$/.test($("#tupian").val())) {
      layer.msg('请输入4位图片验证码');
      return
    }
    console.log('tupian',$('#tupian').val().toLowerCase())
    $.ajax({
//          url: 'http://192.168.100.77/api/sendcode/' + $('#phone').val(),
//    url: 'http://www.51daxuetong.cn/api/sendcode/' + $('#phone').val(),
//      url: ajaxUrlPrefix.ucapi + '/api/index.php?m=sendcode&phone=' + $('#newEmail').val(),
//      url: ajaxUrlPrefix.porthost+'/sendcode_s',
      url: '/sendcode_s',
      type:'post',
      data: {
        param_code: $('#tupian').val().toLowerCase(),
        phone: $('#phone').val()
      },
      dataType: 'json',
      withCredentials:true,
      success:function(msg){
        console.log('msg', msg);
        if (msg.code === 0) {
          layer.msg('短信发送成功，请查阅手机');
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
        } else if (msg == '1') {
          layer.msg('图片验证码输入错误');
        } else if (msg.code === '1150013') {
          layer.msg(msg.message);
        }else {
          layer.msg('数据错误');
        }
      },
      error:function(XMLHttpRequest, textStatus, errorThrown){
        console.log("获取失败，请重试！CODE:"+XMLHttpRequest.status);
        layer.msg("获取失败，请重试！CODE:"+XMLHttpRequest.status);
      }
    });
    
  }
  //登录
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
    console.log('checkbox',$("#guwen input[type='checkbox']").is(':checked'))
    if (!$("#guwen input[type='checkbox']").is(':checked')) {
      layer.msg('请同意注册协议');
      return
    }
    $.ajax({
      url: portname+'/login_user',
      type: 'POST',
      dataType:'json',
      data: {
        phone: $('#phone').val(),
        code: $('#verify').val(),
      },
      success:function(msg) {
        console.log('aaaaaa');
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
  var login_info = JSON.parse($.cookie('login_ss'));
  var h = window.location.href;
    console.log('h', h);
    var hh = h.split("/");
    console.log('hh[1]', hh[3]);
    var hhh = h.split("?");
    console.log('hhh', hhh[1])
    $.ajax({
      url: portname+'/login_out',
      type: 'GET',
      dataType:'jsonp',
      jsonpCallback:'cb',
      success:function(msg){
        if (msg == '0') {
          console.log('登出')
          if (hh[3] == 'forget' && hh[3] == 'login' && hh[3] == 'loginUser' || hh[3] == undefined || hh[3] == '' || hh[4] == '' || hh[4] == undefined || hh[4] == 'article' || hh[4] == 'case' || hh[4] == 'album' || hh[4] == 'hot') {
            window.location.reload();
          }else if (login_info.usertype == 1) {
            console.log('1')
            window.location.href = '/loginUser'
            // window.open('/loginUser');
          }else {
            console.log('2')
            window.location.href = '/login'
            // window.open('/login');
          }
          // window.location.reload();
        }
      },
      error:function(XMLHttpRequest, textStatus, errorThrown){
        console.log("获取失败，请重试！CODE:"+XMLHttpRequest.status)
      }
    })
  }

  //注册验证码
  function sendphone_reg () {
    if ($('#phone_reg').val() === '') {
//            let butp = document.getElementById('phone')
      $('#phone_reg').parent().addClass("has-error").removeClass("has-success");
      $('#phone_reg').data("toogle", "left").data("placement", "right").data("container", "body").data("content", '请输入手机号码').popover({"trigger":"manual"}).popover("show");
      return
    }
    if (!/^1[3|4|5|7|8]\d{9}$/.test($("#phone_reg").val())) {
//            let butp = document.getElementById('phone')
      $('#phone_reg').parent().addClass("has-error").removeClass("has-success");
      $('#phone_reg').data("toogle", "left").data("placement", "right").data("container", "body").data("content", '请输入正确手机号码').popover({"trigger":"manual"}).popover("show");
      return
    }
    $.ajax({
//          url: 'http://192.168.100.77/api/sendcode/' + $('#phone').val(),
//    url: 'http://www.51daxuetong.cn/api/sendcode/' + $('#phone').val(),
//      url: ajaxUrlPrefix.ucapi + '/api/index.php?m=sendcode&phone=' + $('#newEmail').val(),
      url: '/sendcode_s',
      type:'GET',
      data: {
        phone: $('#phone_reg').val()
      },
      dataType: 'json',
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
        $("#sendcun_reg").attr("value", "发送验证码");
        $("#sendcun_reg").removeAttr("disabled");
        clearInterval(time);
        return
      }else {
        $("#sendcun_reg").attr("disabled", "disabled");
        $("#sendcun_reg").attr("value", downcount + "s");
        downcount--;
      }
    }, 1000);
  }
  //注册
  function login_user_reg () {
    if ($('#phone_reg').val() === '') {
//            let butp = document.getElementById('phone')
      $('#phone_reg').parent().addClass("has-error").removeClass("has-success");
      $('#phone_reg').data("toogle", "left").data("placement", "right").data("container", "body").data("content", '请输入手机号码').popover({"trigger":"manual"}).popover("show");
      return
    }
    if (!/^1[3|4|5|7|8]\d{9}$/.test($("#phone_reg").val())) {
//            let butp = document.getElementById('phone')
      $('#phone_reg').parent().addClass("has-error").removeClass("has-success");
      $('#phone_reg').data("toogle", "left").data("placement", "right").data("container", "body").data("content", '请输入正确手机号码').popover({"trigger":"manual"}).popover("show");
      return
    }
    if ($('#verify_reg').val() === '') {
      layer.msg('请输入手机验证码');
      return
    }
    if (!$("#guwen_reg input[type='checkbox']").is(':checked')) {
      layer.msg('请同意注册协议');
      return
    }
    $.ajax({
      url: '/login_user',
      type:'POST',
      dataType: 'json',
      withCredentials:true,
      data: {
        phone: $('#phone_reg').val(),
        code: $('#verify_reg').val(),
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