

(function(){
		
		var $subblock = $(".subpage"), $head=$subblock.find('h2'), $ul = $("#proinfo"), $lis = $ul.find("li"), inter=false;
		
		
		$lis.hover(function(){
			if(!$(this).hasClass('nochild')){
				$(this).addClass("prosahover");
				$(this).find(".prosmore").removeClass('hide')	
				
			}
		},function(){
			if(!$(this).hasClass('nochild')){
				if($(this).hasClass("prosahover")){
					$(this).removeClass("prosahover");
				}
				$(this).find(".prosmore").addClass('hide');
			}
		});
		
	})();
	  $(".counsellor-right dl").on("mouseover",function(){
          var stt =$(this).find('.gggg img').attr('src');
	    $("#counsellorss").find('img').attr('src',stt)
	    var scc=$(this).find('span').html();
	    $("#counselloring").html(scc);
	    var sdd=$(this).find('#hhhh').html();
	    $("#counsellortion").html(sdd);
	   })
	  
//	  $(".counsellor-right dl").on("mouseout",function(){
//	  
//	    $("#counsellorss").find('img').attr('src','../img/dede_03.gif')
//	    $("#counselloring").html('<strong>haha</strong> 擅长国家:美国');
//	    $("#counsellortion").html('个人简介：时代参加考试南昌南昌困难按摩床没事了票面上传了吗安排美联储');
//	   })
//duxiaoli('btn-xlbtn', 'show-xl');


$(function(){
	$("#btn-xlbtn li").click(function(){
			$("#onename").html($(this).find("a").html());
            $("#show-xl li").hide();
			$("#show-xl li").eq($(this).index()).show();
	});
})
  function duxiaoli(id, id1) {

  	this.aBtn = document.getElementById(id).children;
  	this.aShow = document.getElementById(id1).children;
  	var that = this;
  	var onename = document.getElementById("onename");
  	for(var i = 0; i < this.aBtn.length; i++) {
  		this.aBtn[i].index = i;
  		this.aBtn[i].onclick = function() {
  			
  			that.haha(this.index);
  			onename.innerHTML = this.innerHTML;
  			
  		}
  	}
  	duxiaoli.prototype.haha = function(index) {
  		for(var j = 0; j < this.aBtn.length; j++) {
  			
  			this.aBtn[j].className = '';
  			this.aShow[j].style.display = 'none';
  		}
  		this.aBtn[index].className = 'active'
  		this.aShow[index].style.display = 'block'
  	}
  }
   $("#show-xl li dl").on("mouseover",function(){
	    var dlcc=$(this).find('span').html();
	    $("#bu-cc").html(dlcc);
	    var dldd=$(this).find('div i').html();
	    $("#bu-dd").html(dldd);
	    var dlee=$(this).find('div img').attr('src');
	    $("#bu-aa").find('img').attr('src',dlee)
	    var dlbb=$(this).find('div p').html()
	    $("#bu-bb").html(dlbb)
	   })
	  
//	  $("#show-xl li dl").on("mouseout",function(){
//	    $("#bu-cc").html('<strong></strong> 擅长国家:美国');
//	    $("#bu-aa").find('img').attr('src','../img/dede_03.gif')
//	    $("#bu-dd").html('何琛(研究生咨询)');
//	     $("#bu-bb").html('个人简介：时代参加考试南昌南昌困难按摩床没事了票面上传了吗安排美联储爬虫数量确实上传 上传了市场那你说内存卡空心菜')
//	   })
	  $(".select-xuxun").on("click","li",function(){
	  	 var submt=$(this).html();
	  	 $("#btn-submits").html(submt)
	  });
    
  
