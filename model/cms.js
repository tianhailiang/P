// import { URL } from 'url';

var api = require('../model/apiRequest');
var config = require('../config/config');
var log4js = require('../log/log');
var log = log4js.getLogger();
var redis = require('redis');
var redis_db =  redis.createClient(config.redisCache.port, config.redisCache.host);

function _api_url_path(data, url) {

  if (url == null || url == undefined || url == "") {
    log.debug(url + '　接口不存在！');
    return null;
  }
  url += '?';
  for(var item in data){
    url += '&' + item + '=' + data[item];
  }
  return url;
}

function _api_url_path2(data, url) {

  if (url == null || url == undefined || url == "") {
    log.debug(url + '　接口不存在！');
    return null;
  }
  for (var item in data) {
    url += '&' + item + '=' + data[item];
  }
  return url;
}

function _api_path_url_shequ(data, url) {
  if (url == null || url == undefined || url == "") {
    log.debug(url + '　接口不存在！');
    return null;
  }
  for(var item in data){
    if (item == 'country'){
      url += item + '-' + data[item];
    }else{
      url += '__' + item + '-' + data[item];

    }
  }
  return url;
}


exports.city_list = function (callback) {
  var url = _api_url_path([], config.apis.get_city_list);
  if (url == null){
    callback('404');
    return;
  }
  api.apiRequest(url ,callback);
}

exports.city_guwen = function (callback) {
  var url = _api_url_path([], config.apis.get_city_guwen);
  if (url == null){
    callback('404');
    return;
  }
  api.apiRequest(url ,callback);
}

exports.hot_search = function (callback) {
  var param = {"catid": "222", "order": "listorder DESC", "limit": "4"};
  var url = _api_url_path(param, config.apis.get_hot_search);
  if (url == null){
    callback('404');
    return;
  }
  api.apiRequest(url ,callback);
}
exports.liuxuejiaodian = function (callback) {
  var param = {"catid": "152", "order": "id DESC", "limit": "6"};
  var url = _api_url_path(param, config.apis.get_liuxuejiaodian);
  if (url == null){
    callback('404');
    return;
  }
  api.apiRequest(url ,callback);
}

