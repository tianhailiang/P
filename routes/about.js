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
var request = require('request');
var get_area_code = require('./ip_poll');
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
  log.debug('参赞聚合页');
  var data = [];
  var country = req.query.n || 0;
  var area = req.cookies.currentarea ? req.cookies.currentarea : 1;
  //node获取地址栏url
  var l = url.parse(req.url, true).query;
  if (l.h !== undefined) {
      data.url = l.h;
  } else {
      data.url = config.wwhost;
  }
  data.login_info = ''
  if ( req.cookies.login_ss !== undefined) {
    data.login_info = JSON.parse(req.cookies.login_ss);
  }else{
    data.login_info ={};
    data.login_info.uid = 0;
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
    for (var i = 0; i < data.canzanlist.list.length; i++) {
      if (data.canzanlist.list[i].realname == '王百哲') {
        data.canzanlist.list[i].baiduurl = 'https://baike.baidu.com/item/%E7%8E%8B%E7%99%BE%E5%93%B2/8011002?fr=aladdin';
      } else if (data.canzanlist.list[i].realname == '王仲达') {
        data.canzanlist.list[i].baiduurl = 'https://baike.baidu.com/item/%E7%8E%8B%E4%BB%B2%E8%BE%BE/3979867?fr=aladdin';
      } else if (data.canzanlist.list[i].realname == '李东翔') {
        data.canzanlist.list[i].baiduurl = 'https://baike.baidu.com/item/%E6%9D%8E%E4%B8%9C%E7%BF%94/8011055?fr=aladdin';
      } else if (data.canzanlist.list[i].realname == '陈华生') {
        data.canzanlist.list[i].baiduurl = 'https://baike.baidu.com/item/%E9%99%88%E5%8D%8E%E7%94%9F/9902045?fr=aladdin';
      } else if (data.canzanlist.list[i].realname == '李振平') {
        data.canzanlist.list[i].baiduurl = 'https://baike.baidu.com/item/%E6%9D%8E%E6%8C%AF%E5%B9%B3/83139';
      } else if (data.canzanlist.list[i].realname == '邵宗富') {
        data.canzanlist.list[i].baiduurl = 'https://baike.baidu.com/item/%E9%82%B5%E5%AE%97%E5%AF%8C/8011072?fr=aladdin';
      } else if (data.canzanlist.list[i].realname == '刘在祥') {
        data.canzanlist.list[i].baiduurl = 'https://baike.baidu.com/item/%E5%88%98%E5%9C%A8%E7%A5%A5/8011107?fr=aladdin';
      } else if (data.canzanlist.list[i].realname == '王文选') {
        data.canzanlist.list[i].baiduurl = 'https://baike.baidu.com/item/%E7%8E%8B%E6%96%87%E9%80%89/8248930?fr=aladdin';
      } else if (data.canzanlist.list[i].realname == '艾方林') {
        data.canzanlist.list[i].baiduurl = 'https://baike.baidu.com/item/%E8%89%BE%E6%96%B9%E6%9E%97/8011179?fr=aladdin';
      } else if (data.canzanlist.list[i].realname == '熊长毅') {
        data.canzanlist.list[i].baiduurl = 'https://baike.baidu.com/item/%E7%86%8A%E9%95%BF%E6%AF%85/8011199?fr=aladdin';
      } else if (data.canzanlist.list[i].realname == '张艺华') {
        data.canzanlist.list[i].baiduurl = 'https://baike.baidu.com/item/%E5%BC%A0%E8%89%BA%E5%8D%8E/2214606?fr=aladdin';
      } else if (data.canzanlist.list[i].realname == '薛亚霏') {
        data.canzanlist.list[i].baiduurl = 'https://baike.baidu.com/item/%E8%96%9B%E4%BA%9A%E9%9C%8F/8400260?fr=aladdin';
      } else if (data.canzanlist.list[i].realname == '裴玉芳') {
        data.canzanlist.list[i].baiduurl = 'https://baike.baidu.com/item/%E8%A3%B4%E7%8E%89%E8%8A%B3/2906311?fr=aladdin';
      } else if (data.canzanlist.list[i].realname == '刘疆') {
        data.canzanlist.list[i].baiduurl = 'https://baike.baidu.com/item/%E5%88%98%E7%96%86/4334645#viewPageContent';
      } else if (data.canzanlist.list[i].realname == '田小刚') {
        data.canzanlist.list[i].baiduurl = 'https://baike.baidu.com/item/%E7%94%B0%E5%B0%8F%E5%88%9A/8153130?fr=aladdin';
      } else if (data.canzanlist.list[i].realname == '张利民') {
        data.canzanlist.list[i].baiduurl = 'https://baike.baidu.com/item/%E5%BC%A0%E5%88%A9%E6%B0%91/6781719#viewPageContent';
      } else if (data.canzanlist.list[i].realname == '师淑云') {
        data.canzanlist.list[i].baiduurl = 'https://baike.baidu.com/item/%E5%B8%88%E6%B7%91%E4%BA%91/8292423';
      } else if (data.canzanlist.list[i].realname == '金纬') {
        data.canzanlist.list[i].baiduurl = '1'; // 原创：链接不变
      } else if (data.canzanlist.list[i].realname == '高建') {
        data.canzanlist.list[i].baiduurl = 'https://baike.baidu.com/item/%E9%AB%98%E5%BB%BA/7341453#viewPageContent';
      } else if (data.canzanlist.list[i].realname == '陈维嘉') {
        data.canzanlist.list[i].baiduurl = 'https://baike.baidu.com/item/%E9%99%88%E7%BB%B4%E5%98%89';
      } else if (data.canzanlist.list[i].realname == '朱小玉') {
        data.canzanlist.list[i].baiduurl = '2'; // 去掉落地页，无链接
      } else if (data.canzanlist.list[i].realname == '薛浣白') {
        data.canzanlist.list[i].baiduurl = 'https://baike.baidu.com/item/%E8%96%9B%E6%B5%A3%E7%99%BD/12644545?fr=aladdin';
      } else if (data.canzanlist.list[i].realname == '潘晓景') {
        data.canzanlist.list[i].baiduurl = '1'; // 原创：链接不变
      } else if (data.canzanlist.list[i].realname == '左军') {
        data.canzanlist.list[i].baiduurl = '2'; // 去掉落地页，无链接
      } else if (data.canzanlist.list[i].realname == '袁东') {
        data.canzanlist.list[i].baiduurl = 'https://baike.baidu.com/item/%E8%A2%81%E4%B8%9C/18720294#viewPageContent';
      } 
    }
    data.tdk = {
      pagekey: 'COUNSELLER', //key
      cityid: area, //cityid
      nationid: country//nationi
    };
    res.render('about/canzan', data);

  });
}
//海外律师团队
exports.lawyer = function (req, res, next) {
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
    }
  }, function (err, result){
    data.userinfo = returnData(result.userinfo,'userinfo');
    data.tdk = {
      pagekey: 'YIMIN_LAWYER',
      cityid: area, //cityid
      nationid: country//nationi
    };
    data.esikey = esihelper.esikey();
    res.render('about/lawyer', data);

  });
}
//留学活动
exports.activity = function (req, res, next) {
  var data = [];
  // var area = 1;
  //node获取地址栏url
  console.log('url---------', req.url);
  var l = url.parse(req.url, true).query;
  console.log('url++++++++++', l);
  var area = req.cookies.currentarea ? req.cookies.currentarea : 1;
  // if (req.params[0]) {
  //   var cityId = comfunc.getCityId(req.params[0]);
  //   if(cityId && cityId !== comfunc.INVALID_ID){
  //     area = cityId;
  //     res.cookie("currentarea", cityId, {domain: config.domain});
  //   }
  // }
  var country = req.query.n || 0;
  var articleId = req.params.id;
  var page =req.query.page || 1;
  var order =req.query.article || 1;
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
    activitylist:function (callback) {
      cms.activity_list({"city_id":area,"type":0,"page":"1","perpage":8},callback);
    },
    end_activitylist:function (callback) {
      cms.activity_list({"city_id":area,"type":3,"page":"1","perpage":10},callback);
    }
  }, function (err, result){
    data.userinfo = returnData(result.userinfo,'userinfo');
    data.activitylist = returnData(result.activitylist,'activitylist');
    data.end_activitylist = returnData(result.end_activitylist,'other_activitylist');
  /*  data.country=country;
    data.route = 'team';
    data.pageType = '文案团队';
    data.path = 'TEAMDETAIL';
    data.pageroute='team';*/
    data.area=area;
    data.tdk = {
      pagekey: 'ACTIVITY', //key
      cityid: area, //cityid
      nationid: country//nationi
    };
    data.esikey = esihelper.esikey();
    res.render('about/activity', data);

  });
}
//留学活动--中间页面
exports.activity_ip = function (req, res, next) {
  console.log('area--------', req.url)
  var area = req.cookies.currentarea;
  var url = req.url.substring(9)
  console.log('area--------', url)
  if(area){
    res.redirect(helperfunc.active_urlgen_activity('activity','c='+area, url));
  }else{
    var ip = req.headers['x-forwarded-for'] || req.ip || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress;
    if(ip.split(',').length>0){
      ip = ip.split(',')[0]
    }
     //ip = '175.190.80.79'; //我的外网ip地址
    log.info(ip)
    request.get('http://api.map.baidu.com/location/ip?ip='+ip+'&ak=oTtUZr04m9vPgBZ1XOFzjmDpb7GCOhQw&coor=bd09ll',function (error, response, body){
      if(!error && response.statusCode == 200){
        log.info(body)
        var b =JSON.parse(body);
        var cityCode ='';
        if(b.content){
          cityCode = get_area_code(b.content.address_detail.city);
          res.redirect(helperfunc.active_urlgen_activity('activity','c='+cityCode, url));
        }
      }else{
        res.redirect(helperfunc.active_urlgen_activity('activity','c='+1, url));
      }
    })
  }


}
//活动底页
exports.activity_detail = function (req, res, next){
  var data = [];
  var area = req.cookies.currentarea ? req.cookies.currentarea : 1;
  var urlcity=''
  if (req.params[0]) {
    var cityId = comfunc.getCityId(req.params[0]);
    if(cityId && cityId !== comfunc.INVALID_ID){
      urlcity = cityId;
    }
  }
  var qianzhengzhinan_currentPage=req.query.page || 1;
  var country = req.query.n || 0;
  //node获取地址栏url
  var activityId = req.params[1];

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
    lunbo_list:function(callback) {
      cms.lunbo_list({
        "ad_page": 'ACTIVITYDETAIL',
        "cityid":area,
        "ad_seat": "SEAT1"
      }, callback);
    },
    lunbo_list2:function(callback) {
      cms.lunbo_list({
        "ad_page": 'ACTIVITYDETAIL',
        "cityid":area,
        "ad_seat": "SEAT2"
      }, callback);
    },
    activitydetail: function (callback) {
      cms.activity_detail({
        "catid": 74,
        "id":activityId,
      }, callback);
    },
  }, function (err, result){
    data.xSlider = returnData(result.lunbo_list,'lunbo_list');
    data.xSlider2 = returnData(result.lunbo_list2,'lunbo_list2');
    data.activitydetail = returnData(result.activitydetail, 'activitydetail');
    if(err || result.activitydetail.code != 0 || result.activitydetail.data.list.hold_city != urlcity){
      return next();
    }
    data.huodongdiye=data.activitydetail.list;
    data.tdk = {
      pagekey: 'ACTIVITYDETAIL', //key
      cityid: area, //cityid
      nationid: country//nationi
    };
    data.esikey = esihelper.esikey();
    res.render('about/activity_detail', data);

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
      data.esikey = esihelper.esikey();
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
      lunbo_list: function (callback) {
        // 轮播图接口
        cms.lunbo_list({"ad_page":"PROFILE","ad_seat":"SEAT1","cityid":area},callback);
      }
    }, function (err, result){
      data.xSlider =returnData(result.lunbo_list,'lunbo_list');
      log.info(result)
      data.pageroute="about";
      data.tdk = {
        pagekey: 'PROFILE', //key
        cityid: area, //cityid
        nationid: country//nationi
      };
      data.esikey = esihelper.esikey();
      res.render('about/new_about', data);
  
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
      // data.memorabilia_list=returnData(result.memorabilia_list,'memorabilia_list');
      var eventList = returnData(result.memorabilia_list,'memorabilia_list');//返回大事记的未处理列表
      // console.log('event', eventList)
      var event = {};
      for (let i = 0;i<eventList.length;i++) {
        let y = eventList[i].years;
        let m = eventList[i].month;

        if (!event[y+'年'] || y !== eventList[i-1].years) {
          event[y+'年'] = {};
        }
        if (!event[y+'年'][m+'月'] || m !== eventList[i-1].month) {
          event[y+'年'][m+'月'] = new Array();
        }
        event[y+'年'][m+'月'].push(eventList[i]);
      }
      data.memorabilia_list = event; //event 是处理后的大事记有序列表
      console.log('evnt', data.memorabilia_list)
      data.pageroute="about/events";
      data.tdk = {
        pagekey: 'EVENTS', //key
        cityid: area, //cityid
        nationid: country//nationi
      };
      data.esikey = esihelper.esikey();
      res.render('about/events', data);
  
    });
  }

  // 新金吉列大事记
