function normalize(value, defaultValue) {
  if(value === null || value === undefined || value === false) {
    return defaultValue;
  }
  return value;
}

function invalidDataCheck(value) {
  if(value === null || value === undefined || value === false) {
    return false;
  }
  return true;
}

const INVALID_ID = 99900000000;

function invalidNumberCheck(value) {
  if(value === null || value === undefined || value >= INVALID_ID || value < 0) {
    return false;
  }
  return true;
}

var __countryArr_ = {
  "0": ["全部", "all"],
  "1": ["美国", "usa"],
  "2": ["英国", "uk"],
  "3": ["加拿大", "canada"],
  "4": ["澳大利亚", "australia"],
  "5": ["新西兰", "newzealand"],
  "50": ["韩国", "korea"],
  "51": ["日本", "japan"],
  "52": ["新加坡", "singapore"],
  "53": ["马来西亚", "malaysia"],
  "54": ["中国香港", "hongkong"],
  "55": ["中国澳门", "macau"],
  "100": ["俄罗斯", "russion"],
  "101": ["乌克兰", "ukraine"],
  "102": ["白俄罗斯", "belarus"],
  "103": ["德国", "germany"],
  "104": ["法国", "france"],
  "105": ["挪威", "norway"],
  "106": ["瑞典", "sweden"],
  "107": ["芬兰", "finland"],
  "108": ["爱尔兰", "ireland"],
  "109": ["荷兰", "netherlands"],
  "110": ["丹麦", "denmark"],
  "111": ["意大利", "italy"],
  "112": ["西班牙", "spain"],
  "113": ["瑞士", "switzerland"],
  "114": ["奥地利", "austria"],
  "7": ["希腊", "greece"],
  //移民新增（澳洲用网站的澳大利亚）
  "8": ["马耳他", "malta"],
  "10": ["葡萄牙", "portugal"],
  "11": ["塞浦路斯", "cyprus"],
  "12": ["安提瓜", "antigua"],
  "13": ["多米尼克", "dominica"],
  "14": ["圣基茨", "saintkitts"],
  "15": ["格林纳达", "grenada"]
  //移民新增国家end
};

/*
 * param：国家id，
 * return：国家中文
 */
function getCountryChinese(id) {
  var obj = normalize(__countryArr_[id],__countryArr_[0]);
  return obj[0];
}

/*
 * param：国家id，
 * return：国家英文缩写
 */
function getCountryEn(id) {
  var obj = normalize(__countryArr_[id],__countryArr_[0]);
  return obj[1];
}

/*
 * param：国家id，
 * return：国家英文缩写
 */
function getCountryChinese(id) {
    var obj = normalize(__countryArr_[id],__countryArr_[0]);
    return obj[0];
}

/*
 * param：国家英文缩写
 * return：国家id
 * INvalid: -1
 */
function getCountryId(name) {
  for (var key in __countryArr_) {
    if(__countryArr_[key][1] == name || __countryArr_[key][0] == name){
      return key;
    }
  }
  //invalid,default:??? -1
  return INVALID_ID;
}

