$(function () {
	$(".close-btn").fadeIn()
	//首页弹层
	if(!cookie('mask_tag')){
		$(".dialog-modal").fadeIn()
	}
	$("body").on('click',function (e) {e.stopPropagation()})
	
	$(".modal-content .close").on('click',function () {
		cookie('mask_tag',1);
		$(".dialog-modal").fadeOut()
		$(".close-btn").fadeIn()
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
		cookie('mask_tag',1);
		getGift(this)
		$(".close-btn").fadeIn()
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
				// alert('请输入正确的手机号格式');
				$(".error").show()
				return false;
			} else {
				$(".error").hide()
			}
			$('.send-code').unbind('click')
			$.ajax({
					url:'/sendcode_s_coupon',
					type:'post',
					data:{
						phone:$.trim($('.iphone').val())
					},
					dataType:'json',
					success:function(msg){
							console.log(msg)
							if(msg.code == 0){
								countDown();
							} else {
								layer.msg(msg.message);
								$('.send-code').bind('click',getCode);
							}
					},
					error:function(XMLHttpRequest, textStatus, errorThrown){
							console.log("获取失败，请重试！CODE:"+XMLHttpRequest.status)
							$('.send-code').bind('click',getCode);
					}
			});
	};
	function getGift(obj){
		//点击领取
		var actName = $.trim($('#myname').val());
		var phone = $.trim($(".iphone").val());
		var country = $('.select em').attr('data-id');
		var code = $.trim($('.pass-code').val());
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
		if(code == ''){
			layer.msg('请输入验证码');
				return false;
		}
		var that = obj;
		var h = window.location.href;
        var hh = h.split("?");
        var sou = [];
        if (hh[1]) {
                var hhh = hh[1].split("&");
                for (var i = 0;i < hhh.length;i++) {
                    if (hhh[i].split("cmpid=")[1] != null) {
                        sou = hhh[i].split("cmpid=")
                        console.log('sou',sou)
                    }
                }
        }
		$(obj).unbind('click');
		$.ajax({
				url: '/getCoupons',
				type: 'get',
				data: {
						user_name: actName,
						mobile: phone,
						country_id: country,
						code:code,
						source: sou[1]
				},
				dataType:'json',
				success:function(msg){
						console.log(msg)
						$(that).bind('click',getGift);
						if(msg.code === 0){
							layer.msg('优惠码发送成功');
							$('#myname').val('')
							$(".iphone").val('')
							$(".select").find('em').text('请选择意向国家')
							$(".select").find('em').attr('data-id','')
							$(".pass-code").val('')
							clearInterval(timer)
							$(".send-code").html('点击发送验证码');
							$(".dialog-modal").fadeOut()
						} else {
							layer.msg(msg.massage);
						}
				},
				error:function(XMLHttpRequest, textStatus, errorThrown){
						console.log("获取失败，请重试！CODE:"+XMLHttpRequest.status);
						$(that).bind('click',getGift);
				}
		})
	}
	//关闭弹窗按钮
	$(".close-btn").on('click',function () {
		$(this).fadeOut()
		$(".dialog-modal").fadeIn()
	})
});