exports.new_events = function (req, res, next){
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
      cms.lunbo_list({"ad_page":"EVENTS","ad_seat":"SEAT1","cityid":area},callback);
    },
    memorabilia_list:function(callback){
      cms.memorabilia_list({
        "page":1,
        "pagesize": 100
      }, callback);
    },

  }, function (err, result){
    // log.info(result)
    // data.memorabilia_list=returnData(result.memorabilia_list,'memorabilia_list');
    data.xSlider =returnData(result.lunbo_list,'lunbo_list');
    var eventList = returnData(result.memorabilia_list,'memorabilia_list');//返回大事记的未处理列表
    // console.log('event', eventList)
    var event = {};
    for (let i = 0;i<eventList.length;i++) {
      let y = eventList[i].years;
      let m = eventList[i].month;

      if (!event[y+'年'] || y !== eventList[i-1].years) {
        event[y+'年'] = {};
      }
      if (!event[y+'年'][m+'月'] || m !== eventList[i-1].month) {
        event[y+'年'][m+'月'] = new Array();
      }
      event[y+'年'][m+'月'].push(eventList[i]);
    }
    data.memorabilia_list = event; //event 是处理后的大事记有序列表
    console.log('data.memorabilia_list',data.memorabilia_list)
    data.pageroute="about/events";
    data.tdk = {
      pagekey: 'EVENTS', //key
      cityid: area, //cityid
      nationid: country//nationi
    };
    data.esikey = esihelper.esikey();
    res.render('about/new_events', data);

  });
}