var __cityArr_ = {
  "1": ["北京", "bj","北京市建国门外大街永安东里米阳大厦5层（永安里地铁C口向南50米)","010-65685656"],
  "5": ["成都", "cd","成都市总府路2号时代广场A座18层","028-85595757"],
  "7": ["重庆", "cq","重庆市渝中区民权路28号英利国际金融中心37-7，37-8","023-60335656"],
  "19": ["长沙", "cs","长沙市芙蓉区五一大道447号湖南投资大厦3层305室","0731-82563355"],
  "25": ["长春", "cc","长春市西安大路727号中银大厦A座22层","0431-81811818"],
  "41": ["常州", "cz","常州市钟楼区延陵西路99号嘉业国贸大厦23层2307-2308","0519-83335656"],
  "13": ["大连", "dl","大连市中山区人民路平安大厦25层","0411-39865959"],
  "43": ["东莞", "dg","广东省东莞市南城区金盈大厦C区7层","0769-22905656"],
  "37": ["佛山", "fs","佛山市禅城区城门头路18号ICC国际商业中心17层","0757-82030588"],
  "39": ["福州", "fz","福州市鼓楼区五四路128号恒力城写字楼27F","0591-83625656"],
  "3": ["广州", "gz","广州市天河区体育西路191号中石化大厦b座33楼3310—3321","020-38175656"],
  "35": ["贵阳", "gy","贵阳市云岩区中华北路284号天毅大厦20层","0851-82215656"],
  "6": ["杭州", "hz","杭州市杭大路15号嘉华国际商务中心706","0571-28887999"],
  "22": ["合肥", "hf","合肥市包河区万达广场7号写字楼22层2204","0551-62866565"],
  "24": ["哈尔滨", "heb","哈尔滨市道里区上海街7号海上银座B座2001室","0451-58669777"],
  "26": ["呼市", "hs","内蒙古呼和浩特市中山西路1号海亮大厦A座1801","0471-3817676"],
  "32": ["邯郸", "hd","邯郸市人民东路350号嘉华大厦806室","0310-5709558"],
  "46": ["海南", "hn","海南省海口市龙华区滨海大道103号财富广场28楼A室","0898-68635656"],
  "9": ["济南", "jn","济南市市中区纬二路51号商会大厦A座33层（大观园南邻）","0531-81851155"],
  "30": ["吉林", "jl","吉林市昌邑区财富广场B栋8层803-807","0432-62885656"],
  "21": ["昆明", "km","昆明市东风东路36号建投大厦6楼金吉列留学","0871-63536688"],
  "27": ["兰州", "lz","兰州市城关区张掖路1号保利大厦a座15层","0931-8185656"],
  "48": ["洛阳", "ly","河南省洛阳市西工区升龙广场E区汇金中心1211","0379-65165656"],
  "16": ["南京", "nj","南京市鼓楼区汉中路8号金轮国际广场2401室","025-85552299"],
  "29": ["南昌", "nc","南昌市广场南路恒茂国际中心16栋B座27层","0791-86665966"],
  "34": ["宁波", "nb","宁波市海曙区药行街42号银亿环球中心B座803","0574-87008686"],
  "38": ["南宁", "nn","南宁市青秀区金湖路59号地王国际商会中心30层CD","0771-5775656"],
  "10": ["青岛", "qd","青岛市市南区香港中路40号数码旗舰大厦19层A1室","0532-86667776"],
  "2": ["上海", "sh","上海市黄浦区徐家汇路555号广发大厦三层","021-61581818"],
  "8": ["沈阳", "sy","沈阳市和平区和平北大街69号总统大厦A座14层","024-22812866"],
  "12": ["石家庄", "sjz","石家庄市新华区中华北大街50号军创国际商务花园1202室","0311-85368866"],
  "20": ["深圳", "shz","深圳市福田区福华一路138号国际商会大厦A座25层","0755-82931818"],
  "23": ["苏州", "sz","苏州市工业园区苏州大道西8号中银惠龙大厦6层","0512-62893339"],
  "4": ["天津", "tj","天津市河西区大沽南路362号天津图书大厦10层1088","022-23263399"],
  "17": ["太原", "ty","太原市南内环街100号恒地大厦12层","0351-7668080"],
  "18": ["唐山", "ts","唐山市路南区新华西道32号新华贸写字楼16层","0315-6328566"],
  "14": ["武汉", "wh","武汉市洪山区珞瑜路10号群光中心百脑汇23层/武汉市航空路新世界中心C座20层"],
  "50": ["武昌", "wh","武汉市洪山区珞瑜路10号群光中心百脑汇23层","027-67811600"],
  "51": ["汉口", "wh","武汉市航空路新世界中心C座20层","027-83805656"],
  "33": ["无锡", "wx","无锡市崇安区中山路531号红豆国际广场办公楼19层","0510-81805656"],
  "42": ["温州", "wz","温州市鹿城区车站大道577号财富中心1302","0577-88815656"],
  "15": ["西安", "xa","西安市碑林区南关正街88号长安国际C座808","029-87995656"],
  "28": ["厦门", "xm","厦门市思明区鹭江道100号财富中心5层","0592-2115656"],
  "36": ["徐州", "xz","徐州市泉山区建国西路75号财富广场A座四楼","0516-85785656"],
  "45": ["西宁", "xn","青海省西宁市城中区西大街42号三田世纪广场写字楼13层1307-1308号","0971-4925656"],
  "47": ["新疆", "xj","乌鲁木齐市红山路16号广汇时代广场D座24层","0991-2655656"],
  "31": ["烟台", "yt","烟台市芝罘区海港路25号阳光100A座2907室","0535-6275656"],
  "40": ["银川", "yc","银川市兴庆区文化西街国际贸易中心C栋7层","0951-7616655"],
  "44": ["宜昌", "ych","宜昌市沿江大道特168-5号，万达广场A座2505室","0717-6625656"],
  "11": ["郑州", "zz","郑州市金水区经三路68号2号楼招商银行大厦12层1202室","0371-60228686"]
};

