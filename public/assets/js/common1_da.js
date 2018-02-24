$(function ($) {
    resizeWinPage();


    // 低版本浏览器提示升级
    (function () {
        if (!$.support.leadingWhitespace) {
            $("#browser_ie").fadeIn();
            $("#browser_ie .close").bind('click', function () {
                $('#browser_ie').fadeOut();
            });
            var timer = setInterval(function () {
                $('#browser_ie').fadeOut();
            }, 10000);
        }

    })();
    //banner图
    (function () {
        if ($('#banner').size() > 0) {
            $("#banner").responsiveSlides({
                maxwidth: 1920,
                speed: 1500,
                pager: true,
                timeout: 4000
            });
        }
        if ($('#banner02').size() > 0) {
            $("#banner02").responsiveSlides({
                maxwidth: 1920,
                speed: 1500,
                pager: true,
                timeout: 40000000
            });
        }

        if ($('#slides').size() > 0) {
            $("#slides").responsiveSlides({
                maxwidth: 1920,
                speed: 1500,
                pager: true,
                timeout: 4000000
            });
        }

        if ($('.index').size() > 0) {
            $("#banner01").responsiveSlides({
                maxwidth: 1920,
                speed: 1500,
                pager: true,
                timeout: 4000,
                nav: true
            });
            $(".slides").each(function () {
                $(".slides").responsiveSlides({
                    auto: true,
                    speed: 1000,
                    pager: true,
                    timeout: 4000
                });
            });
        }
    })();


    // 返回顶部
    (function () {
        if ($('.side-btn').size() > 0) {
            $(window).scroll(function () {
                $(window).scrollTop() > 400 ? $(".back-top").css('display', 'block').click(function () {
                    $(window).scrollTop(0);
                }) : $(".back-top").css('display', 'none');
            });
            $(".side-btn .close").bind('click', function () {
                $('.click-hide').fadeOut();
                setTimeout(function () {
                    $('.click-hide').fadeIn();
                }, 30000);

            })
        }
    })();

    // (function () {
    //     if ($('.side-btn').size() > 0) {
    //         var _Width1 = $(window).width(), _Width2 = $('.section').width();
    //         if (_Width1 > 1440) {
    //             $('.side-btn').css({ 'right': (_Width1 - _Width2) / 2 - 115 });
    //         }
    //         else {
    //             $('.side-btn').css({ 'right': 0 });
    //         }
    //         $(".side-btn .close").bind('click', function () {
    //             $('.click-hide').fadeOut();
    //             setTimeout(function () {
    //                 $('.click-hide').fadeIn();
    //             }, 30000);

    //         })
    //         $(window).scroll(function () {
    //             $(window).scrollTop() > 400 ? $(".back-top").css('display', 'block').click(function () {
    //                 $(window).scrollTop(0);
    //             }) : $(".back-top").css('display', 'none');
    //         });
    //     }
    // })();

    //留学专区
    (function () {
        if ($('.liuxuezhuanqu .tab').size() > 0) {
            $(window).scroll(function () {
                var $width = $(window).width(),
                    $scrollTop = $(window).scrollTop();

                if ($scrollTop >= 2700 && $scrollTop <= 4300) {
                    $('.liuxuezhuanqu .tab').addClass('tab_fixed');
                } else {
                    $('.liuxuezhuanqu .tab').removeClass('tab_fixed');
                }
                if ($width <= 1000) $('.liuxuezhuanqu .tab').removeClass('tab_fixed');
            });
        }
    })();
    (function () {
        // 轮播
        if ($('.anli .list-anlisucc').size() > 0) {
            $(".success-box").jCarouselLite({
                btnPrev: ".list-anlisucc .prev",
                btnNext: ".list-anlisucc .next",
                auto: 4000,
                scroll: 1,
                speed: 1000,
                vertical: true,
                visible: 5,
                circular: true
            });
        }
    })();

    (function () {
        if ($('.main-switch').size() > 0) {
            $('.main-switch').each(function () {
                var _this = $(this);
                _this.find('.boxnav a').bind('click', function () {
                    var this_a = $(this), _index = this_a.index();
                    this_a.addClass('active').siblings('a').removeClass('active');
                    _this.find('.main-box').eq(_index).show().siblings('.main-box').hide();
                })
            })
        }
    })();

    // 首页移民专区切换
    (function () {
        if ($('.index').size() > 0) {
            $('.yiminzhuanqu,.liuxuezhuanqu,.liuxuehuodong').each(function () {
                var _this = $(this);
                _this.find('.tab a').bind('click', function () {
                    var this_a = $(this), _index = this_a.index();
                    this_a.addClass('active').siblings('a').removeClass('active');
                    _this.find('.tab-box').eq(_index).show().siblings('.tab-box').hide();
                })
            })
            // var $width = $(window).width();
            //       $(window).scroll(function () {
            //         var $scrollTop = $(window).scrollTop();
            //           if ($scrollTop >= 2000 && $scrollTop <= 4000) {
            //              $('.liuxuezhuanqu .tab').addClass('fixed');
            //              $('.liuxuezhuanqu .tab').css('left', (($width-1200) / 2)+35)
            //           } else {
            //              $('.liuxuezhuanqu .tab').removeClass('fixed');
            //              $('.liuxuezhuanqu .tab').css('left', 0)
            //         }
            // })
        }
    })();

    // 导航
    (function () {
        if ($('.column').size() > 0) {
            $('.column').hover(function () {
                var _this = $(this);
                _this.find('.btn').addClass('active')
                _this.find('.sub-nav').stop().fadeIn();
            }, function () {
                var _this = $(this);
                _this.find('.btn').removeClass('active')
                _this.find('.sub-nav').stop().fadeOut();
            })
            $('.column li').hover(function () {
                var _this = $(this);
                _this.addClass('active')
                _this.find('.sub-cont').stop().show().animate({ 'left': '100%' });
            }, function () {
                var _this = $(this);
                _this.removeClass('active')
                _this.find('.sub-cont').stop().hide().animate({ 'left': '90%' });
            })
            $('.index .column').hover(function () {
                var _this = $(this);
                _this.find('.btn').addClass('active')
                _this.find('.sub-nav').stop().fadeIn();
            }, function () {
                var _this = $(this);
                _this.find('.btn').addClass('active')
                _this.find('.sub-nav').stop().fadeIn();
            })
        }
    })();

    // 移民国家焦点图轮播
    (function () {
        if ($('.rslides1_tabs').size() > 0) {
            $('.rslides1_tabs li').bind('click', function () {
                var _this = $(this), _index = _this.index();
                $('.pic-list li').bind('click', function () {
                    var _this01 = $(this);
                    _this01.addClass('active').siblings('.pic-list li').removeClass('active');
                })
                $('.pic-list li').eq(_index).trigger('click');
            })
        }
    })();
    //右边广告浮动
    if ($(".pinned").size() > 0) {
        $(".pinned").pin();
    }
    $('.list-tour-pic li').hover(
        function () {
            $(this).find('.txt').addClass('txth');
        },
        function () {
            $(this).find('.txt').removeClass('txth');
        }
    );
    $('.list-pic li').hover(
        function () {
            $(this).find('.txt').addClass('txth');
        },
        function () {
            $(this).find('.txt').removeClass('txth');
        }
    );
    $('.map .area').hover(
        function () {
            $(this).addClass('areah');
            $('.hotline').hide();
            $(this).find('.hotline').show();
        },
        function () {
            $(this).removeClass('areah');
            $('.hotline').hide();
        }


    );

    // 下拉选择
    /*$('.select-box').each(function () {
     var _this = $(this),
     bool = false;
     _this.find('.name').click(function () {
     console.log('select-box-test');
     var ul = _this.find("ul");
     if (!bool) {
     if (ul.css("display") == "none") {
     ul.show();
     bool = true;
     } else {
     ul.hide();
     }
     }
     })
     _this.find('li').bind('click', function () {
     var li_this = $(this).text();
     var li_selectid = $(this).attr('selectid');
     _this.find('.name').html(li_this);
     _this.find('.name').attr('selectid', li_selectid);
     _this.find("ul").hide();
     })

     $('.select-box').mouseleave(function () {
     $(".select-box ul").hide();
     })
     })*/
    (function () {
        var $box = $('.select-box');
        $box.each(function () {
            var selector = $(this);
            selector.attr('data-open', false);
            selector.off().on('click', '.name', function () {
                var isOpen = $(this).parent().attr('data-open');
                if (isOpen == 'false') {
                    $box.attr('data-open', false).find('ul').hide();
                    selector.find('ul').show();
                    $(this).parent().attr('data-open', true);
                } else {
                    selector.find('ul').hide();
                    $(this).parent().attr('data-open', false);
                }
            });
            selector.on('click', 'li', function () {
                var $con = selector.find('.name'),
                    $text = $(this).text(),
                    $selectid = $(this).attr('selectid');

                if ($selectid != '') {
                    $con.attr('selectid', $selectid);
                }
                $con.html($text);
                $(this).parent().hide();
                $(this).closest('.select-box').attr('data-open', false);
            });

        });
    })();


})