// 大事记加载更多
exports.eventsfmore =function(req,res,next){
  var data = req.query;
  console.log('data',req.query)
    cms.memorabilia_list(data, function(err,result){
      if(err){
        res.send(err);
      }else{
        console.log(result)
        var event = {};
        for (let i = 0;i<result.data.length;i++) {
          let y = result.data[i].years;
          let m = result.data[i].month;

          if (!event[y+'年'] || y !== result.data[i-1].years) {
            event[y+'年'] = {};
          }
          if (!event[y+'年'][m+'月'] || m !== result.data[i-1].month) {
            event[y+'年'][m+'月'] = new Array();
          }
          event[y+'年'][m+'月'].push(result.data[i]);
        }
        data.memorabilia_list = event; //event 是处理后的大事记有序列表
        console.log('events', data.memorabilia_list)
        res.send(event);
      }
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
      data.esikey = esihelper.esikey();
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
      lunbo_list: function (callback) {
        // 轮播图接口
        cms.lunbo_list({"ad_page":"CONTACT","ad_seat":"SEAT1","cityid":area},callback);
      },
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
      data.xSlider =returnData(result.lunbo_list,'lunbo_list');
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
      data.esikey = esihelper.esikey();
      res.render('about/contact', data);
  
    });
  };
//金吉列简介
exports.cultures = function (req, res, next){
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
    data.esikey = esihelper.esikey();
    res.render('about/cultures', data);

  });
}

