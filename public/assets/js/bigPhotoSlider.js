/**
 * Created by DXZ-Shuqin.Wang on 2017/10/17.
 */
function bigPhoto (array, index) {
    function getFormatDate(timestamp,p) {
        timestamp = parseInt(timestamp + '000');
        var newDate = new Date(timestamp);
        Date.prototype.format = function (format) {
            var date = {
                'M+': this.getMonth() + 1,
                'd+': this.getDate(),
                'h+': this.getHours(),
                'm+': this.getMinutes(),
                's+': this.getSeconds(),
                'q+': Math.floor((this.getMonth() + 3) / 3),
                'S+': this.getMilliseconds()
            };
            if (/(y+)/i.test(format)) {
                format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
            }
            for (var k in date) {
                if (new RegExp('(' + k + ')').test(format)) {
                    format = format.replace(RegExp.$1, RegExp.$1.length == 1
                        ? date[k] : ('00' + date[k]).substr(('' + date[k]).length));
                }
            }
            return format;
        }
        // return newDate.format('yyyy-MM-dd h:m');
        if(p==1){
            return newDate.format('yyyy');
        }else if(p==2){
            return newDate.format('MM');
        }else if(p==3){
            return newDate.format('dd');
        }else if(p==4){
            return newDate.format('yyyy-MM');
        }else if(p==5){
            return newDate.format('MM月dd号 hh:mm');
        }
    };
    var activePhoto = array[index];
    var bigIndex = index;
    var bigPhotoBoxHtml = '<div class="album-mask"><div class="album-box"><div class="close-btn iconfont">&#xe62d;</div><div class="album-top"><div class="change-btn prev-btn iconfont">&#xe612;</div><div class="change-btn next-btn iconfont">&#xe623;</div><div class="photo"><img src="'+ activePhoto.url +'" alt=""/></div></div><div class="album-bot"><span class="time">' +  getFormatDate(activePhoto.add_time, 5) +'</span><span class="desc">' + activePhoto.desc + '</span></div></div></div>';
    $('body').append($(bigPhotoBoxHtml));
    var album_mask = $('.album-mask');
    var close_btn = $('.close-btn');
    var prev_btn = $('.prev-btn');
    var next_btn = $('.next-btn');
    close_btn.on('click',function () {
        album_mask.remove();
    });
    prev_btn.on('click',function () {
        bigIndex--;
        if (bigIndex == 0 ){
            bigIndex = array.length - 1;
        }
        $(this).parents('.album-box').find('img').attr('src', array[bigIndex].url);
        $(this).parents('.album-box').find('.time').html(getFormatDate(array[bigIndex].add_time, 5));
        $(this).parents('.album-box').find('.desc').html(array[bigIndex].desc);
    });
    next_btn.on('click',function () {
        bigIndex++;
        if (bigIndex == array.length - 1 ){
            bigIndex = 0;
        }
        $(this).parents('.album-box').find('img').attr('src', array[bigIndex].url);
        $(this).parents('.album-box').find('.time').html(getFormatDate(array[bigIndex].add_time, 5));
        $(this).parents('.album-box').find('.desc').html(array[bigIndex].desc);
    })

};