function resizeWinPage(){
    var w=$(window).width(),H=$(window).height();
    if(w<=1200){
        $('body').addClass('page_1200');
    }

}

$(window).resize(function() {
    resizeWinPage()
});

var is_login = function(){
    $.ajax({
        type:"get",
        url:"http://vip.jjl.cn/api.php?op=is_login",
        dataType:'jsonp',
        jsonp:'callback',
        success:function(result) {
            if(result.code == "1000"){
                $("#user_head").attr("href","http://vip.jjl.cn/index.php?m=member&c=index");
                $("#login").attr("href","http://vip.jjl.cn/index.php?m=member&c=index");
                $("#login").text(result.username);
            }
            else{
                $("#user_head").attr("href","javascript:;");
                $("#login").attr("href","http://vip.jjl.cn/index.php?m=member&c=index&a=login&back=goback");
                //$("#login").text("登录(即将开放)");
            }
        }
    });
}

is_login();


//地区
// $.cookie('currentarea',null, { path: "/"});

$('.city-cont').on('click',"a", function(){
    var city_urllist={1:'beijingjjl',2:'shanghaijjl',9:'jinanjjl',4:'tianjinjjl',10:'qingdaojjl',11:'zhengzhoujjl',12:'shijiazhuangjjl',8:'shenyangjjl',13:'dalianjjl',14:'wuhanjjl',15:'xianjjl',16:'nanjingjjl',17:'taiyuanjjl',18:'tangshanjjl',19:'changshajjl',3:'guangzhoujjl',20:'shenzhenjjl',21:'kunmingjjl',22:'hefeijjl',23:'suzhoujjl',24:'haerbinjjl',25:'changchunjjl',26:'hushijjl',27:'lanzhoujjl',28:'xiamenjjl',29:'nanchangjjl',30:'jilinjjl',31:'yantaijjl',6:'hangzhoujjl',5:'chengdujjl',32:'handanjjl',33:'wuxijjl',34:'ningbojjl',35:'guiyangjjl',36:'xuzhoujjl',37:'foshanjjl',38:'nanningjjl',39:'fuzhoujjl',40:'yinchuanjjl',41:'changzhoujjl',42:'wenzhoujjl',7:'chongqingjjl',43:'dongguanjjl',44:'yichangjjl',45:'xiningjjl',46:'haikoujjl',47:'xinjiangjjl',48:'luoyangjjl'},
        currentarea = $(this).attr("data-id");

   // $.cookie('currentarea', currentarea, { path: "/", domain: "jjl.cn"});
    $.cookie('currentarea', currentarea, { path: "/"});

    if($(this).parent().hasClass("anchor")){
        window.location.href = '/'+city_urllist[currentarea]+'#liuxuehuodong';
        //window.location.reload();
    }else{
        // window.location.href = '/index.php?'+city_urllist[currentarea];
      window.location.reload();
    }
});

