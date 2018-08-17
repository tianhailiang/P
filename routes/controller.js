// var lunbo = require('../views/widget/xSlider/xSlider.json');
var wec = require('../model/wecenter');
var cms = require('../model/cms');
var async = require('async');
var cookie = require('cookie-parser');
var url = require('url');
var log4js = require('../log/log');
var log = log4js.getLogger();
var config = require('../config/config');
var esihelper = require('../middleware/esihelper');
var comfunc = require('../common/common');
var tokenfunc = require('./token.js');
var helperfunc = require('../common/helper');
var svgCaptcha = require("svg-captcha");
var fs = require('fs');
var request = require('request');
function returnData(obj,urlName){
  if(obj.code==0){
    return obj.data;
  }else{
    if (urlName == 'userinfo') {
        log.error(urlName,obj);
    }  
    else {
        log.debug(urlName,obj);
    }
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

function get_page_key(usertype, adviser_type, page_key) {
    var pagekey = null;
    if (usertype == 2) {
        if (adviser_type == 2){
            pagekey = page_key;
        }else {
            pagekey = page_key;
        }
    } else if (usertype == 3) {
        pagekey = page_key.replace('ADVISOR', 'CANZAN');
    }
    return pagekey;
}

exports.index = function (req, res, next) {
    console.log('branch_home',helperfunc.urlgen('branch_home','c='+req.cookies.currentarea))
    if (req.cookies.currentarea) {
        res.cookie("currentareast", comfunc.getCityEn(req.cookies.currentarea), {domain: config.domain,expires: new Date(Date.now() + 90000000000)});
        res.redirect(helperfunc.urlgen('branch_home','c='+req.cookies.currentarea));
        return false;
    }
    var area = req.cookies.currentarea ? req.cookies.currentarea : 1;
    if (req.params[0]) {
        var cityId = comfunc.getCityId(req.params[0]);
        if(cityId && cityId !== comfunc.INVALID_ID){
            area = cityId;
            res.cookie("currentareast", comfunc.getCityEn(cityId), {domain: config.domain,expires: new Date(Date.now() + 90000000000)});
            res.cookie("currentarea", cityId, {domain: config.domain,expires: new Date(Date.now() + 90000000000)});
        }
    }
    var data = [];
    //node获取地址栏url
    var l = url.parse(req.url, true).query;
    console.log('url', l.h);
    if (l.h !== undefined) {
        data.url = l.h;
    } else {
        data.url = config.wwhost+req.url;
    }
    data.index_userinfo = {}
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
        lunbo_list:function(callback) {
            cms.lunbo_list({
                "ad_page": "HOME",
                "ad_seat": "SEAT1",
                "cityid":area
            }, callback);
        },
        lunbo_list2:function(callback) {
            cms.lunbo_list({
                "ad_page": "HOME",
                "ad_seat": "SEAT2",
                "cityid":area
            }, callback);
        },
        shouye:function(callback) {
            cms.shouye({
                "city_id": area,
            }, callback);
        },
        guanggao:function(callback){
            cms.advert({
                "cityid": area,
                "ad_page": "HOME"
            },callback);
        },
        liuxueguanggao:function(callback){
            cms.lunbo_list({
                "ad_page": "HOME",
                "ad_seat": "SEAT3",
                "cityid":area
            }, callback);
        },
    },function (err, result) {
        data.xSlider = returnData(result.lunbo_list,'lunbo_list');
        data.xSlider2 = returnData(result.lunbo_list2,'lunbo_list2');
        data.shouye = JSON.parse(result.shouye);
        data.guanggao = returnData(result.guanggao,'guanggao');
        data.liuxueguanggao = returnData(result.liuxueguanggao,'liuxueguanggao')
        if (data.login_info.uid != 0) {
            async.parallel({
                //获取用户信息（普通用户，顾问，参赞）
                userinfo:function(callback){
                    wec.userinfo({
                    "u_id":data.login_info.uid,
                    "to_uid":data.login_info.uid
                    },callback);
                }
            },function (err, result) {
                data.index_userinfo = result.userinfo;
                console.log('userinfo',data.index_userinfo)
                data.tdk = {
                    pagekey: 'HOME',
                    cityid: area,
                    nationid: ''
                };
                data.esikey = esihelper.esikey();
                res.render('index', data);
            })
        } else {
            data.tdk = {
                pagekey: 'HOME',
                cityid: area,
                nationid: ''
            };
            data.esikey = esihelper.esikey();
            res.render('index', data);
        }
        
    })
};
//分公司首页
exports.index_page = function (req, res, next) {
    var area = req.cookies.currentarea ? req.cookies.currentarea : 1;
    if (req.params[0]) {
        var cityId = comfunc.getCityId(req.params[0]);
        if(cityId && cityId !== comfunc.INVALID_ID){
            area = cityId;
            res.cookie("currentareast", comfunc.getCityEn(cityId), {domain: config.domain,expires: new Date(Date.now() + 90000000000)});
            res.cookie("currentarea", cityId, {domain: config.domain,expires: new Date(Date.now() + 90000000000)});
        }
    }
    var data = [];
    //node获取地址栏url
    var l = url.parse(req.url, true).query;
    console.log('url', l.h);
    if (l.h !== undefined) {
        data.url = l.h;
    } else {
        data.url = config.wwhost+req.url;
    }
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
        lunbo_list:function(callback) {
            cms.lunbo_list({
                "ad_page": "HOME",
                "ad_seat": "SEAT1",
                "cityid":area
            }, callback);
        },
        lunbo_list2:function(callback) {
            cms.lunbo_list({
                "ad_page": "HOME",
                "ad_seat": "SEAT2",
                "cityid":area
            }, callback);
        },
        shouye:function(callback) {
            cms.shouye({
                "city_id": area,
            }, callback);
        },
        guanggao:function(callback){
            cms.advert({
                "cityid": area,
                "ad_page": "HOME"
            },callback);
        },
        liuxueguanggao:function(callback){
            cms.lunbo_list({
                "ad_page": "HOME",
                "ad_seat": "SEAT3",
                "cityid":area
            }, callback);
        },
    },function (err, result) {
        data.xSlider = returnData(result.lunbo_list,'lunbo_list');
        data.xSlider2 = returnData(result.lunbo_list2,'lunbo_list2');
        data.guanggao = returnData(result.guanggao,'guanggao');
        data.liuxueguanggao = returnData(result.liuxueguanggao,'liuxueguanggao')
        data.shouye = JSON.parse(result.shouye);
        if (data.login_info.uid != 0) {
            async.parallel({
                //获取用户信息（普通用户，顾问，参赞）
                userinfo:function(callback){
                    wec.userinfo({
                    "u_id":data.login_info.uid,
                    "to_uid":data.login_info.uid
                    },callback);
                }
            },function (err, result) {
                data.index_userinfo = returnData(result.userinfo,'userinfo');
                console.log('userinfo',data.index_userinfo);
                data.tdk = {
                    pagekey: 'HOME',
                    cityid: area,
                    nationid: ''
                };
                // console.log(result.shouye);
                data.esikey = esihelper.esikey();
                console.log('userinfo',data.index_userinfo);
                // log.info(data.xSlider2)
                res.render('index', data);
            })
        } else {
            data.tdk = {
                pagekey: 'HOME',
                cityid: area,
                nationid: ''
            };
            // console.log(result.shouye);
            data.esikey = esihelper.esikey();
            // log.info(data.xSlider2)
            res.render('index', data);
        }
        
    })
};
//国家列表页
exports.country_list = function (req, res, next) {
    log.debug('国家列表页');
    var data = {};
    //node获取地址栏url
    var l = url.parse(req.url, true).query;
    console.log('url', l.h);
    if (l.h !== undefined) {
        data.url = l.h;
    } else {
        data.url = config.wwhost+req.url;
    }
    var area = req.cookies.currentarea ? req.cookies.currentarea : 1;
    var nquery = comfunc.getReqQuery(req.params[1]);
    var country = nquery && nquery.n ? nquery.n : "";
    var type = nquery && nquery.type ? nquery.type : '';
    var tag = nquery && nquery.tag ? nquery.tag : '';
    var order = nquery && nquery.order ? nquery.order : "score";
    var page = nquery && nquery.page ? nquery.page : 1;
    var newsFlag = 1;
    if (type == '时讯') {
        newsFlag = 2;
        tag = ''
    }
    if(tag != ''){
        newsFlag = 1;
    }else if (tag == '' && type == '') {
        newsFlag = '';
    }
    data.login_nickname = '';
    if ( req.cookies.login_ss !== undefined) {
        var login_a = JSON.parse(req.cookies.login_ss);
        data.login_nickname = login_a;
    }
    async.parallel({
        lunbo_list:function(callback) {
            cms.lunbo_list({
                "ad_page": "ARTICLELIST",
                "cityid":area,
                "ad_seat": "SEAT1"
            }, callback);
        },
        lunbo_list2:function(callback) {
            cms.lunbo_list({
                "ad_page": "ARTICLELIST",
                "cityid":area,
                "ad_seat": "SEAT2"
            }, callback);
        },
        so_article_list:function(callback) {
            cms.search_article_list({
                order: order,
                is_immi:1,
                city_id:area,
                "tag_list": encodeURI(tag),
                "country_id": country,
                "is_news": newsFlag,
                "edu_id":(type=='时讯')?'':encodeURI(type),
                "per_page": "15",
                "page": page
            }, callback);
        },
        // guess_like: function (callback) {
        //     cms.channel_list({
        //         order: 'comments desc',
        //         city_id:area,
        //         "per_page": "10",
        //         "page": 1
        //     }, callback)
        // }
    }, function (err, result) {
        data.article_list = returnData(result.so_article_list,'so_article_list');
        // data.likelist = returnData(result.guess_like,'guess_like');
        data.xSlider = returnData(result.lunbo_list,'lunbo_list');
        data.xSlider2 = returnData(result.lunbo_list2,'lunbo_list2');
        data.country = country;
        data.type=(type== '')?'全部':type;
        data.tag = (tag== '')?'全部':tag;
        data.order = order;
        data.cur_page = page;
        data.tdk = {
            pagekey: 'ARTICLELIST', //key
            cityid: area,
            // keywords: keyword
        };
        data.pagination = {
            pages:Number.parseInt(data.article_list.totalpage),
            hrefFormer:helperfunc.active_urlgen('articles','n='+country,'type='+type,'tag='+tag,'order='+order,'page='),
            currentPage:Number.parseInt(page)
        }
        // console.log('aaaaa333~~', helperfunc.active_urlgen('articles','n='+country,'type='+type,'tag='+tag,'order='+order,'page='))
        data.esikey = esihelper.esikey();
        res.render('country_list', data);
    });
};
//搜索页
exports.so_article = function (req, res, next) {
    log.debug('搜索结果文章');
    var data = {};
    //node获取地址栏url
    var l = url.parse(req.url, true).query;
    console.log('url', l.h);
    if (l.h !== undefined) {
        data.url = l.h;
    } else {
        data.url = config.wwhost+req.url;
    }
    var area = req.cookies.currentarea ? req.cookies.currentarea : 1;
    var nquery = comfunc.getReqQuery(req.params[1]);
    var page = nquery && nquery.page ? nquery.page : 1;
    var keyword = nquery && nquery.q ? decodeURI(nquery.q) : '';
    var order = nquery && nquery.order ? nquery.order : "score";
    data.login_nickname = '';
    if ( req.cookies.login_ss !== undefined) {
        var login_a = JSON.parse(req.cookies.login_ss);
        data.login_nickname = login_a;
    }
    async.parallel({
        lunbo_list:function(callback) {
            cms.lunbo_list({
                "ad_page": "SEARCHNEWS",
                "cityid":area,
                "ad_seat": "SEAT1"
            }, callback);
        },
        lunbo_list2:function(callback) {
            cms.lunbo_list({
                "ad_page": "SEARCHNEWS",
                "cityid":area,
                "ad_seat": "SEAT2"
            }, callback);
        },
        so_article_list:function(callback) {
            cms.so_article_list({
                order: order,
                key_word:encodeURI(keyword),
                city_id:area,
                "per_page": "15",
                "page": page
            }, callback);
        },
        guess_like: function (callback) {
            cms.channel_list({
                order: 'comments desc',
                city_id:area,
                "per_page": "10",
                "page": 1
            }, callback)
        }
    }, function (err, result) {
        data.article_list = returnData(result.so_article_list,'so_article_list');
        data.likelist = returnData(result.guess_like,'guess_like');
        data.xSlider = returnData(result.lunbo_list,'lunbo_list');
        data.xSlider2 = returnData(result.lunbo_list2,'lunbo_list2');
        data.order = order;
        data.keyword=keyword;
        data.cur_page = page;
        data.tdk = {
            pagekey: 'SEARCHNEWS', //key
            cityid: area,
            keywords: keyword
        };
        data.pagination = {
            pages:Number.parseInt(data.article_list.totalpage),
            hrefFormer:helperfunc.paramurlgen('so_article','q='+keyword,'order='+order,'page='),
            currentPage:Number.parseInt(page)
        }
        console.log('aaaaa333~~', helperfunc.paramurlgen('so_article','order='+order,'page=2'))
        data.esikey = esihelper.esikey();
        res.render('so_article', data);
    });
};
//留学顾问搜索页
exports.so_adviser = function (req, res, next) {
    log.debug('搜索结果顾问');
    var data = {};
    //node获取地址栏url
    var l = url.parse(req.url, true).query;
    console.log('url', l.h);
    if (l.h !== undefined) {
        data.url = l.h;
    } else {
        data.url = config.wwhost;
    }
    var area = req.cookies.currentarea ? req.cookies.currentarea : 1;
    var nquery = comfunc.getReqQuery(req.params[1]);
    var page = nquery && nquery.page ? nquery.page : 1;
    var keyword = nquery && nquery.q ? decodeURI(nquery.q) : '';
    var order = nquery && nquery.order ? nquery.order : "";
    data.login_nickname = '';
    if ( req.cookies.login_ss !== undefined) {
        var login_a = JSON.parse(req.cookies.login_ss);
        data.login_nickname = login_a;
    }
    async.parallel({
        lunbo_list:function(callback) {
            cms.lunbo_list({
                "ad_page": "SEARCHADVISER",
                "cityid":area,
                "ad_seat": "SEAT1"
            }, callback);
        },
        lunbo_list2:function(callback) {
            cms.lunbo_list({
                "ad_page": "SEARCHADVISER",
                "cityid":area,
                "ad_seat": "SEAT2"
            }, callback);
        },
        so_adviser_list:function(callback) {
            cms.so_adviser_list({
                order: order,
                key_word:encodeURI(keyword),
                city_id:area,
                "adviser_type":"1",
                "per_page": "16",
                "page": page
            }, callback);
        },
        guess_like: function (callback) {
            cms.channel_list({
                order: 'comments desc',
                city_id:area,
                "per_page": "10",
                "page": 1
            }, callback)
        }
    }, function (err, result) {
        data.so_adviser_list = returnData(result.so_adviser_list,'so_adviser_list');
        data.likelist = returnData(result.guess_like,'guess_like');
        data.xSlider = returnData(result.lunbo_list,'lunbo_list');
        data.xSlider2 = returnData(result.lunbo_list2,'lunbo_list2');
        data.order = order;
        data.keyword=keyword;
        data.cur_page = page;
        data.tdk = {
            pagekey: 'SEARCHADVISER', //key
            cityid: area,
            keywords: keyword
        };
        data.pagination = {
            pages:Number.parseInt(data.so_adviser_list.totalpage),
            hrefFormer:helperfunc.paramurlgen('so_advisor','q='+keyword,order ? 'order='+order : '','page='),
            currentPage:Number.parseInt(page)
        }
        data.esikey = esihelper.esikey();
        res.render('so_adviser', data);

    });
};
//移民顾问搜索页
exports.so_adviser_yimin = function (req, res, next) {
    log.debug('搜索结果顾问');
    var data = {};
    //node获取地址栏url
    var l = url.parse(req.url, true).query;
    console.log('url', l.h);
    if (l.h !== undefined) {
        data.url = l.h;
    } else {
        data.url = config.wwhost;
    }
    var area = req.cookies.currentarea ? req.cookies.currentarea : 1;
    var nquery = comfunc.getReqQuery(req.params[1]);
    var page = nquery && nquery.page ? nquery.page : 1;
    var keyword = nquery && nquery.q ? decodeURI(nquery.q) : '';
    var order = nquery && nquery.order ? nquery.order : "";
    data.login_nickname = '';
    if ( req.cookies.login_ss !== undefined) {
        var login_a = JSON.parse(req.cookies.login_ss);
        data.login_nickname = login_a;
    }
    async.parallel({
        lunbo_list:function(callback) {
            cms.lunbo_list({
                "ad_page": "YIMIN_SEARCHADVISER",
                "cityid":area,
                "ad_seat": "SEAT1"
            }, callback);
        },
        lunbo_list2:function(callback) {
            cms.lunbo_list({
                "ad_page": "YIMIN_SEARCHADVISER",
                "cityid":area,
                "ad_seat": "SEAT2"
            }, callback);
        },
        so_adviser_list:function(callback) {
            cms.so_adviser_list({
                order: order,
                key_word:encodeURI(keyword),
                city_id:area,
                "adviser_type":"2",
                "per_page": "16",
                "page": page
            }, callback);
        },
        guess_like: function (callback) {
            cms.channel_list({
                order: 'comments desc',
                city_id:area,
                "per_page": "10",
                "page": 1
            }, callback)
        }
    }, function (err, result) {
        data.so_adviser_list = returnData(result.so_adviser_list,'so_adviser_list');
        data.likelist = returnData(result.guess_like,'guess_like');
        data.xSlider = returnData(result.lunbo_list,'lunbo_list');
        data.xSlider2 = returnData(result.lunbo_list2,'lunbo_list2');
        data.order = order;
        data.keyword=keyword;
        data.cur_page = page;
        data.tdk = {
            pagekey: 'YIMIN_SEARCHADVISER', //key
            cityid: area,
            keywords: keyword
        };
        data.pagination = {
            pages:Number.parseInt(data.so_adviser_list.totalpage),
            hrefFormer:helperfunc.paramurlgen('yimin_so_advisor','q='+keyword,order ? 'order='+order : '','page='),
            currentPage:Number.parseInt(page)
        }
        data.esikey = esihelper.esikey();
        res.render('so_adviser_yimin', data);

    });
};
// 移民搜索页
exports.so_article_yimin = function (req, res, next) {
    log.debug('搜索结果文章');
    var data = {};
    //node获取地址栏url
    var l = url.parse(req.url, true).query;
    console.log('url', config.wwhost+req.url);
    if (l.h !== undefined) {
        data.url = l.h;
    } else {
        data.url = config.wwhost+req.url;
    }
    var area = req.cookies.currentarea ? req.cookies.currentarea : 1;
    var nquery = comfunc.getReqQuery(req.params[1]);
    var page = nquery && nquery.page ? nquery.page : 1;
    var keyword = nquery && nquery.q ? decodeURI(nquery.q) : '';
    var order = nquery && nquery.order ? nquery.order : "score";
    data.login_nickname = '';
    if ( req.cookies.login_ss !== undefined) {
        var login_a = JSON.parse(req.cookies.login_ss);
        data.login_nickname = login_a;
    }
    async.parallel({
        lunbo_list:function(callback) {
            cms.lunbo_list({
                "ad_page": "YIMIN_SEARCHNEWS",
                "cityid":area,
                "ad_seat": "SEAT1"
            }, callback);
        },
        lunbo_list2:function(callback) {
            cms.lunbo_list({
                "ad_page": "YIMIN_SEARCHNEWS",
                "cityid":area,
                "ad_seat": "SEAT2"
            }, callback);
        },
        so_article_list:function(callback) {
            cms.so_article_list({
                order: order,
                key_word:encodeURI(keyword),
                city_id:1,
                "per_page": "15",
                "page": page,
                "is_immi":"2"
            }, callback);
        },
    }, function (err, result) {
        data.article_list = returnData(result.so_article_list,'so_article_list');
        data.xSlider = returnData(result.lunbo_list,'lunbo_list');
        data.xSlider2 = returnData(result.lunbo_list2,'lunbo_list2');
        data.order = order;
        data.keyword=keyword;
        data.cur_page = page;
        data.tdk = {
            pagekey: 'YIMIN_SEARCHNEWS', //key
            cityid: area,
            keywords: keyword
        };
        data.pagination = {
            pages:Number.parseInt(data.article_list.totalpage),
            hrefFormer:helperfunc.paramurlgen('yimin_so_article','q='+keyword,'order='+order,'page='),
            currentPage:Number.parseInt(page)
        }
        console.log('aaaaa333~~', helperfunc.paramurlgen('yimin_so_article','order='+order,'page=2'))
        data.esikey = esihelper.esikey();
        res.render('so_article_yimin', data);

    });
};
//社区首页
exports.community_index = function (req, res, next) {
  console.log('community_index');
  var data = [];
  var l = url.parse(req.url, true).query;
  console.log('url', l.h);
  if (l.h !== undefined) {
    data.url = l.h;
  } else {
    data.url = config.wwhost;
  }
  var area = req.cookies.currentarea ? req.cookies.currentarea : 1;
  var page = req.query.page || 1;
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
    //lunbo_list:function(callback) {
    //  cms.lunbo_list({
    //    "ad_page": "COMMUNITY_INDEX",
    //    "ad_seat": "SEAT5"
    //  }, callback);
    //},
    community_index: function (callback) {
      wec.community_index({
        city_id: area}, callback)
    },
     mingxingguwen: function (callback) {
       cms.mingxingguwen({
         "position": "blog", "catid": 101, "cityid":area, "perpage":8}, callback);
     }
    //guwen_list:function (callback){
    //  wec.adviser_main({
    //    "order":"views desc",
    //    "per_page":4
    //  }, callback)
    //}
  },function(err, result){
    data.userinfo = returnData(result.userinfo,'userinfo');
     console.log('data.userinfo', data.userinfo);
    if (data.userinfo.usertype == null) {
      console.log('222222')
      data.userinfo.usertype = 0;
    }
    //data.xSlider = returnData(result.lunbo_list,'lunbo_list');
    data.community_index = returnData(result.community_index, 'community_index');
    data.mingxingguwen = returnData(result.mingxingguwen,'mingxingguwen');

    console.log('mingxingguwen', data.mingxingguwen)
    console.log('community_index', data.community_index)
    //切割成 二维数组
    // var sliderArr = [];
    // data.mingxingguwen = returnData(result.mingxingguwen,'mingxingguwen');
    // var sliderArrLen = (data.mingxingguwen.length%10 == 0) ? parseInt(data.mingxingguwen.length/10) : (parseInt(data.mingxingguwen.length/10) + 1);
    // for (i= 0; i < sliderArrLen; i++) {
    //   sliderArr.push(data.mingxingguwen.slice(i*10, (i+1)*10));
    // }
    // data.sliderArr = sliderArr;
    data.tdk = {
      pagekey: 'COMMUNITY_INDEX',
      cityid: area,
      nationid: ''
    };
    data.esikey = esihelper.esikey();
    res.render('community_index', data);
  });
}

