var wec = require('../model/wecenter');
var cms = require('../model/cms');
var async = require('async');
var cookie = require('cookie-parser');
var url = require('url');
var log4js = require('../log/log');
var log = log4js.getLogger();
var config = require('../config/config');
var esihelper = require('../middleware/esihelper');
var code = '1220000006'; // not found
var comfunc = require('../common/common');
var tokenfunc = require('./token.js');
var helperfunc = require('../common/helper');
function returnData(obj,urlName){
  if(obj.code==0){
    return obj.data;
  }else{
    log.error(urlName,obj);
    return {};
  }
}
function split_array(arr, len) {
  var a_len = arr.length;
  var result = [];
  for (var i = 0; i < a_len; i += len) {
    result.push(arr.slice(i, i + len));
  }
  return result;
}


//参赞聚合页面
exports.canzan = function (req, res, next) {
  log.info('参赞聚合页',req.params);
  var data = [];
  var area = req.cookies.currentarea ? req.cookies.currentarea : 1;
  var qianzhengzhinan_currentPage=req.query.page || 1;
  var country = req.query.n || 0;
  var articleId = req.params.id;
  var page =req.query.page || 1;
  var order =req.query.article || 1;
  //node获取地址栏url
  var l = url.parse(req.url, true).query;
  console.log('url', l.h);
  if (l.h !== undefined) {
      data.url = l.h;
  } else {
      data.url = config.wwhost;
  }
  data.login_info = ''
  if ( req.cookies.login_ss !== undefined) {
    console.log('aaaaaa');
    data.login_info = JSON.parse(req.cookies.login_ss);
    console.log('data.login_info', data.login_info);
  }else{
    data.login_info ={};
    data.login_info.uid = 0;
    //res.redirect(config.wwhost+'/login');
    //return false;
  }
  async.parallel({
    userinfo:function(callback){
      wec.userinfo({
        "u_id":data.login_info.uid, "to_uid":data.login_info.uid},callback);
    },
    canzanlist:function (callback) {
      cms.canzanlist({"usertype":"3","pagesize":100},callback);
    },
  }, function (err, result){
    data.userinfo = returnData(result.userinfo,'userinfo');
    data.canzanlist = returnData(result.canzanlist,'canzanlist');
    log.info('个人信息',data.userinfo)
    data.country=country;
    data.route = 'team';
    data.pageType = '文案团队';
    data.path = 'TEAMDETAIL';
    data.pageroute='team';
    data.area=area;
    data.tdk = {
      pagekey: 'COUNSELLER', //key
      cityid: area, //cityid
      nationid: country//nationi
    };
    res.render('about/canzan', data);

  });
}

//企业文化
exports.culture = function (req, res, next){
    var data = [];
    var area = req.cookies.currentarea ? req.cookies.currentarea : 1;
    var qianzhengzhinan_currentPage=req.query.page || 1;
    var country = req.query.n || 0;
  //node获取地址栏url
  var l = url.parse(req.url, true).query;
  console.log('url', l.h);
  if (l.h !== undefined) {
      data.url = l.h;
  } else {
      data.url = config.wwhost;
  }
    data.login_nickname = '';
    if ( req.cookies.login_ss !== undefined) {
      var login_a = JSON.parse(req.cookies.login_ss);
      //log.debug("login_a-------" + login_a.nickname)
      data.login_nickname = login_a;
    }
    async.parallel({
      lunbo_list: function (callback) {
        // 轮播图接口
        cms.lunbo_list({"ad_page":"CULTURE","ad_seat":"SEAT5","cityid":area},callback);
      },
      company_culture1:function(callback){
        cms.company_culture_list({
          "culture_type":1,
          "page":1,
          "pagesize":3
        }, callback)
      },
      company_culture2:function(callback){
        cms.company_culture_list({
          "culture_type":2,
          "page":1,
          "pagesize":3
        }, callback)
      },
    }, function (err, result){
      log.info(result)
      data.xSlider =returnData(result.lunbo_list,'lunbo_list');
      data.jincaishike =returnData(result.company_culture1,'company_culture1');
      data.jinseliliang =returnData(result.company_culture2,'company_culture2');
     data.pageroute="about/culture";
      data.tdk = {
        pagekey: 'CULTURE', //key
        cityid: area, //cityid
        nationid: country//nationi
      };
      res.render('about/culture', data);
  
    });
  }

  //金吉列简介
exports.about = function (req, res, next){
    var data = [];
    var area = req.cookies.currentarea ? req.cookies.currentarea : 1;
    var qianzhengzhinan_currentPage=req.query.page || 1;
    var country = req.query.n || 0;
  //node获取地址栏url
  var l = url.parse(req.url, true).query;
  console.log('url', l.h);
  if (l.h !== undefined) {
      data.url = l.h;
  } else {
      data.url = config.wwhost;
  }
    data.login_nickname = '';
    if ( req.cookies.login_ss !== undefined) {
      var login_a = JSON.parse(req.cookies.login_ss);
      //log.debug("login_a-------" + login_a.nickname)
      data.login_nickname = login_a;
    }
    async.parallel({
  
    }, function (err, result){
      log.info(result)
      data.pageroute="about";
      data.tdk = {
        pagekey: 'PROFILE', //key
        cityid: area, //cityid
        nationid: country//nationi
      };
      res.render('about/about', data);
  
    });
  }

  //金吉列大事记