/*
 * param：cityid，
 * return：city中文
 */
function getCityChinese(id){
  var obj = normalize(__cityArr_[id],__cityArr_[1]);
  return obj[0];
}

/*
 * param：cityid，
 * return：city缩写
 */
function getCityEn(id){
  var obj = normalize(__cityArr_[id],__cityArr_[1]);
  return obj[1];
}

/*
 * param：city name，
 * return：cityid
 */
function getCityId(name) {
  for (var key in __cityArr_) {
    if(__cityArr_[key][1] == name || __cityArr_[key][0] == name){
      return key;
    }
  }
  return INVALID_ID;
}
//获取城市地址
function getCityAddress(id){
  var obj = normalize(__cityArr_[id],__cityArr_[1]);
  return obj[2];
}
var __education_ = {
  "0": "全部",
  "1": "本科",
  "2": "研究生",
  "19": "中小学",
  "4": "预科"
};
//根据id获取学历名
function getEduName(id) {
  return normalize(__education_[id],__education_[0]);
}

var __crowd_ = {
  "0": "全部",
  "1": "中小学",
  "2": "本科",
  "3": "研究生",
  "4": "硕博"
};
//根据id获取学历名
function getCrowdName(id) {
  return normalize(__crowd_[id],__crowd_[0]);
}

var __yimin_project_ = {
  "1":"投资移民",
  "2":"创业移民",
  "3":"技术移民",
  "4":"留学移民",
  "5":"杰出人才移民",
  "6":"团聚移民",
  "7":"购房移民",
  "8":"国债移民",
  "9":"护照项目"
};

function getProjectName(id) {
  return normalize(__yimin_project_[id],__yimin_project_[0]);
}

/*
 * 国家和学历对应关系
 * 
 */