// 聚合页加载更多
exports.loadmore =function(req,res,next){
   var data = req.query;
   wec.adviser_main(data,function(err,result){
      if(err){
        res.send(err);
      }else{
        res.send(result);
      }
    })
}
//个人中心 关注我的
exports.center_follow = function (req, res, next) {
    var data = [];
    var area = req.cookies.currentarea ? req.cookies.currentarea : 1;
    var page = req.query.page || 1;
    //node获取地址栏url
    var l = url.parse(req.url, true).query;
    console.log('url', l.h);
    if (l.h !== undefined) {
        data.url = l.h;
    } else {
        data.url = config.wwhost+req.url;
    }
    data.login_info = '';
    if ( req.cookies.login_ss !== undefined) {
        data.login_info = JSON.parse(req.cookies.login_ss);
        if(data.login_info.usertype ==1){
           res.redirect('/404');
           return false;
        }
    }else{
      res.redirect(config.wwhost+'/login');
      return false;
    }
    async.parallel({
        //获取用户信息（普通用户，顾问，参赞）
        userinfo:function(callback){
            wec.userinfo({
                "u_id":data.login_info.uid,
                "to_uid":data.login_info.uid
            },callback);
        },
        follow_list: function (callback) {
            wec.follow_list({
                "u_id": data.login_info.uid,
                "page": page,
                "per_page": 16
            }, callback);
        }
    }, function (err, result) {
        data.userinfo =returnData(result.userinfo,'userinfo');
        data.follow_data = returnData(result.follow_list,'follow_list');
        data.pagination = {
            pages:Number.parseInt(data.follow_data.totalpage),
            displayPage: 5,
            showCtrl:true,
            hrefFormer:'/advisor_center/follow?page=',
            currentPage:Number.parseInt(page)
        };
        var pagekey=null;
        if(data.userinfo.usertype == 2){
            if(data.login_info.adviser == 1){
                pagekey = 'ADVISOR_CENTER_FOLLOW';
            }else {
                pagekey = 'ADVISOR_CENTER_FOLLOW';
            }
            // pagekey = 'ADVISOR_CENTER';
        }else if(data.userinfo.usertype == 3){
            pagekey = 'CANZAN_ADVISOR_CENTER_FOLLOW';
        }
        async.parallel({
            lunbo_list:function(callback) {
                cms.lunbo_list({
                    "ad_page": pagekey,
                    "cityid":area,
                    "ad_seat": "SEAT1"
                }, callback);
            },
            lunbo_list2:function(callback) {
                cms.lunbo_list({
                    "ad_page": pagekey,
                    "cityid":area,
                    "ad_seat": "SEAT2"
                }, callback);
            },
        },function (err, result) {
            data.xSlider = returnData(result.lunbo_list,'lunbo_list');
            data.xSlider2 = returnData(result.lunbo_list2,'lunbo_list2');

            data.tdk = {
                // pagekey: data.userinfo.usertype ==2 ? 'ADVISOR_CENTER_FOLLOW':'CANZAN_CENTER_FOLLOW',
                pagekey:pagekey,
                cityid: area,
                realname: data.userinfo.realname
            };
            data.esikey = esihelper.esikey();
            res.render('center_follow', data);
        })
    });
};
//用户中心 我的关注
exports.user_followee = function (req, res, next) {
    var data = [];
    var area = req.cookies.currentarea ? req.cookies.currentarea : 1;
    var country = req.query.n || 0;
    var page = req.query.page || 1;
    //node获取地址栏url
    var l = url.parse(req.url, true).query;
    console.log('url', l.h);
    if (l.h !== undefined) {
        data.url = l.h;
    } else {
        data.url = config.wwhost+req.url;
    }
    if ( req.cookies.login_ss !== undefined) {
        data.login_info = JSON.parse(req.cookies.login_ss);
    }else{
      res.redirect(config.wwhost+'/login');
      return false;
    }
    async.parallel({
        lunbo_list:function(callback) {
            cms.lunbo_list({
                "ad_page": "USER_CENTER_FOLLOWEE",
                "cityid":area,
                "ad_seat": "SEAT1"
            }, callback);
        },
        lunbo_list2:function(callback) {
            cms.lunbo_list({
                "ad_page": "USER_CENTER_FOLLOWEE",
                "cityid":area,
                "ad_seat": "SEAT2"
            }, callback);
        },
        //获取用户信息（普通用户，顾问，参赞）
        userinfo:function(callback){
            wec.userinfo({
                "u_id":data.login_info.uid,
                "to_uid":data.login_info.uid
            },callback);
        },
        follow_list: function (callback) {
            wec.user_follow({
                "u_id": data.login_info.uid,
                "page": page,
                "per_page": 8
            }, callback);
        }
    }, function (err, result) {
        data.xSlider = returnData(result.lunbo_list,'lunbo_list');
        data.xSlider2 = returnData(result.lunbo_list2,'lunbo_list2');
        data.follow_data =returnData(result.follow_list,'follow_list');
        data.userinfo = returnData(result.userinfo,'userinfo');
        data.pagination = {
            pages:Number.parseInt(data.follow_data.totalpage),
            displayPage: 5,
            showCtrl:true,
            hrefFormer:'/user_center/followee?page=',
            currentPage:Number.parseInt(page)
        };
        data.tdk = {
          pagekey: 'USER_CENTER_FOLLOWEE',
          cityid: area,
          nationid: country
        };
        data.esikey = esihelper.esikey();
        res.render('user_follow', data);
    });
};
//个人中心 我的主页
exports.center_main = function (req, res, next) {
    log.debug('我的主页 我的主页');
    var data = [];
    var area = req.cookies.currentarea ? req.cookies.currentarea : 1;
    //node获取地址栏url
    var l = url.parse(req.url, true).query;
    console.log('url', l.h);
    if (l.h !== undefined) {
        data.url = l.h;
    } else {
        data.url = config.wwhost+req.url;
    }
    if ( req.cookies.login_ss !== undefined) {
        console.log('有cookie')
        data.login_info = JSON.parse(req.cookies.login_ss);
    }else{
        console.log('无cookie')
        res.redirect(config.wwhost+'/login');
        return false;
    }
    async.parallel({
        //获取用户信息（普通用户，顾问，参赞）
        userinfo:function(callback){
            wec.userinfo({
                "u_id":data.login_info.uid,
                "to_uid":data.login_info.uid
            },callback);
        },
        follow_list: function (callback) { //关注我的
            wec.follow_list({
                "u_id": data.login_info.uid,
                "page": 1,
                "per_page": 6
            }, callback);
        },
        comment_list: function (callback) { //收到的评论
            wec.comment_list({
                "u_id": data.login_info.uid,
                "page": 1,
                "per_page": 4
            }, callback);
        },
        collection_list: function (callback) {
            wec.collection_list({
                "u_id":data.login_info.uid,
                "page": 1,
                "per_page": 2
            },callback)
        }
    }, function (err, result) {
        data.userinfo =returnData(result.userinfo,'userinfo');
        data.follow_list = returnData(result.follow_list,'follow_list');
        data.comment_list =returnData(result.comment_list,'comment_list');
        data.collection_list = returnData(result.collection_list,'collection_list');
        console.log('data.collection_list', data.collection_list);
        var pagekey = null;
        if(data.userinfo.usertype == 2){
            if(data.login_info.adviser==1){
                pagekey = 'ADVISOR_CENTER';
            }else {
                pagekey = 'ADVISOR_CENTER';
            }
          // pagekey = 'ADVISOR_CENTER';
        }else if(data.userinfo.usertype == 3){
          pagekey = 'CANZAN_CENTER';
        }
        async.parallel({
            lunbo_list:function(callback) {
                cms.lunbo_list({
                    "ad_page": pagekey,
                    "cityid":area,
                    "ad_seat": "SEAT1"
                }, callback);
            },
            lunbo_list2:function(callback) {
                cms.lunbo_list({
                    "ad_page": pagekey,
                    "cityid":area,
                    "ad_seat": "SEAT2"
                }, callback);
            },
        },function (err, result) {
            data.xSlider = returnData(result.lunbo_list,'lunbo_list');
            data.xSlider2 = returnData(result.lunbo_list2,'lunbo_list2');
            data.tdk = {
                pagekey: pagekey,
                cityid: area,
                realname: data.userinfo.realname
            };
            data.esikey = esihelper.esikey();
            res.render('center_main', data);
        })
    });
};
//顾问中心 上传我的二维码
exports.post_code = function (req, res, next) {
    log.debug('顾问中心 上传我的二维码')
    var data = [];
    var area = req.cookies.currentarea ? req.cookies.currentarea : 1;
    var page = req.query.page || 1;
    //node获取地址栏url
    var l = url.parse(req.url, true).query;
    console.log('url', l.h);
    if (l.h !== undefined) {
        data.url = l.h;
    } else {
        data.url = config.wwhost+req.url;
    }
    if ( req.cookies.login_ss !== undefined) {
        data.login_info = JSON.parse(req.cookies.login_ss);
        if(data.login_info.usertype ==1){
            res.redirect('/404');
            return false;
        }
    }else{
        res.redirect(config.wwhost+'/login');
        return false;
    }
    async.parallel({
        //获取用户信息（普通用户，顾问，参赞）
        userinfo:function(callback){
            wec.userinfo({
                "u_id":data.login_info.uid,
                "to_uid":data.login_info.uid
            },callback);
        }
    }, function (err, result) {
        data.userinfo =returnData(result.userinfo,'userinfo');
        var pagekey=null;
        if(data.userinfo.usertype == 2){
            if(data.login_info.adviser==1){
                pagekey = 'ADVISOR_CENTER_QRCODE';
            }else {
                pagekey = 'ADVISOR_CENTER_QRCODE';
            }
        }
        async.parallel({
            lunbo_list:function(callback) {
                cms.lunbo_list({
                    "ad_page": pagekey,
                    "cityid":area,
                    "ad_seat": "SEAT1"
                }, callback);
            },
            lunbo_list2:function(callback) {
                cms.lunbo_list({
                    "ad_page": pagekey,
                    "cityid":area,
                    "ad_seat": "SEAT2"
                }, callback);
            },
        },function(err, result){
            data.xSlider = returnData(result.lunbo_list,'lunbo_list');
            data.xSlider2 = returnData(result.lunbo_list2,'lunbo_list2');
            data.tdk = {
                pagekey: 'ADVISOR_CENTER_QRCODE',
                cityid: area,
                realname: data.userinfo.realname,
            };
            data.esikey = esihelper.esikey();
            res.render('center_post_code', data);
        })
    });
};