/*改变底部分公司电话*/

function change_tel(){
    var html = $("#tel_html").text();
    html2 = html.split("留学投诉电话");
    html2 = html2[0].replace("留学服务专线 : ", '');
    html2 = html2.replace("86-", '');
    if(html2.indexOf('/')>-1){
        html2 = html2.replace("/", '<br>');
        html2 = '<div style="line-height:18px;font-size:18px;">'+html2+'</div>';
    }
    $("#tel").html(html2);
}

/*静态页更改地区*/
function change_area(){
    var currentarea = $.cookie('currentarea');
    if(currentarea!=null){
        var city_name=$('.city-cont [data-id='+currentarea+']').attr('data-value');
        $('.city .cityname').html(city_name);
    }
}
change_area();
/*咨询顾问咨询次数统计*/
function zixun_count(id){
    $.ajax({
        type:"post",
        url:"http://www.jjl.cn/api.php?op=zixun_count",
        data:{id:id},
        dataType:"json",
        success:function(result) {
        }
    });
}
// jQuery url get parameters function [获取URL的GET参数值]
// <code>
//     var GET = $.urlGet(); //获取URL的Get参数
//     var id = GET['id']; //取得id的值
// </code>
//  url get parameters
//  public
//  return array()
(function($) {
    $.extend({
        urlGet:function()
        {
            var aQuery = window.location.href.split("?");  //取得Get参数
            var aGET = new Array();
            if(aQuery.length > 1)
            {
                var aBuf = aQuery[1].split("#");
                var aBuf = aBuf[0].split("&");
                for(var i=0, iLoop = aBuf.length; i<iLoop; i++)
                {
                    var aTmp = aBuf[i].split("=");  //分离key与Value
                    aGET[aTmp[0]] = aTmp[1];
                }
            }
            return aGET;
        }
    })
})(jQuery);