exports.liuxuezhuanqu_recommend_left = function (data, callback) {
  var param = {"catid": "40", "order": "listorder DESC, inputtime DESC", "area": data.area, "limit": "18"}
  var url = _api_url_path(param, config.apis.get_liuxuezhuanqu_recommend_left);
  if (url == null){
    callback('404');
    return;
  }
  api.apiRequest(url ,callback);
}
exports.liuxuezhuanqu_recommend_middle = function (callback) {
  var param = {"catid": "51", "order": "listorder DESC, inputtime DESC"};
  var url = _api_url_path(param, config.apis.get_liuxuezhuanqu_recommend_middle);
  if (url == null){
    callback('404');
    return;
  }
  api.apiRequest(url ,callback);
}
exports.liuxuezhuanqu_recommend_school_rank = function (callback) {
  var param = {"catid": "76", "order": "inputtime DESC", "limit": "7"};
  var url = _api_url_path(param, config.apis.get_liuxuezhuanqu_recommend_school_rank);
  if (url == null){
    callback('404');
    return;
  }
  api.apiRequest(url ,callback);
}
exports.liuxuezhuanqu_recommend_zq_scholarship = function (data, callback) {
  var param = {"catid": "40", "area": 1, "order":"id DESC",  "limit": "6"};

  var url = _api_url_path(param, config.apis.get_liuxuezhuanqu_recommend_zq_scholarship);
  if (url == null){
    callback('404');
    return;
  }
  api.apiRequest(url ,callback);
}
exports.liuxuezhuanqu_mg_left = function (data, callback) {
  var param = {"catid": "40", "order": "listorder DESC, inputtime DESC", "area": data.area, "countrytype": 1, "limit": "18"}
  var url = _api_url_path(param, config.apis.get_liuxuezhuanqu_mg_left);
  if (url == null){
    callback('404');
    return;
  }
  api.apiRequest(url ,callback);
}
exports.liuxuezhuanqu_mg_middle = function (data, callback) {
  var param = {"catid": "51", "order": "listorder DESC, inputtime DESC", "area": data.area, "country": 1, "limit": "9"};
  var url = _api_url_path(param, config.apis.get_liuxuezhuanqu_mg_middle);
  if (url == null){
    callback('404');
    return;
  }
  api.apiRequest(url ,callback);
}
exports.liuxuezhuanqu_mg_scholarship = function (callback) {
  var param = {"catid": "25", "order": "inputtime DESC", "country": 1, "thumb": "1", "limit": "6"};
  var url = _api_url_path(param, config.apis.get_liuxuezhuanqu_mg_scholarship);
  if (url == null){
    callback('404');
    return;
  }
  api.apiRequest(url ,callback);
}
exports.liuxuezhuanqu_yg_left = function (data, callback) {
  var param = {"catid": "40", "order": "listorder DESC, inputtime DESC", "area": data.area, "countrytype": 2, "limit": "18"};
  var url = _api_url_path(param, config.apis.get_liuxuezhuanqu_yg_left);
  if (url == null){
    callback('404');
    return;
  }
  api.apiRequest(url ,callback);
}
exports.liuxuezhuanqu_yg_middle = function (data, callback) {
  var param = {"catid": "51", "order": "listorder DESC, inputtime DESC", "area": data.area, "country": 2, "limit": "9"};
  var url = _api_url_path(param, config.apis.get_liuxuezhuanqu_yg_middle);
  if (url == null){
    callback('404');
    return;
  }
  api.apiRequest(url ,callback);
}
exports.liuxuezhuanqu_yg_scholarship = function (callback) {
  var param = {"catid": "25", "order": "inputtime DESC", "country": 2, "thumb": "1", "limit": "6"};
  var url = _api_url_path(param, config.apis.get_liuxuezhuanqu_yg_scholarship);
  if (url == null){
    callback('404');
    return;
  }
  api.apiRequest(url ,callback);
}
exports.liuxuezhuanqu_jnd_left = function (data, callback) {
  var param = {"catid": "40", "order": "listorder DESC, inputtime DESC", "area": data.area, "countrytype": 3, "limit": "18"};
  var url = _api_url_path(param, config.apis.get_liuxuezhuanqu_jnd_left);
  if (url == null){
    callback('404');
    return;
  }
  api.apiRequest(url ,callback);
}
exports.liuxuezhuanqu_jnd_middle = function (data, callback) {
  var param = {"catid": "51", "order": "listorder DESC, inputtime DESC", "area": data.area, "country": 3, "limit": "9"};
  var url = _api_url_path(param, config.apis.get_liuxuezhuanqu_jnd_middle);
  if (url == null){
    callback('404');
    return;
  }
  api.apiRequest(url ,callback);
}
exports.liuxuezhuanqu_jnd_scholarship = function (callback) {
  var param = {"catid": "25", "order": "inputtime DESC", "country": 3, "thumb": "1", "limit": "6"};
  var url = _api_url_path(param, config.apis.get_liuxuezhuanqu_jnd_scholarship);
  if (url == null){
    callback('404');
    return;
  }
  api.apiRequest(url ,callback);
}
exports.liuxuezhuanqu_az_left = function (data, callback) {
  var param = {"catid": "40", "order": "listorder DESC, inputtime DESC", "area": data.area, "countrytype": 4, "limit": "18"};
  var url = _api_url_path(param, config.apis.get_liuxuezhuanqu_az_left);
  if (url == null){
    callback('404');
    return;
  }
  api.apiRequest(url ,callback);
}
exports.liuxuezhuanqu_az_middle = function (data, callback) {
  var param = {"catid": "51", "order": "listorder DESC, inputtime DESC", "area": data.area, "country": 4, "limit": "9"};
  var url = _api_url_path(param, config.apis.get_liuxuezhuanqu_az_middle);
  if (url == null){
    callback('404');
    return;
  }
  api.apiRequest(url ,callback);
}
exports.liuxuezhuanqu_az_scholarship = function (callback) {
  var param = {"catid": "25", "order": "inputtime DESC", "country": 4, "thumb": "1", "limit": "6"};
  var url = _api_url_path(param, config.apis.get_liuxuezhuanqu_az_scholarship);
  if (url == null){
    callback('404');
    return;
  }
  api.apiRequest(url ,callback);
}
exports.liuxuezhuanqu_xxl_left = function (data, callback) {
  var param = {"catid": "40", "order": "listorder DESC, inputtime DESC", "area": data.area, "countrytype": 5, "limit": "18"};
  var url = _api_url_path(param, config.apis.get_liuxuezhuanqu_xxl_left);
  if (url == null){
    callback('404');
    return;
  }
  api.apiRequest(url ,callback);
}
exports.liuxuezhuanqu_xxl_middle = function (data, callback) {
  var param = {"catid": "51", "order": "listorder DESC, inputtime DESC", "area": data.area, "country": 5, "limit": "9"};
  var url = _api_url_path(param, config.apis.get_liuxuezhuanqu_xxl_middle);
  if (url == null){
    callback('404');
    return;
  }
  api.apiRequest(url ,callback);
}
exports.liuxuezhuanqu_xxl_scholarship = function (callback) {
  var param = {"catid": "25", "order": "inputtime DESC", "country": 5, "thumb": "1", "limit": "6"};
  var url = _api_url_path(param, config.apis.get_liuxuezhuanqu_xxl_scholarship);
  if (url == null){
    callback('404');
    return;
  }
  api.apiRequest(url ,callback);
}
exports.liuxuezhuanqu_yz_left = function (data, callback) {
  var param = {"catid": "40", "order": "listorder DESC, inputtime DESC", "where": "countrytype>=8 AND countrytype<=12", "area": data.area, "limit": "18"};
  var url = _api_url_path(param, config.apis.get_liuxuezhuanqu_yz_left);
  if (url == null){
    callback('404');
    return;
  }
  api.apiRequest(url ,callback);
}
exports.liuxuezhuanqu_yz_middle = function (data, callback) {
  var param = {"catid": "51", "order": "listorder DESC, inputtime DESC", "where": "country>5 AND country<100", "area": data.area, "limit": "9"};
  var url = _api_url_path(param, config.apis.get_liuxuezhuanqu_yz_middle);
  if (url == null){
    callback('404');
    return;
  }
  api.apiRequest(url ,callback);
}
exports.liuxuezhuanqu_yz_scholarship = function (callback) {
  var param = {"catid": "25", "order": "listorder DESC, inputtime DESC", "where": "country>5 AND country<100", "thumb": 1, "limit": "6"};
  var url = _api_url_path(param, config.apis.get_liuxuezhuanqu_yz_scholarship);
  if (url == null){
    callback('404');
    return;
  }
  api.apiRequest(url ,callback);
}
exports.liuxuezhuanqu_oz_left = function (data, callback) {
  var param = {"catid": "40", "order": "listorder DESC, inputtime DESC", "where": "countrytype>=13 AND countrytype<=26", "area": data.area, "limit": "18"};
  var url = _api_url_path(param, config.apis.get_liuxuezhuanqu_oz_left);
  if (url == null){
    callback('404');
    return;
  }
  api.apiRequest(url ,callback);
}
exports.liuxuezhuanqu_oz_middle = function (data, callback) {
  var param = {"catid": "51", "order": "listorder DESC, inputtime DESC", "area": data.area, "where": "country>=100", "limit": "9"};
  var url = _api_url_path(param, config.apis.get_liuxuezhuanqu_oz_middle);
  if (url == null){
    callback('404');
    return;
  }
  api.apiRequest(url ,callback);
}
exports.liuxuezhuanqu_oz_scholarship = function (callback) {
  var param = {"catid": "25", "order": "inputtime DESC", "country": 5, "thumb": "1", "limit": "6"};
  var url = _api_url_path(param, config.apis.get_liuxuezhuanqu_oz_scholarship);
  if (url == null){
    callback('404');
    return;
  }
  api.apiRequest(url ,callback);
}
exports.liuXueGuWen = function (callback) {
  var param = {"sql": 'SELECT t1.name, t1.head_pic, t1.head_bigpic, t1.country_id, t1.description, t1.url FROM bc_zixunguwen t1 LEFT JOIN bc_arealist t2 ON t1.area = t2.suoxie WHERE t2.id = 1 AND t1.is_delete = 0 AND t1.recommend IS NOT NULL AND t1. STATUS IN (99, 98) AND (t1.offlinetime >= sysdate() or t1.offlinetime = 0 or t1.offlinetime is NULL) ORDER BY t1.recommend ASC', "limit": "11"};
  var url = _api_url_path(param, config.apis.get_liuXueGuWen);
  if (url == null){
    callback('404');
    return;
  }
  api.apiRequest(url ,callback);
}
exports.meiTiBaoDao = function (data, callback) {
  var param = {"catid": "37", "order": "inputtime DESC", "area": data.area, "thumb": "1", "limit": "15"};
  var url = _api_url_path(param, config.apis.get_meiTiBaoDao);
  if (url == null){
    callback('404');
    return;
  }
  api.apiRequest(url ,callback);
}

