
function onclick_ly(c,tar){
    if("undefined" == typeof jesong){
        var p='';
        if( c == 'c')
            p = 'n='+tar;
        else if(c == 'g'&&tar!=null&&tar!='0')
            p = 'g=' + tar;
        openChat(p);
    }else{
        jesong.win.openChat(c,tar);
    }
}

function openChat(c){
    var url = "http://jesong.jjl.cn/live/" +'chat.dll?c=1';
    url = url +"&chatUrl="+window.encodeURIComponent(window.location.href);
    if(getCook("im_refer")){
        url = url +"&refer="+window.encodeURIComponent(getCook("im_refer"));
    }
    if( typeof c == 'string' &&c.length !=0 ){
        url += '&'+c;
    }
    var p = "height=500,width=800,directories=no,location=no,menubar=no,resizeable=no,status=no,toolbar=no,top=100,left=200";
    try{
        var cw = window.open(url,'chat_'+1,p);cw.focus();
    }catch(e){
        if(c.force)window.location = url;
    }
}
var myjson={"2":{"a_as":"2","a_ca":"3","a_au":"4","a_us":"5","a_uk":"6","a_xxl":"514"},"37":{"a_as":"305","a_ca":"306","a_au":"307","a_us":"308","a_uk":"309","a_xxl":"519"},"27":{"a_as":"144","a_ca":"142","a_au":"143","a_us":"140","a_uk":"141","a_xxl":"530"},"16":{"a_as":"310","a_ca":"311","a_au":"312","a_us":"313","a_uk":"314","a_xxl":"507"},"38":{"a_as":"315","a_ca":"316","a_au":"317","a_us":"318","a_uk":"319","a_xxl":"512"},"29":{"a_as":"320","a_ca":"321","a_au":"322","a_us":"323","a_uk":"324","a_xxl":"506"},"28":{"a_as":"330","a_ca":"331","a_au":"332","a_us":"333","a_uk":"334","a_xxl":"524"},"22":{"a_as":"335","a_ca":"336","a_au":"337","a_us":"338","a_uk":"339","a_xxl":"496"},"30":{"a_as":"340","a_ca":"341","a_au":"342","a_us":"343","a_uk":"344","a_xxl":"529"},"26":{"a_as":"345","a_ca":"346","a_au":"348","a_us":"349","a_uk":"350","a_xxl":"522"},"24":{"a_as":"102","a_ca":"101","a_au":"100","a_us":"98","a_uk":"99","a_xxl":"518"},"18":{"a_as":"351","a_ca":"352","a_au":"353","a_us":"354","a_uk":"355","a_xxl":"535"},"13":{"a_as":"356","a_ca":"357","a_au":"358","a_us":"359","a_uk":"360","a_xxl":"502"},"4":{"a_jp":"37","a_ca":"38","a_au":"39","a_us":"41","a_uk":"40","a_ko":"161","a_xm":"162","a_xxl":"503","a_as":"172"},"17":{"a_as":"361","a_ca":"362","a_au":"363","a_us":"364","a_uk":"365","a_xxl":"520"},"34":{"a_as":"366","a_ca":"367","a_au":"368","a_us":"369","a_uk":"370","a_xxl":"499"},"3":{"a_as":"371","a_ca":"372","a_au":"373","a_us":"374","a_uk":"375","a_xxl":"523"},"36":{"a_as":"376","a_ca":"377","a_au":"378","a_us":"379","a_uk":"380","a_xxl":"516"},"5":{"a_as":"188","a_ca":"187","a_au":"186","a_us":"184","a_uk":"185","a_xxl":"521"},"33":{"a_as":"381","a_ca":"382","a_au":"383","a_us":"384","a_uk":"385","a_xxl":"500"},"21":{"a_as":"386","a_ca":"387","a_au":"388","a_us":"389","a_uk":"390","a_xxl":"510"},"6":{"a_as":"391","a_ca":"392","a_au":"393","a_us":"394","a_uk":"395","a_xxl":"508"},"14":{"a_as":"396","a_ca":"397","a_au":"398","a_us":"399","a_uk":"400","a_xxl":"509"},"8":{"a_as":"401","a_ca":"402","a_au":"403","a_us":"404","a_uk":"405","a_xxl":"494"},"9":{"a_as":"406","a_ca":"407","a_au":"408","a_us":"409","a_uk":"410","a_xxl":"498"},"20":{"a_as":"92","a_ca":"91","a_au":"90","a_us":"88","a_uk":"89","a_xxl":"531"},"31":{"a_as":"416","a_ca":"417","a_au":"418","a_us":"419","a_uk":"420","a_xxl":"492"},"12":{"a_as":"421","a_ca":"422","a_au":"423","a_us":"424","a_uk":"425","a_xxl":"517"},"39":{"a_as":"252","a_ca":"251","a_au":"250","a_us":"248","a_uk":"249","a_xxl":"504"},"23":{"a_as":"117","a_ca":"116","a_au":"115","a_us":"113","a_uk":"114","a_xxl":"511"},"45":{"a_as":"426","a_ca":"427","a_au":"428","a_us":"429","a_uk":"430","a_xxl":"495"},"15":{"a_as":"431","a_ca":"432","a_au":"433","a_us":"434","a_uk":"435","a_xxl":"505"},"35":{"a_as":"436","a_ca":"437","a_au":"438","a_us":"439","a_uk":"440","a_xxl":"536"},"32":{"a_as":"214","a_ca":"213","a_au":"212","a_us":"210","a_uk":"211","a_xxl":"552"},"11":{"a_as":"27","a_ca":"28","a_au":"29","a_us":"30","a_uk":"31","a_xxl":"513"},"25":{"a_as":"451","a_ca":"452","a_au":"453","a_us":"454","a_uk":"455","a_xxl":"533"},"19":{"a_as":"456","a_ca":"457","a_au":"458","a_us":"459","a_uk":"460","a_xxl":"526"},"10":{"a_as":"461","a_ca":"462","a_au":"463","a_us":"464","a_uk":"465","a_xxl":"528"},"43":{"a_as":"300","a_ca":"301","a_au":"302","a_us":"303","a_uk":"304","a_xxl":"527"},"40":{"a_as":"446","a_ca":"447","a_au":"448","a_us":"449","a_uk":"450","a_xxl":"493"},"41":{"a_as":"267","a_ca":"261","a_au":"264","a_us":"255","a_uk":"258","a_xxl":"532"},"42":{"a_as":"411","a_ca":"412","a_au":"413","a_us":"414","a_uk":"415","a_xxl":"497"},"7":{"a_as":"441","a_ca":"442","a_au":"443","a_us":"444","a_uk":"445","a_xxl":"501"},"44":{"a_as":"282","a_ca":"281","a_au":"283","a_us":"279","a_uk":"280","a_xxl":"515"},"46":{"a_as":"467","a_ca":"469","a_au":"468","a_us":"471","a_uk":"470","a_xxl":"534"},"47":{"a_as":"597","a_ca":"596","a_au":"594","a_us":"592","a_uk":"593","a_xxl":"595"},"48":{"a_as":"718","a_ca":"715","a_au":"716","a_us":"713","a_uk":"714","a_xxl":"717"}};