function array_search(array,str){
//在数组里查找键值，返回键名
    if(typeof array !== 'object'){
        return false;
    }else{
        var found = [];
        for(var i in array){
            if(array[i]==str){
                found.push(i);
            }
        }
        var num = found.length;
        if(num==0) return false;
        if(num==1) return found[0];
        return found;
    }
}

function change_a(){
//给链接加地区
    var href;
    var nullyes;
    var valueyes;
    var city_urllist={1:'beijingjjl',2:'shanghaijjl',9:'jinanjjl',4:'tianjinjjl',10:'qingdaojjl',11:'zhengzhoujjl',12:'shijiazhuangjjl',8:'shenyangjjl',13:'dalianjjl',14:'wuhanjjl',15:'xianjjl',16:'nanjingjjl',17:'taiyuanjjl',18:'tangshanjjl',19:'changshajjl',3:'guangzhoujjl',20:'shenzhenjjl',21:'kunmingjjl',22:'hefeijjl',23:'suzhoujjl',24:'haerbinjjl',25:'changchunjjl',26:'hushijjl',27:'lanzhoujjl',28:'xiamenjjl',29:'nanchangjjl',30:'jilinjjl',31:'yantaijjl',6:'hangzhoujjl',5:'chengdujjl',32:'handanjjl',33:'wuxijjl',34:'ningbojjl',35:'guiyangjjl',36:'xuzhoujjl',37:'foshanjjl',38:'nanningjjl',39:'fuzhoujjl',40:'yinchuanjjl',41:'changzhoujjl',42:'wenzhoujjl',7:'chongqingjjl',43:'dongguanjjl',44:'yichangjjl',45:'xiningjjl',46:'haikoujjl',47:'xinjiangjjl',48:'luoyangjjl'};

    var GET = $.urlGet(); //获取URL的Get参数
    var currentarea = GET['currentareaid']; //取得id的值
    currentarea=currentarea+"";
    currentarea=array_search(city_urllist,currentarea);
    if(currentarea==false){
        currentarea=$.cookie('currentarea');
    }
    $("a").each(function(){
        href = $(this).attr("href");
        href = href +"";
        if(href!="undefined"){
            if(href=="/"){
                href="/"+city_urllist[currentarea]
                $(this).attr("href",href);
            }
        }
    });
}
change_a();