exports.shenqingfangan_recommend = function (callback) {
  var param = {"catid":"146", "order": "listorder DESC, id DESC"};
  var url = _api_url_path(param, config.apis.get_shenqingfangan_recommend);
  if (url == null){
    callback('404');
    return;
  }
  api.apiRequest(url ,callback);
}
exports.shenqingfangan_mg = function (callback) {
  var param = {"catid":"146", "order": "listorder DESC, id DESC","country":"3379", "limit": "14"};
  var url = _api_url_path(param, config.apis.get_shenqingfangan_mg);
  if (url == null){
    callback('404');
    return;
  }
  api.apiRequest(url ,callback);
}
exports.shenqingfangan_yg = function (callback) {
  var param = {"catid":"146", "order": "listorder DESC, id DESC","country":"3386", "limit": "14"};
  var url = _api_url_path(param, config.apis.get_shenqingfangan_yg);
  if (url == null){
    callback('404');
    return;
  }
  api.apiRequest(url ,callback);
}
exports.shenqingfangan_jnd = function (callback) {
  var param = {"catid":"146", "order": "listorder DESC, id DESC","country":"3387", "limit": "14"};
  var url = _api_url_path(param, config.apis.get_shenqingfangan_jnd);
  if (url == null){
    callback('404');
    return;
  }
  api.apiRequest(url ,callback);
}
exports.shenqingfangan_az = function (callback) {
  var param = {"catid":"146", "order": "listorder DESC, id DESC", "country": "3388", "limit": "14"};
  var url = _api_url_path(param, config.apis.get_shenqingfangan_az);
  if (url == null){
    callback('404');
    return;
  }
  api.apiRequest(url ,callback);
}
exports.shenqingfangan_xxl = function (callback) {
  var param = {"catid":"146", "order": "listorder DESC, id DESC", "where": "country=3443", "limit": "14"};
  var url = _api_url_path(param, config.apis.get_shenqingfangan_xxl);
  if (url == null){
    callback('404');
    return;
  }
  api.apiRequest(url ,callback);
}
exports.shenqingfangan_yz = function (callback) {
  var param = {"catid":"146", "order": "listorder DESC, id DESC","country":"3389", "limit": "14"};
  var url = _api_url_path(param, config.apis.get_shenqingfangan_yz);
  if (url == null){
    callback('404');
    return;
  }
  api.apiRequest(url ,callback);
}
exports.shenqingfangan_oz = function (callback) {
  var param = {"catid":"146", "order": "listorder DESC, id DESC","country":"3390", "limit": "14"};
  var url = _api_url_path(param, config.apis.get_shenqingfangan_oz);
  if (url == null){
    callback('404');
    return;
  }
  api.apiRequest(url ,callback);
}
// exports.liuxuehuodong = function (data, callback) {
//   var param = {"catid":"156", "area": data.area, "order": "lecture_date DESC"};
//   var url = _api_url_path(param, config.apis.get_liuxuehuodong);
//   if (url == null){
//     callback('404');
//     return;
//   }
//   api.apiRequest(url ,callback);
// }

