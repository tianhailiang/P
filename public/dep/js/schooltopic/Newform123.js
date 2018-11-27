(function(){
	// top
	$("#submitId").click(function(){		
		var username = $.trim($("#username").val()); //decodeURI();
		var sex = "";
		var tel = $.trim($("#tel").val());
		var email = $.trim($("#email").val());
		var birthday = $.trim($("#birthday").val());
		var city = getCookie('currentarea');
		var country = $.trim($("#city").val());
		var shenfen = "";
		var firstCountry = $.trim($("#firstCountry").val());
		var secondCountry = $.trim($("#secondCountry").val());
		var activityTitle = $.trim($("#activityTitle").val());	
		var fromUrl = window.location.href;
		var company = $.trim($("#company").val());

		var year = $.trim($("#year").val());
		var month = $.trim($("#month").val());
		var days = $.trim($("#days").val());
		var school = $.trim($("#school").val());
		var shenfen = String($.trim($("#specialty").val())); 
		
		var sexs = document.getElementsByName("sex");
		for(var i=0; i<sexs.length; i++){
			if(sexs[i].checked){
				sex = String([i].value);
				break;
			}
		}
		var shenfens = document.getElementsByName("shenfen");
		for(var i=0; i<shenfens.length; i++){
			if(shenfens[i].checked){
				shenfen = String(shenfens[i].value);
				break;
			}
		}

		if(isNull(username)){
			alert("请正确填写您的姓名，谢谢！");
			return false;
		}
		if(!isTel(tel)){
			alert("请正确填写您的手机号，谢谢！");
			return false;
		}
		if(isNull(city)){
			alert("请选择您的所在城市，谢谢！");
			return false;
		}

		var subData = {name:username,sex:sex,phone:tel,email:email,birthday:birthday,city:city,country:country,shenfen:shenfen,firstCountry:firstCountry,secondCountry:secondCountry,company:company,source:fromUrl,activityTitle:activityTitle,relationId:18};
		$.ajax({
			type:"get",
			data:subData,
			url:ajaxUrlPrefix.nodeapi + '/cmsapi/assessment',
			dataType:'json',
			success : function(backData){
				alert("您已报名成功！");
			},
			error:function(){
				alert("您已报名成功！");
			}
		});
		return false;
	});

})();


function isNull(value) {
	if(value==null || value=='') {
		return true;
	} else {
		return false;
	}	
}

function isTel(value) {	
	var regStr = /^[\+]?((\d){0,3}[-])?(1[345789](\d){9})$/;
	return regStr.test(value);
}

function isEmail(value) { 
	//  /^(\w-*\.*)+@(\w-?)+(\.\w{2,})$/;
	//   /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/;
   var reg = /^([\w]+)([a-zA-Z0-9_-]+)@([a-zA-Z0-9_-]+)((.[a-zA-Z0-9_-]{2,3}){1,2})$/;
   return reg.test(value);   
}

function checkInput (value) {
	var reg = /^[A-Za-z0-9_\u4e00-\u9fa5]{1,20}$/;
	return reg.test(value);
}
