/**
 * Created by DXZ-Hui.Cao on 2017/8/25.
 */

$(document).ready(function(){
  showcity()
});
function showcity(){
  if($.cookie('currentarea')){
    //获取顶部城市
    //console.log(iDcity1[$.cookie('currentarea')][0])
    $("#city-on").html(iDcity1[$.cookie('currentarea')][0]);
    $('#city-place').html(iDcity1[$.cookie('currentarea')][1]);
    $('#city-phone').html(iDcity1[$.cookie('currentarea')][2]);

  }
}

var iDcity1 = {
  1:['北京','北京分公司：北京市建国门外大街永安东里米阳大厦5层（永安里地铁C口向南50米','服务专线：010-65685656'],
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
  9:['济南','济南分公司：济南市市中区泺源大街229号金龙大厦29层','服务专线：0531-81851155'],
  30:['吉林','吉林分公司：吉林市昌邑区财富广场B栋8层803-807','服务专线：0432-62885656'],
  21:['昆明','昆明分公司：昆明市盘龙区东风东路36号，建工大厦28层，2808-2811号办公楼','服务专线：0871-63536688'],
  27:['兰州','兰州分公司：兰州市城关区张掖路1号保利大厦a座15层','服务专线：0931-8185656'],
  48:['洛阳','洛阳分公司：河南省洛阳市西工区升龙广场E区汇金中心1211','服务专线：0379-65165656'],
  16:['南京','南京分公司：南京市鼓楼区汉中路8号金轮国际广场2401室','服务专线：025-85552299'],
  29:['南昌','南昌分公司：南昌市广场南路恒茂国际中心16栋B座27层','服务专线：0791-86665966'],
  34:['宁波','宁波分公司：宁波市海曙区药行街42号银亿环球中心B座803','服务专线：0574-87008686'],
  38:['南宁','南宁分公司：南宁市青秀区金湖路59号地王国际商会中心30层CD','服务专线：0771-5775656'],
  10:['青岛','青岛分公司：青岛市香港中路40号数码旗舰大厦19层A1室','服务专线：0532-86667776'],
  2:['上海','上海分公司：上海市黄浦区徐家汇路555号广发大厦三层','服务专线：021-61581818'],
  8:['沈阳','沈阳分公司：沈阳市和平区和平北大街69号总统大厦A座14层','服务专线：024-22812866'],
  12:['石家庄','石家庄分公司：石家庄市新华区中华北大街50号军创国际商务花园1202室','服务专线：0311-85368866'],
  20:['深圳','深圳分公司：深圳市福田区福华一路138号国际商会大厦A座25层','服务专线：0755-82931818'],
  23:['苏州','苏州分公司：苏州市工业园区苏州大道西8号中银惠龙大厦6层','服务专线：0512-62893339'],
  4:['天津','天津分公司：天津市河西区大沽南路362号天津图书大厦10层1088室','服务专线：022-23263399'],
  17:['太原','太原分公司：太原市南内环街100号恒地大厦12层','服务专线：0351-7668080'],
  18:['唐山','唐山分公司：唐山市路南区新华西道32号新华贸写字楼16层','服务专线：0315-6328566'],
  14:['武汉','武汉分公司：武汉市解放大道航空路新世界中心C座20层','服务专线：027-83805656'],
  //49:['武昌','武昌分公司：武汉市洪山区珞瑜路10号群光中心百脑汇23层','服务专线：027-67811600'],
  33:['无锡','无锡分公司：无锡市崇安区中山路531号红豆国际广场办公楼19层','服务专线：0510-81805656'],
  42:['温州','温州分公司：温州市鹿城区车站大道577号财富中心1302','服务专线：0577-88815656'],
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


$('.city-cont').on('click',"a", function(e){
  e.preventDefault();
  currentarea = $(this).attr("data-id");
  $.cookie('currentarea', currentarea, { path: "/",domain: '.jjlvip.cn'});
  window.location.reload();

});




function top_city1 (a,t) {
  $('#city-place').html(a);
  $('#city-phone').html(t);
}
$(".top_sec").hover(function(){
  $(this).find(".sec-xq").slideDown(100);
  $(this).find(".go-down").html("&#xe661;");
},function(){
  $(this).find(".sec-xq").slideUp(100);
  $(this).find(".go-down").html("&#xe60b;")
});

var page_keyword = $("#so_keyword").text();
var page_seaType = $('#pagekey').val();
var curSeaType = getSoType(page_seaType) ? getSoType(page_seaType) : '顾问';
var curKeyWord = page_keyword ? page_keyword : '请输入你想了解的关键字';
/*设置展示函数*/
function setSoType (searchType, searchKeyWord) {
  $("#searchType").text(searchType);
  if (searchKeyWord == '' || searchKeyWord == 'undefined' || searchKeyWord == undefined) {
    $("#search").attr('placeholder', '请输入你想了解的关键字');
  }
  else {
    $("#search").val(searchKeyWord);
  }
}
/*获取搜索类型函数*/
function getSoType (pagekey) {
  var soTypeObj = {
    "SEARCHNEWS": "资讯",
    "SEARCHADVISER": "顾问",
    "SEARCHACTIVITY": "活动",
    "SEARCHCASE": "案例",
    "SEARCHSCHOOL": "院校"
  };
  return soTypeObj[pagekey];
}
/*获取搜索url函数*/
function getSoUrl (searchType) {
  var soUrlObj = {
    "资讯": "so_news",
    "顾问": "so_advisor",
    "活动": "so_activity",
    "案例": "so_case",
    "院校": "so_school"
  };
  return soUrlObj[searchType]
}
/*设置初始化展示函数*/
setSoType(curSeaType, curKeyWord);
/*热门搜索*/
$(".tags a").click(function(e){
  e.preventDefault();
  $("#search").val($(this).html());
  var so_type = $("#searchType").text();
  var so_key_word = $.trim($("#search").val());
  console.log(fn.no_urlgen(getSoUrl(so_type), 'q=' + so_key_word));
  window.open(fn.no_urlgen(getSoUrl(so_type), 'q=' + so_key_word));
});
//点击搜索按钮
$("#searchBtn").click(function () {
  var so_type = $("#searchType").text();
  var so_key_word = $.trim($("#search").val());
  if (so_key_word.length == 0 || so_key_word == '请输入你想了解的关键字') {
    alert('请输入你想了解的关键词');
    $('#search').focus();
  }
  else {
    window.open(fn.no_urlgen(getSoUrl(so_type), 'q=' + so_key_word));
  }
});
//下拉菜单选择类型
$("#searchTypeList li a").click('li a', function (e) {
  e.preventDefault();
  var checkedType = $(this).html();
  setSoType(checkedType);
  $(".sec-xq").slideUp(100);
  $(".go-down").html("&#xe60b;")
});