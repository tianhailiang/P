/**
 * Created by DXZ-Hui.Cao on 2017/9/28.
 */

$(".abroad-study").hover(function(){
  $(this).find(".abroad-list").slideDown(100)
  $(this).find(".go-down").html("&#xe661;");
},function(){
  $(this).find(".abroad-list").slideUp(100)
  $(this).find(".go-down").html("&#xe60b;")
})