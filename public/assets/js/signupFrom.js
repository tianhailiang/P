$(function(){
    isBrowser()
    function isBrowser(){
      if (navigator.appName === 'Microsoft Internet Explorer') { //是否是IE浏览器
        if (navigator.userAgent.match(/Trident/i) && navigator.userAgent.match(/MSIE 8.0/i)) { //浏览器内核是否为Trident内核IE8.0
          alert('很抱歉！当前浏览器版本过低，如若获得良好的用户体验，建议更换或者升级！')
        }
        if(navigator.userAgent.match(/Trident/i) && navigator.userAgent.match(/MSIE 9.0/i)){
            $('.select-city .input-control').focus(function(){
              $(this).next('.icon-arrow').addClass('arrow-current')
              $('.from-items').addClass('from-items-current')

              $('.country-group li').on('click', function(){
                var oval = $.trim($(this).text())
                $('.select-city .input-control').val(oval)
                $('.from-items').removeClass('from-items-current')
                $('.icon-arrow').removeClass('arrow-current')
            })
          })
        }
      }
    }
    //初始化
    new WOW().init();
    //轮播图初始化
    var mySwiper = new Swiper ('.swiper-container', {
      loop: true,
      nextButton: '.swiper-button-next',
      prevButton: '.swiper-button-prev',
      autoplay : 5000,
    });
    //表单动画
    $('.input-control').focus(function(){
      $(this).parents('.items-from').addClass('add-animate-active')
    })
    $('.input-control').blur(function(){
      $(this).parents('.items-from').removeClass('add-animate-active')
    })
    // 显示下拉菜单
    $('.select-city .input-control').focus(function(){
        $(this).next('.icon-arrow').addClass('arrow-current')
        $('.from-items').addClass('from-items-current')

        $('.country-group li').on('click', function(){
          var oval = $.trim($(this).text())
          $('.select-city .input-control').val(oval)
          $('.from-items').removeClass('from-items-current')
          $('.icon-arrow').removeClass('arrow-current')
      })
    })

    $('.select-city .input-control').on('input',function(){
      if(!$(this).val()){
        $('.from-items').removeClass('from-items-current')
      }
    })
    //
    $(".handleSubmit").click(function() {
      var iphoneval = $('.user-ipone').val()
      var nameval = $('.user-name').val()
      var cityval = $('.city-val').val()
      if(!nameval){
        alert('请输入你的姓名')
        return false
      }
      if(!iphoneval || !(/^1(3|4|5|7|8)\d{9}$/.test(iphoneval))){
        alert('输入正确的手机号')
        return false
      }
      if(!cityval){
        alert('请选择城市')
      }
      $.ajax({
        url: '',
        type: 'post',
        data: {
          iphoneval: iphoneval,
          cityval: cityval,
          nameval: nameval
        },
        success: function(res){
          alert('提交成功')
        }
      })
    })
  });