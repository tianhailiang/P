/**
 * Created by DXZ-Hui.Cao on 2017/9/7.
 */
$(".abroad-fifth").hover(function(){
  $(this).find(".abroad-fifth-list").slideDown(100)
  $(this).find(".go-down").html("&#xe661;");
},function(){
  $(this).find(".abroad-fifth-list").slideUp(100)
  $(this).find(".go-down").html("&#xe60b;")
})