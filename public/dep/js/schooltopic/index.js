// JavaScript Document

$(document).ready(function(){
    $(".qs_head").click( function(){
        var index=$(this).index();
        $(this).addClass("head-on").siblings().removeClass("head-on");
        $(".ranking1").addClass("ranking-on1").eq(index).siblings(".ranking1").removeClass("ranking-on1");
    });
    $(window).scroll(function(){
        var scroll=$(window).scrollTop();
        if(scroll>=650){
            $("#bouceleft").addClass("bounceInLeft");
            $("#bouceright").addClass("bounceInRight");

        }
        if(scroll>=1500){
            $("#baoming").addClass("rubberBand");
        }
        if(scroll>=150){
            $(".Navigate").addClass("Navigate_on");
        }
        if(scroll>=5300){
            $(".lijiexunzhan").addClass("rotateInDownLeft");
        }
        console.log(scroll);
    })
});

$(window).scroll(function(){
    var scroll=$(window).scrollTop();
    if(scroll>=800){
        $(".tab_list").addClass("navigation_scroll");

    }
    if(scroll<800){
        $(".tab_list").removeClass("navigation_scroll");

    }
    console.log(scroll);
})