var _areaCode = $.cookie('currentarea');
//var _areaCode=1;
if(_areaCode == null) _areaCode = 1;

if(_areaCode==14){
    if($('.head-tel').length && $('.head-tel').length>0){
        $('.head-tel').html('汉口：<span>027-83805656</span><br>武昌：<span>027-67811600</span>');
    }
}
var _areaName=$('.city-cont [data-id='+_areaCode+']').attr('data-value');

var _listStrAll='<li><a onclick="onclick_ly(\'g\',\'55\')"target="_blank">法国咨询</a></li>'+
    '<li><a onclick="onclick_ly(\'g\',\'49\')"target="_blank">爱荷北欧咨询</a></li>'+
    '<li><a onclick="onclick_ly(\'g\',\'123\')"target="_blank">西意瑞咨询</a></li>'+
    '<li><a onclick="onclick_ly(\'g\',\'48\')"target="_blank">德国咨询</a></li>'+
    '<li><a onclick="onclick_ly(\'g\',\'54\')"target="_blank">移民咨询</a></li>'+
    '<li><a onclick="onclick_ly(\'g\',\'174\')"target="_blank">境外升转学</a></li>'+
    '<li style="border:0px; height:124px; margin-top:6px;"><img src="http://vip.jjl.cn/statics/jjlyx/images/weixin.png" width="112" height="114"></li>';