//签证指南
exports.qianzhengzhinan = function (data, callback) {
  var param = {"country": 1, "organid": data.organid, "order": "id", "page": data.page};
  var url = _api_url_path(param, config.apis.get_qianzhengzhinan);
  if (url == null){
    callback('404');
    return;
  }
  api.apiRequest(url ,callback);
}
exports.zuixinzixun = function (data, callback) {


  //var param = {"country": 1, "organid": data.organid, "limit": "5"};

  var url = _api_url_path(data, config.apis.get_zuixinzixun);

 
  if (url == null){
    callback('404');
    return;
  }
  api.apiRequest(url ,callback);
}
//活动预告
exports.huodongyugao = function (data, callback) {
  // var param = {"country": 1, "organid": data.organid, "limit": "5"};
  var url = _api_url_path(data, config.apis.get_huodongyugao);
  if (url == null){
    callback('404');
    return;
  }


  api.apiRequest(url ,callback);
}
exports.mingxingguwen = function (data, callback) {
  // var param = {"country": 1, "organid": data.organid, "pagesize": "5"};
  var url = _api_url_path(data, config.apis.get_mingxingguwen);
  if (url == null){
    callback('404');
    return;
  }
  api.apiRequest(url ,callback);
}
exports.chenggonganli = function (data, callback) {
  //var param = {"country": 1, "type": 1, "per_page": "5"};
  var url = _api_url_path(data, config.apis.get_chenggonganli);
  if (url == null){
    callback('404');
    return;
  }
  api.apiRequest(url ,callback);

}
exports.zhuanjiajiedu = function (data, callback) {
  var url = _api_url_path(data, config.apis.get_zhuanjiajiedu);
  if (url == null){
    callback('404');
    return;
  }
  api.apiRequest(url ,callback);
  //log.debug('zhuanjiajiedu----url', url)
}
//企业文化--媒体播报
exports.media_broadcast = function (data, callback) {
  var url = _api_url_path(data, config.apis.get_media_broadcast);
  if (url == null) {
    callback('404');
    return;
  }
  api.apiRequest(url, callback);
}
/**
 * 关于我们联系我们--->
 * @param data
 * @param callback
 */
exports.contact = function (data, callback) {
  //var param = {"country": "1", "organid": "1", "pagesize": 12};
  var url = _api_url_path(data, config.apis.get_contact);
  if (url == null) {
    callback('404');
    return;
  }
  api.apiRequest(url, callback);
}
exports.shengqinganli_list = function (data, callback) {
  var url = _api_url_path(data, config.apis.get_shengqinganli_list);
  if (url == null){
    callback('404');
    return;
  }
  api.apiRequest(url ,callback);
  // log.debug('shengqinganli_list----url', url)
}
//栏目列表页---->栏目
exports.channel_list = function (data, callback) {
  var url = _api_path_url_shequ(data, config.apis.get_channel_list);
  if (url == null){
    callback('404');
    return;
  }
  // console.log('RTYUUUUUUUUUUUUUUUUUUUU' + url)
    // log.debug('shengqinganli_list----url', url)

  api.apiRequest(url ,callback);
}
//栏目综合页---->栏目］留学奖学金
exports.liuxuejiangxuejin_list = function (data, callback) {
  var url = _api_url_path(data, config.apis.get_liuxuejiangxuejin_list);
  if (url == null){
    callback('404');
    return;
  }
  api.apiRequest(url ,callback);
  // log.debug('shengqinganli_list----url', url)
}
//栏目综合页---->留学方案（不带学历）
exports.liuxuefangan_list = function (data, callback) {
  var url = _api_url_path(data, config.apis.get_liuxuefangan_list);
  if (url == null){
    callback('404');
    return;
  }
  api.apiRequest(url ,callback);
  // log.debug('shengqinganli_list----url', url)
}

//栏目综合页---->［栏目］媒体播报
exports.meitibobao_list = function (data, callback) {
  var url = _api_url_path(data, config.apis.get_meitibobao_list);
  if (url == null){
    callback('404');
    return;
  }
  api.apiRequest(url ,callback);
  // log.debug('shengqinganli_list----url', url)
}

//栏目综合页---->［栏目］留学常见问题
exports.lxcjquestion_list = function (data, callback) {
  var url = _api_url_path(data, config.apis.get_lxcjquestion_list);
  if (url == null){
    callback('404');
    return;
  }
  api.apiRequest(url ,callback);
  // log.debug('shengqinganli_list----url', url)
}
//学历频道页-------留学常见问题
exports.lxcjquestion = function (data, callback) {
  var url = _api_url_path(data, config.apis.get_lxcjquestion);
  if (url == null){
    callback('404');
    return;
  }
  api.apiRequest(url ,callback);
  // log.debug('shengqinganli_list----url', url)
}

//产品频道----> 最新留学方案（带学历）
exports.hot_liuxuefangan_list = function (data, callback) {
  var url = _api_url_path(data, config.apis.get_hot_liuxuefangan_list);
  if (url == null){
    callback('404');
    return;
  }
  api.apiRequest(url ,callback);
 
}

//产品频道----> 最新留学方案初始化接口
exports.new_liuxuefangan_init = function (data, callback) {
  var url = _api_url_path(data, config.apis.get_new_liuxuefangan_init);
  if (url == null){
    callback('404');
    return;
  }
  api.apiRequest(url ,callback);
  // log.debug('shengqinganli_list----url', url)
}
//栏目综合页---->详情页通用接口
exports.detail = function (data, callback) {
  var url = _api_url_path(data, config.apis.get_detail);
  if (url == null){
    callback('404');
    return;
  }
  api.apiRequest(url ,callback);
  // log.debug('shengqinganli_list----url', url)
}
//栏目综合页---->［栏目］国家介绍
exports.country_introduce_list = function (data, callback) {
  var url = _api_url_path(data, config.apis.get_country_introduce_list);
  if (url == null){
    callback('404');
    return;
  }
  api.apiRequest(url ,callback);
   //log.debug('url------------------------------------', url)
}
//国家频道---->国家介绍
exports.country_introduce = function (data, callback) {
  var url = _api_url_path(data, config.apis.get_country_introduce);
  if (url == null){
    callback('404');
    return;
  }
  api.apiRequest(url ,callback);
   
}