exports.advisor_list = function (req, res, next) {
    log.debug('个人中心 加载更多');
    var data = req.query;
    wec.adviser_main(data,function(err,result){
      if(err){
        res.send(err);
      }else{
        console.log('result', result.data.list);
        res.send(result);
      }
    })
}

//个人中心 我的案例
exports.center_case = function (req, res, next) {
    log.debug('个人中心 我的案例')
    var data = [];
    var area = req.cookies.currentarea ? req.cookies.currentarea : 1;
    var page = req.query.page || 1;
    //node获取地址栏url
    var l = url.parse(req.url, true).query;
    console.log('url', l.h);
    if (l.h !== undefined) {
        data.url = l.h;
    } else {
        data.url = config.wwhost+req.url;
    }
    if ( req.cookies.login_ss !== undefined) {
        data.login_info = JSON.parse(req.cookies.login_ss);
        if(data.login_info.usertype ==1){
            return next();
        }
    }else{
      res.redirect(config.wwhost+'/login');
      return false;
    }
    async.parallel({
        //获取用户信息（普通用户，顾问，参赞）
        userinfo:function(callback){
            wec.userinfo({
                "u_id":data.login_info.uid,
                "to_uid":data.login_info.uid
            },callback);
        },
        case_list: function (callback) {
            wec.adviser_main({
                "uid": data.login_info.uid,
                "page": 1,
                "per_page": 4,
                "type": 1,
                "order":"add_time desc"
            }, callback);
        }
    }, function (err, result) {
        data.userinfo =returnData(result.userinfo,'userinfo');
        data.case_data =returnData(result.case_list,'case_list');
        console.log('case_data',data.case_data);
        var pagekey=null;
        if(data.userinfo.usertype == 2){
            if(data.login_info.adviser==1){
                pagekey = 'ADVISOR_CENTER_CASE';
            }else {
                pagekey = 'ADVISOR_CENTER_CASE';
            }
        }
        async.parallel({
            lunbo_list:function(callback) {
                cms.lunbo_list({
                    "ad_page": pagekey,
                    "cityid":area,
                    "ad_seat": "SEAT1"
                }, callback);
            },
            lunbo_list2:function(callback) {
                cms.lunbo_list({
                    "ad_page": pagekey,
                    "cityid":area,
                    "ad_seat": "SEAT2"
                }, callback);
            },
        },function (err, result) {
            data.xSlider = returnData(result.lunbo_list,'lunbo_list');
            data.xSlider2 = returnData(result.lunbo_list2,'lunbo_list2');
            data.tdk = {
                pagekey: 'ADVISOR_CENTER_CASE',
                cityid: area,
                realname: data.userinfo.realname
            };
            data.esikey = esihelper.esikey();
            res.render('center_case', data);
        })
    });
};

//个人中心-收到的评论
exports.center_comment = function (req, res, next) {
    log.debug('个人中心-收到的评论')
    var data = [];
    var area = req.cookies.currentarea ? req.cookies.currentarea : 1;
    var page = req.query.page || 1;
    //data.is_draft = req.query.is_draft || 2; //默认为2
    //node获取地址栏url
    var l = url.parse(req.url, true).query;
    console.log('url', l.h);
    if (l.h !== undefined) {
        data.url = l.h;
    } else {
        data.url = config.wwhost+req.url;
    }
    if ( req.cookies.login_ss !== undefined) {
        data.login_info = JSON.parse(req.cookies.login_ss);
        if(data.login_info.usertype ==1){
            return next();
        }
    }else{
      res.redirect(config.wwhost+'/login');
      return false;
    }
    async.parallel({
        // lunbo_list:function(callback) {
        //     cms.lunbo_list({
        //         "ad_page": pagekey,
        //         "cityid":area,
        //         "ad_seat": "SEAT1"
        //     }, callback);
        // },
        // lunbo_list2:function(callback) {
        //     cms.lunbo_list({
        //         "ad_page": "ADVISOR_CENTER_REVCOMMENT",
        //         "cityid":area,
        //         "ad_seat": "SEAT2"
        //     }, callback);
        // },
        //获取用户信息（普通用户，顾问，参赞）
        userinfo:function(callback){
            wec.userinfo({
              "u_id":data.login_info.uid,
              "to_uid":data.login_info.uid
            },callback);
        },
        comment_list: function (callback) { //收到的评论
            wec.comment_list({
                "u_id": data.login_info.uid,
              //"is_draft":data.is_draft,
                "page": page,
                "per_page": 11
            }, callback);
        }
    }, function (err, result) {
        // data.xSlider = returnData(result.lunbo_list,'lunbo_list');
        // data.xSlider2 = returnData(result.lunbo_list2,'lunbo_list2');
        data.comment_data =returnData(result.comment_list,'comment_list');
        data.userinfo = returnData(result.userinfo,'userinfo');
        console.log('data.comment_data', data.comment_data)
      var pagekey =null;
      var route = '';
        if(data.userinfo.usertype == 1){
          pagekey = 'USER_CENTER_REVCOMMENT';
          route = '/user_center/revcomment';
        }else if(data.userinfo.usertype == 2){
            if(data.login_info.adviser==1){
                pagekey = 'ADVISOR_CENTER_REVCOMMENT';
            }else {
                pagekey = 'ADVISOR_CENTER_REVCOMMENT';
            }
          // pagekey = 'ADVISOR_CENTER_REVCOMMENT';
          route = '/advisor_center/revcomment';
        }else if(data.userinfo.usertype == 3){
          pagekey = 'CANZAN_CENTER_REVCOMMENT';
          route = '/canzan_center/revcomment';
        }
        async.parallel({
            lunbo_list:function(callback) {
                cms.lunbo_list({
                    "ad_page": pagekey,
                    "cityid":area,
                    "ad_seat": "SEAT1"
                }, callback);
            },
            lunbo_list2:function(callback) {
                cms.lunbo_list({
                    "ad_page": pagekey,
                    "cityid":area,
                    "ad_seat": "SEAT2"
                }, callback);
            },
        },function (err, result) {
            data.xSlider = returnData(result.lunbo_list,'lunbo_list');
            data.xSlider2 = returnData(result.lunbo_list2,'lunbo_list2');
            data.tdk = {
                pagekey: pagekey,
                cityid: area,
                realname: data.userinfo.realname
            };
            data.pagination = {
                pages:Number.parseInt(data.comment_data.totalpage),
                displayPage: 5,
                showCtrl:true,
                hrefFormer:route+'?page=',
                //hrefLatter:'',//链接尾部 .html
                currentPage:Number.parseInt(page),
                //查询条件 在page分页之前
                order:{

                }
            }
            data.esikey = esihelper.esikey();
            res.render('center_comment', data);
        })

    });
};
//个人中心-数据中心
exports.data_center = function (req, res, next) {
    log.info('个人中心-数据中心');
    var data = [];
    var area = req.cookies.currentarea ? req.cookies.currentarea : 1;
    var l = url.parse(req.url, true).query;
    console.log('url', l.h);
    if (l.h !== undefined) {
        data.url = l.h;
    } else {
        data.url = config.wwhost+req.url;
    }
    if ( req.cookies.login_ss !== undefined) {
        data.login_info = JSON.parse(req.cookies.login_ss);
    }else{
        res.redirect(config.wwhost+'/login');
        return false;
    }
    async.parallel({
        //获取用户信息（普通用户，顾问，参赞）
        userinfo:function(callback){
            wec.userinfo({
                "u_id":data.login_info.uid,
                "to_uid":data.login_info.uid
            },callback);
        },
        datacenter: function (callback) {
            cms.datacenter(callback)
        },
        datacenter_title: function (callback) {
            cms.datacenter_title(callback)
        },
        lunbo_list:function(callback) {
            cms.lunbo_list({
                "ad_page": 'ADVISOR_DATA_CENTER',
                "cityid":area,
                "ad_seat": "SEAT1"
            }, callback);
        },
        lunbo_list2:function(callback) {
            cms.lunbo_list({
                "ad_page": 'ADVISOR_DATA_CENTER',
                "cityid":area,
                "ad_seat": "SEAT2"
            }, callback);
        }
    },function (err, result) {
        data.userinfo = returnData(result.userinfo,'userinfo');
        data.datalist = [];
        if (result.datacenter != '暂无数据') {
            data.datacenter = JSON.parse(result.datacenter);
            // console.log('data.datacenter',data.datacenter);
            for (var key in data.datacenter) {
                if (data.datacenter[key] != null) {
                    data.datalist.push(data.datacenter[key]);
                }
            }
        }
        // console.log('data.datalist',data.datalist)
        data.datacenter_title = result.datacenter_title
        // console.log('title',data.datacenter_title)
        data.xSlider = returnData(result.lunbo_list,'lunbo_list');
        data.xSlider2 = returnData(result.lunbo_list2,'lunbo_list2');
        data.tdk = {
            pagekey:'ADVISOR_DATA_CENTER',
            cityid: area
        };
        data.esikey = esihelper.esikey();
        res.render('data_center', data);
    });
}
//普通用户中心-收到的评论
exports.user_comment = function (req, res, next) {
    log.debug('普通用户中心-收到的评论');
    var data = [];
    var area = req.cookies.currentarea ? req.cookies.currentarea : 1;
    var page = req.query.page || 1;
    //data.is_draft = req.query.is_draft || 2; //默认为2
    //node获取地址栏url
    var l = url.parse(req.url, true).query;
    console.log('url', l.h);
    if (l.h !== undefined) {
      data.url = l.h;
    } else {
      data.url = config.wwhost+req.url;
    }
    if ( req.cookies.login_ss !== undefined) {
        data.login_info = JSON.parse(req.cookies.login_ss);
    }else{
        res.redirect(config.wwhost+'/login');
        return false;
    }
    async.parallel({
        //获取用户信息（普通用户，顾问，参赞）
        userinfo:function(callback){
            wec.userinfo({
                "u_id":data.login_info.uid,
                "to_uid":data.login_info.uid
            },callback);
        },
        answer_list: function (callback) { //收到的回复
            wec.answer_list({
                "u_id": data.login_info.uid,
              //"is_draft":data.is_draft,
                "page": page,
                "per_page": 11
            }, callback);
        }
    }, function (err, result) {
        data.comment_data =returnData(result.answer_list,'answer_list');
        data.userinfo = returnData(result.userinfo,'userinfo');
        console.log('data.comment_data', data.comment_data)
        var pagekey =null;
      var route = '';
        if(data.login_info.usertype == 1){
            pagekey = 'USER_CENTER_REVCOMMENT';
          route = '/user_center/revcomment';
        }else if(data.login_info.usertype == 2){
            if(data.login_info.adviser==1){
                pagekey = 'ADVISOR_CENTER_REVCOMMENT';
            }else {
                pagekey = 'ADVISOR_CENTER_REVCOMMENT';
            }
            // pagekey = 'ADVISOR_CENTER_REVCOMMENT';
          route = '/advisor_center/revcomment';
        }else if(data.login_info.usertype == 3){
            pagekey = 'CANZAN_CENTER_REVCOMMENT';
          route = '/canzan_center/revcomment';
        }
        async.parallel({
            lunbo_list:function(callback) {
                cms.lunbo_list({
                    "ad_page": pagekey,
                    "cityid":area,
                    "ad_seat": "SEAT1"
                }, callback);
            },
            lunbo_list2:function(callback) {
                cms.lunbo_list({
                    "ad_page": pagekey,
                    "cityid":area,
                    "ad_seat": "SEAT2"
                }, callback);
            },
        },function (err, result) {
            data.xSlider = returnData(result.lunbo_list,'lunbo_list');
            data.xSlider2 = returnData(result.lunbo_list2,'lunbo_list2');
            data.tdk = {
                pagekey: pagekey,
                cityid: area,
            };
            data.pagination = {
                pages:Number.parseInt(data.comment_data.totalpage),
                displayPage: 5,
                showCtrl:true,
                hrefFormer:route+'?page=',
                //hrefLatter:'',//链接尾部 .html
                currentPage:Number.parseInt(page),
                //查询条件 在page分页之前
                order:{

                }
            }
            data.esikey = esihelper.esikey();
            res.render('center_comment', data);
        })

    });
};
//个人中心-收到的消息
exports.center_message = function (req, res, next) {
    var data = [];
    var area = req.cookies.currentarea ? req.cookies.currentarea : 1;
    var page = req.query.page || 1;
    //data.is_draft = req.query.is_draft || 2; //默认为2
    //node获取地址栏url
    var l = url.parse(req.url, true).query;
    console.log('url', l.h);
    if (l.h !== undefined) {
        data.url = l.h;
    } else {
        data.url = config.wwhost+req.url;
    }
    data.login_info = ''
    if ( req.cookies.login_ss !== undefined) {
        data.login_info = JSON.parse(req.cookies.login_ss);
    }else{
      res.redirect(config.wwhost+'/login');
      return false;
    }
    async.parallel({
        // lunbo_list:function(callback) {
        //     cms.lunbo_list({
        //         "ad_page": "ADVISOR_CENTER_REVMESSAGE",
        //         "cityid":area,
        //         "ad_seat": "SEAT1"
        //     }, callback);
        // },
        // lunbo_list2:function(callback) {
        //     cms.lunbo_list({
        //         "ad_page": "ADVISOR_CENTER_REVMESSAGE",
        //         "cityid":area,
        //         "ad_seat": "SEAT2"
        //     }, callback);
        // },
        //获取用户信息（普通用户，顾问，参赞）
        userinfo:function(callback){
            wec.userinfo({
                "u_id":data.login_info.uid,
                "to_uid":data.login_info.uid
            },callback);
        },
        msg_list: function (callback) {
            wec.msg_list({
                // "status": 1,
                "uid": data.login_info.uid,
                "page": page,
                //"is_draft":data.is_draft,
                // "pagesize": 11
                "perpage": 11
            },callback)
        }
    }, function (err, result) {
        // data.xSlider = returnData(result.lunbo_list,'lunbo_list');
        // data.xSlider2 = returnData(result.lunbo_list2,'lunbo_list2');
        data.userinfo = returnData(result.userinfo,'userinfo');
        data.msg_data = returnData(result.msg_list,'msg_list');
        console.log('msg_data',data.msg_data);
        var pagekey =null;
      var route = '';
        if(data.userinfo.usertype == 1){
          pagekey = 'USER_CENTER_REVMESSAGE';
          route = '/user_center/revmsg';
        }else if(data.userinfo.usertype == 2){
            if(data.login_info.adviser==1){
                pagekey = 'ADVISOR_CENTER_REVMESSAGE';
            }else {
                pagekey = 'ADVISOR_CENTER_REVMESSAGE';
            }
          // pagekey = 'ADVISOR_CENTER_REVMESSAGE';
          route = '/advisor_center/revmsg';
        }else if(data.userinfo.usertype == 3){
          pagekey = 'CANZAN_CENTER_REVMESSAGE';
          route = '/canzan_center/revmsg';
        }
        async.parallel({
            lunbo_list:function(callback) {
                cms.lunbo_list({
                    "ad_page": pagekey,
                    "cityid":area,
                    "ad_seat": "SEAT1"
                }, callback);
            },
            lunbo_list2:function(callback) {
                cms.lunbo_list({
                    "ad_page": pagekey,
                    "cityid":area,
                    "ad_seat": "SEAT2"
                }, callback);
            },
        },function (err, result) {
            data.xSlider = returnData(result.lunbo_list,'lunbo_list');
            data.xSlider2 = returnData(result.lunbo_list2,'lunbo_list2');

            data.tdk = {
                pagekey: pagekey,
                cityid: area,
                realname: data.userinfo.realname
            };
            data.pagination = {
                pages:Number.parseInt(data.msg_data.totalpage),
                displayPage: 5,
                showCtrl:true,
                hrefFormer:route+'?page=',
                //hrefLatter:'',//链接尾部 .html
                currentPage:Number.parseInt(page),
                //查询条件 在page分页之前
                order:{

                }
            }
            data.esikey = esihelper.esikey();
            res.render('center_message', data);
        })

    });
};

