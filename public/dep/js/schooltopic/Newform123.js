(function(){
	// top
	var top = true;
	$("#submitId").click(function(){		
		var username = $.trim($("#username").val()); //decodeURI();
		var sex = "";
		var tel = $.trim($("#tel").val());
		var email = $.trim($("#email").val());
		var birthday = $.trim($("#birthday").val());
		if (!document.getElementById('city-bottom')) {
			var city = getCookie('currentarea');
		} else {
			var city = $.trim($("#city-bottom").val());
			if (isNull(city)) {
				alert("请选择您的所在城市，谢谢！");
				return false;
			}
		}
		var country = $.trim($("#city").val());
		var shenfen = "";
		var firstCountry = $.trim($("#firstCountry").val());
		var secondCountry = $.trim($("#secondCountry").val());
		var activityTitle = $.trim($("#activityTitle").val());	
		// var fromUrl = window.location.href;
		var company = $.trim($("#company").val());

		var year = $.trim($("#year").val());
		var month = $.trim($("#month").val());
		var days = $.trim($("#days").val());
		var school = $.trim($("#school").val());
		var shenfen = String($.trim($("#specialty").val())); 
		var relationId = $.trim($("#relationId").val()); // 获取页面种植的relationId
		var grUserId = getCookie('gr_user_id');
		var fromUrl = getCookie('referweb'); // 获取来源url
		
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
		if(isNull(firstCountry)){
			alert("请选择意向国家，谢谢！");
			return false;
		}
		// if (isNull(relationId)) {
		// 	alert("请在页面添加relationId标签<input type='hidden' id='relationId' value='18'>value根据不同主题编写，谢谢")
		// 	return false;
		// }
		if (relationId == null || relationId == '') {
			relationId = 18;
		} else {
			relationId = relationId.split('_');
			relationId = relationId[0]
			console.log('relationId', relationId)
		}
		if (/&bd_vid=/.test(fromUrl)) {
            var dataType = 7;
        } else {
            var dataType = 3;
        }
		if (fromUrl == null || fromUrl == undefined) {
			fromUrl = window.location.href;
			if (fromUrl.match(/[~|《|<|>|'|!|@|#|$|%|^|*|(|)|+]/)) {
				alert('含有特殊字符');
				return false;
			} else {
				fromUrl = window.location.href;
			}
		}
		// var subData = {name:username,sex:sex,phone:tel,email:email,birthday:birthday,city:city,country:country,shenfen:shenfen,firstCountry:firstCountry,secondCountry:secondCountry,company:company,source:fromUrl,activityTitle:activityTitle,relationId:18};
		var subData = { grUserId: grUserId, dataType: dataType,relationId: relationId, name: username, phone: tel, city: city, country: firstCountry, source: fromUrl };
        var dataBaidu = JSON.stringify({
            "token": "M58pIzx05CiFGoGssGKmFrMy5AleGUYh@ZpXrKDzPcF1WPtMsN139UhrcZCBldU5g",
            "conversionTypes": [
                {
                    'logidUrl': fromUrl,
                    'uid': '7229661',
                    'isConvert': '1',
                    'convertType': '3'
                }
            ]
		});
		if (top) {
			top = false;
			$.ajax({
				type:"get",
				data:subData,
				url:ajaxUrlPrefix.nodeapi + '/cmsapi/assessment',
				dataType:'json',
				success: function(backData){
					// alert("您已报名成功！");
					alert('恭喜您，领取成功！24小时之内留学顾问会与您取得联系进行使用。');
					top = true;
					$('#username').val('');
					$('#tel').val('');
					// $('#firstCountry').val('');
					window._agl && window._agl.push(['track', ['success', { t: 3 }]]);
				},
				error: function(){
					// alert("您已报名成功！");
					alert('恭喜您，领取成功！24小时之内留学顾问会与您取得联系进行使用。');
					top = true;
					$('#username').val('');
					$('#tel').val('');
					// $('#firstCountry').val('');
					window._agl && window._agl.push(['track', ['success', { t: 3 }]]);
				}
			});
			$.ajax({
				url: 'https://fengchao.baidu.com/taurus/open/api/ADD/userconvertinfo',
				type: 'post',
				dataType: 'json',
				data: dataBaidu,
				contentType: 'application/json;charset=UTF-8',
				success: function (msg) {
					console.log('成功')
				},
				error: function () {
					console.log('失败')
				}
			});
		}
		
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
//获取cookie
function getCookie(cname) {
	var name = cname + "=";
	var ca = document.cookie.split(';');
	for(var i=0; i<ca.length; i++) {
	 var c = ca[i];
	 while (c.charAt(0)==' ') c = c.substring(1);
	 if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
	}
	//如果没有获取到城市cookie，默认取1，表示取北京
	return "1";
 }