exports.contact_way_list = function (data, callback) {
  var url = _api_url_path(data, config.apis.get_contact_way_list);
  if (url == null){
    callback('404');
    return;
  }
  api.apiRequest(url ,callback);
  
}

exports.memorabilia_list = function (data, callback) {
  var url = _api_url_path(data, config.apis.get_memorabilia_list);
  if (url == null){
    callback('404');
    return;
  }
  api.apiRequest(url ,callback);
  
}

exports.company_culture_list = function (data, callback) {
  var url = _api_url_path(data, config.apis.get_company_culture_list);
  if (url == null){
    callback('404');
    return;
  }
  api.apiRequest(url ,callback);
  
}
exports.business_cooperation_list = function (data, callback) {
  var url = _api_url_path(data, config.apis.get_business_cooperation_list);
  if (url == null){
    callback('404');
    return;
  }
  api.apiRequest(url ,callback);
 
}

/**
 * 留学活动列表
 * @param callback
 */
exports.liuxuehuodong_list = function (param, callback) {
  //var param = {"country":"1", "page":"1", "pagesize":10};
  var url = _api_url_path(param, config.apis.get_liuxuehuodong_list);
  if(url == null){
    callback('404');
    return;
  }
  api.apiRequest(url, callback);
}

/**
 * 文案团队列表
 * @param callback
 */
exports.wenantuandui_list = function (param, callback) {
  //var param = {"country":"1", "page":"1", "pagesize":10};
  var url = _api_url_path(param, config.apis.get_wenantuandui_list);
  if(url == null){
    callback('404');
    return;
  }
  api.apiRequest(url, callback);
}

/**
 * 专业推荐 zhuanyetuijian
 * @param country 国家id 不传获取全部
 * @param organid 机构id 不传获取全部
 * @param order 排序,['1'=>'inputtime DESC', '2'=>'hits DESC']
 * @param pagesize 分页条数, 默认11
 * @param page 分页, 当前分页值默认1
 */
exports.zhuanyetuijian_list = function (data, callback) {
  //var param = {"country": "1", "organid": "1", "pagesize": 12};
  var url = _api_url_path(data, config.apis.get_zhuanyetuijian_list);
  if (url == null){
    callback('404');
    return;
  }
  api.apiRequest(url ,callback);
};
exports.zhuanyetuijian = function (callback) {
  var param = {"country": "1", "organid": "1", "limit": 12};
  var url = _api_url_path(param, config.apis.get_zhuanyetuijian);
  if (url == null){
    callback('404');
    return;
  }
  api.apiRequest(url ,callback);
}

/**
 * 热门院校 remenyuanxiao
 * @param country 国家id 不传获取全部
 * @param organid 机构id 不传获取全部
 * @param order 排序,['1'=>'inputtime DESC', '2'=>'hits DESC']
 * @param pagesize 分页条数, 默认11
 * @param page 分页, 当前分页值默认1
 */
exports.remenyuanxiao = function (data,callback) {
  //var param = {"country": "1", "organid": "1", "limit": 11};
  var url = _api_url_path(data, config.apis.get_remenyuanxiao);
  if (url == null){
    callback('404');
    return;
  }
  api.apiRequest(url ,callback);
}

//国家频道---》留学方案
exports.country_liuxuefangan_list = function (data, callback) {
  var url = _api_url_path(data, config.apis.get_country_liuxuefangan_list);
  if (url == null){
    callback('404');
    return;
  }
  api.apiRequest(url ,callback);
   
}

//学历频道 ---》热门留学方案
exports.hot_liuxuefangan_list = function (data, callback) {
  var url = _api_url_path(data, config.apis.get_hot_liuxuefangan_list);
  if (url == null){
    callback('404');
    return;
  }
  api.apiRequest(url ,callback);
   
}

//产品频道----> 最新留学方案（带学历）
exports.new_liuxuefangan_list = function (data, callback) {
  var url = _api_url_path(data, config.apis.get_new_liuxuefangan_list);
  if (url == null){
    callback('404');
    return;
  }
  
  api.apiRequest(url ,callback);
   
}


//产品频道 ----> 亚洲 欧洲 聚合
exports.countryLiuxuefanganRecommend =function(data,callback){
 var url = _api_url_path(data, config.apis.get_countryLiuxuefanganRecommend);
  if (url == null){
    callback('404');
    return;
  }
   
  api.apiRequest(url ,callback);
}


////活动预告
//exports.huodongyugao = function (data, callback) {
//  var url = _api_url_path(data, config.apis.get_new_liuxuefangan_list);
//  if (url == null){
//    callback('404');
//    return;
//  }
//  api.apiRequest(url ,callback);
//}


exports.zhuanyetuijian = function (data,callback) {
  //var param = {"country": "1", "organid": "1", "limit": 12};
  var url = _api_url_path(data, config.apis.get_zhuanyetuijian);
  if (url == null){
    callback('404');
    return;
  }
  api.apiRequest(url ,callback);
}
/**
 * 大学排名
 * @param organid 机构id
 * @param pagesize 左侧6个大学的数量是定死的不用传, pagezise 是针对右侧条数的
 */
exports.daxuepaiming = function (param,callback) {
  var url = _api_url_path(param, config.apis.get_daxuepaiming);
  if (url == null){
    callback('404');
    return;
  }
  api.apiRequest(url ,callback);
}

//精彩专题
exports.jingcaizhuanti = function (data, callback) {
  //var param = {"country": "1", "organid": "1", "limit": 11};
  var url = _api_url_path(data, config.apis.get_jingcaizhuanti);
  if (url == null){
    callback('404');
    return;
  }
  api.apiRequest(url ,callback);
}

