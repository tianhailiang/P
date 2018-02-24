$(document).ready(function () {
    var b_name = navigator.appName;
    var b_version = navigator.appVersion;
    var version = b_version.split(";");
    var trim_version = version[1].replace(/[ ]/g, "");
    if (b_name == "Microsoft Internet Explorer") {
        /*如果是IE6或者IE7*/
        if (trim_version == "MSIE7.0" || trim_version == "MSIE6.0" || trim_version == "MSIE8.0" || trim_version == "MSIE9.0") {
            $('body').prepend('<div style="height:40px;line-height:40px;font-size:20px;color:#fff;background:#c13232;text-align:center;">您的IE浏览器版本过低，请更新IE10以上浏览器或使用其他浏览器</div>')
        }
    }
});