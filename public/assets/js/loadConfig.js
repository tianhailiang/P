

	var JESONG_MESSAGE_TEXT = {"msgOfConnected":"","waitText":"对不起，目前在线客服繁忙，您前面有{queueIndex}位客户等待。","msgOfDisConnected":"感谢您的咨询， 再见！","welcomeMsgOfConnected":"行业内首部国家标准《留学服务术语》、《留学中介服务规范》由金吉列留学起草，由中华人民共和国国家质量监督检验检疫总局和中国国家标准化管理委员会已正式颁发！金吉列留学18周年庆、第52届海外院校全国招生面试会盛大开幕！咨询热线：400-010-8000","replyMsgAtConnected":"您好，我是金吉列留学顾问，很高兴为您解答疑问，为了更好的跟踪服务效果，请在对话结束后对我的服务满意度进行评价。\n","robotIntroduce":"您好，请问您有什么想要了解的吗？","robotNoAnswer":"额，这个问题不在我的知识范围内，请您稍后联系人工客服吧，那里应该会有您想要的答案。","ReplyMsgOfCustToVisitor":"已经很久没有收到您的消息了，请问您还在电脑前吗？如果没有其他的问题我将主动关闭该对话。随时欢迎您再次向我咨询，祝您今天好心情。","ChatAutoCloseMsg":"因长时间未对话，系统将自动关闭该对话，欢迎您下次光临！","sayHello":"","msgOfTrans":"您的对话将被转移给我的同事， 感谢您的咨询！"};
	var phoneInputTop = 0;
	var useInPhone = 0;
	var phoneChatPop = 1;
	var tel = "";
	var showLeaveMsg = 1;
	var showRebot = 1;
	var siteId = 0;
	var welcomeMsgOfConnected = JESONG_MESSAGE_TEXT.welcomeMsgOfConnected;
	var replyMsgAtConnected = JESONG_MESSAGE_TEXT.replyMsgAtConnected;
	var msgOfConnected = JESONG_MESSAGE_TEXT.msgOfConnected;
	var msgOfDisConnected = JESONG_MESSAGE_TEXT.msgOfDisConnected;
	var msgOfTrans = JESONG_MESSAGE_TEXT.msgOfTrans;
	
	var CycleTimeOfToVisitorMsg = 30;
	var ChatAutoCloseTime = 600;
	var TimesOfToVisitorMsg = 2 - 1;
	
	var ChatAutoCloseMsg = JESONG_MESSAGE_TEXT.ChatAutoCloseMsg;
	var ReplyMsgOfCustToVisitor = JESONG_MESSAGE_TEXT.ReplyMsgOfCustToVisitor;
				
	var ChatBoxHeadImg= './images/logo.png';
	var ChatBoxLeftSmallImg = 'http://old.jjl.cn/images/bj150511.jpg';
	var ChatBoxLeftLargeImg = './images/ad2.png';
	var ChatBoxHeadImgUrl='http://www.jjl.cn';
	var ChatBoxLeftSmallImgUrl='http://www.jjl.cn/zt/2015/zonghe/20150908_qx/default.shtml';
	var ChatBoxLeftLargeImgUrl='http://www.jjl.cn';
	var sayHello = JESONG_MESSAGE_TEXT.sayHello;
	var waitText = JESONG_MESSAGE_TEXT.waitText;
	var customerCardImg = '';
	var customerCardLink = '';		
	var inputText='1';	
	var callerOpinion='1';	
	var showSmsOnChat=false;
	var showPhoneOnChat=false;
	var showSaveRecordOnChat=true;	
	var showRobot = true;
	var PhoneMsg = '0';

	var useRobot = true;
	var robotIntroduce = JESONG_MESSAGE_TEXT.robotIntroduce;
	var robotNoAnswer = JESONG_MESSAGE_TEXT.robotNoAnswer;
	
	var authType='0';
	
	var lookOut='null';
	var user='null';
	var pass='null';
	
	
	var ad1ImageURL = 'http://old.jjl.cn/images/bj150511.jpg';
	
	var qcCodeImgURL = '';
	
	var ad4ImageURL = '';
	var ad4ImageLink = './images/ad1.png';
	
	var custFontCss = "font-family:宋体;font-size:12px;color:#0000ff;";
	
	var vistFontCss = "font-family:宋体;font-size:12px;color:#ff0000;";
	
	
	
	
	
	
	
	
	
	
	
	
	document.write('<style>.vstText{'+vistFontCss+'} .svcText{'+custFontCss+'}</style>');
	
	$(function(){
		$('.logo').css('background','url(./images/logos.png) no-repeat left center');
		$('.logo').parent().attr('href', 'http://www.jjl.cn');
		
		if($('body').hasClass('rebot') || $('body').hasClass('leaveMsg') || $('body').hasClass('groupChat') || $('.floatBar div').length == 0){
			$('.floatBar').empty().html('<div class="ad1"><a href="#" target="_blank"><img></img></a></div>');
			$('.floatBar .ad1 a').attr('href', 'http://www.jjl.cn/zt/2015/zonghe/20150908_qx/default.shtml');
			$('.floatBar .ad1 a img').attr('src', 'http://old.jjl.cn/images/bj150511.jpg');
		}else{
			$('.floatBar .ad2 a').attr('href', 'http://www.jjl.cn');
			$('.floatBar .ad2 a img').attr('src', './images/ad2.png');
			
			if(ad4ImageURL != ""){
				$('.floatBar .text, .floatBar .qccode').hide();
				$('.floatBar .ad4').show();
				$('<img></img>').appendTo($('.floatBar .ad4 a')).attr('src', ad4ImageURL);
				$('.floatBar .ad4 a').attr('href', './images/ad1.png');
			}else{
				$('.floatBar .ad4').hide();
				$('.floatBar .text, .floatBar .qccode').show();
				/*if(qcCodeImgURL != ''){
					$('<img></img>').appendTo($('.floatBar .qccode')).attr('src', qcCodeImgURL);
				}else{
					$('.floatBar .qccode').hide();
				}*/
			}
		}
		
		
		
		/*$('.ad2 a').attr('href', 'http://www.jjl.cn');
		$('.ad2 img').attr('src', './images/ad2.png');
		
		$('.ad3 a').attr('href', 'http://www.jjl.cn');
		$('.ad3 img').attr('src', './images/ad2.png');
		
		$('.ad4 a').attr('href', './images/ad1.png');
		$('.ad4 img').attr('src', '');
		
		$('.ad5 a').attr('href', './images/ad3.gif');
		$('.ad5 img').attr('src', './images/ad3.gif');
		
		$('.ad6 a').attr('href', './images/ad3.gif');
		$('.ad6 img').attr('src', './images/ad3.gif');
		*/
		$(".chat-min").addClass("s0");
		
		
		 
		 
		  		$(".bottom_logo").html("易聊通软件");
		  
		  
		 document.title = "在线客服";
		 $(".main .header .title").html("在线客服");
	});
