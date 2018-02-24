$.js = {
	init:function(){
		this.autoSize();
		this.initUI();
	},
	alert:function(msg, callback){
		$.jBox.alert(msg, "提示", {closed:function(){
			if(callback){
				callback();
			}
		}});
	},
	confirm:function(msg, callback){
		$.jBox.confirm(msg, "提示", function(v, h, f){
		    if(callback){
		    	callback(v);
		    }
		}, { buttons: {"确定": true, "取消": false} });
	},
	messager:function(msg, options){
		$.jBox(msg,  $.extend({title:"提示"},options||{}));
	},
	focus:function(targets, flag, flag2){
		function initTarget(target){
			if($(target).val() == "" || $(target).val() == $(target).attr("rel")){
				$(target).css("color", "#999999");
				$(target).val($(target).attr("rel"));
			}
		}
		$(targets).each(function(){
			var target = $(this);
			if(flag == true){
				target.val("");
			}
			initTarget(target);
			target.focus(function(){
				if(flag2 == true){
					$.js.hideSinglePop();
				}
				$(this).css("color", "#000000");
				if($(this).val() == $(this).attr("rel")){
					$(this).val("");
				}
			}).blur(function(){
				initTarget($(this));
			});
		});
		
	},
	initUI:function(){
		$(".exit").hover(function(){
			$(this).addClass("selected");
		}, function(){
			$(this).removeClass("selected");
		});
		
		$(".send-button .s1").hover(function(){
			$(this).parent().addClass("send-hover");
		}, function(){
			$(this).parent().removeClass("send-hover");
		});
		$(".send-button .s2").hover(function(){
			$(this).parent().addClass("send-type-hover");
		}, function(){
			$(this).parent().removeClass("send-type-hover");
		}).click(function(){
			$.js.hideSinglePop();
			if($(".send-type").is(":hidden")){
				$(".send-type").show();
			}else{
				$(".send-type").hide();
			}
		});
		
		$(".leaveField .commit, .leaveField .reset").hover(function(){
			$(this).addClass("hover");
		}, function(){
			$(this).removeClass("hover");
		});
		
		this.initToolbars();
		this.initFocus();
		
	},
	initFocus:function(flag){
		this.focus($("#message"), flag, true);
		this.focus($("#evalTxt"), false, false);
		this.focus("#context", flag);
		this.focus($("input[type=text]"), flag);
	},
	showPop:function(type){
		$.js.hideSinglePop();
		$(".ope .pop").show();
		$(".ope .pop").find("div").hide();
		$(".ope ."+type).show();
	},
	initToolbars:function(){
		$(".ope .btn .face").click(function(){
			$.js.showPop("face");
		});
		$(".ope .btn .file").click(function(){
			$.js.showPop("file");
		});
		$(".ope .btn .eval").click(function(){
			$.js.showOpinion();
		});
		$(".ope .eval .close").click(function(){
			$.js.hideSinglePop();
		});
	},
	showOpinion:function(){
		$.js.showPop("eval");
	},
	hideSinglePop:function(){
		$(".single-pop").hide();
	},
	autoSize:function(){
		auto();
		function auto(){
			var _wW = $(window).width(),
				_wH = $(window).height(),
				_talkBox = $(".talkBox"),
				_talkCon = $(".talkCon"),
				_record = $(".record"),
				_floatBar = $(".floatBar"),
				_inputText = $(".input textarea");
				textWidth = 180;
			if(_wW<=600){
				//_talkBox.css("width", "600px");
				//_talkCon.css("width", "400px");
				//_inputText.css("width", "280px");
			}else{
				//_talkBox.css("width",(_wW-6)+"px");
				//_talkCon.css({"width":(_wW-206)+"px"});
				//_inputText.css("width", (_wW-206-120)+"px");
				//textWidth = _wW-380;
			}
			if($("body").hasClass("leaveMsg")){
				_record.css("height",(_wH-299)+"px");
				$("textarea").css("width", textWidth+"px");
				$("input[type=text]").css("width", textWidth+"px");
				$("input:not([type=text])").css("border","0px");
				_record.css("overflow-x", "hidden");
				var padding = (_wH-440)/9;
				if(padding < 3){
					padding = 3;
				}
				$(".leaveField").css({"margin-top":padding+"px","padding-bottom":padding+"px"});
			}else{
				// _record.css("height",(_wH-316)+"px");//
			}
			_floatBar.css("height", (_wH-94)+"px");
		}
		$(window).resize(function(){
			auto();
			window.setTimeout(auto, 500);
		});
		window.setTimeout(auto, 500);
	}
};
$(function(){
	$.js.init();
});
