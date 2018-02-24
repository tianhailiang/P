var m_companyId="";
var	m_customerId="";
var m_groupId="";
var m_visitorId="";
var	m_userId="";

/*
* 正则表达式校验
* 
*/

  var sendData = {};

   var reInvidateCode = ''; //后台获取的验证码

var validate = {
 //phone
 phone: function(phone){
     if(!/^(13[0-9]|15[0|1|2|3|5|6|7|8|9]|18[0-9 ]|177)\d{8}$/.test(phone)){
         return false;
     }
     return true;
 }

}



$(function(){
	
	m_companyId=companyId;
	m_customerId=customerId;
	m_groupId=groupId;
	m_visitorId=visitorId;
	m_userId=userId;

	//重置
	$(".leaveField1 .reset").click(function(){
		$.js.initFocus(true);
		return false;
	});
  
    //===============获取验证码=================

    // 60s倒计时
    function countDown() {
        $(".get-phone-code").unbind("click");
        var countDownTime = 60;
        var timer = window.setInterval(function () {
            countDownTime--;

            $(".get-phone-code").html('（'+countDownTime+'）s');
            if (countDownTime == 0) {
                clearInterval(timer);
                countDownTime = 60;
                $(".get-phone-code").html('重新获取');
               
            }
        }, 1000);
    }
 
   

	    $(".get-phone-code").click(function(){
	       //获取验证码
	        var teleNumber = $.trim($("#phone").val());
	        sendData = {phoneNum: teleNumber};
	        if (!validate.phone(teleNumber)) {
	           alert('请填写手机号码');
	            $("#phone").val('');
	        } else {
	            countDown();
	            //获取短信验证码
	          

	        }
	    });


  });

function submitBtnCommit(){
	var commitFlag = false;
	if(commitFlag){
		return false;
	}
	commitFlag = true;
	var name = $("#name").val();
	if(name == $("#name").attr("rel")){
		name="";
	}
	if(name =="" || name.length>20){
		alert("姓名不能为空且不能超过20个字符");
			$("#name").focus();
		commitFlag = false;
		return false;
	}
	
	var phone = $("#phone").val();
	if(phone == $("#phone").attr("rel")){
		phone="";
	}
	
	var yixiangguojia=$("#department").val();
	var title = $("#city").val();
	var context = $("#context").val();
	if(context == $("#context").attr("rel")){
		context = "";
	}
	
	if(context == ""){
		$.js.alert("请输入留言内容！", function(){
			$("#context").focus();
		});
		
		commitFlag = false;
		return false;
	}else if(context.length > 250){
		$.js.alert("留言内容不能超过250个字符", function(){
			$("#context").focus();
		});
		commitFlag = false;
		return false;
	}
	
	if(yixiangguojia=="eu1"||yixiangguojia=="eu3"||yixiangguojia=="eu5"||yixiangguojia=="vs1-vs2"){
	title="jjl";
	};
	
	addGroupContact(phone,name,yixiangguojia,yixiangguojia,title,context);			
	return false;		
};


function submitBtnCommit1(){
	var commitFlag = false;
	if(commitFlag){
		return false;
	}
	commitFlag = true;
	var name = $("#name").val();
	if(name == $("#name").attr("rel")){
		name="";
	}
	if(name =="" || name.length>20){
		alert("姓名不能为空且不能超过20个字符");
			$("#name").focus();
		commitFlag = false;
		return false;
	}
	
	var phone = $("#phone").val();

	  
    if (!validate.phone(phone)) {
        alert('请填写手机号码');
        $("#phone").val('');
        return false;
    } 

   var phoneCode=$(".phone-code").val();

   if(phoneCode==''){
   	  alert("请填写验证码");
   	  return false;
   }
	
	var title = $("#city").val();
	var yixiangguojia=null;
	var title = $("#city").val();
	var context = null;
	
	addGroupContact(phone,name,yixiangguojia,yixiangguojia,title,context);			
			
};





function addGroupContact(phone,name,email,department,city,context){
	$.post("../resourceAllocation/Json/add",{
		sourceFlag:"L",
		groupId:m_groupId,
		res_ext:phone,
		name:name,
		notes:("访客名称："+ name+"  留学需求："+context),
		visitorId:m_visitorId,
		department:department,
		city:city,
		u:m_userId
	},function(resp){
		if(resp.userRealName){
			alert(resp.userRealName+"将为您做专业评估");
			location.reload();
		}else{
			alert(resp.reason);
		}
	});
};


function changeGroup(){
	$("#email").html();
	var str="";
	var s=$("#title").val();
	if(s=='jjl'){
		 str="<option value='us2-us3-us4-us5-us6-us7-us8-us1-us9-us10'>美国</option>"+
		     "<option value='uk1-uk2-uk3-uk4-uk5-uk6-uk7-uk8-uk9-uk10'>英国</option>"+
		     "<option value='ca1-ca2-ca3-ca4-ca5-ca6'>加拿大</option>"+
		     "<option value='au7-au3-au2-au1'>澳大利亚</option>"+
		     "<option value='au5-au4'>新西兰</option>"+
		     "<option value='as2-as1'>日本</option>"+
		     "<option value='as7'>日本研究生</option>"+
		     "<option value='as3'>韩国</option>"+
		     "<option value='as4'>新加坡/马来西亚</option>"+
		     "<option value='as5'>俄罗斯/乌克兰/白俄罗斯</option>"+
		     "<option value='as6'>香港</option>"+
		     "<option value='eu1'>法国</option>"+
		     "<option value='eu3'>德国/爱尔兰/荷兰/北欧</option>"+
		     "<option value='eu5'>西班牙/意大利/瑞士</option>"+
		     "<option value='vs1-vs2'>移民</option>";
	}else{
	    str="<option value='us1-us2-us4-us5-us3'>美国</option>"+
		"<option value='uk2-uk3-uk1-uk4-uk5'>英国/香港</option>"+
		"<option value='ca2-ca1-ca3'>加拿大</option>"+
		"<option value='au2-au1-au3'>澳大利亚</option>"+
		"<option value='au2-au1-au3'>新西兰</option>"+
		"<option value='as2-as1-as3'>亚洲</option>"+
		"<option value='as2-as1-as3'>俄罗斯/乌克兰/白俄罗斯</option>"+
        "<option value='eu1'>法国</option>" +
        "<option value='eu3'>德国/爱尔兰/荷兰/北欧</option>" +
        "<option value='eu5'>西班牙/意大利/瑞士</option>" +
        "<option value='vs1-vs2'>移民</option>" ;
	}

	$("#email").html(str);


};