var _listStr='';
if(_areaCode==1){
    _listStr='<li><a onclick="onclick_ly(\'g\',\'253\')"target="_blank">('+_areaName+')美国中学留学</a></li>'+
        '<li><a onclick="onclick_ly(\'g\',\'247\')"target="_blank">('+_areaName+')美国本科留学</a></li>'+
        '<li><a onclick="onclick_ly(\'g\',\'246\')"target="_blank">('+_areaName+')美国研究生留学</a></li>'+
        '<li><a onclick="onclick_ly(\'g\',\'60\')"target="_blank">('+_areaName+')英国咨询</a></li>'+
        '<li><a onclick="onclick_ly(\'g\',\'812\')"target="_blank">('+_areaName+')英国高中咨询</a></li>'+
        '<li><a onclick="onclick_ly(\'g\',\'58\')"target="_blank">('+_areaName+')加拿大中小学/本科</a></li>'+
        '<li><a onclick="onclick_ly(\'g\',\'792\')"target="_blank">('+_areaName+')加拿大学院/研究生</a></li>'+
        '<li><a onclick="onclick_ly(\'g\',\'852\')"target="_blank">('+_areaName+')加拿大签证</a></li>'+
        '<li><a onclick="onclick_ly(\'g\',\'50\')"target="_blank">('+_areaName+')澳大利亚咨询</a></li>'+
        '<li><a onclick="onclick_ly(\'g\',\'57\')"target="_blank">('+_areaName+')新西兰咨询</a></li>'+
        '<li><a onclick="onclick_ly(\'g\',\'472\')"target="_blank">('+_areaName+')香港咨询</a></li>'+
        '<li><a onclick="onclick_ly(\'g\',\'52\')"target="_blank">('+_areaName+')新加坡/马来西亚</a></li>'+
        '<li><a onclick="onclick_ly(\'g\',\'56\')"target="_blank">('+_areaName+')日本咨询</a></li>'+
        '<li><a onclick="onclick_ly(\'g\',\'572\')"target="_blank">('+_areaName+')日本研究生</a></li>'+
        '<li><a onclick="onclick_ly(\'g\',\'46\')"target="_blank">('+_areaName+')韩国咨询</a></li>'+
        '<li><a onclick="onclick_ly(\'g\',\'51\')"target="_blank">('+_areaName+')俄罗斯咨询</a></li>';

}else if(_areaCode==100){
    _listStr='<li><a onclick="onclick_ly(\'g\',\'40\')"target="_blank">('+_areaName+')英国、香港咨询</a></li>'+
        '<li><a onclick="onclick_ly(\'g\',\'41\')"target="_blank">('+_areaName+')美国咨询</a></li>'+
        '<li><a onclick="onclick_ly(\'g\',\'39\')"target="_blank">('+_areaName+')澳洲咨询</a></li>'+
        '<li><a onclick="onclick_ly(\'g\',\'503\')"target="_blank">('+_areaName+')新西兰咨询</a></li>'+
        '<li><a onclick="onclick_ly(\'g\',\'38\')"target="_blank">('+_areaName+')加拿大咨询</a></li>'+
        '<li><a onclick="onclick_ly(\'g\',\'37\')"target="_blank">('+_areaName+')日本咨询</a></li>'+
        '<li><a onclick="onclick_ly(\'g\',\'161\')"target="_blank">('+_areaName+')韩国咨询</a></li>'+
        '<li><a onclick="onclick_ly(\'g\',\'162\')"target="_blank">('+_areaName+')新马俄乌咨询</a></li>';
}else{
    _listStr='<li><a onclick="onclick_ly(\'g\',\''+myjson[_areaCode].a_uk+'\')"target="_blank">('+_areaName+')英国、香港咨询</a></li>'+
        '<li><a onclick="onclick_ly(\'g\',\''+myjson[_areaCode].a_us+'\')"target="_blank">('+_areaName+')美国咨询</a></li>'+
        '<li><a onclick="onclick_ly(\'g\',\''+myjson[_areaCode].a_au+'\')"target="_blank">('+_areaName+')澳洲咨询</a></li>'+
        '<li><a onclick="onclick_ly(\'g\',\''+myjson[_areaCode].a_xxl+'\')"target="_blank">('+_areaName+')新西兰咨询</a></li>'+
        '<li><a onclick="onclick_ly(\'g\',\''+myjson[_areaCode].a_ca+'\')"target="_blank">('+_areaName+')加拿大咨询</a></li>'+
        '<li><a onclick="onclick_ly(\'g\',\''+myjson[_areaCode].a_as+'\')"target="_blank">('+_areaName+')亚洲咨询</a></li>';

}