function change_url_city(){
//给链接加地区
    var href;
    var city_urllist={1:'beijingjjl',2:'shanghaijjl',9:'jinanjjl',4:'tianjinjjl',10:'qingdaojjl',11:'zhengzhoujjl',12:'shijiazhuangjjl',8:'shenyangjjl',13:'dalianjjl',14:'wuhanjjl',15:'xianjjl',16:'nanjingjjl',17:'taiyuanjjl',18:'tangshanjjl',19:'changshajjl',3:'guangzhoujjl',20:'shenzhenjjl',21:'kunmingjjl',22:'hefeijjl',23:'suzhoujjl',24:'haerbinjjl',25:'changchunjjl',26:'hushijjl',27:'lanzhoujjl',28:'xiamenjjl',29:'nanchangjjl',30:'jilinjjl',31:'yantaijjl',6:'hangzhoujjl',5:'chengdujjl',32:'handanjjl',33:'wuxijjl',34:'ningbojjl',35:'guiyangjjl',36:'xuzhoujjl',37:'foshanjjl',38:'nanningjjl',39:'fuzhoujjl',40:'yinchuanjjl',41:'changzhoujjl',42:'wenzhoujjl',7:'chongqingjjl',43:'dongguanjjl',44:'yichangjjl',45:'xiningjjl',46:'haikoujjl',47:'xinjiangjjl',48:'luoyangjjl'};
    currentarea=$.cookie('currentarea');
    $("a").each(function(){
        href = $(this).attr("href");
        href = href +"";
        if(href!="undefined"){
            var regx1=/^(http:\/\/www.jjl.cn)?\/\//;
            var regx2=/^(http:\/\/www.jjl.cn\/\/)/;
            var regx3=/jjl.cn\/[a-zA-Z0-9]*(jjl)\//;

            var regx8=/jjl.cn\/zt\//;
            var regx9=/jjl.cn\/[a-zA-Z0-9]*\/[\w]+/;

            var regx4=/^(http:\/\/vip.jjl.cn)?\/\//;
            var regx5=/^(http:\/\/vip.jjl.cn\/\/)/;

            var regx6=/index.php/;
            if(href.indexOf("http://www.jjl.cn/list")!=-1){
                var rs=href.replace(regx3,"http://www.jjl.cn/"+city_urllist[currentarea]+"/common/list");
            }

            var regx7=/jjl.cn\//;

            var rs=href.replace(regx1,"/"+city_urllist[currentarea]+"/");
            if(regx2.test(href)){rs = "http://www.jjl.cn"+rs;}

            var rs=rs.replace(regx4,"/"+city_urllist[currentarea]+"/");
            var rs=rs.replace(regx4,"/"+city_urllist[currentarea]+"/");
            if(regx5.test(href)){rs = "http://vip.jjl.cn"+rs;}

            if(!regx3.test(rs) && !regx8.test(rs)&& !regx9.test(rs) && !regx6.test(rs) && (href.indexOf("http://www.jjl.cn")!=-1||href.indexOf("http://vip.jjl.cn")!=-1) ){
                if(href=="http://www.jjl.cn"||href=="http://vip.jjl.cn"||href=="http://www.jjl.cn/"||href=="http://vip.jjl.cn/"){
                    rs = rs.replace(regx7,"jjl.cn/"+city_urllist[currentarea]+"/");
                }else{
                    rs = rs.replace(regx7,"jjl.cn/"+city_urllist[currentarea]+"/common/");
                }
            }

            if(rs=='/'){
                rs="/"+city_urllist[currentarea];
            }else if(rs=='http://www.jjl.cn'||rs=='http://www.jjl.cn/'){
                rs="http://www.jjl.cn/"+city_urllist[currentarea];
            }else if(rs=='http://vip.jjl.cn'||rs=='http://vip.jjl.cn/'){
                rs="http://vip.jjl.cn/"+city_urllist[currentarea];
            }

            $(this).attr("href",rs);
        }
    });
}
change_url_city();

//表格加边框
$(".section .article table").attr("border",1);

//顶部搜索
$('.search-btn').eq(0).on('click', function(){
    var $search = $(this).parent();
    var keyword = $search.children('.text').val();
    if(!keyword || keyword == '请输入搜索关键词'){
        return false;
    }

    top.location.href = '/index.php?m=search&c=index&a=init&q=' + encodeURI(keyword);
})
