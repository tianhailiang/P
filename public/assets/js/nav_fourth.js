/**
 * Created by DXZ-Hui.Cao on 2017/9/7.
 */
$(".liuxue-xq-tit").hover(function(){
  $(this).find(".liuxue-xq").slideDown(100)
  $(this).find(".go-down").html("&#xe661;");
},function(){
  $(this).find(".liuxue-xq").slideUp(100)
  $(this).find(".go-down").html("&#xe60b;")
})