//个人中心-我的收藏
exports.center_collection = function (req, res, next) {
    log.debug('个人中心 我的收藏')
    var data = [];
    var area = req.cookies.currentarea ? req.cookies.currentarea : 1;
    //node获取地址栏url
    var l = url.parse(req.url, true).query;
    console.log('url', l.h);
    if (l.h !== undefined) {
        data.url = l.h;
    } else {
        data.url = config.wwhost+req.url;
    }
    if ( req.cookies.login_ss !== undefined) {
        data.login_info = JSON.parse(req.cookies.login_ss);
    }else{
        res.redirect(config.wwhost+'/login');
        return false;
    }
    async.parallel({
        // lunbo_list:function(callback) {
        //     cms.lunbo_list({
        //         "ad_page": "ADVISOR_CENTER_COLLECTION",
        //         "cityid":area,
        //         "ad_seat": "SEAT1"
        //     }, callback);
        // },
        // lunbo_list2:function(callback) {
        //     cms.lunbo_list({
        //         "ad_page": "ADVISOR_CENTER_COLLECTION",
        //         "cityid":area,
        //         "ad_seat": "SEAT2"
        //     }, callback);
        // },
        //获取用户信息（普通用户，顾问，参赞）
        userinfo:function(callback){
            wec.userinfo({
                "u_id":data.login_info.uid,
                "to_uid":data.login_info.uid
            },callback);
        },
        collection_list: function (callback) {
            wec.collection_list({
                "u_id":data.login_info.uid,
                "page": 1,
                "per_page": 4
            },callback)
        }
    }, function (err, result) {
        // data.xSlider = returnData(result.lunbo_list,'lunbo_list');
        // data.xSlider2 = returnData(result.lunbo_list2,'lunbo_list2');
        data.userinfo =returnData(result.userinfo,'userinfo');
        data.collection_data = returnData(result.collection_list,'collection_list');
        console.log('collection_data',data.collection_data);
        var pagekey =null;
        // pagekey  = get_page_key(data.userinfo.usertype, data.userinfo.adviser_type, 'ADVISOR_CENTER_COLLECTION');
        if(data.userinfo.usertype == 1){
          pagekey = 'USER_CENTER_COLLECTION';
        }else if(data.userinfo.usertype == 2){
            if(data.login_info.adviser==1){
                pagekey = 'ADVISOR_CENTER_COLLECTION';
            }else {
                pagekey = 'ADVISOR_CENTER_COLLECTION';
            }
        }else if(data.userinfo.usertype == 3){
          pagekey = 'CANZAN_CENTER_COLLECTION';
        }
        async.parallel({
            lunbo_list:function(callback) {
                cms.lunbo_list({
                    "ad_page": pagekey,
                    "cityid":area,
                    "ad_seat": "SEAT1"
                }, callback);
            },
            lunbo_list2:function(callback) {
                cms.lunbo_list({
                    "ad_page": pagekey,
                    "cityid":area,
                    "ad_seat": "SEAT2"
                }, callback);
            },
        },function (err, result) {
            data.xSlider = returnData(result.lunbo_list,'lunbo_list');
            data.xSlider2 = returnData(result.lunbo_list2,'lunbo_list2');
            data.tdk = {
                pagekey: pagekey,
                cityid: area,
                realname: data.userinfo.realname
            };
            data.esikey = esihelper.esikey();
            res.render('center_collection', data);
        })

    });
};

//个人中心 我的专栏
exports.center_article = function (req, res, next) {
    log.debug('个人中心 我的专栏');
    var data = [];
    var area = req.cookies.currentarea ? req.cookies.currentarea : 1;
    var page = req.query.page || 1;
    //node获取地址栏url
    var l = url.parse(req.url, true).query;
    console.log('url', l.h);
    if (l.h !== undefined) {
        data.url = l.h;
    } else {
        data.url = config.wwhost+req.url;
    }
    if ( req.cookies.login_ss !== undefined) {
        data.login_info = JSON.parse(req.cookies.login_ss);
        if(data.login_info.usertype ==1){
            return next();
        }
    }else{
        res.redirect(config.wwhost+'/login');
        return false;
    }
    async.parallel({
        //获取用户信息（普通用户，顾问，参赞）
        userinfo:function(callback){
            wec.userinfo({
                "u_id":data.login_info.uid,
                "to_uid":data.login_info.uid
            },callback);
        },
        article_list: function (callback) {
            wec.adviser_main({
                "uid": data.login_info.uid,
                "page": 1,
                "per_page": 4,
                "type": 2,
                "order":"add_time desc"
            }, callback);
        }
    }, function (err, result) {
        data.userinfo =returnData(result.userinfo,'userinfo');
        data.article_data = returnData(result.article_list,'article_list');
      console.log('article_data',data.article_data)
        var pagekey =null;
        if(data.userinfo.usertype == 2){
            if(data.login_info.adviser==1){
                pagekey = 'ADVISOR_CENTER_ARTICLE';
            }else {
                pagekey = 'ADVISOR_CENTER_ARTICLE';
            }
          // pagekey = 'ADVISOR_CENTER_ARTICLE';
        }else if(data.userinfo.usertype == 3){
          pagekey = 'CANZAN_CENTER_ARTICLE';
        }
        async.parallel({
            lunbo_list:function(callback) {
                cms.lunbo_list({
                    "ad_page": pagekey,
                    "cityid":area,
                    "ad_seat": "SEAT1"
                }, callback);
            },
            lunbo_list2:function(callback) {
                cms.lunbo_list({
                    "ad_page":pagekey,
                    "cityid":area,
                    "ad_seat": "SEAT2"
                }, callback);
            },
        },function (err, result) {
            data.xSlider = returnData(result.lunbo_list,'lunbo_list');
            data.xSlider2 = returnData(result.lunbo_list2,'lunbo_list2');
            data.tdk = {
                pagekey: pagekey,
                cityid: area,
                realname: data.userinfo.realname
            };
            data.esikey = esihelper.esikey();
            res.render('center_article', data);
        })
    });
};

//个人中心-我的相册
exports.center_photo = function (req, res, next) {
    log.debug('个人中心 我的相册')
    var data = [];
    var area = req.cookies.currentarea ? req.cookies.currentarea : 1;
    //node获取地址栏url
    var l = url.parse(req.url, true).query;
    console.log('url', l.h);
    if (l.h !== undefined) {
        data.url = l.h;
    } else {
        data.url = config.wwhost+req.url;
    }
    if ( req.cookies.login_ss !== undefined) {
        data.login_info = JSON.parse(req.cookies.login_ss);
        if(data.login_info.usertype ==1){
            return next();
        }
    }else{
        res.redirect(config.wwhost+'/login');
        return false;
    }
    async.parallel({
        //获取用户信息（普通用户，顾问，参赞）
        userinfo:function(callback){
            wec.userinfo({
                "u_id":data.login_info.uid,
                "to_uid":data.login_info.uid
            },callback);
        }
    }, function (err, result) {
        data.userinfo =returnData(result.userinfo,'userinfo');
        var pagekey =null;
        if(data.userinfo.usertype == 2){
            if(data.login_info.adviser==1){
                pagekey = 'ADVISOR_CENTER_ALBUM';
            }else {
                pagekey = 'ADVISOR_CENTER_ALBUM';
            }
          // pagekey = 'ADVISOR_CENTER_ALBUM';
        }else if(data.userinfo.usertype == 3){
          pagekey = 'CANZAN_CENTER_ALBUM';
        }
        async.parallel({
            lunbo_list:function(callback) {
                cms.lunbo_list({
                    "ad_page": pagekey,
                    "cityid":area,
                    "ad_seat": "SEAT1"
                }, callback);
            },
            lunbo_list2:function(callback) {
                cms.lunbo_list({
                    "ad_page": pagekey,
                    "cityid":area,
                    "ad_seat": "SEAT2"
                }, callback);
            },
        },function (err, result) {
            data.xSlider = returnData(result.lunbo_list,'lunbo_list');
            data.xSlider2 = returnData(result.lunbo_list2,'lunbo_list2');
            data.tdk = {
                pagekey: pagekey,
                cityid: area,
                realname: data.userinfo.realname
            };
            data.esikey = esihelper.esikey();
            res.render('center_photo', data);
        })
    });
};

//顾问相册 (用户视角)
exports.adviser_photo_p = function(req,res,next){
    log.debug('顾问~~~相册 用户视角');
    var data = [];
    var area = req.cookies.currentarea ? req.cookies.currentarea : 1;
   data.to_uid = req.params[0];
   //node获取地址栏url
   var l = url.parse(req.url, true).query;
   console.log('url', l.h);
   if (l.h !== undefined) {
       data.url = l.h;
   } else {
       data.url = config.wwhost+req.url;
   }
    if ( req.cookies.login_ss !== undefined) {
      data.login_info = JSON.parse(req.cookies.login_ss);
    }else{
      data.login_info ={};
      data.login_info.uid = 0;
    }
    async.parallel({
        // lunbo_list:function(callback) {
        //     cms.lunbo_list({
        //         "ad_page": "ADVISOR_P_ALBUM",
        //         "cityid":area,
        //         "ad_seat": "SEAT1"
        //     }, callback);
        // },
        // lunbo_list2:function(callback) {
        //     cms.lunbo_list({
        //         "ad_page": "ADVISOR_P_ALBUM",
        //         "cityid":area,
        //         "ad_seat": "SEAT2"
        //     }, callback);
        // },
        //获取用户信息（普通用户，顾问，参赞）
        userinfo:function(callback){
            wec.userinfo({
                "u_id":data.login_info.uid,
                "to_uid":data.to_uid
            },callback);
        },
        //作者精选
        // channel_list:function(callback){
        //     cms.channel_list({
        //         "u_id":to_uid,
        //         "per_page":6,
        //         "order":"views desc"
        //     },callback);
        // },
        //热门留学方案
        // hot_liuxuefangan_list: function (callback) {
        //     cms.hot_liuxuefangan_list({
        //         "position": "blog",
        //         "catid": "47",
        //         "cityid": area,
        //         "perpage": 15
        //     }, callback);
        // },
        //明星顾问
        // mingxingguwen: function (callback) {
        //     cms.mingxingguwen({
        //         "position": "blog",
        //         "catid": 101,
        //         "cityid": area,
        //         "perpage": 20
        //     }, callback);
        // }
    },function(err, result){
        // data.xSlider = returnData(result.lunbo_list,'lunbo_list');
        // data.xSlider2 = returnData(result.lunbo_list2,'lunbo_list2');
        data.userinfo =returnData(result.userinfo,'userinfo');
        if(result.userinfo.code == '1210000006'){
            //顾问不存在的时候  跳到404
            return next();
        }
        // data.channel_list =returnData(result.channel_list,'channel_list');
        //切割成 二维数组
        // data.hotLXFA  = split_array(returnData(result.hot_liuxuefangan_list,'hot_liuxuefangan_list'), 7);
        // var sliderArr = [];
        // data.mingxingguwen = returnData(result.mingxingguwen,'mingxingguwen');
        // var sliderArrLen = (data.mingxingguwen.length%10 == 0) ? parseInt(data.mingxingguwen.length/10) : (parseInt(data.mingxingguwen.length/10) + 1);
        // for (i= 0; i < sliderArrLen; i++) {
        //     sliderArr.push(data.mingxingguwen.slice(i*10, (i+1)*10));
        // }
        // data.sliderArr = sliderArr;
        data.country =data.userinfo.country || '1';
        data.hcountry = (data.userinfo.country || '1,').split(',')[0];
        var pagekey =null;
        pagekey  = get_page_key(data.userinfo.usertype, data.userinfo.adviser_type, 'ADVISOR_P_ALBUM');
        async.parallel({
            lunbo_list:function(callback) {
                cms.lunbo_list({
                    "ad_page": pagekey,
                    "cityid":area,
                    "ad_seat": "SEAT1"
                }, callback);
            },
            lunbo_list2:function(callback) {
                cms.lunbo_list({
                    "ad_page": pagekey,
                    "cityid":area,
                    "ad_seat": "SEAT2"
                }, callback);
            },
          //猜你喜欢
          // guess_like:function(callback){
          //   cms.channel_list({
          //     "per_page":12,
          //     "order":"views",
          //     "country_id":country
          //     },callback);
          // },
          //活动预告
          // huodongyugao: function (callback) {
          //   cms.huodongyugao({
          //     "position": "cmslist",
          //     "catid": 64,
          //     "cityid": area,
          //     "country": hcountry.split(',')[0],
          //     "perpage": "4"
          //   }, callback);
          // }
        },function(err,result){
            data.xSlider = returnData(result.lunbo_list,'lunbo_list');
            data.xSlider2 = returnData(result.lunbo_list2,'lunbo_list2');
          // data.huodongyugao =returnData(result.huodongyugao,'huodongyugao');
          // data.guess_like = returnData(result.guess_like,'guess_like');
          // if(data.userinfo.usertype == 2){
          //   pagekey = 'ADVISOR_P_ALBUM';
          // }else if(data.userinfo.usertype == 3){
          //   pagekey = 'CANZAN_P_ALBUM';
          // }else if(data.userinfo.adviser_type == 2){
          //   pagekey = 'ADVISOR_P_ALBUM';
          // }
          data.tdk = {
            pagekey: pagekey,
            cityid: area,
            realname: data.userinfo.realname,
          };
          data.esikey = esihelper.esikey();
          res.render('adviser_photo_p', data);
        });
    });
}

