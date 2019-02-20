/**
 * Created by DXZ-Hui.Cao on 2017/8/24.
 */
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
//咨询
function rand_zixun(country, catid, id, area, num, tp) {
  var tp = tp ? tp : 'ly';
  var num = num ? num : 1;
  var area = area ? area : get_location(2);
  var data = {country: country, area: area, num: num, tp: tp, catid: catid, id: id};
  //console.log(data);
  var tar = get_tar(country, tp);
  onclick_ly('g', tar);
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
    } else if(country == '英国' || country == '香港'){
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
  _areaCode = cookie('currentarea') ? cookie('currentarea') : 1;
  if(_type == 1){
    return $('.city-box [data-id='+_areaCode+']').attr('data-value');
  }else if(_type == 2){
    // console.log("返回",$('.city-box [data-id='+_areaCode+']').attr('data-name'));
    return $('.city-box [data-id='+_areaCode+']').attr('data-name');

  }else if(_type == 3){
    return _areaCode;
  }
}
var myjson={"2":{"a_as":"2","a_ca":"3","a_au":"4","a_us":"5","a_uk":"6","a_xxl":"514"},"37":{"a_as":"305","a_ca":"306","a_au":"307","a_us":"308","a_uk":"309","a_xxl":"519"},"27":{"a_as":"144","a_ca":"142","a_au":"143","a_us":"140","a_uk":"141","a_xxl":"530"},"16":{"a_as":"310","a_ca":"311","a_au":"312","a_us":"313","a_uk":"314","a_xxl":"507"},"38":{"a_as":"315","a_ca":"316","a_au":"317","a_us":"318","a_uk":"319","a_xxl":"512"},"29":{"a_as":"320","a_ca":"321","a_au":"322","a_us":"323","a_uk":"324","a_xxl":"506"},"28":{"a_as":"330","a_ca":"331","a_au":"332","a_us":"333","a_uk":"334","a_xxl":"524"},"22":{"a_as":"335","a_ca":"336","a_au":"337","a_us":"338","a_uk":"339","a_xxl":"496"},"30":{"a_as":"340","a_ca":"341","a_au":"342","a_us":"343","a_uk":"344","a_xxl":"529"},"26":{"a_as":"345","a_ca":"346","a_au":"348","a_us":"349","a_uk":"350","a_xxl":"522"},"24":{"a_as":"102","a_ca":"101","a_au":"100","a_us":"98","a_uk":"99","a_xxl":"518"},"18":{"a_as":"351","a_ca":"352","a_au":"353","a_us":"354","a_uk":"355","a_xxl":"535"},"13":{"a_as":"356","a_ca":"357","a_au":"358","a_us":"359","a_uk":"360","a_xxl":"502"},"4":{"a_jp":"37","a_ca":"38","a_au":"39","a_us":"41","a_uk":"40","a_ko":"161","a_xm":"162","a_xxl":"503","a_as":"172"},"17":{"a_as":"361","a_ca":"362","a_au":"363","a_us":"364","a_uk":"365","a_xxl":"520"},"34":{"a_as":"366","a_ca":"367","a_au":"368","a_us":"369","a_uk":"370","a_xxl":"499"},"3":{"a_as":"371","a_ca":"372","a_au":"373","a_us":"374","a_uk":"375","a_xxl":"523"},"36":{"a_as":"376","a_ca":"377","a_au":"378","a_us":"379","a_uk":"380","a_xxl":"516"},"5":{"a_as":"188","a_ca":"187","a_au":"186","a_us":"184","a_uk":"185","a_xxl":"521"},"33":{"a_as":"381","a_ca":"382","a_au":"383","a_us":"384","a_uk":"385","a_xxl":"500"},"21":{"a_as":"386","a_ca":"387","a_au":"388","a_us":"389","a_uk":"390","a_xxl":"510"},"6":{"a_as":"391","a_ca":"392","a_au":"393","a_us":"394","a_uk":"395","a_xxl":"508"},"14":{"a_as":"396","a_ca":"397","a_au":"398","a_us":"399","a_uk":"400","a_xxl":"509"},"8":{"a_as":"401","a_ca":"402","a_au":"403","a_us":"404","a_uk":"405","a_xxl":"494"},"9":{"a_as":"406","a_ca":"407","a_au":"408","a_us":"409","a_uk":"410","a_xxl":"498"},"20":{"a_as":"92","a_ca":"91","a_au":"90","a_us":"88","a_uk":"89","a_xxl":"531"},"31":{"a_as":"416","a_ca":"417","a_au":"418","a_us":"419","a_uk":"420","a_xxl":"492"},"12":{"a_as":"421","a_ca":"422","a_au":"423","a_us":"424","a_uk":"425","a_xxl":"517"},"39":{"a_as":"252","a_ca":"251","a_au":"250","a_us":"248","a_uk":"249","a_xxl":"504"},"23":{"a_as":"117","a_ca":"116","a_au":"115","a_us":"113","a_uk":"114","a_xxl":"511"},"45":{"a_as":"426","a_ca":"427","a_au":"428","a_us":"429","a_uk":"430","a_xxl":"495"},"15":{"a_as":"431","a_ca":"432","a_au":"433","a_us":"434","a_uk":"435","a_xxl":"505"},"35":{"a_as":"436","a_ca":"437","a_au":"438","a_us":"439","a_uk":"440","a_xxl":"536"},"32":{"a_as":"214","a_ca":"213","a_au":"212","a_us":"210","a_uk":"211","a_xxl":"552"},"11":{"a_as":"27","a_ca":"28","a_au":"29","a_us":"30","a_uk":"31","a_xxl":"513"},"25":{"a_as":"451","a_ca":"452","a_au":"453","a_us":"454","a_uk":"455","a_xxl":"533"},"19":{"a_as":"456","a_ca":"457","a_au":"458","a_us":"459","a_uk":"460","a_xxl":"526"},"10":{"a_as":"461","a_ca":"462","a_au":"463","a_us":"464","a_uk":"465","a_xxl":"528"},"43":{"a_as":"300","a_ca":"301","a_au":"302","a_us":"303","a_uk":"304","a_xxl":"527"},"40":{"a_as":"446","a_ca":"447","a_au":"448","a_us":"449","a_uk":"450","a_xxl":"493"},"41":{"a_as":"267","a_ca":"261","a_au":"264","a_us":"255","a_uk":"258","a_xxl":"532"},"42":{"a_as":"411","a_ca":"412","a_au":"413","a_us":"414","a_uk":"415","a_xxl":"497"},"7":{"a_as":"441","a_ca":"442","a_au":"443","a_us":"444","a_uk":"445","a_xxl":"501"},"44":{"a_as":"282","a_ca":"281","a_au":"283","a_us":"279","a_uk":"280","a_xxl":"515"},"46":{"a_as":"467","a_ca":"469","a_au":"468","a_us":"471","a_uk":"470","a_xxl":"534"},"47":{"a_as":"597","a_ca":"596","a_au":"594","a_us":"592","a_uk":"593","a_xxl":"595"},"48":{"a_as":"718","a_ca":"715","a_au":"716","a_us":"713","a_uk":"714","a_xxl":"717"}};