/**
 * 增值服务
 * @param organid: 机构id;
 * @param type_id: 类型id['1' => '金融与保险', '2' => '生活与服务', '3' => '金融与保险'];
 * @param pagesize: 每个类型所取条数;
 */
exports.zengzhifuwu_list = function (param,callback) {
  var url = _api_url_path(param, config.apis.get_zengzhifuwu_list);
  if (url == null){
    callback('404');
    return;
  }
  api.apiRequest(url ,callback);
}

/*
精彩专题频道du
 */
exports.zhuanti = function (param,callback) {
  //var param = {"organid": "1", "pagesize": 6};
  var url = _api_url_path(param, config.apis.get_zhuanti);
  if (url == null){
    callback('404');
    return;
  }
  api.apiRequest(url ,callback);
}


/*
 * 近期精彩活动列表
 */
exports.new_jingcaihuodong_list = function (data,callback) {

  var url = _api_url_path(data, config.apis.get_new_jingcaihuodong_list);
  
   if (url == null){
    callback('404');
    return;
  }
  api.apiRequest(url ,callback);

}


//顾问文章
exports.wecenter = function (data, callback) {
  //var param = {"country_id": 1, "type": 2, "edu_id": "4", "per_page": "15"};
  var url = _api_url_path(data, config.apis.get_wecenter);

  if (url == null){
    callback('404');
    return;
  }
  api.apiRequest(url ,callback);
}


/**
 * 大学排名列表
 * @param organid 机构id
 * @param pagesize 左侧6个大学的数量是定死的不用传, pagezise 是针对右侧条数的
 */
exports.daxuepaiming_list = function (param,callback) {
  var url = _api_url_path(param, config.apis.get_daxuepaiming_list);
  if (url == null){
    callback('404');
    return;
  }
  api.apiRequest(url ,callback);
}
//页面轮播图
var adRedisPool = require('redis-connection-pool')('pageAdvertCache', {
  host: config.redisCache.host,
  port: config.redisCache.port || 6379,
  max_clients: config.redisCache.max || 30,
  perform_checks: false,
  database: 7 // database number to use
});
exports.lunbo_list = function (data,callback) {
  var liuxue_search_page_key = ['SEARCHNEWS','SEARCHADVISER'];
  var yimin_search_page_key = ['YIMIN_SEARCHNEWS','YIMIN_SEARCHADVISER'];
  var ad_page_val = '';
  var isInArray = function (arr,value){
    for(var i = 0; i < arr.length; i++){
      if(value === arr[i]){
        return true;
      }
    }
    return false;
  };
  if (isInArray(liuxue_search_page_key,data.ad_page)) {
    ad_page_val = 'LIUXUE_SEARCH';
  }
  else if (isInArray(yimin_search_page_key,data.ad_page)) {
    ad_page_val = 'YIMIN_SEARCH';
  }
  adRedisPool.get('WEB:ADVERT:LUNBO:'+data.cityid+'_'+ad_page_val+'_'+data.ad_seat, function (err, reply) {
    if (reply) {
      var res = JSON.parse(reply);
      callback(null, res);
    }
    else {
      var url = _api_url_path(data, config.apis.get_lunbo_list);
      if (url == null){
        callback('404');
        return;
      }
      api.apiRequest(url ,callback);
    }
  })
}
//搜索结果页so_article_list
exports.so_article_list = function (data,callback) {
  var url = _api_path_url_shequ(data, config.apis.get_so_article_list);
  if (url == null){
    callback('404');
    return;
  }
  api.apiRequest(url ,callback);
}
//国家文章结果页search_article_list
exports.search_article_list = function (data,callback) {
  var url = _api_path_url_shequ(data, config.apis.get_search_article_list);
  if (url == null){
    callback('404');
    return;
  }
  api.apiRequest(url ,callback);
}
//搜索结果页so_adviser_list
exports.so_adviser_list = function (data,callback) {
  var url = _api_path_url_shequ(data, config.apis.get_so_adviser_adviser);
  if (url == null){
    callback('404');
    return;
  }
  api.apiRequest(url ,callback);
}
/*顾问登录*/
exports.login_ss = function (data, callback) {
  var url = config.apis.post_login;
  if (url == null){
    callback('404');
    return;
  }
  api.apiRequest_post(url ,data ,callback);
}

/*顾问登录*/
exports.register_ss = function (data, callback) {
  var url = config.apis.user_register;
  if (url == null){
    callback('404');
    return;
  }
  api.apiRequest_post(url ,data ,callback);
}

/**
 * 第三方登录接口调用封装
 * @param data
 * @param callback
 */
exports.oauth = function (data, callback) {
  var url = _api_url_path(data, config.apis.oauth);
  if (url == null) {
    callback('404');
    return;
  }
  api.apiRequest(url, callback);
  log.debug('url', url)
}

/*普通用户验证码登录*/
exports.login_user = function (data, callback) {
  var url = config.apis.login_user;
  if (url == null){
    callback('404');
    return;
  }
  api.apiRequest_post(url ,data ,callback);
}

/*普通用户密码登录*/
exports.user_login = function (data, callback) {
  var url = config.apis.user_login;
  if (url == null){
    callback('404');
    return;
  }
  api.apiRequest_post(url ,data ,callback);
}

/**
 * 分公司首页--->媒体播报
 * @param data
 * @param callback
 */
exports.meitibobao = function (data, callback) {
  //var param = {"country": "1", "organid": "1", "pagesize": 12};
  var url = _api_url_path(data, config.apis.get_meitibobao);
  if (url == null){
    callback('404');
    return;
  }
  api.apiRequest(url ,callback);
};

/**
 * 分公司首页--->增值服务
 * @param data
 * @param callback
 */