//案列底页 (用户视角  包括顾问和参赞)
exports.case_detail = function(req,res,next){
    log.debug('顾问案列底页 (用户视角)~~~thl');
	var data = {};
    var area = req.cookies.currentarea ? req.cookies.currentarea : 1;
    //node获取地址栏url
    var l = url.parse(req.url, true).query;
    console.log('url', l.h);
    if (l.h !== undefined) {
        data.url = l.h;
    } else {
        data.url = config.wwhost+req.url;
    }
    if(req.cookies.login_ss != undefined){
      data.login_info =JSON.parse(req.cookies.login_ss);
    }else{
      data.login_info ={};
      data.login_info.uid = 0;
    }
    data.article_id = req.params.id; //获取文章id
    async.parallel({
        // lunbo_list:function(callback) {
        //     cms.lunbo_list({
        //         "ad_page": "ADVISOR_P_CASE_DETAIL",
        //         "cityid":area,
        //         "ad_seat": "SEAT1"
        //     }, callback);
        // },
        // lunbo_list2:function(callback) {
        //     cms.lunbo_list({
        //         "ad_page": "ADVISOR_P_CASE_DETAIL",
        //         "cityid":area,
        //         "ad_seat": "SEAT2"
        //     }, callback);
        // },
      //文章详情
      article:function(callback){
        wec.article({
          "u_id":data.login_info.uid,
          "article_id":data.article_id
        },callback);
      },
      article_getUid:function(callback){
        wec.article_getUid({
          "aid":data.article_id
        },callback);
      },
    },function(err,result){
        // data.xSlider = returnData(result.lunbo_list,'lunbo_list');
        // data.xSlider2 = returnData(result.lunbo_list2,'lunbo_list2');
        data.article_getUid =returnData(result.article_getUid,'article');
        // console.log('article_getUid',data.article_getUid);
        if (data.article_getUid != null) {
          global.article_getUid = data.article_getUid;
        }
        if(result.article.code != 0){
            //文章不存在的时候  跳到404
            return next();
        }
        data.article =returnData(result.article,'article');
        if(data.article.article_info.img_info){
            data.article.article_info.img_info =JSON.parse(data.article.article_info.img_info);
        }else{
            data.article.article_info.img_info=[];
        }

        data.tag_list = encodeURI(data.article.article_info.tag_list)
        async.parallel({
            //获取用户信息（普通用户，顾问，参赞）
            userinfo:function(callback){
                wec.userinfo({
                  "u_id":data.login_info.uid,
                  "to_uid":data.article.article_info.uid
                },callback);
            }
        },function(err,result){
            data.userinfo = returnData(result.userinfo,'userinfo');
            data.country =data.userinfo.country || '1';
            data.hcountry = (data.userinfo.country || '1,').split(',')[0];
            var pagekey=null;
            pagekey  = get_page_key(data.userinfo.usertype, data.userinfo.adviser_type, 'ADVISOR_P_CASE_DETAIL');
            async.parallel({
                lunbo_list:function(callback) {
                    cms.lunbo_list({
                        "ad_page": pagekey,
                        "cityid":area,
                        "ad_seat": "SEAT1"
                    }, callback);
                },
                lunbo_list2:function(callback) {
                    cms.lunbo_list({
                        "ad_page": pagekey,
                        "cityid":area,
                        "ad_seat": "SEAT2"
                    }, callback);
                },
            },function (err,result) {
                data.xSlider = returnData(result.lunbo_list,'lunbo_list');
                data.xSlider2 = returnData(result.lunbo_list2,'lunbo_list2');
                data.tdk = {
                    pagekey: pagekey,
                    cityid: area,
                    realname: data.userinfo.realname,
                    title: data.article.article_info.title,
                    description: helperfunc.cut(data.article.article_info.introduce,80),
                    keywords: data.article.article_info.title
                };
                data.esikey = esihelper.esikey();
                res.render('case_detail', data);
            })
        });
    });
}
//专栏底页 （用户视角 包括顾问和参赞的）
exports.article_detail= function(req,res,next){
  log.debug('专栏底页 (用户视角)~~~thl');
  var data = {};
  var area = req.cookies.currentarea ? req.cookies.currentarea : 1;
  //node获取地址栏url
  var l = url.parse(req.url, true).query;
  // console.log('url', l.h);
  if (l.h !== undefined) {
      data.url = l.h;
  } else {
      data.url = config.wwhost+req.url;
  }
  if(req.cookies.login_ss != undefined){
    data.login_info =JSON.parse(req.cookies.login_ss);
  }else{
    data.login_info ={};
    data.login_info.uid = 0;
  }
  data.article_id = req.params.id; //获取文章id
  async.parallel({
      // lunbo_list:function(callback) {
      //     cms.lunbo_list({
      //         "ad_page": "ADVISOR_P_ARTICLE_DETAIL",
      //         "cityid":area,
      //         "ad_seat": "SEAT1"
      //     }, callback);
      // },
      // lunbo_list2:function(callback) {
      //     cms.lunbo_list({
      //         "ad_page": "ADVISOR_P_ARTICLE_DETAIL",
      //         "cityid":area,
      //         "ad_seat": "SEAT2"
      //     }, callback);
      // },
    //文章详情
    article:function(callback){
      wec.article({
        "u_id":data.login_info.uid,
        "article_id":data.article_id
      },callback);
    },
    article_getUid:function(callback){
        wec.article_getUid({
          "aid":data.article_id
        },callback);
      },
  },function(err,result){
        // data.xSlider = returnData(result.lunbo_list,'lunbo_list');
        // data.xSlider2 = returnData(result.lunbo_list2,'lunbo_list2');
        data.article_getUid =returnData(result.article_getUid,'article');
        // console.log('article_getUid',data.article_getUid);
        if (data.article_getUid != null) {
          global.article_getUid = data.article_getUid;
        }
        if(result.article.code != 0){
          //文章不存在的时候  跳到404
            return next();
        }
        data.article =returnData(result.article,'article');
        if(data.article.article_info.img_info){
            data.article.article_info.img_info =JSON.parse(data.article.article_info.img_info);
        }else{
            data.article.article_info.img_info = [];
        }
        data.tag_list = encodeURI(data.article.article_info.tag_list)
        async.parallel({
          //获取用户信息（普通用户，顾问，参赞）
          userinfo:function(callback){
              wec.userinfo({
                  "u_id":data.login_info.uid,
                  "to_uid":data.article.article_info.uid
              },callback);
          }
        },function(err,result) {
          data.userinfo = returnData(result.userinfo, 'userinfo');
          data.country = data.userinfo.country || '1';
          data.hcountry = (data.userinfo.country || '1,').split(',')[0];
          var pagekey=null;
          pagekey  = get_page_key(data.userinfo.usertype, data.userinfo.adviser_type, 'ADVISOR_P_ARTICLE_DETAIL');
            async.parallel({
                lunbo_list:function(callback) {
                    cms.lunbo_list({
                        "ad_page": pagekey,
                        "cityid":area,
                        "ad_seat": "SEAT1"
                    }, callback);
                },
                lunbo_list2:function(callback) {
                    cms.lunbo_list({
                        "ad_page": pagekey,
                        "cityid":area,
                        "ad_seat": "SEAT2"
                    }, callback);
                },
            },function (err,result) {
                data.xSlider = returnData(result.lunbo_list,'lunbo_list');
                data.xSlider2 = returnData(result.lunbo_list2,'lunbo_list2');
                data.tdk = {
                    pagekey:pagekey,
                    cityid: area,
                    realname: data.userinfo.realname,
                    title: data.article.article_info.title,
                    description: helperfunc.cut(data.article.article_info.introduce,80),
                    keywords: data.article.article_info.title
                };
                data.esikey = esihelper.esikey();
                res.render('article_detail', data);
            })
        });
    });
}

//顾问主页-用户视角
exports.adviser_main = function (req, res, next) {
  log.debug('this adviser_main-----------------------',req.params);
  var data = [];
  var area = req.cookies.currentarea ? req.cookies.currentarea : 1;
    data.uid = req.params[0];
    //node获取地址栏url
    var l = url.parse(req.url, true).query;
    console.log('url', config.wwhost+req.url);
    if (l.h !== undefined) {
        data.url = l.h;
    } else {
        data.url = config.wwhost+req.url;
    }
    if ( req.cookies.login_ss !== undefined) {
    data.login_info = JSON.parse(req.cookies.login_ss);
    log.debug('存储的用户信息' + req.cookies.login_ss);
  }else{
    data.login_info = {};
    data.login_info.uid = 0;
  }

  async.parallel({
    //获取用户信息（普通用户，顾问，参赞）
    userinfo:function(callback){
      wec.userinfo({
        "u_id":data.login_info.uid, "to_uid":data.uid},callback)
      },
    guwen_list:function (callback){
      wec.adviser_main({
        "per_page":6, "order": encodeURI("add_time desc"), "uid": data.uid}, callback)
    },
    canzan_jianjie:function (callback){ //相关顾问
        cms.canzan_jianjie({
            "uid":data.uid
        },callback)
    },
  },function(err, result){
    data.userinfo =returnData(result.userinfo,'userinfo');
    if(result.userinfo.code == '1210000006'){
      //顾问不存在的时候  跳到404
        return next();
    }
    data.canzan_jianjie = returnData(result.canzan_jianjie, 'canzan_jianjie');
    data.guwen_list = returnData(result.guwen_list, 'guwen_list');
    data.country =data.userinfo.country || '1';
    data.hcountry = (data.userinfo.country || '1,').split(',')[0];
    var pagekey = '';
    pagekey  = get_page_key(data.userinfo.usertype, data.userinfo.adviser_type, 'ADVISOR_P_MAIN');
      async.parallel({
          lunbo_list:function(callback) {
              cms.lunbo_list({
                  "ad_page": pagekey,
                  "cityid":area,
                  "ad_seat": "SEAT1"
              }, callback);
          },
          lunbo_list2:function(callback) {
              cms.lunbo_list({
                  "ad_page": pagekey,
                  "cityid":area,
                  "ad_seat": "SEAT2"
              }, callback);
          },
      },function (err, result) {
          data.xSlider = returnData(result.lunbo_list,'lunbo_list');
          data.xSlider2 = returnData(result.lunbo_list2,'lunbo_list2');
          data.tdk = {
              pagekey: pagekey,
              cityid: area,
              realname: data.userinfo.realname,
          };
          data.esikey = esihelper.esikey();
          res.render('adviser_main', data);
      })
  });
}
//用户 顾问专栏加载更多
exports.adviser_special_more = function (req, res, next) {
  log.debug('this adviser_special_more');
  var page_more = req.query.page_more;
  log.debug('page-------', req.query.page_more)
  var uid = req.query.u_id;
  res.setHeader("Access-Control-Allow-Methods","GET,POST");
  wec.user_article_list({"u_id": uid, "page": page_more, "per_page": 10, "type": 2}, function (err,result) {
    if(err){
      res.send("cb("+JSON.stringify(err)+")");
    }else{
      log.debug('result--------', result)
      res.send("cb("+JSON.stringify(result)+")");
    }
  });
};

//顾问专栏-用户视角
exports.adviser_special = function (req, res, next) {
  log.debug('顾问专栏 用户视角');
  log.info('wo shi haidoa')
  var data = [];
  var area = req.cookies.currentarea ? req.cookies.currentarea : 1;
  data.to_uid = req.params[0];
  //node获取地址栏url
  var l = url.parse(req.url, true).query;
  console.log('url', l.h);
  if (l.h !== undefined) {
      data.url = l.h;
  } else {
      data.url = config.wwhost+req.url;
  }
  if ( req.cookies.login_ss !== undefined) {
    var login_a = JSON.parse(req.cookies.login_ss);
    log.debug("login_a-------" + login_a.uid);
    data.login_info = login_a;
  }else{
    data.login_info ={};
    data.login_info.uid = 0;
  }
  async.parallel({
      // lunbo_list:function(callback) {
      //     cms.lunbo_list({
      //         "ad_page": "ADVISOR_P_ARTICLE",
      //         "cityid":area,
      //         "ad_seat": "SEAT1"
      //     }, callback);
      // },
      // lunbo_list2:function(callback) {
      //     cms.lunbo_list({
      //         "ad_page": "ADVISOR_P_ARTICLE",
      //         "cityid":area,
      //         "ad_seat": "SEAT2"
      //     }, callback);
      // },
    //获取用户信息（普通用户，顾问，参赞）
    userinfo:function(callback){
      wec.userinfo({"u_id": data.login_info.uid, "to_uid":data.to_uid},callback);
    },
    zhuanlanlist: function (callback) {
      wec.adviser_main({"uid": data.to_uid, "page": 1, "per_page": 6, "type": 2,"order": encodeURI("add_time desc")}, callback);
    }
  },function(err, result){
      // data.xSlider = returnData(result.lunbo_list,'lunbo_list');
      // data.xSlider2 = returnData(result.lunbo_list2,'lunbo_list2');
    data.userinfo =returnData(result.userinfo,'userinfo');
      if(result.userinfo.code == '1210000006'){
          //顾问不存在的时候  跳到404
          return next();
      }
    // data.channel_list =returnData(result.channel_list,'channel_list');
    data.zhuanlanlist =returnData(result.zhuanlanlist,'zhuanlanlist');
      data.country =data.userinfo.country || '1';
      data.hcountry = (data.userinfo.country || '1,').split(',')[0];
      var pagekey = null;
      pagekey  = get_page_key(data.userinfo.usertype, data.userinfo.adviser_type, 'ADVISOR_P_ARTICLE');
      async.parallel({
          lunbo_list:function(callback) {
              cms.lunbo_list({
                  "ad_page": pagekey,
                  "cityid":area,
                  "ad_seat": "SEAT1"
              }, callback);
          },
          lunbo_list2:function(callback) {
              cms.lunbo_list({
                  "ad_page": pagekey,
                  "cityid":area,
                  "ad_seat": "SEAT2"
              }, callback);
          },
      },function(err,result){
          data.xSlider = returnData(result.lunbo_list,'lunbo_list');
          data.xSlider2 = returnData(result.lunbo_list2,'lunbo_list2');
          // var pagekey = null;
          // pagekey  = get_page_key(data.userinfo.usertype, data.userinfo.adviser_type, 'ADVISOR_P_ARTICLE');
          data.tdk = {
            pagekey: pagekey,
            cityid: area,
            realname: data.userinfo.realname,
          };
          data.esikey = esihelper.esikey();
          res.render('adviser_special', data);
      });
  });
}

