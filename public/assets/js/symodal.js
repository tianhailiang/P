$(function () {
	// $(".close-btn").fadeIn()
	//首页弹层
	if(!cookie('mask_tag')){
		//$(".dialog-modal").fadeIn()
	}
	$("body").on('click',function (e) {e.stopPropagation()})
	
	$(".modal-content .close").on('click',function () {
		cookie('mask_tag',1);
		$(".dialog-modal").fadeOut()
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
	// $(".select").on('click',function(){
	//   if(!$(this).hasClass('selecttoggle')){
	// 	 $(this).addClass('selecttoggle')
	// 	 $(this).find(".contry-list").show()
	//   } else {
	// 	 $(this).removeClass('selecttoggle')
	// 	 $(this).find(".contry-list").hide()
	//   }
	// })
	//选择具体国家列表项
	// $(".contry-list li:nth-child(6n)").css('margin-right','0')
	// $(".contry-list li").on('click',function(){
	//   $(".contry-list li").removeClass('contry-active')
	//   	$(this).addClass('contry-active')
	// 	$(".select").find('em').text($(this).text())
	// 	$(".select").find('em').attr('data-id',$(this).attr('data-id'));
	// })
	//提交表单信息
	// $("#handelSub").on('click',function (e) {
	// 	e.preventDefault()
	// 	cookie('mask_tag',1);
	// 	getGift(this)
	// 	$(".close-btn").fadeIn()
	// })

	//关闭弹窗按钮
	// $(".close-btn").on('click',function () {
	// 	$(this).fadeOut()
	// 	$(".dialog-modal").fadeIn()
	// })
});