exports.events = function (req, res, next){
    var data = [];
    var area = req.cookies.currentarea ? req.cookies.currentarea : 1;
    var qianzhengzhinan_currentPage=req.query.page || 1;
    var country = req.query.n || 0;
  //node获取地址栏url
  var l = url.parse(req.url, true).query;
  console.log('url', l.h);
  if (l.h !== undefined) {
      data.url = l.h;
  } else {
      data.url = config.wwhost;
  }
    data.login_nickname = '';
    if ( req.cookies.login_ss !== undefined) {
      var login_a = JSON.parse(req.cookies.login_ss);
      //log.debug("login_a-------" + login_a.nickname)
      data.login_nickname = login_a;
    }
    async.parallel({
  
      memorabilia_list:function(callback){
        cms.memorabilia_list({
          "page":1,
          "pagesize":100
        }, callback);
      },
  
    }, function (err, result){
      log.info(result)
      data.memorabilia_list=returnData(result.memorabilia_list,'memorabilia_list');
      data.pageroute="about/events";
      data.tdk = {
        pagekey: 'EVENTS', //key
        cityid: area, //cityid
        nationid: country//nationi
      };
      res.render('about/events', data);
  
    });
  }

  //商务合作
exports.cooperation = function (req, res, next){
    var data = [];
  
  
    var area = req.cookies.currentarea ? req.cookies.currentarea : 1;
    var qianzhengzhinan_currentPage=req.query.page || 1;
    var country = req.query.n || 0;
  //node获取地址栏url
  var l = url.parse(req.url, true).query;
  console.log('url', l.h);
  if (l.h !== undefined) {
      data.url = l.h;
  } else {
      data.url = config.wwhost;
  }
    data.login_nickname = '';
    if ( req.cookies.login_ss !== undefined) {
      var login_a = JSON.parse(req.cookies.login_ss);
      //log.debug("login_a-------" + login_a.nickname)
      data.login_nickname = login_a;
    }
    async.parallel({
      lunbo_list: function (callback) {
        // 轮播图接口
        cms.lunbo_list({"ad_page":"COOPERATION","ad_seat":"SEAT5","cityid":area},callback);
      },
      company_culture1:function(callback){
        cms.company_culture_list({
          "culture_type":1
        }, callback)
      },
      company_culture2:function(callback){
        cms.company_culture_list({
          "culture_type":2
        }, callback)
      },
  
    }, function (err, result){
      log.info(result)
      data.xSlider =returnData(result.lunbo_list,'lunbo_list');
      data.jincaishike =returnData(result.company_culture1,'company_culture1');
      data.jinseliliang =returnData(result.company_culture2,'company_culture2');
      data.pageroute="about/cooperation";
      data.tdk = {
        pagekey: 'COOPERATION', //key
        cityid: area, //cityid
        nationid: country//nationi
      };
      res.render('about/cooperation', data);
  
    });
  }

  //contact 联系我们
exports.contact = function (req, res, next){
    var data = [];
    var area = req.cookies.currentarea ? req.cookies.currentarea : 1;
    var qianzhengzhinan_currentPage=req.query.page || 1;
    var country = req.query.n || 0;
  //node获取地址栏url
  var l = url.parse(req.url, true).query;
  console.log('url', l.h);
  if (l.h !== undefined) {
      data.url = l.h;
  } else {
      data.url = config.wwhost;
  }
    data.login_nickname = '';
    if ( req.cookies.login_ss !== undefined) {
      var login_a = JSON.parse(req.cookies.login_ss);
      //log.debug("login_a-------" + login_a.nickname)
      data.login_nickname = login_a;
    }
    async.parallel({
      contact: function (callback) {
        cms.contact( {
          "area_type":1,
        }, callback);
      },
      contact2: function (callback) {
          cms.contact( {
            "area_type":2,
          }, callback);
      },
      contact3: function (callback) {
          cms.contact( {
            "area_type":3,
          }, callback);
      },
      contact4: function (callback) {
        cms.contact( {
          "area_type":4,
        }, callback);
      },
      contact5: function (callback) {
        cms.contact( {
          "area_type":5,
        }, callback);
      },
      contact6: function (callback) {
        cms.contact( {
          "area_type":6,
        }, callback);
      },
      contact7: function (callback) {
        cms.contact( {
          "area_type":7,
        }, callback);
      },
      contact8: function (callback) {
        cms.contact( {
          "area_type":8,
        }, callback);
      },
      contact9: function (callback) {
        cms.contact( {
          "area_type":9,
        }, callback);
      },
    }, function (err, result){
      log.info(result)
      data.contact =returnData(result.contact,'contact');
      data.contact2 =returnData(result.contact2,'contact2');
      data.contact3 =returnData(result.contact3,'contact3');
      data.contact4 =returnData(result.contact4,'contact4');
      data.contact5 =returnData(result.contact5,'contact5');
      data.contact6 =returnData(result.contact6,'contact6');
      data.contact7 =returnData(result.contact7,'contact7');
      data.contact8 =returnData(result.contact8,'contact8');
      data.contact9 =returnData(result.contact9,'contact9');
      data.pageroute="about/contact";
      data.tdk = {
        pagekey: 'CONTACT', //key
        cityid: area, //cityid
        nationid: country//nationi
      };
      res.render('about/contact', data);
  
    });
  };