//顾问案例-用户视角
exports.adviser_case = function (req, res, next) {
    log.debug('顾问案例-用户视角')
    var data = [];
    var area = req.cookies.currentarea ? req.cookies.currentarea : 1;
    data.to_uid = req.params[0];
    //node获取地址栏url
    var l = url.parse(req.url, true).query;
    console.log('url', l.h);
    if (l.h !== undefined) {
        data.url = l.h;
    } else {
        data.url = config.wwhost+req.url;
    }
    if ( req.cookies.login_ss !== undefined) {
        data.login_info = JSON.parse(req.cookies.login_ss);
    }else{
      data.login_info = {};
      data.login_info.uid = 0;
    }
    async.parallel({
        // lunbo_list:function(callback) {
        //     cms.lunbo_list({
        //         "ad_page": "ADVISOR_P_CASE",
        //         "cityid":area,
        //         "ad_seat": "SEAT1"
        //     }, callback);
        // },
        // lunbo_list2:function(callback) {
        //     cms.lunbo_list({
        //         "ad_page": "ADVISOR_P_CASE",
        //         "cityid":area,
        //         "ad_seat": "SEAT2"
        //     }, callback);
        // },
        //获取用户信息（普通用户，顾问，参赞）
        userinfo:function(callback){
            wec.userinfo({
                "u_id":data.login_info ? data.login_info.uid : '',
                "to_uid": data.to_uid
            },callback);
        },
        //作者精选
        // channel_list:function(callback){
        //     cms.channel_list({
        //         "u_id":data.to_uid,
        //         "per_page":6,
        //         "order":"views desc"
        //     },callback);
        // },
        //热门留学方案
        // hot_liuxuefangan_list: function (callback) {
        //     cms.hot_liuxuefangan_list({
        //         "position": "blog",
        //         "catid": "47",
        //         "cityid": area,
        //         "perpage": 15
        //     }, callback);
        // },
        //明星顾问
        // mingxingguwen: function (callback) {
        //     cms.mingxingguwen({
        //         "position": "blog",
        //         "catid": 101,
        //         "cityid": area,
        //         "perpage": 20
        //     }, callback);
        // },
        case_list: function (callback) {
            wec.adviser_main({
                "uid": data.to_uid,
                "per_page": 6,
                "type": 1,
                "order": encodeURI("add_time desc")
            }, callback);
        }

    },function(err, result){
        // data.xSlider = returnData(result.lunbo_list,'lunbo_list');
        // data.xSlider2 = returnData(result.lunbo_list2,'lunbo_list2');
        data.userinfo =returnData(result.userinfo,'userinfo');
        if(result.userinfo.code == '1210000006'){
            //顾问不存在的时候  跳到404
            next()
            return false;
        }
        // data.channel_list =returnData(result.channel_list,'channel_list');
        data.case_data = returnData(result.case_list,'case_list');
         //切割成 二维数组
        // data.hotLXFA  = split_array( returnData(result.hot_liuxuefangan_list,'hot_liuxuefangan_list'), 7);
        // var sliderArr = [];
        // data.mingxingguwen = returnData(result.mingxingguwen,'mingxingguwen');
        // var sliderArrLen = (data.mingxingguwen.length%10 == 0) ? parseInt(data.mingxingguwen.length/10) : (parseInt(data.mingxingguwen.length/10) + 1);
        // for (i= 0; i < sliderArrLen; i++) {
        //  sliderArr.push(data.mingxingguwen.slice(i*10, (i+1)*10));
        // }
        // data.sliderArr = sliderArr;
        data.country =data.userinfo.country || '1';
        data.hcountry = (data.userinfo.country || '1,').split(',')[0];
        var pagekey = null;
        pagekey  = get_page_key(data.userinfo.usertype, data.userinfo.adviser_type, 'ADVISOR_P_CASE');
        async.parallel({
            lunbo_list:function(callback) {
                cms.lunbo_list({
                    "ad_page": pagekey,
                    "cityid":area,
                    "ad_seat": "SEAT1"
                }, callback);
            },
            lunbo_list2:function(callback) {
                cms.lunbo_list({
                    "ad_page": pagekey,
                    "cityid":area,
                    "ad_seat": "SEAT2"
                }, callback);
            },
          //猜你喜欢
          // guess_like:function(callback){
          //   cms.channel_list({
          //     "per_page":12,
          //     "order":"views",
          //     "country_id":country
          //   },callback);
          // },
          //活动预告
          // huodongyugao: function (callback) {
          //   cms.huodongyugao({
          //     "position": "cmslist",
          //     "catid": 64,
          //     "cityid": area,
          //     "country": hcountry.split(',')[0],
          //     "perpage": "4"
          //   }, callback);
          // }
        },function(err,result){
            data.xSlider = returnData(result.lunbo_list,'lunbo_list');
            data.xSlider2 = returnData(result.lunbo_list2,'lunbo_list2');
            // data.huodongyugao =returnData(result.huodongyugao,'huodongyugao');
            // data.guess_like = returnData(result.guess_like,'guess_like');
            /*if(data.userinfo.status == 1){
              pagekey = 'PREAD_CASE_LIST';
            }else if(data.userinfo.status == 0){
              pagekey = 'ADVISOR_P_CASE';
            }*/
            data.tdk = {
              pagekey: pagekey,
              cityid: area,
              realname: data.userinfo.realname,
            };
            data.esikey = esihelper.esikey();
            res.render('adviser_case_p', data);
        });
    });
}

//参赞 编辑个人信息
exports.counsellor_personal = function (req, res, next) {
  log.debug('counsellor_personal');
  var data = [];
  var area = req.cookies.currentarea ? req.cookies.currentarea : 1;
  var country = req.query.country || 0;
  var to_uid = req.params.id;
  //node获取地址栏url
  var l = url.parse(req.url, true).query;
  console.log('url', l.h);
  if (l.h !== undefined) {
      data.url = l.h;
  } else {
      data.url = config.wwhost+req.url;
  }
  data.login_info = '';
  if ( req.cookies.login_ss !== undefined) {
    var login_a = JSON.parse(req.cookies.login_ss);
    data.login_info = login_a;
    if(data.login_info.usertype ==1){
        return next();
    }
  }else{
    res.redirect(config.wwhost+'/login');
    return false;
  }
  async.parallel({
    //获取用户信息（普通用户，顾问，参赞）
    userinfo:function(callback){
      wec.userinfo({"u_id":data.login_info.uid, "to_uid":data.login_info.uid},callback);
    }

  },function(err, result){
    data.userinfo =returnData(result.userinfo,'userinfo');
    console.log('data.userinfo', data.userinfo)
    data.tdk = {
      pagekey: 'CANZAN_CENTER_PROFILE',
      cityid: area,
    };
    res.render('counsellor_personal', data);
  });
};

//顾问 编辑个人信息
exports.advisor_profile = function (req, res, next) {
  log.debug('advisor_profile');
  var data = [];
  var area = req.cookies.currentarea ? req.cookies.currentarea : 1;
  var country = req.query.country || 0;
  var to_uid = req.params.id;
  //node获取地址栏url
  var l = url.parse(req.url, true).query;
  console.log('url', l.h);
  if (l.h !== undefined) {
      data.url = l.h;
  } else {
      data.url = config.wwhost+req.url;
  }
  if ( req.cookies.login_ss !== undefined) {
    var login_a = JSON.parse(req.cookies.login_ss);
    data.login_info = login_a;
    if(data.login_info.usertype ==1){
        return next();
    }
  }else{
    res.redirect(config.wwhost+'/login');
    return false;
  }
  async.parallel({
    //获取用户信息（普通用户，顾问，参赞）
    userinfo:function(callback){
      wec.userinfo({"u_id":data.login_info.uid, "to_uid":data.login_info.uid},callback);
    }
  },function(err, result){
    data.userinfo = returnData(result.userinfo,'userinfo');
    log.debug(data.userinfo);
      var pagekey =null;
      if(data.userinfo.usertype == 2){
          if(data.login_info.adviser==1){
              pagekey = 'ADVISOR_CENTER_PROFILE';
          }else {
              pagekey = 'ADVISOR_CENTER_PROFILE';
          }
      }
      async.parallel({
          lunbo_list: function (callback) {
              cms.lunbo_list({
                  "ad_page": pagekey,
                  "ad_seat": "SEAT1",
                  "cityid":area
              }, callback);
          },
          lunbo_list2: function (callback) {
              cms.lunbo_list({
                  "ad_page":pagekey,
                  "ad_seat": "SEAT2",
                  "cityid":area
              }, callback);
          },
      },function (err, result) {
          data.xSlider = returnData(result.lunbo_list, 'lunbo_list');
          data.xSlider2 = returnData(result.lunbo_list2, 'lunbo_list2');
          data.tdk = {
              pagekey: pagekey,
              cityid: area,
              realname: data.userinfo.realname,
          };
          data.esikey = esihelper.esikey();
          res.render('advisor_profile', data);
      })
  });
};

//参赞中心 账户设置
exports.counsellor_set = function (req, res, next) {
  log.debug('counsellor_set');
  var data = [];
  var area = req.cookies.currentarea ? req.cookies.currentarea : 1;
  var country = req.query.country || 0;
  var to_uid = req.params.id;
  //node获取地址栏url
  var l = url.parse(req.url, true).query;
  console.log('url', l.h);
  if (l.h !== undefined) {
      data.url = l.h;
  } else {
      data.url = config.wwhost+req.url;
  }
  if ( req.cookies.login_ss !== undefined) {
    var login_a = JSON.parse(req.cookies.login_ss);
    data.login_info = login_a;
    if(data.login_info.usertype ==1){
        return next();
    }
  }else{
    res.redirect(config.wwhost+'/login');
    return false;
  }
  async.parallel({
    //获取用户信息（普通用户，顾问，参赞）
    userinfo:function(callback){
      wec.userinfo({"u_id":data.login_info.uid, "to_uid":data.login_info.uid},callback);
    }
  },function(err, result){
    data.userinfo = returnData(result.userinfo,'userinfo');
    data.tdk = {
      pagekey: 'CANZAN_CENTER_ACOUNT',
      cityid: area,
    };
    data.esikey = esihelper.esikey();
    res.render('counsellor_set', data);
  });
};

//顾问 普通用户 中心 账户设置
exports.advisor_acount = function (req, res, next) {
  log.debug('advisor_acount');
  var data = [];
  var area = req.cookies.currentarea ? req.cookies.currentarea : 1;
  var country = req.query.country || 0;
  var to_uid = req.params.id;
  //node获取地址栏url
  var l = url.parse(req.url, true).query;
  console.log('url', l.h);
  if (l.h !== undefined) {
      data.url = l.h;
  } else {
      data.url = config.wwhost+req.url;
  }
  if ( req.cookies.login_ss !== undefined) {
    var login_a = JSON.parse(req.cookies.login_ss);
    log.debug("login_a-------" + login_a.uid);
    data.login_info = login_a;
  }else{
    res.redirect(config.wwhost+'/login');
    return false;
  }
  async.parallel({
    //获取用户信息（普通用户，顾问，参赞）
    userinfo:function(callback){
      wec.userinfo({"u_id":data.login_info.uid, "to_uid":data.login_info.uid},callback);
    }
  },function(err, result){
    data.userinfo = returnData(result.userinfo,'userinfo');
    var pagekey =null;
    if(data.userinfo.usertype ==1){
       pagekey = 'USER_CENTER_ACOUNT';
    }else if(data.userinfo.usertype == 2){
        if(data.login_info.adviser==1){
            pagekey = 'ADVISOR_CENTER_ACOUNT';
        }else {
            pagekey = 'ADVISOR_CENTER_ACOUNT';
        }
       // pagekey = 'ADVISOR_CENTER_ACOUNT';
    }
    async.parallel({
        lunbo_list: function (callback) {
            cms.lunbo_list({
                "ad_page": pagekey,
                "ad_seat": "SEAT1",
                "cityid":area
            }, callback);
        },
        lunbo_list2: function (callback) {
            cms.lunbo_list({
                "ad_page": pagekey,
                "ad_seat": "SEAT2",
                "cityid":area
            }, callback);
        },
    },function (err, result) {
        data.xSlider = returnData(result.lunbo_list, 'lunbo_list');
        data.xSlider2 = returnData(result.lunbo_list2, 'lunbo_list2');
        data.tdk = {
            pagekey: pagekey,
            cityid: area,
            realname: data.userinfo.realname,
        };
        data.esikey = esihelper.esikey();
        res.render('advisor_acount', data);
    })
  });
};

//用户中心-个人信息
exports.user_information = function (req, res, next) {
  console.log('user_information');
  var data = [];
  var area = req.cookies.currentarea ? req.cookies.currentarea : 1;
  var country = req.query.country || 0;
  var to_uid = req.params.id;
  //node获取地址栏url
  var l = url.parse(req.url, true).query;
  console.log('url', l.h);
  if (l.h !== undefined) {
      data.url = l.h;
  } else {
      data.url = config.wwhost+req.url;
  }
  if ( req.cookies.login_ss !== undefined) {
    var login_a = JSON.parse(req.cookies.login_ss);
    console.log("login_a-------" + login_a);
    data.login_info = login_a;
  }else{
    res.redirect(config.wwhost+'/login');
    return false;
  }
  async.parallel({
      lunbo_list: function (callback) {
          cms.lunbo_list({
              "ad_page": "USER_CENTER_PROFILE",
              "ad_seat": "SEAT1",
              "cityid":area
          }, callback);
      },
      lunbo_list2: function (callback) {
          cms.lunbo_list({
              "ad_page": "USER_CENTER_PROFILE",
              "ad_seat": "SEAT2",
              "cityid":area
          }, callback);
      },
    //获取用户信息（普通用户，顾问，参赞）
    userinfo:function(callback){
      wec.userinfo({"u_id":data.login_info.uid, "to_uid":data.login_info.uid},callback);
    }

  },function(err, result){
      data.xSlider = returnData(result.lunbo_list, 'lunbo_list');
      data.xSlider2 = returnData(result.lunbo_list2, 'lunbo_list2');
    data.userinfo = returnData(result.userinfo,'userinfo');
    console.log('data.userinfo', data.userinfo)
    data.tdk = {
      pagekey: 'USER_CENTER_PROFILE',
      cityid: area,
    };
    data.esikey = esihelper.esikey();
    res.render('user_information', data);
  });
};

//文章评论接口
exports.reviewArticle =function(req,res,next){
  log.debug('文章评论接口~~thl')
  var data = req.body;
   //设置允许跨域
  res.setHeader("Access-Control-Allow-Methods","GET,POST");
  wec.reviewArticle(data, function(err,result){
	if(err){
   	  res.send("cb("+JSON.stringify(err)+")");
    }else{
   	  res.send("cb("+JSON.stringify(result)+")");
	}
  });
}

