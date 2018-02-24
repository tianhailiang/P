/**
 * Created by DXZ-Weijiu.Wang on 2017/7/7.
 */

function getCook(name){
  var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
  arr=document.cookie.match(reg);
  if(arr){return unescape(arr[2]);
  }else{
    return null;
  }
}

/*
 (function(m, ei, q, i, a, j, s) {
 m[i] = m[i] || function() {
 (m[i].a = m[i].a || []).push(arguments)
 };
 j = ei.createElement(q),
 s = ei.getElementsByTagName(q)[0];
 j.async = true;
 j.charset = 'UTF-8';
 j.src = '//static.meiqia.com/dist/meiqia.js';
 s.parentNode.insertBefore(j, s);
 })(window, document, 'script', '_MEIQIA');
 _MEIQIA('entId', 10434);
 //_MEIQIA('withoutBtn');


 var groupTokens = {
 //ËùÓÐ½Ó´ý±±¾©Ñ§ÉúµÄ¿Í·þ×é token
 'us':
 ['c7c178088163ff380135d115ea7813f5',
 'd8680f2565d8542640d9e8132b15e6d0',
 'e2879befd7f713824955044968118a43',
 '5bb364f10de68fab8d72b036f62e8070',
 'd2d2f52b0dea5a4a24d4cd9f4179cfc6',
 '319c3b5634331e4c86439a5601f74494',
 '7e56194811ffb0bd60efc56a75599584',
 'cf9e7b0f622c25449cf608257f6b7393',
 'a0197f28e13da2701da560f5356f9d34',
 'dc1b4881c32f811ce12ac537c4656614'],

 'uk':
 ['bb7fe5583e6522b1cea09d192a8364e2',
 '117a7b9eee23a580235b5855241c9912',
 'b488cef1267a49d9a3ee03f0a50fdd48',
 '4ff06d9f8268615f690a1f184a45b973',
 '06d187437c40ba6488baee7f424973f9',
 'ecc5017fbd8f5b78b0402e6dab9b01e1',
 '0dbe0c9e48f9910147af9bad372d5ffe',
 'e0a5a90719637605a6df1e04bf659ed8',
 '9a806bdec6622681d637a5e0d56a91e3',
 '28d0b7cdbfa278f52921ccddce6b2584'],

 'ca_y':
 ['af4b9b82d00155d196d0edbf7915a4f4',
 'f7c6c0b330ccfd139ec90afc7bce8f25'],

 'ca_x':
 ['638ae25dcef047407b0cc3acb67bf6c3',
 '6e7d033b690e2161419734179d5f120e',
 '00fb3d6c257bfca2873b2ad64df701dc'],

 'ca_a':
 ['af4b9b82d00155d196d0edbf7915a4f4',
 'f7c6c0b330ccfd139ec90afc7bce8f25',
 '638ae25dcef047407b0cc3acb67bf6c3',
 '6e7d033b690e2161419734179d5f120e',
 '00fb3d6c257bfca2873b2ad64df701dc'],

 'au':
 ['4dd1c223da14f13efee56dd5e9746124',
 '988b26be698d6093815a6e4c1b34ec42',
 'a24d8ba932201c82c6411b1aac6f4427',
 'fe2b1b7ae602efe5212c7eb332f2cf88'],

 'ne':
 ['02cee59f7189dc1c94d76790a8bc4a25',
 '76401bddaf88d5de1edb37144382d936'],

 'jp':
 ['03e361f8711b2bb7a712754f5036927a',
 'f5999b08d17c61e99d1dae80fe701c76'],

 'ko':['92a404072f15f9a5ed1fd501f37e8e03'],

 'si':['33bb0d0b1888376e03ca99ebc7e2a8d3'],

 'ewb':['f496b893fcf23c9b44a8669cb650d931'],

 'hk':['5c1250d0ad0857e7a6ce696403eb69ea'],

 'jp2':['1ea02989b89f171a787c672508239690'],

 'jp_a':['1ea02989b89f171a787c672508239690',
 '03e361f8711b2bb7a712754f5036927a',
 'f5999b08d17c61e99d1dae80fe701c76'],

 'fr':['287475075ddfa8412b59bf86a6ec71da'],

 'ge':['b3b6916006a58df829154d10a11c8f8a'],

 'sp':['6d1a92ca0d27155bab64b7e8d34ed6f4'],

 'eu':['287475075ddfa8412b59bf86a6ec71da',
 'b3b6916006a58df829154d10a11c8f8a',
 '6d1a92ca0d27155bab64b7e8d34ed6f4']

 };
 function getRandomInt(min, max) {
 return Math.floor(Math.random() * (max - min + 1) + min);
 }
 function openChat3(zone){
 var tokens = groupTokens[zone];
 var token = tokens[getRandomInt(0, tokens.length -1)];
 _MEIQIA('showPanel', {
 groupToken: token
 })
 }

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
function openChat(c){
  var url = "http://jesong.jjl.cn/live/" +'chat.dll?c=1';
  url = url +"&chatUrl="+window.encodeURIComponent(window.location.href);
  if(getCook("im_refer")){
    url = url +"&refer="+window.encodeURIComponent(getCook("im_refer"));
  }
  if( typeof c == 'string' &&c.length !=0 ){
    url += '&'+c;
  }
  var p = "height=500,width=320,directories=no,location=no,menubar=no,resizeable=no,status=no,toolbar=no,top=100,left=200";
  try{
    var cw = window.open(url,'chat_'+1,p);cw.focus();
  }catch(e){
    if(c.force)window.location = url;
  }
}

document.write("<style>div.box_tanchu,ul,li,h1,p,hr,form,input{margin:0;padding:0;}.box_tanchu{ width:630px; background:url(http://www.jjl.cn/statics/images/tanchu1.jpg) no-repeat top center; height:350px;border-style: none;z-index:999;left:50%;top:50%;margin-left:-300px!important;margin-top:-175px!important;margin-top:0px;position:fixed!important;position:absolute;_top:expression(eval(document.compatMode && document.compatMode=='CSS1Compat') ? documentElement.scrollTop + (document.documentElement.clientHeight-this.offsetHeight)/2 : document.body.scrollTop + (document.body.clientHeight - this.clientHeight)/2);}.top_big{ width:400px; float:right;}.anniu_gb{ width:40px; float:right; font-size:14px; font-family:Microsoft YaHei; margin:16px 6px 0 0; color:#fff; line-height:15px;}.anniu_gb a:link{ color:#fff;cursor:pointer}.anniu_gb a:visited{ color:#fff;}.anniu_gb a:hover{ color:#9d9806;}.top_zi_tanchu{ width:280px; float:right;font-size:23px;font-family:Microsoft YaHei;letter-spacing:2px; color:#bc8d23; margin-top:20px;}.top_zi_tanchu span{ color:#c30e21; font-size:35px;font-family:Microsoft YaHei; }.anniu_yy{ width:150px; float:right; margin:25px 50px 0 0;_margin:25px 25px 0 0;}.anniu_yy_1{ width:50px; float:left; height:25px; background:url(http://www.jjl.cn/images/tanchu/an_2.jpg) no-repeat; font-size:14px; font-weight: bold; text-align:center; line-height:25px; color:#fff; margin-left:10px;_margin-left:5px;}.anniu_yy_1 a:link{ color:#fff;cursor:pointer}.anniu_yy_1 a:visited{ color:#fff;}.anniu_yy_1 a:hover{ color:#075824;}.hot_tanchu{ width:580px; float:left;margin-left:10px;_margin-left:5px; margin-top:50px;_margin-top:30px; }.hot_tanchu span{ float:left;color:#c30d23;font-size:20px;font-family:Microsoft YaHei; }.hot_5{ background:url(http://www.jjl.cn/images/tanchu/red_5.jpg); width:80px; height:25px; text-align:center; line-height:25px; color:#fff; font-size:14px; font-weight:bold; float:left; margin-left:10px;}.hot_5 a:link{ color:#fff;cursor:pointer}.hot_5 a:visited{ color:#fff;}.hot_5 a:hover{ color:#6f2307;}.hot_4{ background:url(http://www.jjl.cn/images/tanchu/red_4.jpg); width:65px; height:25px; text-align:center; line-height:25px; color:#fff; font-size:14px; font-weight:bold; float:left;margin-left:10px;}.hot_4 a:link{ color:#fff;cursor:pointer}.hot_4 a:visited{ color:#fff;}.hot_4 a:hover{ color:#6f2307;}.hot_2{ background:url(http://www.jjl.cn/images/tanchu/red_2.jpg); width:50px; height:25px; text-align:center; line-height:25px; color:#fff; font-size:14px; font-weight:bold; float:left;margin-left:10px;}.hot_2 a:link{ color:#fff;cursor:pointer}.hot_2 a:visited{ color:#fff;}.hot_2 a:hover{ color:#6f2307;}.ouzhou_tanchu{ width:305px; float:left;margin-left:10px;_margin-left:5px;height:60px;}.ouzhou_tanchu span{ width:20px; float:left;color:#c30d23;font-size:20px;font-family:Microsoft YaHei; margin-top:5px;}.ouzhou_2{ background:url(http://www.jjl.cn/images/tanchu/an_2.jpg); width:50px; height:25px; text-align:center; line-height:25px; color:#fff; font-size:14px; font-weight:bold; float:left;margin-left:4px; margin-top:5px;}.ouzhou_2 a:link{ color:#fff;cursor:pointer}.ouzhou_2 a:visited{ color:#fff;}.ouzhou_2 a:hover{ color:#075824;}.ouzhou_4{ background:url(http://www.jjl.cn/images/tanchu/anniu_4.jpg); width:65px; height:25px; text-align:center; line-height:25px; color:#fff; font-size:14px; font-weight:bold; float:left;margin-left:4px;margin-top:5px;}.ouzhou_4 a:link{ color:#fff;cursor:pointer}.ouzhou_4 a:visited{ color:#fff;}.ouzhou_4 a:hover{ color:#075824;}.yazhou_tanchu{ width:145px; float:left;margin-left:5px;_margin-left:3px;height:60px;}.yazhou_tanchu span{ width:20px; float:left;color:#c30d23;font-size:20px;font-family:Microsoft YaHei; margin-top:5px;}.qita{ width:120px; float:left;margin-left:5px;_margin-left:3px;height:60px;}.qita span{ width:60px; float:left;color:#c30d23;font-size:20px;font-family:Microsoft YaHei; margin-top:5px;}.phone_tanchu{ width:500px; float:left;color:#c30d23;font-size:16px;font-family:Microsoft YaHei; margin:15px 0 0 60px;_margin:15px 0 0 30px;}.t_gj{ width:67px; float:left; text-align:center; margin-left:12px;_margin-left:6px; margin-top:10px;}.t_gj_anniu{ width:67px; float:left; text-align:center; line-height:42px; height:32px; background:url(http://www.jjl.cn/images/tanchu/t_25.jpg) no-repeat; font-size:14px; font-weight:bold; color:#fff; margin-top:5px;}.t_gj_anniu a:link{ color:#fff;cursor:pointer}.t_gj_anniu a:visited{ color:#fff;}.t_gj_anniu a:hover{ color:#6f2307;}.t_gj_anniu_ax{width:80px; float:left; text-align:center; line-height:42px; height:32px; background:url(http://www.jjl.cn/images/tanchu/t_25_t.jpg) no-repeat; font-size:14px; font-weight:bold; color:#fff; margin-top:5px;}.t_gj_ax{ width:80px; float:left; text-align:center; margin-left:14px;_margin-left:10px; margin-top:10px;}.phone_t{width:300px; float:left;color:#c30d23;font-size:20px;font-family:Microsoft YaHei; margin:25px 0 0 100px;_margin:10px 0 0 50px;}.hot_fen{ width:450px; float:left;margin-left:80px;_margin-left:40px; margin-top:40px; }#popDIV{ width:600px; float:left}.tianjin{ width:580px; float:left;margin-left:10px;_margin-left:5px; margin-top:30px;_margin-top:25px; }.fengongsi{ width:480px; float:left;margin-left:80px;_margin-left:40px; margin-top:30px;_margin-top:25px; }.top_zi_yanchu_a{font-size:23px;font-family:Microsoft YaHei;color:#bc8c0d;line-height: 35px;}a{cursor:pointer}</style>");

//document.write('<div id="guanbi_tanchu" style="display:none" class="box_tanchu"></div>');

document.write('<div id="guanbi_tanchu" style="display:none;width: 630px" class="box_tanchu"></div>');
//document.write('<div id="new_box_tanchu" class="new_box_tanchu clearfix"></div>');
var i=0;
function showDiv(){
  document.getElementById('guanbi_tanchu').style.display='block';
}
/*function new_close_bottom(){
  document.getElementById('new_box_tanchu').style.display='none';
  showTimeDailog();
}*/
function closeDiv(){
  document.getElementById('guanbi_tanchu').style.display='none';
}
/*function showTimeDailog() {
  setTimeout("showDiv()", 60000);
}*/
 setInterval("showDiv()",10000);
