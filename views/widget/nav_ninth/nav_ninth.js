/**
 * Created by DXZ-Hui.Cao on 2017/9/7.
 */
$(".abroad-ninth").hover(function(){
  $(this).find(".abroad-ninth-list").slideDown(100)
  $(this).find(".go-down").html("&#xe661;");
},function(){
  $(this).find(".abroad-ninth-list").slideUp(100)
  $(this).find(".go-down").html("&#xe60b;")
})