exports.zengzhifuwu = function (data, callback) {
  //var param = {"country": "1", "organid": "1", "pagesize": 12};
  var url = _api_url_path(data, config.apis.get_zengzhifuwu);
  if (url == null){
    callback('404');
    return;
  }
  api.apiRequest(url ,callback);
};

/**
 * 分公司首页--->留学社区
 * @param data
 * @param callback
 */
exports.liuxueshequ = function (data, callback) {
  //var param = {"country": "1", "organid": "1", "pagesize": 12};
  var url = _api_url_path(data, config.apis.get_home_liuxueshequ);
  if (url == null){
    callback('404');
    return;
  }
  api.apiRequest(url ,callback);
};

/**
 * 分公司首页--->留学聚焦
 * @param data
 * @param callback
 */
exports.liuxuejujiao = function (data, callback) {
  var url = _api_url_path(data, config.apis.get_home_liuxuejujiao);
  if (url == null){
    callback('404');
    return;
  }
  api.apiRequest(url ,callback);
};

exports.attachment = function(data,callback){
  var url = _api_url_path(data, config.apis.get_attachment);
  if (url == null){
    callback('404');
    return;
  }
  api.apiRequest(url ,callback);
}
//举报接口
exports.userReport = function(data,callback){
  var url = config.apis.post_userReport;
  if (url == null){
    callback('404');
    return;
  }
  api.apiRequest_post(url ,data ,callback);
};

var redisPool = require('redis-connection-pool')('home_all_city_id', {
  host: config.redisCache.host,
  port: config.redisCache.port || 6379,
  max_clients: config.redisCache.max || 30,
  perform_checks: false,
  database: 7 // database number to use
});
exports.shouye = function (data, callback) {
  //redis 缓存文章浏览数````·
  //判断用户访问是否在限制条件内 10min 5
    redisPool.get('home_all_' + data.city_id, function(err, reply){
      if(reply){
        callback(null, reply);
      }else{
        callback(null, '暂无数据');
      }
    })
};
exports.ajax_shouye = function (data, callback) {
  //redis 缓存文章浏览数````·
  //判断用户访问是否在限制条件内 10min 5
  //log.debug('city_id ',data.city_id,'country_id ',data.country_id,'edu_id',data.edu_id)
  redisPool.get('home_' + data.city_id+'_'+data.country_id, function(err, reply){
    if(reply){
      var c_list = JSON.parse(reply).list;
      var res_replay={};
      for (let i = 0;len = c_list.length,i < len; i++) {
        if (c_list[i].edu_id == data.edu_id) {
          res_replay = c_list[i];
        }
      }
      callback(null, res_replay);
    }else{
      callback(null, '暂无数据');
    }
  })
};
exports.yimin_shouye = function (data, callback) {
    redisPool.get('yimin_home_all', function(err, reply){
      if(reply){
        callback(null, reply);
      }else{
        callback(null, '暂无数据');
      }
    })
};
exports.link = function (data, callback) {
    //redis 缓存友情链接·
    redis_db.select('2', function(error){
        var key = 'WEB:LINK:linkCity:'+data.city_id+'pc';
        redis_db.zrange(key, 0, -1, function (err, req) {
            if(req){
                callback(null, req);
            }else{
                callback(null, '暂无数据');
            }
        });
    });
};
/*在线评估*/
exports.assessment = function(data,callback){
  var url = config.apis.assessment;
  if (url == null){
    callback('404');
    return;
  }
  api.apiRequest_post(url ,data ,callback);
};

//参赞列表
exports.canzanlist = function (data, callback) {
  var url = _api_url_path2(data, config.apis.get_canzanlist);
  if (url == null) {
    callback('404');
    return;
  }
  api.apiRequest(url, callback);
}

//新活动列表
exports.activity_list = function (data, callback) {
  var url = _api_url_path(data, config.apis.get_activity_list);
  if (url == null) {
    callback('404');
    return;
  }
  api.apiRequest(url, callback);
}
//历届城市活动列表
exports.end_activity_list = function (data, callback) {
  var url = _api_url_path(data, config.apis.get_end_activity_list);
  if (url == null) {
    callback('404');
    return;
  }
  api.apiRequest(url, callback);
}
//新活动底页
exports.activity_detail = function (data, callback) {
  var url = _api_url_path(data, config.apis.get_activity_detail);
  if (url == null) {
    callback('404');
    return;
  }
  api.apiRequest(url, callback);
}
/*发送手机验证码*/
exports.sendcode_ss = function (data, callback) {
  log.debug('000');
  var url = _api_url_path(data, config.apis.sendcode);
  if (url == null) {
    callback('404');
    return;
  }
  api.apiRequest(url, callback);
  log.debug('url', url)
}

/*忘记密码*/
exports.forget = function (data, callback) {
  log.debug(444);
  var url = config.apis.forget;
  if (url == null) {
    callback('404');
    return;
  }
  api.apiRequest_post(url, data, callback);
  console.log('url++++++', url)
}

/*绑定手机号*/
exports.bind_phone = function (data, callback) {
  log.debug(333);
  var url = config.apis.bind_phone;
  if (url == null) {
    callback('404');
    return;
  }
  api.apiRequest_post(url, data, callback);
  console.log('url-----', url)
}
//获取城市接口
exports.ip_geter =function(data,callback){
  var url = config.apis.get_ip_geter+"?ip="+data;
  if (url == null){
    callback('404');
    return;
  }
  api.apiRequest(url ,callback);
}

