function create_token(a){for(var t=String.fromCharCode(a.charCodeAt(0)+a.length),e=1;e<a.length;e++)t+=String.fromCharCode(a.charCodeAt(e)+a.charCodeAt(e-1));return escape(t)}function article_count(a,t,e,i){$.ajax({url:ajaxUrlPrefix.nodeapi+"/cmsapi/article_count",type:"GET",data:{catid:t,id:e,uuid:i,token:a},success:function(a){0==a.code&&($("#detail_views_num").html(a.data.num),$.cookie("uuid",a.data.uuid,{path:"/",domain:".jjlvip.cn"}))}})}$(function(){var a=$("#detail_catid").val(),t=$("#detail_id").val(),e=$.cookie("uuid")?$.cookie("uuid"):"";article_count(create_token("apitokenjjl.cn2018"),a,t,e)});