var myjson1={"1":{"a_as":"873","a_ca":"875","a_au":"872","a_us":"253","a_uk":"60","a_xxl":"57"},"2":{"a_as":"2","a_ca":"3","a_au":"4","a_us":"5","a_uk":"6","a_xxl":"514"},"37":{"a_as":"305","a_ca":"306","a_au":"307","a_us":"308","a_uk":"309","a_xxl":"519"},"27":{"a_as":"144","a_ca":"142","a_au":"143","a_us":"140","a_uk":"141","a_xxl":"530"},"16":{"a_as":"310","a_ca":"311","a_au":"312","a_us":"313","a_uk":"314","a_xxl":"507"},"38":{"a_as":"315","a_ca":"316","a_au":"317","a_us":"318","a_uk":"319","a_xxl":"512"},"29":{"a_as":"320","a_ca":"321","a_au":"322","a_us":"323","a_uk":"324","a_xxl":"506"},"28":{"a_as":"330","a_ca":"331","a_au":"332","a_us":"333","a_uk":"334","a_xxl":"524"},"22":{"a_as":"335","a_ca":"336","a_au":"337","a_us":"338","a_uk":"339","a_xxl":"496"},"30":{"a_as":"340","a_ca":"341","a_au":"342","a_us":"343","a_uk":"344","a_xxl":"529"},"26":{"a_as":"345","a_ca":"346","a_au":"348","a_us":"349","a_uk":"350","a_xxl":"522"},"24":{"a_as":"102","a_ca":"101","a_au":"100","a_us":"98","a_uk":"99","a_xxl":"518"},"18":{"a_as":"351","a_ca":"352","a_au":"353","a_us":"354","a_uk":"355","a_xxl":"535"},"13":{"a_as":"356","a_ca":"357","a_au":"358","a_us":"359","a_uk":"360","a_xxl":"502"},"4":{"a_jp":"37","a_ca":"38","a_au":"39","a_us":"41","a_uk":"40","a_ko":"161","a_xm":"162","a_xxl":"503","a_as":"172"},"17":{"a_as":"361","a_ca":"362","a_au":"363","a_us":"364","a_uk":"365","a_xxl":"520"},"34":{"a_as":"366","a_ca":"367","a_au":"368","a_us":"369","a_uk":"370","a_xxl":"499"},"3":{"a_as":"371","a_ca":"372","a_au":"373","a_us":"374","a_uk":"375","a_xxl":"523"},"36":{"a_as":"376","a_ca":"377","a_au":"378","a_us":"379","a_uk":"380","a_xxl":"516"},"5":{"a_as":"188","a_ca":"187","a_au":"186","a_us":"184","a_uk":"185","a_xxl":"521"},"33":{"a_as":"381","a_ca":"382","a_au":"383","a_us":"384","a_uk":"385","a_xxl":"500"},"21":{"a_as":"386","a_ca":"387","a_au":"388","a_us":"389","a_uk":"390","a_xxl":"510"},"6":{"a_as":"391","a_ca":"392","a_au":"393","a_us":"394","a_uk":"395","a_xxl":"508"},"14":{"a_as":"396","a_ca":"397","a_au":"398","a_us":"399","a_uk":"400","a_xxl":"509"},"8":{"a_as":"401","a_ca":"402","a_au":"403","a_us":"404","a_uk":"405","a_xxl":"494"},"9":{"a_as":"406","a_ca":"407","a_au":"408","a_us":"409","a_uk":"410","a_xxl":"498"},"20":{"a_as":"92","a_ca":"91","a_au":"90","a_us":"88","a_uk":"89","a_xxl":"531"},"31":{"a_as":"416","a_ca":"417","a_au":"418","a_us":"419","a_uk":"420","a_xxl":"492"},"12":{"a_as":"421","a_ca":"422","a_au":"423","a_us":"424","a_uk":"425","a_xxl":"517"},"39":{"a_as":"252","a_ca":"251","a_au":"250","a_us":"248","a_uk":"249","a_xxl":"504"},"23":{"a_as":"117","a_ca":"116","a_au":"115","a_us":"113","a_uk":"114","a_xxl":"511"},"45":{"a_as":"426","a_ca":"427","a_au":"428","a_us":"429","a_uk":"430","a_xxl":"495"},"15":{"a_as":"431","a_ca":"432","a_au":"433","a_us":"434","a_uk":"435","a_xxl":"505"},"35":{"a_as":"436","a_ca":"437","a_au":"438","a_us":"439","a_uk":"440","a_xxl":"536"},"32":{"a_as":"214","a_ca":"213","a_au":"212","a_us":"210","a_uk":"211","a_xxl":"552"},"11":{"a_as":"27","a_ca":"28","a_au":"29","a_us":"30","a_uk":"31","a_xxl":"513"},"25":{"a_as":"451","a_ca":"452","a_au":"453","a_us":"454","a_uk":"455","a_xxl":"533"},"19":{"a_as":"456","a_ca":"457","a_au":"458","a_us":"459","a_uk":"460","a_xxl":"526"},"10":{"a_as":"461","a_ca":"462","a_au":"463","a_us":"464","a_uk":"465","a_xxl":"528"},"43":{"a_as":"300","a_ca":"301","a_au":"302","a_us":"303","a_uk":"304","a_xxl":"527"},"40":{"a_as":"446","a_ca":"447","a_au":"448","a_us":"449","a_uk":"450","a_xxl":"493"},"41":{"a_as":"267","a_ca":"261","a_au":"264","a_us":"255","a_uk":"258","a_xxl":"532"},"42":{"a_as":"411","a_ca":"412","a_au":"413","a_us":"414","a_uk":"415","a_xxl":"497"},"7":{"a_as":"441","a_ca":"442","a_au":"443","a_us":"444","a_uk":"445","a_xxl":"501"},"44":{"a_as":"282","a_ca":"281","a_au":"283","a_us":"279","a_uk":"280","a_xxl":"515"},"46":{"a_as":"467","a_ca":"469","a_au":"468","a_us":"471","a_uk":"470","a_xxl":"534"},"47":{"a_as":"597","a_ca":"596","a_au":"594","a_us":"592","a_uk":"593","a_xxl":"595"},"48":{"a_as":"718","a_ca":"715","a_au":"716","a_us":"713","a_uk":"714","a_xxl":"717"}};