//金色力量底页
exports.culture_detail =function(data,callback){
  var url = _api_url_path(data, config.apis.get_culture_detail);
  if (url == null){
    callback('404');
    return;
  }

  api.apiRequest(url ,callback);

}
//参赞简介
exports.canzan_jianjie =function(data,callback){
  var url = _api_path_url_shequ(data, config.apis.get_user_description);
  if (url == null){
    callback('404');
    return;
  }
  console.log('url----hahhahahahhaahhahahahahh-', url)
  api.apiRequest(url ,callback);
}
//表单提交
exports.save_feedback = function(data,callback){
  var url = config.apis.get_save_feedback;
  if (url == null) {
    callback('404');
    return;
  }
  api.apiRequest_post(url, data, callback);
};
//article_top
exports.article_top = function(data,callback){
  var url = config.apis.article_top;
  if (url == null){
    callback('404');
    return;
  }
  api.apiRequest_post(url ,data ,callback);
};

//ad广告统计redis
exports.ad_tongji = function(uid, phone){
  var moment = require('moment');
  var redis = require('redis');
  var redisHits =  redis.createClient(config.redisCache.port, config.redisCache.host);
  
  console.log('ad_tongji---------uid', uid);
  console.log('ad_tongji---------phone', phone);
  redisHits.select('3', function(error){
    var key = "ad_tongji:"+moment().format('YYYY-MM-DD');
    redisHits.sadd(key, "{'uid':"+uid+", 'phone':"+phone+"}");
  });
  
}
//专题页面
exports.schooltopic =function(data,callback){
  var url = _api_url_path(data, config.apis.get_schooltopic);
  if (url == null){
    callback('404');
    return;
  }

  api.apiRequest(url ,callback);

}

//首页广告楼层
exports.advert = function(data,callback){
  var url = _api_url_path(data, config.apis.advert);
  if (url == null){
    callback('404');
    return;
  }
  api.apiRequest(url, callback);
};

exports.userFeedback = function(data,callback){
  var url = _api_url_path(data,config.apis.userFeedback)
  console.log(url)
  if (url == null){
    callback('404');
    return;
  }
  api.apiRequest_post(url ,data ,callback);
};

var redisPool_views = require('redis-connection-pool')('viewNumberCache', {
  host: config.redisCache.host,
  port: config.redisCache.port || 6379,
  max_clients: config.redisCache.max || 30,
  perform_checks: false,
  database: 6 // database number to use
});
/*
 浏览量统计detail_count
 * */
exports.detail_count = function (data, callback) {
  //redis 缓存文章浏览数````·
  //判断用户访问是否在限制条件内 10min 5
  var condition_time = 60;
  var condition_num = 1;
  if(!data.uuid){
    var UUID = require('uuid');
    var uuidstr = UUID.v1();
    redisPool_views.set(uuidstr+"_"+data.catid+"_"+data.id+"_time", Date.parse(new Date()), function(){});
    redisPool_views.set(uuidstr+"_"+data.catid+"_"+data.id+"_viewnum", 1, function(){});
    redisPool_views.expire(uuidstr+"_"+data.catid+"_"+data.id+"_time", 600);
    redisPool_views.expire(uuidstr+"_"+data.catid+"_"+data.id+"_viewnum", 600);
    update_viewnum(data.catid, data.id, uuidstr, callback);
    //callback(null, uuidstr);
  }else{
    redisPool_views.get(data.uuid+"_"+data.catid+"_"+data.id+"_time", function(err, reply){
      if(reply){
        var nowTime = Date.parse(new Date());
        if(Number.parseInt((nowTime - reply)/60000) >= condition_time){
          redisPool_views.set(uuidstr+"_"+data.catid+"_"+data.id+"_time", Date.parse(new Date()), function(){});
          redisPool_views.set(uuidstr+"_"+data.catid+"_"+data.id+"_viewnum", 1, function(){});
          redisPool_views.expire(uuidstr+"_"+data.catid+"_"+data.id+"_time", 600);
          redisPool_views.expire(uuidstr+"_"+data.catid+"_"+data.id+"_viewnum", 600);
          update_viewnum(data.catid, data.id, data.uuid, callback);
        }else{
          redisPool_views.get(data.uuid+"_"+data.catid+"_"+data.id+"_viewnum", function(err, reply){
            if(!reply || reply < condition_num){
              redisPool_views.incr(data.uuid+"_"+data.catid+"_"+data.id+"_viewnum", function(){});
              update_viewnum(data.catid, data.id, data.uuid, callback);
            }else{
              var viewNumKey = "WEB:HITS:"+data.id;
              redisPool_views.get(viewNumKey, function(err, reply){
                if(reply){
                  callback(null, {"uuid":data.uuid, "num":reply});
                }
              });
            }
          });
        }
      }else{
        redisPool_views.set(data.uuid+"_"+data.catid+"_"+data.id+"_time", Date.parse(new Date()), function(){});
        redisPool_views.set(data.uuid+"_"+data.catid+"_"+data.id+"_viewnum", 1, function(){});
        redisPool_views.expire(uuidstr+"_"+data.catid+"_"+data.id+"_time", 600);
        redisPool_views.expire(uuidstr+"_"+data.catid+"_"+data.id+"_viewnum", 600);
        update_viewnum(data.catid, data.id, data.uuid, callback);
      }
    });
    //callback(null, data.uuid);

  }

};


function update_viewnum(catid, id, uuid, callback){
  var viewNumKey = "WEB:HITS:"+id;
  redisPool_views.incr(viewNumKey, function(err, reply){
    if(err){
      log.error("view num "+" : "+data.id, err);
    }else{
      var redisHits =  redis.createClient(config.redisCache.port, config.redisCache.host);
      redisHits.select('6', function(error){
        var viewListKey = "view_set";
        redisHits.sadd(viewListKey, id);
      });
      if(callback){
        callback(null, {"uuid":uuid, "num":reply});
      }
    }
  });
};