$(function(){
  var iDcity1 = {
    1:['北京','北京分公司：北京市建国门外大街永安东里米阳大厦5层（永安里地铁C口向南50米)','服务专线：010-65685656'],
    5:['成都','成都分公司：成都市总府路2号时代广场A座18层','服务专线：028-85595757'],
    7:['重庆','重庆分公司：重庆市渝中区民权路28号英利国际金融中心37-7，37-8','服务专线：023-60335656'],
    19:['长沙','长沙分公司：长沙市芙蓉区定王大厦28楼28-29-30','服务专线：0731-82563355'],
    25:['长春','长春分公司：长春市西安大路727号中银大厦A座22层','服务专线：0431-81811818'],
    41:['常州','常州分公司：常州市钟楼区延陵西路99号嘉业国贸大厦23层2307-2308','服务专线：0519-83335656'],
    13:['大连','大连分公司：大连市中山区人民路平安大厦25层','服务专线：0411-39865959'],
    43:['东莞','东莞分公司：广东省东莞市南城区金盈大厦C区7层','服务专线：0769-22905656'],
    37:['佛山','佛山分公司：佛山市禅城区城门头路18号ICC国际商业中心17层','服务专线：0757-82030588'],
    39:['福州','福州分公司：福州市鼓楼区五四路128号恒力城写字楼27F','服务专线：0591-83625656'],
    3:['广州','广州分公司：广州市天河区体育西路191号中石化大厦b座33楼3310—3321','服务专线：020-38175656'],
    35:['贵阳','贵阳分公司：贵阳市云岩区中华北路284号天毅大厦20层','服务专线：0851-82215656'],
    6:['杭州','杭州分公司：杭州市杭大路15号嘉华国际商务中心706','服务专线：0571-28887999'],
    22:['合肥','合肥分公司：合肥市包河区万达广场7号写字楼22层2204','服务专线：0551-62866565'],
    24:['哈尔滨','哈尔滨分公司：哈尔滨市道里区上海街7号海上银座B座2001室','服务专线：0451-58669777'],
    26:['呼市','呼和浩特分公司：内蒙古呼和浩特市中山西路1号海亮大厦A座1801','服务专线：0471-3817676'],
    32:['邯郸','邯郸分公司：邯郸市人民东路350号嘉华大厦806室','服务专线：0310-5709558'],
    46:['海南','海南分公司：海南省海口市龙华区滨海大道103号财富广场28楼A室','服务专线：0898-68635656'],
    9:['济南','济南分公司：济南市市中区纬二路51号商会大厦A座33层（大观园南邻）','服务专线：0531-81851155'],
    30:['吉林','吉林分公司：吉林市昌邑区财富广场B栋8层803-807','服务专线：0432-62885656'],
    21:['昆明','昆明分公司：昆明市东风东路36号建投大厦6楼金吉列留学','服务专线：0871-63536688'],
    27:['兰州','兰州分公司：兰州市城关区张掖路1号保利大厦a座15层','服务专线：0931-8185656'],
    48:['洛阳','洛阳分公司：河南省洛阳市西工区升龙广场E区汇金中心1211','服务专线：0379-65165656'],
    16:['南京','南京分公司：南京市鼓楼区汉中路8号金轮国际广场2401室','服务专线：025-85552299'],
    29:['南昌','南昌分公司：南昌市广场南路恒茂国际中心16栋B座27层','服务专线：0791-86665966'],
    34:['宁波','宁波分公司：宁波市海曙区药行街42号银亿环球中心B座803','服务专线：0574-87008686'],
    38:['南宁','南宁分公司：南宁市青秀区金湖路59号地王国际商会中心30层CD','服务专线：0771-5775656'],
    10:['青岛','青岛分公司：青岛市市南区香港中路40号数码旗舰大厦19层A1室','服务专线：0532-86667776'],
    2:['上海','上海分公司：上海市黄浦区徐家汇路555号广发大厦三层','服务专线：021-61581818'],
    8:['沈阳','沈阳分公司：沈阳市和平区和平北大街69号总统大厦A座14层','服务专线：024-22812866'],
    12:['石家庄','石家庄分公司：石家庄市新华区中华北大街50号军创国际商务花园1202室','服务专线：0311-85368866'],
    20:['深圳','深圳分公司：深圳市福田区福华一路138号国际商会大厦A座25层','服务专线：0755-82931818'],
    23:['苏州','苏州分公司：苏州市工业园区苏州大道西8号中银惠龙大厦6层','服务专线：0512-62893339'],
    4:['天津','天津分公司：天津市河西区大沽南路362号天津图书大厦10层1088室','服务专线：022-23263399'],
    17:['太原','太原分公司：太原市南内环街100号恒地大厦12层','服务专线：0351-7668080'],
    18:['唐山','唐山分公司：唐山市路南区新华西道32号新华贸写字楼16层','服务专线：0315-6328566'],
    14:['武汉','武汉分公司：武汉市解放大道航空路新世界中心C座20层','服务专线：027-83805656'],
    /*14:['武昌','武昌分公司：武汉市洪山区珞瑜路10号群光中心百脑汇23层','服务专线：027-67811600'],
     14:['汉口','汉口分公司：武汉市航空路新世界中心C座20层','服务专线：027-83805656'],*/
    33:['无锡','无锡分公司：无锡市崇安区中山路531号红豆国际广场办公楼19层','服务专线：0510-81805656'],
    42:['温州','烟台分公司：温州市鹿城区车站大道577号财富中心1302','服务专线：0577-88815656'],
    15:['西安','西安分公司：西安市碑林区南关正街88号长安国际C座808','服务专线：029-87995656'],
    28:['厦门','厦门分公司：厦门市思明区鹭江道100号财富中心5层','服务专线：0592-2115656'],
    36:['徐州','徐州分公司：徐州市泉山区建国西路75号财富广场A座四楼','服务专线：0516-85785656'],
    45:['西宁','西宁分公司：青海省西宁市城中区西大街42号三田世纪广场写字楼13层1307-1308号','服务专线：0971-4925656'],
    47:['新疆','新疆分公司：乌鲁木齐市红山路16号广汇时代广场D座24层','服务专线：0991-2655656'],
    31:['烟台','烟台分公司：烟台市芝罘区海港路25号阳光100A座2907室','服务专线：0535-6275656'],
    40:['银川','银川分公司：银川市兴庆区文化西街国际贸易中心C栋7层','服务专线：0951-7616655'],
    44:['宜昌','宜昌分公司：宜昌市沿江大道特168-5号，万达广场A座2505室','服务专线：0717-6625656'],
    11:['郑州','郑州分公司：郑州市金水区经三路68号2号楼招商银行大厦12层1202室','服务专线：0371-60228686']
  };



  function openChat(c){
    //console.log(c)
    var url = "https://jesong.jjl.cn/live/" +'chat.do?c=1';
    url = url +"&chatUrl="+window.encodeURIComponent(window.location.href);
    if(cookie("im_refer")){
      url = url +"&refer="+window.encodeURIComponent(cookie("im_refer"));
    }
    if( typeof c == 'string' &&c.length !=0 ){
      url += '&'+c;
    }
    var p = "height=500,width=320,directories=no,location=no,menubar=no,resizeable=no,status=no,toolbar=no,top=100,left=200";
    try{
      console.log(url)
      var cw = window.open(url,'chat_'+1,p);
      cw.focus();
    }catch(e){
      if(c.force)window.location = url;
    }
  }

  var _areaCode = 1;

  function get_zxbarHtml(){
//var _areaName=$('.city-cont [data-id='+_areaCode+']').attr('data-value')

    var _areaName=null;

    if(cookie('currentarea')){
      _areaCode = cookie('currentarea');
      _areaName=  iDcity1[cookie('currentarea')][0];
    }else{
      _areaName='北京';
      _areaCode=1;
    }
    var _listStrAll='<li><a onclick="onclick_ly(\'g\',\'55\')"target="_blank">法国咨询</a></li>'+
      '<li><a onclick="onclick_ly(\'g\',\'49\')"target="_blank">爱荷北欧咨询</a></li>'+
      '<li><a onclick="onclick_ly(\'g\',\'123\')"target="_blank">西意瑞咨询</a></li>'+
      '<li><a onclick="onclick_ly(\'g\',\'48\')"target="_blank">德国/奥地利咨询</a></li>'+
      '<li><a onclick="onclick_ly(\'g\',\'54\')"target="_blank">移民咨询</a></li>'+
     /* '<li><a onclick="onclick_ly(\'g\',\'174\')"target="_blank">境外升转学</a></li>'+*/
      '<li style="border:0px; height:124px; margin-top:6px;text-align: center"><img src="https://vip.jjl.cn/statics/jjlyx/images/weixin.png" width="112" height="114"></li>';

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
        '<li><a onclick="onclick_ly(\'g\',\'472\')"target="_blank">('+_areaName+')中国香港/中国澳门咨询</a></li>'+
        '<li><a onclick="onclick_ly(\'g\',\'52\')"target="_blank">('+_areaName+')新加坡/马来西亚</a></li>'+
        '<li><a onclick="onclick_ly(\'g\',\'56\')"target="_blank">('+_areaName+')日本咨询</a></li>'+
        '<li><a onclick="onclick_ly(\'g\',\'572\')"target="_blank">('+_areaName+')日本研究生</a></li>'+
        '<li><a onclick="onclick_ly(\'g\',\'46\')"target="_blank">('+_areaName+')韩国咨询</a></li>'+
        '<li><a onclick="onclick_ly(\'g\',\'51\')"target="_blank">('+_areaName+')俄罗斯咨询</a></li>';

    }else if(_areaCode==100){
      _listStr='<li><a onclick="onclick_ly(\'g\',\'40\')"target="_blank">('+_areaName+')英国/中国香港/中国澳门咨询</a></li>'+
        '<li><a onclick="onclick_ly(\'g\',\'41\')"target="_blank">('+_areaName+')美国咨询</a></li>'+
        '<li><a onclick="onclick_ly(\'g\',\'39\')"target="_blank">('+_areaName+')澳洲咨询</a></li>'+
        '<li><a onclick="onclick_ly(\'g\',\'503\')"target="_blank">('+_areaName+')新西兰咨询</a></li>'+
        '<li><a onclick="onclick_ly(\'g\',\'38\')"target="_blank">('+_areaName+')加拿大咨询</a></li>'+
        '<li><a onclick="onclick_ly(\'g\',\'37\')"target="_blank">('+_areaName+')日本咨询</a></li>'+
        '<li><a onclick="onclick_ly(\'g\',\'161\')"target="_blank">('+_areaName+')韩国咨询</a></li>'+
        '<li><a onclick="onclick_ly(\'g\',\'162\')"target="_blank">('+_areaName+')新马俄乌咨询</a></li>';
    }else{
      _listStr='<li><a onclick="onclick_ly(\'g\',\''+myjson[_areaCode].a_uk+'\')"target="_blank">('+_areaName+')英国/中国香港/中国澳门咨询</a></li>'+
        '<li><a onclick="onclick_ly(\'g\',\''+myjson[_areaCode].a_us+'\')"target="_blank">('+_areaName+')美国咨询</a></li>'+
        '<li><a onclick="onclick_ly(\'g\',\''+myjson[_areaCode].a_au+'\')"target="_blank">('+_areaName+')澳洲咨询</a></li>'+
        '<li><a onclick="onclick_ly(\'g\',\''+myjson[_areaCode].a_xxl+'\')"target="_blank">('+_areaName+')新西兰咨询</a></li>'+
        '<li><a onclick="onclick_ly(\'g\',\''+myjson[_areaCode].a_ca+'\')"target="_blank">('+_areaName+')加拿大咨询</a></li>'+
        '<li><a onclick="onclick_ly(\'g\',\''+myjson[_areaCode].a_as+'\')"target="_blank">('+_areaName+')亚洲咨询</a></li>';

    }
    return _listStr + _listStrAll;
  }



//在线咨询列表展示
  $("#lylist").html(get_zxbarHtml());

  if (_areaCode == 1) {
    $("#quick_links_pop").css('margin-top', '-345px');
  } else {
    $("#quick_links_pop").css('margin-top', '-170px');
  }

  $(".quick_links_panel li").mouseenter(function () {
    $(this).children(".mp_tooltip").animate({left: -92, queue: true});
    $(this).children(".mp_tooltip").css("visibility", "visible");
    $(this).children(".ibar_login_box").css("display", "block");
  });
  $(".quick_links_panel li").mouseleave(function () {
    $(this).children(".mp_tooltip").css("visibility", "hidden");
    $(this).children(".mp_tooltip").animate({left: -121, queue: true});
    $(this).children(".ibar_login_box").css("display", "none");
  });
  $(".quick_toggle li").mouseover(function () {
    $(this).children(".mp_qrcode").show();
  });
  $(".quick_toggle li").mouseleave(function () {
    $(this).children(".mp_qrcode").hide();
  });
  var sUserAgent = navigator.userAgent.toLowerCase();
  if(sUserAgent .match(/ipad/i) == "ipad"){
    $(".jiang").on("touchstart",function(){
      if( $(".jiang").css("display")=="block"){
        $("#jisuanqi").css("display", "none");
      }else{
        $("#jisuanqi").css("display", "block");
      }
    })
    $(".jiang").click(function(){
      window.open(fn.no_urlgen('zt/2019/20190121_liuxuejisuanqi/index.html'));
    })
    $(".my").hover(function () {
      $(this).find("img").css("display","none");
      $(this).find("p").css("display","block");
      $("#quick_links_pop").css("display", "none");
      $("#comment_con").css("display", "none");
      $("#r_comment").css("background", "#9a9a9a");
      var login_nickname = JSON.parse(cookie('login_ss'));
      if(login_nickname){
        if(login_nickname.usertype==1){
          window.location.href=fn.no_urlgen('user_center', 'revcomment');
        }else if(login_nickname.usertype==2){
          window.location.href=fn.no_urlgen('advisor_center');
        }
      }else{
        getlogin();
      }
    },function(){
      $(this).find("p").css("display","none");
      $(this).find("img").css("display","block");
    });
  }else{
    $(".jiang").hover(function () {
      $("#jisuanqi").css("display", "block");
    }, function () {
      $("#jisuanqi").css("display", "none");
    });
    $(".jiang").click(function(){
      window.open(fn.no_urlgen('zt/2019/20190121_liuxuejisuanqi/index.html'));
    })
    $(".my").hover(function () {
      $(this).find("img").css("display","none");
      $(this).find("p").css("display","block");
      $("#quick_links_pop").css("display", "none");
      $("#comment_con").css("display", "none");
      $("#r_comment").css("background", "#9a9a9a");
    },function(){
      $(this).find("p").css("display","none");
      $(this).find("img").css("display","block");
    });
    $(".my").on("click",function(){
      var login_nickname = JSON.parse(cookie('login_ss'));
      if(login_nickname){
        if(login_nickname.usertype==1){
          window.open(fn.no_urlgen('user_center', 'revcomment'));
        }else if(login_nickname.usertype==2){
          window.open(fn.no_urlgen('advisor_center'));
        }
      }else{
        getlogin();

      }
    })

  }


// right: 40px; margin-top: -200px; display: block; width: 170px;
  $(".zixun").on("click", function () {
    $("#quick_links_pop").css({"display": "block", "right": "40px", "margin-top": "-345px", "width": "200px"})
  })

//关闭弹框
  $(document).on("click","#guanbi_tanchu",function(){
    $(this).css("display", "none")
  })

  $(".ibar_closebtn").on("click",function(){
    $(this).parent("#quick_links_pop").css("display","none")
  })

  /*右侧-评论*/
  $("#r_comment").hover(function(){
    /* $("#comment_con").css("display", "block");*/
    $("#r_comment").css("background", "#C13232");
    /*  $("#quick_links_pop").css("display", "none");*/
  },function(){
    /* $("#comment_con").css("display", "none");*/
    $("#r_comment").css("background", "#9a9a9a");
  })
  $("#r_comment").on("click",function(){
    if($("#comment_con").css("display")=="none"){
      show_guanggao();
      $("#comment_con").css("display", "block");
      $("#quick_links_pop").css("display", "none")
    }
  })
  $("#comment_close").on("click", function () {
    $("#comment_con").css("display", "none");
    $("#r_comment").css("background", "#9a9a9a");
    return false
  })
  $("#zxzx").hover(function(){
    /*$("#quick_links_pop").css("display", "block");*/
    $("#comment_con").css("display", "none");
    $("#r_comment").css("background", "#9a9a9a");
  },function(){
    /*  $("#quick_links_pop").css("display", "none");*/
  });
  $("#zxzx").on("click",function(){
    $("#quick_links_pop").css("display", "block")
  })

  $(".weixin-slide").hover(function(){
    var login_nickname = JSON.parse(cookie('login_ss'));
    if (login_nickname) {
      $(".weixin-slide-img").css("display","block");
      $("#quick_links_pop").css("display", "none");
      $("#comment_con").css("display", "none");
      $("#r_comment").css("background", "#9a9a9a");
    }
  },function(){
    $(".weixin-slide-img").css("display","none")
  });
  $(".qq-slide").hover(function(){
    var login_nickname = JSON.parse(cookie('login_ss'));
    if (login_nickname) {
      $(".qq-slide-img").css("display","block");
      $("#quick_links_pop").css("display", "none");
      $("#comment_con").css("display", "none");
      $("#r_comment").css("background", "#9a9a9a");
    }
  },function(){
    $(".qq-slide-img").css("display","none")
  });
  $('#to_top').click(function(){
    $('html , body').animate({scrollTop: 0},'slow');
  });

//====================弹窗==============


  var myjson1={"1":{"a_as":"873","a_ca":"875","a_au":"872","a_us":"253","a_uk":"60","a_xxl":"57"},"2":{"a_as":"2","a_ca":"3","a_au":"4","a_us":"5","a_uk":"6","a_xxl":"514"},"37":{"a_as":"305","a_ca":"306","a_au":"307","a_us":"308","a_uk":"309","a_xxl":"519"},"27":{"a_as":"144","a_ca":"142","a_au":"143","a_us":"140","a_uk":"141","a_xxl":"530"},"16":{"a_as":"310","a_ca":"311","a_au":"312","a_us":"313","a_uk":"314","a_xxl":"507"},"38":{"a_as":"315","a_ca":"316","a_au":"317","a_us":"318","a_uk":"319","a_xxl":"512"},"29":{"a_as":"320","a_ca":"321","a_au":"322","a_us":"323","a_uk":"324","a_xxl":"506"},"28":{"a_as":"330","a_ca":"331","a_au":"332","a_us":"333","a_uk":"334","a_xxl":"524"},"22":{"a_as":"335","a_ca":"336","a_au":"337","a_us":"338","a_uk":"339","a_xxl":"496"},"30":{"a_as":"340","a_ca":"341","a_au":"342","a_us":"343","a_uk":"344","a_xxl":"529"},"26":{"a_as":"345","a_ca":"346","a_au":"348","a_us":"349","a_uk":"350","a_xxl":"522"},"24":{"a_as":"102","a_ca":"101","a_au":"100","a_us":"98","a_uk":"99","a_xxl":"518"},"18":{"a_as":"351","a_ca":"352","a_au":"353","a_us":"354","a_uk":"355","a_xxl":"535"},"13":{"a_as":"356","a_ca":"357","a_au":"358","a_us":"359","a_uk":"360","a_xxl":"502"},"4":{"a_jp":"37","a_ca":"38","a_au":"39","a_us":"41","a_uk":"40","a_ko":"161","a_xm":"162","a_xxl":"503","a_as":"172"},"17":{"a_as":"361","a_ca":"362","a_au":"363","a_us":"364","a_uk":"365","a_xxl":"520"},"34":{"a_as":"366","a_ca":"367","a_au":"368","a_us":"369","a_uk":"370","a_xxl":"499"},"3":{"a_as":"371","a_ca":"372","a_au":"373","a_us":"374","a_uk":"375","a_xxl":"523"},"36":{"a_as":"376","a_ca":"377","a_au":"378","a_us":"379","a_uk":"380","a_xxl":"516"},"5":{"a_as":"188","a_ca":"187","a_au":"186","a_us":"184","a_uk":"185","a_xxl":"521"},"33":{"a_as":"381","a_ca":"382","a_au":"383","a_us":"384","a_uk":"385","a_xxl":"500"},"21":{"a_as":"386","a_ca":"387","a_au":"388","a_us":"389","a_uk":"390","a_xxl":"510"},"6":{"a_as":"391","a_ca":"392","a_au":"393","a_us":"394","a_uk":"395","a_xxl":"508"},"14":{"a_as":"396","a_ca":"397","a_au":"398","a_us":"399","a_uk":"400","a_xxl":"509"},"8":{"a_as":"401","a_ca":"402","a_au":"403","a_us":"404","a_uk":"405","a_xxl":"494"},"9":{"a_as":"406","a_ca":"407","a_au":"408","a_us":"409","a_uk":"410","a_xxl":"498"},"20":{"a_as":"92","a_ca":"91","a_au":"90","a_us":"88","a_uk":"89","a_xxl":"531"},"31":{"a_as":"416","a_ca":"417","a_au":"418","a_us":"419","a_uk":"420","a_xxl":"492"},"12":{"a_as":"421","a_ca":"422","a_au":"423","a_us":"424","a_uk":"425","a_xxl":"517"},"39":{"a_as":"252","a_ca":"251","a_au":"250","a_us":"248","a_uk":"249","a_xxl":"504"},"23":{"a_as":"117","a_ca":"116","a_au":"115","a_us":"113","a_uk":"114","a_xxl":"511"},"45":{"a_as":"426","a_ca":"427","a_au":"428","a_us":"429","a_uk":"430","a_xxl":"495"},"15":{"a_as":"431","a_ca":"432","a_au":"433","a_us":"434","a_uk":"435","a_xxl":"505"},"35":{"a_as":"436","a_ca":"437","a_au":"438","a_us":"439","a_uk":"440","a_xxl":"536"},"32":{"a_as":"214","a_ca":"213","a_au":"212","a_us":"210","a_uk":"211","a_xxl":"552"},"11":{"a_as":"27","a_ca":"28","a_au":"29","a_us":"30","a_uk":"31","a_xxl":"513"},"25":{"a_as":"451","a_ca":"452","a_au":"453","a_us":"454","a_uk":"455","a_xxl":"533"},"19":{"a_as":"456","a_ca":"457","a_au":"458","a_us":"459","a_uk":"460","a_xxl":"526"},"10":{"a_as":"461","a_ca":"462","a_au":"463","a_us":"464","a_uk":"465","a_xxl":"528"},"43":{"a_as":"300","a_ca":"301","a_au":"302","a_us":"303","a_uk":"304","a_xxl":"527"},"40":{"a_as":"446","a_ca":"447","a_au":"448","a_us":"449","a_uk":"450","a_xxl":"493"},"41":{"a_as":"267","a_ca":"261","a_au":"264","a_us":"255","a_uk":"258","a_xxl":"532"},"42":{"a_as":"411","a_ca":"412","a_au":"413","a_us":"414","a_uk":"415","a_xxl":"497"},"7":{"a_as":"441","a_ca":"442","a_au":"443","a_us":"444","a_uk":"445","a_xxl":"501"},"44":{"a_as":"282","a_ca":"281","a_au":"283","a_us":"279","a_uk":"280","a_xxl":"515"},"46":{"a_as":"467","a_ca":"469","a_au":"468","a_us":"471","a_uk":"470","a_xxl":"534"},"47":{"a_as":"597","a_ca":"596","a_au":"594","a_us":"592","a_uk":"593","a_xxl":"595"},"48":{"a_as":"718","a_ca":"715","a_au":"716","a_us":"713","a_uk":"714","a_xxl":"717"}};


})






