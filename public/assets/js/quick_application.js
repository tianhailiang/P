
        
        $(function(){

        	

        	var validate = {
      			 //phone
      			 phone: function(phone){
      			     if(!/^(13[0-9]|15[0|1|2|3|5|6|7|8|9]|18[0-9 ]|177)\d{8}$/.test(phone)){
      			         return false;
      			     }
      			     return true;
      			 }

          };

            var date = new Date();
         
        	$("#quickDate").val(date.getFullYear()+"-"+Number(date.getMonth()+1)+"-"+date.getDate());
            
            $(".quick-text1").each(function(i){
                //获取.title 的宽度  给numTip 设置padding-left
                var w = $(this).find(".title").width();

                $(this).find(".numTip").css({"paddingLeft":w+10+"px"})

            });

        	$("#quickName").on('blur',function(){
               // 姓名输入框 失去焦点事件
               if($(this).val()==''){
                  
        		 $('#nameNumTip').html("请输入您的姓名");
               }else{
                   
                   $('#nameNumTip').html(""); 
               }
        	});

            $("#quickPhone").on("blur",function(){
            	//手机号失去焦点事件
            	if($(this).val()==''){
                  
        		 $('#phoneNumTip').html("请输入您的手机号码");
               }else{
                   if(!validate.phone($(this).val())){
                   	   $('#phoneNumTip').html("您输入的手机号码不正确");
                   }else{
                   	  $('#phoneNumTip').html(""); 
                   }
                  
               }
            });

            $("#quickPhoneCode").on("blur",function(){
            	 //验证码失去焦点事件
                 if($(this).val()==''){
                     $("#codeNumTip").html("请输入验证码");
                  }else{
                    $("#codeNumTip").html("");
                  }	
            });
          
        	
          
		    function countDown() {
		     // 60s倒计时
		        $(".quick-get-phone-code").unbind("click");
		        var countDownTime = 60;
		        var timer = window.setInterval(function () {
		            countDownTime--;

		            $(".quick-get-phone-code").html('（'+countDownTime+'）s');
		            if (countDownTime == 0) {
		                clearInterval(timer);
		                countDownTime = 60;
		                $(".quick-get-phone-code").html('重新获取');
		               
		            }
		        }, 1000);
		    }

           
	    $(".quick-get-phone-code").click(function(){
	       //获取验证码

	        if (!validate.phone($.trim($("#quickPhone").val()))) {
	            $('#phoneNumTip').html("您输入的手机号不正确"); 
	            $("#quickPhone").val('');
	        } else {
	            countDown();
	            //获取短信验证码
	          
	        }
	    });


       $("#quick-btn").on('click',function(){
            
          if($("#quickDepartment").val()==''){
          	 // 判断国家
              $("#departmentNumTip").html("请填写您所需要的留学国家");
              return false;
          }else{
          	 $("#departmentNumTip").html('');
          }  

         if($("#quickEducation").val()==''){
             // 判断学历
             $("#educationNumTip").html("请填写您的学历");
             return false;
          }else{
          	 $("#educationNumTip").html("");
          }

         if($("#quickName").val()==''){
         	 //判断姓名
             $("#nameNumTip").html('请填写您的姓名');
             return false;

         }else{ 

            $("#nameNumTip").html('');
         }

         if($("#quickDate").val()==''){
            //判断出国时间
         	 $("#dateNumTip").html('请填写计划出国时间');
         	 return false;
         }else{
         	 $("#dateNumTip").html('');
         }

         
         if(!validate.phone($.trim($("#quickPhone").val()))){
         	//判断手机号
         	  $('#phoneNumTip').html("您输入的手机号不正确"); 
	          return false;
         }else{
               $('#phoneNumTip').html('');
         }

         if($("#quickPhoneCode").val()==''){
         	//判断验证码
         	 $('#codeNumTip').html("请您输入验证码"); 
         	  return false;
         }else{
         	 $('#codeNumTip').html('');
         }


       });


     })
