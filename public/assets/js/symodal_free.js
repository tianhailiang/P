$(function () {
	//首页弹层
	if(!cookie('mask_tag')){
		$(".dialog-modal").fadeIn()
	}
	$("body").on('click',function (e) {e.stopPropagation()})
	
	$(".modal-content .close").on('click',function () {
		cookie('mask_tag',1);
		$(".dialog-modal").fadeOut(150)
	})
	//51家分公司鼠标悬停效果
	var timers = null
	var timer;
	$(".branch_company_img").on('mouseover',function () {
	  clearTimeout(timers)
	  $(this).next(".branch_company_text").animate({
		 width:"1010px",
		 left:"190px"
	  },200)
	}).mouseout(function () {
	  var _this = $(this)
	  timers = setTimeout(function () {
		 _this.next(".branch_company_text").animate({
			width:"190px",
			left:0
		 },200)
	  },300)
	});
	$(".branch_company_text").on('mouseover',function(){
		 clearTimeout(timers)
	}).mouseout(function () {
	  var _this = $(this)
	  timers = setTimeout(function () {
		 _this.animate({
			width:"190px",
			left:0
		 },200)
	  },300)
	});
	//选择国家菜单
	$(".select").on('click',function(){
	  if(!$(this).hasClass('selecttoggle')){
		 $(this).addClass('selecttoggle')
		 $(this).find(".contry-list").show()
	  } else {
		 $(this).removeClass('selecttoggle')
		 $(this).find(".contry-list").hide()
		//  $(".contry-list li").removeClass('contry-active')
		//  $(".contry-list li").eq(0).addClass('contry-active')
	  }
	})
	//选择具体国家列表项
	$(".contry-list li:nth-child(6n)").css('margin-right','0')
	$(".contry-list li").on('click',function(){
	  $(".contry-list li").removeClass('contry-active')
	  	$(this).addClass('contry-active')
		$(".select").find('em').text($(this).text())
		$(".select").find('em').attr('data-id',$(this).attr('data-id'));
	})
	//提交表单信息
	$("#handelSub").on('click',function (e) {
		e.preventDefault()
		getGift()
	})
	//点击获取验证码
	$('.send-code').on('click',getCode);
	function countDown() {
    // 60s倒计时
    $(".send-code").unbind("click");
    var countDownTime = 60;
    timer = window.setInterval(function () {
      countDownTime--;
      $(".send-code").html('（'+countDownTime+'）s');
      if (countDownTime <= 0) {
        clearInterval(timer);
        $(".send-code").html('点击发送验证码');
        $(".send-code").bind("click",getCode);
      }
    }, 1000);
	}
	function getCode(){
    if(!/^1\d{10}$/.test($.trim($('.iphone').val()))){
      $(".error").show()
      return false;
    } else {
      $(".error").hide()
    }
		$('.send-code').unbind('click')
    $.ajax({
      url:'/sendSms',
      type:'get',
      data:{
        param_code:$(this).attr('data-coupon'),
        phone:$.trim($('.iphone').val())
      },
      dataType:'json',
      success:function(msg){
        if(msg.code == 0){
          countDown();
        } else {
          layer.msg(msg.massage);
          $('.send-code').bind('click',getCode);
        }
      },
      error:function(XMLHttpRequest, textStatus, errorThrown){
        $('.send-code').bind('click',getCode);
      }
    })
	}
	function getGift(){
		//点击领取
		var actName = $.trim($('#myname').val());
		var phone = $.trim($(".iphone").val());
		var country = $('.select em').attr('data-id');
		// var code = $.trim($('.pass-code').val());
		if(actName== ''){
      layer.msg('请输入姓名');
      return false;
		}
		if(!/^1\d{10}$/.test(phone)){
      $(".error").show()
      return false;
		} else{
			$(".error").hide()
		}
		if(country == ''){
			layer.msg('请选择意向国家');
			return false;
		}
		// if(code == ''){
		// 	layer.msg('请输入验证码');
		// 	return false;
		// }
		var h = cookie('referweb'); // 获取来源url
		var grUserId = cookie('gr_user_id');
		var that = this;
		$(this).unbind('click');
		$.ajax({
      url: ajaxUrlPrefix.nodeapi + '/cmsapi/assessment',
      type: 'get',
      data: {
        name: actName,
        phone: phone,
				country: country,
				city: cookie('currentarea') || 1,
				source: h,
				relationId: 21,
        grUserId: grUserId
      },
			dataType:'json',
			success:function(msg){
        $(that).bind('click',getGift);
        if(msg.code === 0){
          layer.msg('发送成功');
          $('#myname').val('')
          $(".iphone").val('')
          $(".select").find('em').text('请选择意向国家')
          $(".select").find('em').attr('data-id','')
          // $(".pass-code").val('')
          // clearInterval(timer)
          // $(".send-code").html('点击发送验证码');
					$(".dialog-modal").fadeOut()
					cookie('mask_tag',1)
        } else {
          layer.msg(msg.message);
        }
      },
      error:function(XMLHttpRequest, textStatus, errorThrown){
        $(that).bind('click',getGift);
      }
		})
	}
})
