/**
 * Created by DXZ-Hui.Cao on 2017/11/8.
 */

$(document).ready(function(){
  $(".ele-country-list .ele-nav-country").eq(0).addClass('nav-ele-on');
  $(".ele-country-list .ele-nav-country").eq(0).css("color","#c13232");
});

$(".nav-ele-zhou").hover(function(){
  $(this).find(".nav-ele-down").html("&#xe661;");
},function(){
  $(this).find(".nav-ele-down").html("&#xe60b;");
});
$(".ele-country-list .ele-nav-country").on("click",function(){
  $(".nav-ele-zhou .ele-zhou-list").parents(".nav-ele-zhou").find(".ele-zhou-mx").removeClass('nav-ele-on');
  $(".nav-ele-zhou .ele-zhou-list").parents(".nav-ele-zhou").find(".ele-zhou-mx").css("color","#ffffff");
  $(".nav-ele-zhou .ele-zhou-list").parents(".nav-ele-zhou").find(".nav-ele-down").css("color","#ffffff");
  $(".ele-country-list .ele-nav-country").removeClass('nav-ele-on');
  $(".ele-country-list .ele-nav-country").css("color","#ffffff");
  $(this).addClass('nav-ele-on');
  $(this).css("color","#c13232");
});
$(".nav-ele-zhou .ele-zhou-list").on("click",function(){
  $(".ele-country-list .ele-nav-country").removeClass('nav-ele-on');
  $(".ele-country-list .ele-nav-country").css("color","#ffffff");
  $(".nav-ele-zhou .ele-zhou-list").parents(".nav-ele-zhou").find(".ele-zhou-mx").removeClass('nav-ele-on');
  $(".nav-ele-zhou .ele-zhou-list").find(".ele-zhou-mx").css("color","#ffffff");
  $(".nav-ele-zhou .ele-zhou-list").find(".nav-ele-down").css("color","#ffffff");
  $(this).parents(".nav-ele-zhou").find(".ele-zhou-mx").addClass('nav-ele-on');
  $(this).parents(".nav-ele-zhou").find(".ele-zhou-mx").css("color","#c13232");
  $(this).parents(".nav-ele-zhou").find(".nav-ele-down").css("color","#c13232");
  $(this).parents(".nav-ele-zhou").siblings(".nav-ele-zhou").find(".ele-zhou-mx").css("color","#ffffff");
  $(this).parents(".nav-ele-zhou").siblings(".nav-ele-zhou").find(".nav-ele-down").css("color","#ffffff");
})