var __country_edu_ = {
    "1":{
      "1":"本科",
      "2":"研究生",
      "19":"中小学",
      "4":"预科"
    },
    "2":{
      "1":"本科",
      "2":"研究生",
      "19":"中小学",
      "4":"预科"
    },
    "3":{
      "1":"本科",
      "2":"研究生",
      "19":"中小学",
      "4":"预科"
    },
    "4":{
      "1":"本科",
      "2":"研究生",
      "19":"中小学",
      "4":"预科"
    },
    "5":{
      "1":"本科",
      "2":"研究生",
      "19":"中小学",
      "4":"预科"
    },
    "50":{
      "1":"本科",
      "2":"研究生"
    },
    "51":{
      "1":"本科",
      "2":"研究生",
      "19":"中小学",
      "4":"预科"
    },
    "52":{
      "1":"本科",
      "2":"研究生",
      "19":"中小学",
      "4":"预科"
    },
    "53":{
      "1":"本科",
      "2":"研究生"
    },
    "54":{
      "1":"本科",
      "2":"研究生",
      "4":"预科"
    },
    "100":{
      "1":"本科",
      "19":"中小学",
      "4":"预科"
    },
    "101":{
      "1":"本科",
      "4":"预科"
    },
    "102":{
      "1":"本科",
      "4":"预科"
    },
    "103":{
      "1":"本科",
      "2":"研究生",
      "19":"中小学",
      "4":"预科"
    },
    "104":{
      "1":"本科",
      "2":"研究生",
      "4":"预科"
    },
    "105":{
      "1":"本科",
      "2":"研究生"
    },
    "106":{
      "1":"本科",
      "2":"研究生"
    },
    "107":{
      "1":"本科",
      "2":"研究生"
    },
    "108":{
      "1":"本科",
      "2":"研究生"
    },
    "109":{
      "1":"本科",
      "2":"研究生"
    },
    "110":{
      "1":"本科",
      "2":"研究生"
    },
    "111":{
      "1":"本科",
      "2":"研究生"
    },
    "112":{
      "1":"本科",
      "2":"研究生"
    },
    "113":{
      "1":"本科",
      "2":"研究生"
    }
};

function getCountryEdu (countryId, eduId) {
  if (__country_edu_[countryId][eduId]) {
    return true;
  }
  else {
    return false;
  }
}
/*
 * ok: true
 * 
 */
function cityid_invalidcheck(id) {
  return invalidDataCheck(__cityArr_[id]);
}

function country_invalidcheck(id) {
  console.log('country_invalidcheck:  ' + id);
  return invalidDataCheck(__countryArr_[id]);
}

function edu_invalidcheck(id) {
  return invalidDataCheck(__education_[id]);
}

function ymproject_invalidcheck(id) {
  return invalidDataCheck(__yimin_project_[id]);
}

/**
 * 处理国家英文转换ID
 * @param countryParams
 * @returns {number}
 */
function getCountryIdParams(countryParams) {
  var country = 0;
  if(countryParams){
    var countryId = getCountryId(countryParams);
    if(countryId && countryId !== INVALID_ID) {
      country = countryId;
    }
  }
  return country;
}

/*
 * 处理栏目列表参数
 * @param req_query order-views__page-1
 * @returns {Array}
 */
function getReqQuery(req_query) {
  //参数处理
  //var req_query = req.params[3];
  var nquery = [];
  if(req_query !== ""){
    console.log("query", req_query);
    //order-views
    var req_query = req_query.split("__");
    for(var i in req_query){
      var arr = req_query[i].split("-");
      nquery[arr[0]] = arr[1];
    }
  }
  return nquery;
}

/*
 * api 接口返回数据格式化
 * @param code
 * @param message
 * @param data
 */
function api_return(code, message, data){
  return {'code':code, 'message':message, 'data':data};
}
//获取分公司地址
module.exports = {
  getCountryChinese: getCountryChinese ,
  getCountryId: getCountryId,
  getCountryEn: getCountryEn,
  getCountryChinese: getCountryChinese,
  getCityChinese: getCityChinese,
  getCityId: getCityId,
  getCityEn:getCityEn,
  getCityAddress:getCityAddress,
  getEduName: getEduName,
  getCrowdName: getCrowdName,
  getCountryEdu: getCountryEdu,
  getProjectName:getProjectName,
  cityid_invalidcheck:cityid_invalidcheck,
  country_invalidcheck: country_invalidcheck,
  edu_invalidcheck: edu_invalidcheck,
  ymproject_invalidcheck: ymproject_invalidcheck,
  invalidNumberCheck: invalidNumberCheck,
  INVALID_ID: INVALID_ID,
  getCountryIdParams: getCountryIdParams,
  getReqQuery: getReqQuery,
  api_return: api_return
};