//落地頁金色力量 新的
//金吉列简介
exports.culture_detail = function (req, res, next){
  var data = [];
  var area = req.cookies.currentarea ? req.cookies.currentarea : 1;
  var qianzhengzhinan_currentPage=req.query.page || 1;
  var country = req.query.n || 0;
  //node获取地址栏url
  var articleId = req.params.id;
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
    culture_detail: function (callback) {
      cms.culture_detail({
        "catid": 60,
        "id":articleId,
      }, callback);
    },
  }, function (err, result){
    log.info(result)
    data.pageroute="about";
    data.culture_detail = returnData(result.culture_detail, 'culture_detail');
    log.info(data.culture_detail)
    data.tdk = {
      pagekey: 'CULTURE_DETAIL', //key
      cityid: area, //cityid
      nationid: country//nationi
    };
    data.esikey = esihelper.esikey();
    res.render('about/culture_detail', data);

  });
}
//招聘
exports.employment = function (req, res, next){
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
      pagekey: '', //key
      cityid: area, //cityid
      nationid: country//nationi
    };
    data.esikey = esihelper.esikey();
    res.render('about/employment', data);

  });
}


//专题页面
exports.schooltopic = function (req, res, next){
  var data = [];
  var area = req.cookies.currentarea ? req.cookies.currentarea : 1;
  var qianzhengzhinan_currentPage=req.query.page || 1;
  var country = req.query.n || 0;
  var articleId = req.params.id;
  //node获取地址栏url
  var l = url.parse(req.url, true).query;
  console.log('url', l.h);
  if (l.h !== undefined) {
    data.url = l.h;
  } else {
    data.url = config.wwhost;
  }
  data.login_nickname = '';
  //if ( req.cookies.login_ss !== undefined) {
  //  var login_a = JSON.parse(req.cookies.login_ss);
  //  //log.debug("login_a-------" + login_a.nickname)
  //  data.login_nickname = login_a;
  //}
  async.parallel({
    schooltopic: function (callback) {
      cms.schooltopic({
        id:articleId,
      }, callback);
    },
  }, function (err, result){
    log.info(result)
    data.pageroute="about";
    // data.schooltopic = returnData(result.schooltopic, 'schooltopic');
    data.schooltopic = result.schooltopic.data;
    // console.log('data.schooltopic', data.schooltopic);
    if(result.schooltopic.code != 0){
      //顾问不存在的时候  跳到404
      return next();
    }
    data.tdk = {
      pagekey: 'SCHOOLTOPIC', //key
      cityid: area, //cityid
      nationid: country//nationi
    };
    data.esikey = esihelper.esikey();
    res.render('about/schooltopic', data);

  });
}