//案列发布页
exports.release_case = function(req,res,next){
  log.debug('案列发布页~~thl')
  var data = {};
  var area = req.cookies.currentarea ? req.cookies.currentarea : 1;
  //node获取地址栏url
  var l = url.parse(req.url, true).query;
  console.log('url', l.h);
  if (l.h !== undefined) {
      data.url = l.h;
  } else {
      data.url = config.wwhost+req.url;
  }
  if(req.cookies.login_ss != undefined){
    data.login_info = JSON.parse(req.cookies.login_ss);
    if(data.login_info.usertype ==1){
        return next();
    }
  }else{
    res.redirect(config.wwhost+'/login')
    return false;
  }
  async.parallel({
    //获取用户信息（普通用户，顾问，参赞）
    userinfo:function(callback){
      wec.userinfo({
        "u_id":data.login_info.uid,
        "to_uid":data.login_info.uid
      },callback);
     }
  },function(err, result){
    data.userinfo = returnData(result.userinfo,'userinfo');
    data.tdk = {
      pagekey: 'ADVISOR_CENTER_POSTCASE',
      cityid: area,
    };
    data.esikey = esihelper.esikey();
    res.render('release_case', data);
  });
}

//文本编辑器发布接口
exports.publish_article = function (req, res, next) {
  log.debug('文本编辑器发布接口~~thl')
  var data ={};
  data = req.body;
  wec.publish_article(data, function(err,result){
    if(err){
      res.send(err);
    }else{
      res.send(result);
    }
  });
}

//专栏发布页
exports.release_article = function(req,res,next){
    log.debug('专栏发布页~~thl')
    var data = {};
    var area = req.cookies.currentarea ? req.cookies.currentarea : 1;
    //node获取地址栏url
    var l = url.parse(req.url, true).query;
    console.log('url', l.h);
    if (l.h !== undefined) {
        data.url = l.h;
    } else {
        data.url = config.wwhost+req.url;
    }
    if(req.cookies.login_ss != undefined){
        data.login_info = JSON.parse(req.cookies.login_ss);
        if(data.login_info.usertype ==1){
            return next();
        }
    }else{
        res.redirect(config.wwhost+'/login')
        return false;
    }
    async.parallel({
        //获取用户信息（普通用户，顾问，参赞）
        userinfo:function(callback){
            wec.userinfo({
                "u_id":data.login_info.uid,
                "to_uid":data.login_info.uid
            },callback);
        },
        getpdf:function(callback){
            cms.getPdf({},callback);
        }
    },function (err, result) {
        data.userinfo = returnData(result.userinfo,'userinfo');
        data.getpdf = returnData(result.getpdf,'getpdf');
        // log.info(data.getpdf)
        // log.info(data.getpdf[1])
        data.getpdf = JSON.stringify(data.getpdf);
        var pagekey = null;
        if(data.userinfo.usertype ==2){
            if(data.login_info.adviser==1){
                pagekey = 'ADVISOR_CENTER_POSTARTICLE';
            }else {
                pagekey = 'ADVISOR_CENTER_POSTARTICLE';
            }
        }else if(data.userinfo.usertype == 3){
            pagekey = 'CANZAN_CENTER_POSTARTICLE';
        }
        async.parallel({
            lunbo_list: function (callback) {
                cms.lunbo_list({
                    "ad_page": pagekey,
                    "ad_seat": "SEAT1",
                    "cityid":area
                }, callback);
            },
            lunbo_list2: function (callback) {
                cms.lunbo_list({
                    "ad_page": pagekey,
                    "ad_seat": "SEAT2",
                    "cityid":area
                }, callback);
            },
        },function (err, result) {
            data.xSlider = returnData(result.lunbo_list, 'lunbo_list');
            data.xSlider2 = returnData(result.lunbo_list2, 'lunbo_list2');
            data.tdk = {
                pagekey:pagekey,
                cityid: area,
                realname: data.userinfo.realname,
            };
            data.esikey = esihelper.esikey();
            if(data.login_info.adviser == 1){
                log.info('留学')
                res.render('release_article',data);
            }else if(data.login_info.adviser == 2){
                log.info('移民')
                res.render('release_article_yimin',data);
            }
        })
    })
};

//获取相册列表
exports.get_photos = function (req, res, next) {
    log.debug('获取相册列表接口');
    var data = req.query;
    wec.album_list(data, function(err,result){
      if(err){
        res.send(err);
      }else{
        res.send(result);
      }
    });
};

// 关注用户 接口
exports.follow_people = function (req, res, next) {
    log.debug('关注用户');
    var data ={};
    var area = req.cookies.currentarea ? req.cookies.currentarea : 1;
    data = req.body;
    log.debug('---data---');
    log.debug(data);
    //res.setHeader("Access-Control-Allow-Methods","GET,POST");
    //wecent.follow_people(data, function (err,result) {
    wec.follow_people(data, function(err,result){
        log.debug('---result---')
        log.debug(result);
        res.send(result);
      //if(err){
      //  console.log('err------', err)
      //  res.send("cb("+JSON.stringify(err)+")");
      //}else{
      //  console.log('result------', result)
      //  res.send("cb("+JSON.stringify(result)+")");
      //}
    });
}

//回复文章评论
exports.save_comment_ans = function(req,res,next){
  log.debug('回复文章评论~~~thl')
  var data = req.body;
  wec.save_comment_ans(data,function(err,result){
    if(err){
      res.send(err)
    }else{
      res.send(result)
    }
  });
}

//案例列表 接口
exports.article_list = function (req, res, next) {
    log.debug('获取案例表接口');
    var data = {};
    data = req.query;

    wec.adviser_main(data, function(err,result){
        res.send(result);
    });
};
//删除文章接口
exports.delete_article = function (req,res,next) {
    log.debug('删除文章接口！！');
    var data = req.body;
    wec.delete_article(data,function(err,result){
        if(err){
            res.send(err)
        }else{
            res.send(result)
        }
    });
}
//获取回复列表接口
exports.comment_ans = function(req,res,next){
  log.debug('获取回复列表接口~~~thl')
  var data = req.query;
  wec.comment_ans(data, function(err,result){
    if(err){
        res.send(err);
    }else{
        res.send(result);
    }
  });
};

//分页获取评论
exports.article_comments = function(req,res,next){
  log.debug('分页获取评论~~~thl')
  var data = req.query;
  wec.article_comments(data, function(err,result){
    if(err){
        res.send(err);
    }else{
       res.send(result);
    }
  });
}
//专栏底页 （顾问和参赞视角）
exports.center_article_detail = function(req,res,next){
  log.debug('专栏底页 （顾问和参赞视角）~~~thl')
  var data = {};
  var area = req.cookies.currentarea ? req.cookies.currentarea : 1;
  //node获取地址栏url
  var l = url.parse(req.url, true).query;
  console.log('url', l.h);
  if (l.h !== undefined) {
      data.url = l.h;
  } else {
      data.url = config.wwhost+req.url;
  }
  if(req.cookies.login_ss != undefined){
    data.login_info = JSON.parse(req.cookies.login_ss);
    if(data.login_info.usertype ==1){
        return next();
    }
  }else{
    res.redirect(config.wwhost+'/login');
    return false;
  }
  data.article_id = req.params.id; //获取文章id
  // log.info(data.article_id )
  data.preview = req.query.preview || 0; //获取是否预览 1是预览 0 不是
  async.parallel({
    //获取用户信息（普通用户，顾问，参赞）
    userinfo:function(callback){
      wec.userinfo({
        "u_id":data.login_info.uid,
        "to_uid":data.login_info.uid
      },callback);
    },
    //文章详情
    article:function(callback){
       wec.article_info({
       "u_id":data.login_info.uid,
       "article_id":data.article_id,
      },callback);
    }
  },function(err, result){
    data.userinfo = returnData(result.userinfo,'userinfo');
    data.article =  returnData(result.article,'article');
    data.id = data.article_id;
    var pagekey = null;
    if(data.userinfo.usertype ==2){
        if(data.login_info.adviser==1){
            pagekey = 'ADVISOR_CENTER_ARTICLEDETAIL';
        }else {
            pagekey = 'ADVISOR_CENTER_ARTICLEDETAIL';
        }
      // pagekey = 'ADVISOR_CENTER_ARTICLEDETAIL';
    }else if(data.userinfo.usertype == 3){
      pagekey = 'CANZAN_CENTER_ARTICLEDETAIL';
    }
    async.parallel({
        lunbo_list: function (callback) {
            cms.lunbo_list({
                "ad_page": pagekey,
                "ad_seat": "SEAT1",
                "cityid":area
            }, callback);
        },
        lunbo_list2: function (callback) {
            cms.lunbo_list({
                "ad_page": pagekey,
                "ad_seat": "SEAT2",
                "cityid":area
            }, callback);
        },
    },function (err, result) {
        data.xSlider = returnData(result.lunbo_list, 'lunbo_list');
        data.xSlider2 = returnData(result.lunbo_list2, 'lunbo_list2');
        data.tdk = {
            pagekey:pagekey,
            cityid: area,
        };
        data.esikey = esihelper.esikey();
        res.render('center_article_detail', data);
    })
  });
}

//案例底页 （顾问视角）
exports.center_case_detail = function(req,res,next){
  log.debug('案例底页（顾问视角）~~~thl')
  var data = {};
  var area = req.cookies.currentarea ? req.cookies.currentarea : 1;
  //node获取地址栏url
  var l = url.parse(req.url, true).query;
  console.log('url', l.h);
  if (l.h !== undefined) {
      data.url = l.h;
  } else {
      data.url = config.wwhost+req.url;
  }
  if(req.cookies.login_ss != undefined){
    data.login_info = JSON.parse(req.cookies.login_ss);
    if(data.login_info.usertype ==1){
        return next();
    }
  }else{
    res.redirect(config.wwhost+'/login');
    return false;
  }
  data.article_id = req.params.id; //获取文章id
  data.preview = req.query.preview || 0; //获取是否预览 1是预览 0 不是
  async.parallel({
    //获取用户信息（普通用户，顾问，参赞）
    userinfo:function(callback){
      wec.userinfo({
        "u_id":data.login_info.uid,
        "to_uid":data.login_info.uid
      },callback);
    },
    //文章详情
    article:function(callback){
       wec.article_info({
       "u_id":data.login_info.uid,
       "article_id":data.article_id,
      },callback);  
    }
  },function(err, result){
    data.userinfo = returnData(result.userinfo,'userinfo');
    data.article = returnData(result.article,'article');
    data.id = data.article_id;
    var pagekey = null;
    if(data.userinfo.usertype ==2){
      if(data.login_info.adviser==1){
          pagekey = 'ADVISOR_CENTER_CASEDETAIL';
      }else {
          pagekey = 'ADVISOR_CENTER_CASEDETAIL';
      }
    }
    async.parallel({
        lunbo_list: function (callback) {
            cms.lunbo_list({
                "ad_page": pagekey,
                "ad_seat": "SEAT1",
                "cityid":area
            }, callback);
        },
        lunbo_list2: function (callback) {
            cms.lunbo_list({
                "ad_page": pagekey,
                "ad_seat": "SEAT2",
                "cityid":area
            }, callback);
        },
    },function (err, result) {
        data.xSlider = returnData(result.lunbo_list, 'lunbo_list');
        data.xSlider2 = returnData(result.lunbo_list2, 'lunbo_list2');
        data.tdk = {
            pagekey:pagekey,
            cityid: area,
        };
        data.esikey = esihelper.esikey();
        res.render('center_case_detail', data);
    })
  });
}

//添加相册接口
exports.album_add = function (req,res,next) {
    log.debug('添加相册接口！！');
    var data = req.body;
    wec.album_add(data,function(err,result){
        if(err){
            res.send(err)
        }else{
            res.send(result)
        }
    });
};

//我的草稿箱
exports.draft =function(req,res,next){
  log.debug('我的草稿箱~~~thl')
  var data = {};
  var area = req.cookies.currentarea ? req.cookies.currentarea : 1;
  data.is_draft = req.query.is_draft || 2; //默认为2 为草稿
  //node获取地址栏url
  var l = url.parse(req.url, true).query;
  console.log('url', l.h);
  if (l.h !== undefined) {
      data.url = l.h;
  } else {
      data.url = config.wwhost+req.url;
  }
  var page = req.query.page || 1;
  if(req.cookies.login_ss != undefined){
    data.login_info = JSON.parse(req.cookies.login_ss);
    if(data.login_info.usertype ==1){
        return next();
    }
  }else{
    res.redirect(config.wwhost+'/login')
    return false;
  }
  async.parallel({
    //获取用户信息（普通用户，顾问，参赞）
    userinfo:function(callback){
      wec.userinfo({
        "u_id":data.login_info.uid,
        "to_uid":data.login_info.uid
      },callback);
    },
    //文章列表
    channel_list:function(callback){
      cms.channel_list({
        "uid":data.login_info.uid,
        "per_page":8,
        "is_draft":data.is_draft,
        "order-update_time%20desc":'',
        "page":page
      },callback)
    }
  },function(err, result){
    data.userinfo = returnData(result.userinfo,'userinfo');
    data.channel_list = returnData(result.channel_list,'channel_list');
    var pagekey = null;
    var route = '';
    if(data.userinfo.usertype == 2){
        if(data.login_info.adviser==1){
            pagekey = 'ADVISOR_CENTER_DRAFT';
        }else {
            pagekey = 'ADVISOR_CENTER_DRAFT';
        }
      // pagekey = 'ADVISOR_CENTER_DRAFT';
        route ='/advisor_center/draft';
    }else if(data.userinfo.usertype == 3){
      pagekey = 'CANZAN_CENTER_DRAFT';
      route ='/canzan_center/draft';
    }
    async.parallel({
        lunbo_list: function (callback) {
            cms.lunbo_list({
                "ad_page": pagekey,
                "ad_seat": "SEAT1",
                "cityid":area
            }, callback);
        },
        lunbo_list2: function (callback) {
            cms.lunbo_list({
                "ad_page": pagekey,
                "ad_seat": "SEAT2",
                "cityid":area
            }, callback);
        },
    },function (err, result) {
        data.xSlider = returnData(result.lunbo_list, 'lunbo_list');
        data.xSlider2 = returnData(result.lunbo_list2, 'lunbo_list2');
        data.tdk = {
            pagekey:pagekey,
            cityid: area,
            realname: data.userinfo.realname
        };
        data.pagination = {
            pages:Number.parseInt(data.channel_list.totalpage),
            displayPage: 5,
            showCtrl:true,
            hrefFormer:route+'?is_draft='+data.is_draft+'&page=',
            currentPage:Number.parseInt(page),
            //查询条件 在page分页之前
            order:{
                is_draft:data.is_draft
            }
        }
        data.esikey = esihelper.esikey();
        res.render('draft', data);
    })
  });
}
//编辑相册接口
exports.album_update = function (req,res,next) {
    log.debug('编辑相册接口！！');
    var data = req.body;
    wec.album_update(data,function(err,result){
        if(err){
            res.send(err)
        }else{
            res.send(result)
        }
    });
};
//删除相册接口
exports.album_del = function (req,res,next) {
    log.debug('删除相册接口！！');
    var data = req.body;
    wec.album_del(data,function(err,result){
        if(err){
            res.send(err)
        }else{
            res.send(result)
        }
    });
}
//编辑专栏页
exports.edit_article = function(req,res,next){
  log.debug('编辑专栏页~~~thl')
  var data ={};
  var area = req.cookies.currentarea ? req.cookies.currentarea : 1;
  //node获取地址栏url
  var l = url.parse(req.url, true).query;
  console.log('url', l.h);
  if (l.h !== undefined) {
      data.url = l.h;
  } else {
      data.url = config.wwhost+req.url;
  }
  if(req.cookies.login_ss != undefined){
    data.login_info = JSON.parse(req.cookies.login_ss);
    if(data.login_info.usertype ==1){
        return next();
    }
  }else{
    res.redirect(config.wwhost+'/login');
    return false;
  }
  data.article_id = req.params.id; //获取文章id
  async.parallel({
    //获取用户信息（普通用户，顾问，参赞）
    userinfo:function(callback){
      wec.userinfo({
        "u_id":data.login_info.uid,
        "to_uid":data.login_info.uid
      },callback);
    },
    //文章详情
    article:function(callback){
       wec.article_info({
       "u_id":data.login_info.uid,
       "article_id":data.article_id,
      },callback);
    }
  },function(err, result){
    data.userinfo = returnData(result.userinfo,'userinfo');
    data.article = returnData(result.article,'article');
    var pagekey = null;
    if(data.userinfo.usertype ==2){
        if(data.login_info.adviser==1){
            pagekey = 'ADVISOR_CENTER_ARTICLEEDIT';
        }else {
            pagekey = 'ADVISOR_CENTER_ARTICLEEDIT';
        }
      // pagekey = 'ADVISOR_CENTER_ARTICLEEDIT';
    }else if(data.userinfo.usertype == 3){
      pagekey = 'CANZAN_CENTER_POSTARTICLE';
    }
    async.parallel({
        lunbo_list: function (callback) {
            cms.lunbo_list({
                "ad_page": pagekey,
                "ad_seat": "SEAT1",
                "cityid":area
            }, callback);
        },
        lunbo_list2: function (callback) {
            cms.lunbo_list({
                "ad_page": pagekey,
                "ad_seat": "SEAT2",
                "cityid":area
            }, callback);
        },
    },function (err, result) {
        data.xSlider = returnData(result.lunbo_list, 'lunbo_list');
        data.xSlider2 = returnData(result.lunbo_list2, 'lunbo_list2');
        data.tdk = {
            pagekey:pagekey,
            cityid: area,
        };
        data.esikey = esihelper.esikey();
        if(data.login_info.adviser == 1){
            res.render('edit_article',data);
        }else if(data.login_info.adviser == 2){
            res.render('edit_article_yimin',data);
        }
    })
  });  
}
//草稿箱发布接口
exports.draft_to_article = function(req,res,next){
  var data =req.body;
  wec.draft_to_article(data,function(err,result){
    if(err){
      res.send(err)
    }else{
      res.send(result)
    }
  })
}
//收藏加载更多接口
exports.favList = function (req,res,next) {
    log.debug('收藏加载更多接口');
    var data = req.query;
    wec.collection_list(data, function(err,result){
        if(err){
            res.send(err);
        }else{
            res.send(result);
        }
    });
}