createStr = '';

if("undefined" == typeof _areaCode){
  createStr += '<img src="http://www.jjl.cn/statics/images/tanchu1.jpg" usemap="#Map" width="630" height="350"/><map name="Map" id="Map"><area id="us_tc_bt" shape="circle" coords="69,207,40" style="display:block;cursor:pointer;" onclick="onclick_ly(\'g\',1)" /><area id="uk_tc_bt" shape="circle" coords="166,206,40" style="display:block;cursor:pointer;" onclick="onclick_ly(\'g\',1)" /><area id="ca_tc_bt" shape="circle" coords="266,208,40" style="display:block;cursor:pointer;" onclick="onclick_ly(\'g\',1)" /><area id="au_tc_bt" shape="circle" coords="366,207,40" style="display:block;cursor:pointer;" onclick="onclick_ly(\'g\',1)" /><area id="as_tc_bt" shape="circle" coords="465,207,40" style="display:block;cursor:pointer;" onclick="onclick_ly(\'g\',1)" /><area id="eu_tc_bt" shape="circle" coords="564,207,40" style="display:block;cursor:pointer;" onclick="onclick_ly(\'g\',874)" /><area shape="rect" coords="" style="display:block;cursor:pointer;width: 20px;height: 20px;float: right;position: absolute;top: 5px;right: -25px" onclick="javascript:closeDiv()" /></map>';

  /*createStr += '<div class="bottom_overseas">' +
                '<div class="new_close" id="guanbi_tanchu" onclick="new_close_bottom()"></div>' +
                '<div class="new_guo">' +
                '<div class="clearfix">' +
                '<a class="x_bott" onclick="onclick_ly(\'g\',1)"></a>' +
                '<a class="ao_bott" onclick="onclick_ly(\'g\',1)"></a>' +
                '<a class="j_bott" onclick="onclick_ly(\'g\',1)"></a>' +
                '<a class="y_bott" onclick="onclick_ly(\'g\',1)"></a>' +
                '<a class="usa_bott" onclick="onclick_ly(\'g\',1)"></a>' +
                '</div>' +
                '<div class="new_guo_bott">' +
                '<a class="o_bott" onclick="onclick_ly(\'g\',1)"></a>' +
                '<a class="r_bott" onclick="onclick_ly(\'g\',1)"></a>' +
                '<a class="m_bott" onclick="onclick_ly(\'g\',1)"></a>' +
                '<a class="e_bott" onclick="onclick_ly(\'g\',1)"></a>' +
                '<a class="h_bott" onclick="onclick_ly(\'g\',1)"></a>' +
                '</div>' +
                '</div>' +
                '</div>';*/
}else{

  //document.getElementById('guanbi_tanchu').style.backgroundImage="url(/images/guanbi_tanchu/backBJ_img.gif)";
  //createStr += '<div class="top_big"><div class="anniu_gb"><a href="javascript:closeDiv()"><img src="http://www.jjl.cn/images/tanchu/guanbi.jpg" width="30" height="31" /></a></div></div>';

  if (_areaCode == 1||_areaCode == "1") {

    createStr += '<img src="http://www.jjl.cn/statics/images/tanchu1_bj.jpg" usemap="#Map" width="630" height="350"/><map name="Map" id="Map"><area id="us_tc_bt" shape="circle" coords="77,206,37" style="display:block;cursor:pointer;" onclick="onclick_ly(\'g\',\''+myjson1[_areaCode].a_us+'\')" /><area id="uk_tc_bt" shape="circle" coords="193,206,37" style="display:block;cursor:pointer;" onclick="onclick_ly(\'g\',\''+myjson1[_areaCode].a_uk+'\')" /><area id="ca_tc_bt" shape="circle" coords="308,206,37" style="display:block;cursor:pointer;" onclick="onclick_ly(\'g\',\''+myjson1[_areaCode].a_ca+'\')" /><area id="au_tc_bt" shape="circle" coords="424,207,37" style="display:block;cursor:pointer;" onclick="onclick_ly(\'g\',\''+myjson1[_areaCode].a_au+'\')" /><area id="hk_tc_bt" shape="circle" coords="539,207,37" style="display:block;cursor:pointer;" onclick="onclick_ly(\'g\',472)" /><area id="ko_tc_bt" shape="circle" coords="77,291,37" style="display:block;cursor:pointer;" onclick="onclick_ly(\'g\',46)" /><area id="ru_tc_bt" shape="circle" coords="193,291,37" style="display:block;cursor:pointer;" onclick="onclick_ly(\'g\',51)" /><area id="xm_tc_bt" shape="circle" coords="308,291,37" style="display:block;cursor:pointer;" onclick="onclick_ly(\'g\',52)" /><area id="jp_tc_bt" shape="circle" coords="424,291,37" style="display:block;cursor:pointer;" onclick="onclick_ly(\'g\',56)" /><area id="eu_tc_bt" shape="circle" coords="539,291,37" style="display:block;cursor:pointer;" onclick="onclick_ly(\'g\',874)" /><area shape="rect" coords="601,1,625,21" style="display:block;cursor:pointer;width: 20px;height: 20px;float: right;position: absolute;top: 5px;right: -25px" onclick="javascript:closeDiv()" /></map>';


    /*createStr += '<div class="bottom_overseas">' +
    '<div class="new_close" id="guanbi_tanchu" onclick="new_close_bottom()"></div>' +
    '<div class="new_guo">' +
    '<div class="clearfix">' +
    '<a class="x_bott" onclick="onclick_ly(\'g\',472)"></a>' +
    '<a class="ao_bott" onclick="onclick_ly(\'g\',\'' + myjson1[_areaCode].a_au + '\')"></a>' +
    '<a class="j_bott" onclick="onclick_ly(\'g\',\'' + myjson1[_areaCode].a_ca + '\')"></a>' +
    '<a class="y_bott" onclick="onclick_ly(\'g\',\'' + myjson1[_areaCode].a_uk + '\')"></a>' +
    '<a class="usa_bott" onclick="onclick_ly(\'g\',\'' + myjson1[_areaCode].a_us + '\')"></a>' +
    '</div>' +
    '<div class="new_guo_bott">' +
    '<a class="o_bott" onclick="onclick_ly(\'g\',874)"></a>' +
    '<a class="r_bott" onclick="onclick_ly(\'g\',56)"></a>' +
    '<a class="m_bott" onclick="onclick_ly(\'g\',52)"></a>' +
    '<a class="e_bott" onclick="onclick_ly(\'g\',51)"></a>' +
    '<a class="h_bott" onclick="onclick_ly(\'g\',46)"></a>' +
    '</div>' +
    '</div>' +
    '</div>';*/

//createStr += '<img src="http://www.jjl.cn/statics/images/tanchu1_bj.jpg" usemap="#Map" width="630" height="350" /><map name="Map" id="Map"><area id="us_tc_bt" shape="circle" coords="77,206,37" style="display:block;cursor:pointer;" onclick="openChat3(\'us\')" /><area id="uk_tc_bt" shape="circle" coords="193,206,37" style="display:block;cursor:pointer;" onclick="openChat3(\'uk\')" /><area id="ca_tc_bt" shape="circle" coords="308,206,37" style="display:block;cursor:pointer;" onclick="openChat3(\'ca_a\')" /><area id="au_tc_bt" shape="circle" coords="424,207,37" style="display:block;cursor:pointer;" onclick="openChat3(\'au\')" /><area id="hk_tc_bt" shape="circle" coords="539,207,37" style="display:block;cursor:pointer;" onclick="openChat3(\'hk\')" /><area id="ko_tc_bt" shape="circle" coords="77,291,37" style="display:block;cursor:pointer;" onclick="openChat3(\'ko\')" /><area id="ru_tc_bt" shape="circle" coords="193,291,37" style="display:block;cursor:pointer;" onclick="openChat3(\'ewb\')" /><area id="xm_tc_bt" shape="circle" coords="308,291,37" style="display:block;cursor:pointer;" onclick="openChat3(\'si\')" /><area id="jp_tc_bt" shape="circle" coords="424,291,37" style="display:block;cursor:pointer;" onclick="openChat3(\'jp_a\')" /><area id="eu_tc_bt" shape="circle" coords="539,291,37" style="display:block;cursor:pointer;" onclick="openChat3(\'eu\')" /><area shape="rect" coords="601,1,625,21" style="display:block;cursor:pointer;" onclick="javascript:closeDiv()" /></map>';


  }else{

    createStr += '<img src="http://www.jjl.cn/statics/images/tanchu1.jpg" usemap="#Map" width="630" height="350" /><map name="Map" id="Map"><area id="us_tc_bt" shape="circle" coords="69,207,40" style="display:block;cursor:pointer;" onclick="onclick_ly(\'g\',\''+myjson1[_areaCode].a_us+'\')" /><area id="uk_tc_bt" shape="circle" coords="166,206,40" style="display:block;cursor:pointer;" onclick="onclick_ly(\'g\',\''+myjson1[_areaCode].a_uk+'\')" /><area id="ca_tc_bt" shape="circle" coords="266,208,40" style="display:block;cursor:pointer;" onclick="onclick_ly(\'g\',\''+myjson1[_areaCode].a_ca+'\')" /><area id="au_tc_bt" shape="circle" coords="366,207,40" style="display:block;cursor:pointer;" onclick="onclick_ly(\'g\',\''+myjson1[_areaCode].a_au+'\')" /><area id="as_tc_bt" shape="circle" coords="465,207,40" style="display:block;cursor:pointer;" onclick="onclick_ly(\'g\',\''+myjson1[_areaCode].a_as+'\')" /><area id="eu_tc_bt" shape="circle" coords="564,207,40" style="display:block;cursor:pointer;" onclick="onclick_ly(\'g\',874)" /><area shape="rect" coords="601,1,625,21" style="display:block;cursor:pointer;" onclick="javascript:closeDiv()" /></map>';


    /*createStr += '<div class="bottom_overseas">' +
                  '<div class="new_close" id="guanbi_tanchu" onclick="new_close_bottom()"></div>' +
                  '<div class="new_guo">' +
                  '<div class="clearfix">' +
                  '<a class="city_ya_bott" onclick="onclick_ly(\'g\',\'' + myjson1[_areaCode].a_as+'\')"></a>' +
                  '<a class="city_j_bott" onclick="onclick_ly(\'g\',\'' + myjson1[_areaCode].a_ca + '\')"></a>' +
                  '<a class="city_usa_bott" onclick="onclick_ly(\'g\',\'' + myjson1[_areaCode].a_us + '\')"></a>' +
                  '</div>' +
                  '<div class="new_guo_bott">' +
                  '<a class="city_o_bott" onclick="onclick_ly(\'g\',874)"></a>' +
                  '<a class="city_ao_bott" onclick="onclick_ly(\'g\',\'' + myjson1[_areaCode].a_au+'\')"></a>' +
                  '<a class="city_y_bott" onclick="onclick_ly(\'g\',\'' + myjson1[_areaCode].a_uk+'\')"></a>' +
                  '</div>' +
                  '</div>' +
                  '</div>'*/
  }
}
document.getElementById('guanbi_tanchu').innerHTML=createStr;