//咨询
function rand_zixun(country, catid, id, area, num, tp) {
    var tp = tp ? tp : 'ly';
    var num = num ? num : 1;
    var area = area ? area : get_location(2);
    var data = {country: country, area: area, num: num, tp: tp, catid: catid, id: id};
    var url = "http://www.jjl.cn/api.php?op=zixun_count&type=random";

    $.ajax({
        type: "post",
        url: url,
        data: data,
        dataType: "json",
        success: function (data) {
            if (data.code == '1000') {
                var tar = get_tar(country, tp);
                onclick_ly('g', tar);
            } else if (data.code == '1001') {
                //tempwindow.close();
            } else {
                alert("错误！");
            }
        },
        error: function (ae) {
        },
        async: false
    });
}

function get_tar(country,type){
    var area = get_location(3);
    var tar = '1';

    if(type == 'ly'){
        if(country == '美国'){
            if(area == 1){
                tar = '246';
            }
            else{
                tar = myjson[area].a_us;
            }
        }
        else if(country == '英国' || country == '香港'){
            if(country == '英国' && area == 1){
                tar = '60';
            }
            else if(country == '香港' && area == 1){
                tar = '472';
            }
            else{
                tar = myjson[area].a_uk;
            }
        }
        else if(country == '澳洲' || country == '澳大利亚'){
            if(area == 1){
                tar = '50';
            }
            else{
                tar = myjson[area].a_au;
            }
        }
        else if(country == '新西兰'){
            if(area == 1){
                tar = '57';
            }
            else{
                tar = myjson[area].a_xxl;
            }
        }
        else if(country == '亚洲'){
            if(area == 1){
                tar = '56';
            }else{
                tar = myjson[area].a_as;
            }
        }
        else if(country == '法国'){
            tar = '55';
        }
        else if(country == '爱尔兰' || country == '荷兰' || country == '北欧'){
            tar = '49';
        }
        else if(country == '意大利' || country == '西班牙' || country == '瑞士'){
            tar = '123';
        }
        else if(country == '德国'){
            tar = '48';
        }
        else if(country == '俄罗斯' || country == '乌克兰' || country == '白俄罗斯'){
            if(area == 1){
                tar = '51';
            }
            else{
                tar = myjson[area].a_as;
            }
        }
        else if(country == '新加坡' || country == '马拉西亚'){
            if(area == 1){
                tar = '52';
            }
            else{
                tar = myjson[area].a_xm || myjson[area].a_as
            }
        }
        else if(country == '日本'){
            if(area == 1){
                tar = '56';
            } else {
                tar = myjson[area].a_as;
            }
        }
        else if(country == '韩国'){
            if(area == 1){
                tar = '46';
            }
            else if(area == 4){
                tar = myjson[area].a_ko;
            }
            else{
                tar = myjson[area].a_ko || myjson[area].a_as;
            }
        }
        else if(country == '加拿大'){
            if(area == 1){
                tar = '58';
            }
            else{
                tar = myjson[area].a_ca;
            }
        }
    }
    else if(type == 'ym'){
        tar = '54';
    }
    else if(type == 'yx'){
        tar = '154';
    }

    return tar;
}
function get_location(_type){
    currentarea = $.cookie('currentarea');
    if(_type == 1){
        return $('.city-box [data-id='+currentarea+']').attr('data-value');
    }else if(_type == 2){
        return $('.city-box [data-id='+currentarea+']').attr('data-name');
    }else if(_type == 3){
        return currentarea;
    }
}