//编辑案列页
exports.edit_case =function(req,res,next){
  log.debug('编辑案列页~~~thl')
  var data ={};
  var area = req.cookies.currentarea ? req.cookies.currentarea : 1;
  //node获取地址栏url
  var l = url.parse(req.url, true).query;
  console.log('url', l.h);
  if (l.h !== undefined) {
      data.url = l.h;
  } else {
      data.url = config.wwhost+req.url;
  }
  if(req.cookies.login_ss != undefined){
    data.login_info = JSON.parse(req.cookies.login_ss);
    if(data.login_info.usertype ==1){
        return next();
    }
  }else{
    res.redirect(config.wwhost+'/login');
    return false;
  }
  data.article_id = req.params.id; //获取文章id 
  async.parallel({
    //获取用户信息（普通用户，顾问，参赞）
    userinfo:function(callback){
      wec.userinfo({
        "u_id":data.login_info.uid,
        "to_uid":data.login_info.uid
      },callback);
    },
    //文章详情
    article:function(callback){
       wec.article({
       "u_id":data.login_info.uid,
       "article_id":data.article_id,
      },callback);  
    } 
  },function(err, result){
    data.userinfo =returnData(result.userinfo,'userinfo'); 
    data.article = returnData(result.article,'article');
    data.tdk = {
      pagekey: 'ADVISOR_CENTER_POSTCASE',
      cityid: area,
    };
    data.esikey = esihelper.esikey();
    res.render('edit_case',data);
  });  
}

//图片库接口
exports.attachment =function(req,res,next){
  log.debug('图片库~~~thl') 
  var data = req.query;
  cms.attachment(data,function(err,result){
    if(err){
      res.send(err);
    }else{
      res.send(result);
    }
  })   
}

// exports.upload = function(req,res,next){
//     log.debug('upload~~thl')
//     var data = '';
//     res.render('upload', data);
// }

//分享页面 
exports.share =function(req,res,next){
  log.debug('分享页面')
  var data = {};
  data.title = decodeURI(req.query.title);
  data.url =req.query.url;
  log.info(data)
  res.render('share',data);
}
//删除评论接口
exports.remove_comment = function(req,res,next){
  log.debug('删除评论接口')
  var data = req.body;
  wec.remove_comment(data,function(err,result){
    if(err){
      res.send(err);
    }else{
      res.send(result);
    }
  })
}
//删除回复接口
exports.remove_comment_ans = function(req,res,next){
  log.debug('删除回复接口')
  var data =req.body;
  wec.remove_comment_ans(data,function(err,result){
    if(err){
      res.send(err);
    }else{
      res.send(result);
    }
  })
}
//搜索院校库
exports.search_school = function(req,res,next){
  log.debug('搜索院校库')
  var data =req.query;
  wec.search_school(data,function(err,result){
    if(err){
        res.send(err);
    }else{
        res.send(result);
    }
  })
}
//举报接口
exports.userReport = function(req,res,next){
    log.debug('举报接口')
    var data =req.body;
    cms.userReport(data,function(err,result){
        if(err){
            res.send(err);
        }else{
            res.send(result);
        }
    })
}
// 浏览量
exports.article_count = function (req, res, next) {
    data = req.query;
    data.uuid = '';
    if (req.cookies.uuid) {
        data.uuid = req.cookies.uuid
    }
    var spider = ["Baiduspider","Googlebot","360Spider","Sosospider","sogou spider"];
    var deviceAgent = req.headers['user-agent'].toLowerCase();
    for (var item in spider) {
        if (deviceAgent.indexOf(spider[item].toLowerCase()) != -1) {
            log.info('爬虫正在访问网站');
            res.send('I am spider');
            return false;
        }
    }
    var resErr = [];
    if(!tokenfunc.checkToken(data.token)){ //token验证不通过
        res.send(comfunc.api_return('100001', 'token check fail', ''));
        return false;
    }
    cms.detail_count(data,function(err,result){
        if(err){
            resErr.push(err);
        }else{
            res.send(comfunc.api_return('0', 'success', result));
        }
    });
};
//token验证
exports.check_token = function (req, res, next) {
    data = {
        "iss":'jjl.cn'
    };
    res.send(comfunc.api_return('0', 'token check success', tokenfunc.createToken(data)));
};
// 在线评估
exports.assessment = function (req, res, next) {
    data = req.body;
    cms.assessment(data,function(err,result){
        if(err){
            res.send(err);
        }else{
            res.send(result);
        }
    })
};

//顾问主页-用户视角
exports.hot = function (req, res, next) {
  log.debug('this adviser_main-----------------------', req.params);
  var data = [];
  var area = req.cookies.currentarea ? req.cookies.currentarea : 1;
  data.uid = req.params[0];
  //node获取地址栏url
  var l = url.parse(req.url, true).query;
  console.log('url', l.h);
  if (l.h !== undefined) {
      data.url = l.h;
  } else {
      data.url = config.wwhost+req.url;
  }
  if (req.cookies.login_ss !== undefined) {
    data.login_info = JSON.parse(req.cookies.login_ss);
    log.debug('存储的用户信息' + req.cookies.login_ss);
  } else {
    data.login_info = {};
    data.login_info.uid = 0;
  }

  async.parallel({
    // lunbo_list: function (callback) {
    //   cms.lunbo_list({
    //     "ad_page": "ADVISOR_P_ARTICLE_HOT",
    //     "ad_seat": "SEAT1",
    //       "cityid":area
    //   }, callback);
    // },
    // lunbo_list2: function (callback) {
    //   cms.lunbo_list({
    //     "ad_page": "ADVISOR_P_ARTICLE_HOT",
    //     "ad_seat": "SEAT2",
    //      "cityid":area
    //   }, callback);
    // },
    //获取用户信息（普通用户，顾问，参赞）
    userinfo: function (callback) {
      wec.userinfo({
        "u_id": data.login_info.uid, "to_uid": data.uid
      }, callback)
    },
    guwen_list: function (callback) {
      wec.adviser_main({
        "per_page": 5, "order": encodeURI("views desc"), "uid": data.uid
      }, callback)
    },
    likelist: function (callback) { //猜你喜欢
      wec.likelist({
        "country_id": 1,
        "city_id": 1,
        "per_page": 5
      }, callback)
    },
    // xiangguan_guwen: function (callback) { //相关顾问
    //   wec.xiangguan_guwen({
    //     "country_id": 1,
    //     "city_id": 1,
    //     "per_page": 5
    //   }, callback)
    // },
  }, function (err, result) {
    // data.xSlider = returnData(result.lunbo_list, 'lunbo_list');
    // data.xSlider2 = returnData(result.lunbo_list2, 'lunbo_list2');
    data.userinfo = returnData(result.userinfo, 'userinfo');
    if (result.userinfo.code == '1210000006') {
      //顾问不存在的时候  跳到404
        return next();
    }
    data.guwen_list = returnData(result.guwen_list, 'guwen_list');
    data.likelist = returnData(result.likelist, 'likelist');
    data.country = data.userinfo.country || '1';
    data.hcountry = (data.userinfo.country || '1,').split(',')[0];
    var pagekey = '';
    pagekey  = get_page_key(data.userinfo.usertype, data.userinfo.adviser_type, 'ADVISOR_P_ARTICLE_HOT');
    // console.info("userinfo======================",data.userinfo )
    // console.info("pagekey======================",data.userinfo.usertype )
    // console.info("pagekey======================",data.userinfo.adviser_type )
    // console.info("pagekey======================",pagekey )
      async.parallel({
          lunbo_list: function (callback) {
              cms.lunbo_list({
                  "ad_page": pagekey,
                  "ad_seat": "SEAT1",
                  "cityid":area
              }, callback);
          },
          lunbo_list2: function (callback) {
              cms.lunbo_list({
                  "ad_page": pagekey,
                  "ad_seat": "SEAT2",
                  "cityid":area
              }, callback);
          },
      },function (err, result) {
          data.xSlider = returnData(result.lunbo_list, 'lunbo_list');
          data.xSlider2 = returnData(result.lunbo_list2, 'lunbo_list2');
          data.tdk = {
              pagekey: pagekey,
              cityid: area,
              realname: data.userinfo.realname,
          };
          data.esikey = esihelper.esikey();
          res.render('adviser_hot', data);
      })
  });
}
//协议
exports.agreement = function (req, res, next){
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
    data.url = config.wwhost+req.url;
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
    res.render('agreement', data);

  });
}
exports.yiminHome = function (req, res, next) {
    var area = req.cookies.currentarea ? req.cookies.currentarea : 1;
    if (req.params[0]) {
        var cityId = comfunc.getCityId(req.params[0]);
        if(cityId && cityId !== comfunc.INVALID_ID){
            area = cityId;
            res.cookie("currentarea", cityId, {domain: config.domain});
        }
    }
    var data = [];
    //node获取地址栏url
    var l = url.parse(req.url, true).query;
    console.log('url', config.yiminhost+req.url);
    if (l.h !== undefined) {
        data.url = l.h;
    } else {
        data.url = config.yiminhost+req.url;
    }
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
        lunbo_list:function(callback) {
            cms.lunbo_list({
                "ad_page": "YIMIN_HOME",
                "ad_seat": "SEAT1",
                "cityid":area
            }, callback);
        },
        lunbo_list2:function(callback) {
            cms.lunbo_list({
                "ad_page": "YIMIN_HOME",
                "ad_seat": "SEAT2",
                "cityid":area
            }, callback);
        },
        shouye:function(callback) {
            cms.yimin_shouye({
                "city_id": area,
            }, callback);
        },
    },function (err, result) {
        data.xSlider = returnData(result.lunbo_list,'lunbo_list');
        data.xSlider2 = returnData(result.lunbo_list2,'lunbo_list2');
        data.shouye = JSON.parse(result.shouye);
        data.tdk = {
            pagekey: 'YIMIN_HOME',
            cityid: area,
            nationid: ''
        };
        data.esikey = esihelper.esikey();
        // console.log(result.shouye);
        res.render('yimin_index', data);
    })
};
//活动表单
exports.act_form = function (req, res, next){
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
        data.url = config.wwhost+req.url;
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
            pagekey: 'FEEDBACK', //key
            cityid: area, //cityid
            nationid: country//nationi
        };
        res.render('act_form', data);

    });
}

//表单
exports.save_feedback = function(req,res,next){
    log.debug('表单提交');
    var data = req.body;
    cms.save_feedback(data,function(err,result){
        if(err){
          res.send(err);
        }else{
          res.send(result); 
        }
    })
};
//意见反馈
exports.userFeedback = function(req,res,next){
    log.debug('意见反馈');
    var data = req.body;
    cms.userFeedback(data,function(err,result){
        if(err){
          res.send(err);
        }else{
          res.send(result); 
        }
    })
};
//article_top
exports.article_top = function (req, res, next) {
    data = req.body;
    cms.article_top(data,function(err,result){
        if(err){
            res.send(err);
        }else{
            res.send(result);
        }
    })
};
//分公司首页ajax 加载段落
exports.liuxue_item_nunjucks = function (req, res, next) {
    data = req.query;
    console.log('分公司首页ajax 加载段落',data);
    var resData = [];
    cms.ajax_shouye({
        "city_id": data.city_id,
        "country_id":data.country_id,
        "edu_id":data.edu_id
    }, function (err, result) {
        resData.edu_item = result;
        res.render('widget/liuxue_item/liuxue_item_nunjucks', resData);
    })
}
//发送短信验证码
exports.sendsms = function (req, res, next) {
    log.debug('活动短信验证码');
    cms.sendSms({
        mobile: req.query.phone
    }, function (err,result) {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    })
}
//获取优惠券
exports.getCoupons = function (req, res, next) {
    log.debug('获取优惠券')
    var data = req.query;
    var source = req.query.source;
    if (source == undefined) {
        source = null;
    }
    //获取本地ip
    var ip = req.headers['x-forwarded-for'] || req.ip || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress;
    if(ip.split(',').length>0){
        ip = ip.split(',')[0]
    }
    request.get('http://api.map.baidu.com/location/ip?ip='+ip+'&ak=oTtUZr04m9vPgBZ1XOFzjmDpb7GCOhQw&coor=bd09ll',function (error, response, body){
        if(response.statusCode == 200){
            var b =JSON.parse(body);
            var city = '北京市';
            if(b.content){
                city = b.content.address_detail.city;
            }
            cms.getCoupons({
                user_name:encodeURI(encodeURI(data.user_name)),
                mobile: data.mobile,
                country_id: data.country_id,
                code: data.code,
                ip: ip,
                city: encodeURI(encodeURI(city)),
                source: source
            }, function (err,result) {
                if (err) {
                    res.send(err);
                } else {
                    res.send(result);
                    if (result.code == 0) {
                        cms.login_user({
                            phone: data.mobile,
                            code: data.code
                        }, function (err,result) {
                            if (err) {
                                log.info('注册失败');
                            } else {
                                log.info('注册成功');
                            }
                        })
                        cms.sendCoupons({
                            mobile:data.mobile,
                            source: 1, 
                            coupon: result.data
                        }, function (result) {
                            log.info('发送优惠券',result);
                        })
                    }
                }
            })
        }else{
            res.send(error);
        }
    });
}