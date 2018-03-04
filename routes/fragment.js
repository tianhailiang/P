/**
 * Created by Winson on 2017/12/1.
 */
var cms = require('../model/cms');
var log4js = require('../log/log');
var log = log4js.getLogger();
var async = require('async');

function  returnData(obj,urlName){
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

//最新资讯
exports.zuixinzixun = function (req, res, next) {
  log.debug('最新资讯');
  var data = [];
  var pos = req.query.pos || 'nation';
  var area = req.query.c || 1;
  var country = req.query.n || 0;
  async.parallel({
    zuixinzixun: function (callback) {
      cms.zuixinzixun({
        "position": pos, "catid": 45,"cityid": area, "country": country,"perpage": 10
      }, callback);
    }
  }, function (err, result) {
    data.zuixinzixun = returnData(result.zuixinzixun,'zuixinzixun');
    res.render('./fragment/zuixinzixun', data);
  });
};
//明星顾问
exports.mingxingguwen = function (req, res, next) {
  log.debug('明星顾问');
  var data = [];
  var pos = req.query.pos || 'nation';
  var country = req.query.n || 0;
  var area = req.query.c || 1;
  async.parallel({
    mingxingguwen: function (callback) {
      cms.mingxingguwen({
        "position": pos, "catid": 101,"country":country,"cityid": area, "perpage": 4
      }, callback);
    }
  }, function (err, result) {
    data.mingxingguwen = returnData(result.mingxingguwen,'mingxingguwen');
    res.render('./fragment/mingxingguwen', data);
  });
};
//活动预告
exports.huodongyugao = function (req, res, next) {
  log.debug('活动预告');
  var data = [];
  var pos = req.query.pos || 'nation';
  var area = req.query.c || 1;
  var country = req.query.n || 0;
  async.parallel({
    huodongyugao: function (callback) {
      cms.huodongyugao({
        "position": pos,
        "catid": 64,
        "cityid": area,
        "country": country,
        "perpage": 4
      }, callback);
    }
  }, function (err, result) {
    data.huodongyugao = returnData(result.huodongyugao,'huodongyugao');
    //set magAge to 1 min,default
    res.set('maxAge',1*60*1000);
    res.render('./fragment/huodongyugao', data);
  });
};
//成功案例
exports.chenggonganli = function (req, res, next) {
  log.debug('成功案例');
  var data = [];
  var pos = req.query.pos || 'nation';
  var area = req.query.c || 1;
  var country = req.query.n || 0;
  async.parallel({
    chenggonganli: function (callback) {
      cms.chenggonganli({
        "position": pos,
        "catid": 17,
        "cityid": area,
        "country": country,
        "perpage": 7
      }, callback);
    }
  }, function (err, result) {
    data.chenggonganli = returnData(result.chenggonganli,'chenggonganli');
    res.render('./fragment/chenggonganli', data);
  });
};
//专家解读
exports.zhuanjiajiedu = function (req, res, next) {
  log.debug('专家解读');
  var data = [];
  var pos = req.query.pos || 'nation';
  var area = req.query.c || 1;
  var country = req.query.n || 0;
  async.parallel({
    zhuanjiajiedu: function (callback) {
      cms.zhuanjiajiedu({
        "position": pos,
        "catid": 16,
        "cityid": area,
        "country": country,
        "perpage": 12
      }, callback);
    }
  }, function (err, result) {
    data.zhuanjiajiedu = returnData(result.zhuanjiajiedu,'zhuanjiajiedu');
    res.render('./fragment/zhuanjiajiedu', data);
  });
};
//热门留学方案
exports.hot_liuxuefangan_list =function(req,res,next){
  log.debug('热门留学方案')
  var data = {};
  var area = req.cookies.currentarea ? req.cookies.currentarea : 1;
  cms.hot_liuxuefangan_list({
    "position": "blog", 
    "catid": "47", 
    "cityid": area, 
    "perpage": 15
  },function(err,result){
    data.hotLXFA  = split_array(returnData(result,'hot_liuxuefangan_list'), 7);
    res.render('./fragment/hot_liuxuefangan_list', data);
  });
}
//留学方案频道页近期精彩活动
exports.productrank_activity = function (req, res, next) {
  //产品频道
  log.debug("产品频道-热门活动")
  var data = [];
  var area = req.query.c || 1;
  async.parallel({
    new_jingcaihuodong_list: function (callback) {
      cms.new_jingcaihuodong_list({"cityid": area, "perpage": "12"}, callback);
    }
  }, function (err, result) {

    data.new_jingcaihuodong_list = returnData(result.new_jingcaihuodong_list,'new_jingcaihuodong_list');

    res.render('./fragment/productrank_activity', data);

  });


}
//社区明星顾问
exports.community_guwen = function(req,res,next){
  log.debug('社区明星顾问')
  var data = {};
  var area = req.cookies.currentarea ? req.cookies.currentarea : 1;
  var country = req.query.n || 0;
  cms.mingxingguwen({
    "position": "blog",
    "catid": 101,
    "cityid": area,
    "perpage": 20,
    "country": country
  }, function(err,result){
    data.sliderArr = returnData(result,'mingxingguwen');
    res.render('./fragment/community_guwen', data);
  });
}
//作者精选
exports.author_selection = function(req,res,next){
  log.debug('作者精选')
  var data ={};
  var uid = req.query.uid;
  cms.channel_list({
    "uid":uid,
    "per_page":6,
    "order":"views desc",
    "type":"2"
  },function(err,result){
    data.channel_list =returnData(result,'channel_list');
    res.render('./fragment/author_selection', data);
  });
}
//猜你喜欢
exports.guess_like = function(req,res,next){
  log.debug('猜你喜欢')
  var data = {};
  var country = req.query.n || 1;
  var c = req.query.c || 1;
  cms.channel_list({
    "per_page":12,
    "order":"views",
    "country_id":country,
    "city_id":c,
    "type":"2"
  },function(err,result){
    data.guess_like = returnData(result,'guess_like');
    res.render('./fragment/guess_like', data);
  });
}
// 移民活动
exports.yimin_huodongyugao = function (req, res, next) {
    log.debug('移民活动');
    var data = [];
    async.parallel({
        huodongyugao: function (callback) {
            cms.yimin_activity_list({
                "per_page": 5,
                "order": 'hits'
            }, callback);
        }
    }, function (err, result) {
        data.huodongyugao = returnData(result.huodongyugao,'huodongyugao');
        res.set('maxAge',1*60*1000);
        res.render('./fragment/yimin_huodongyugao', data);
    });
};
// 移民顾问
exports.yimin_mingxingguwen = function (req, res, next) {
    log.debug('移民顾问');
    var data = [];
    async.parallel({
        mingxingguwen: function (callback) {
            cms.yiminguwen({
                "order":'hits',
                "per_page":4
            }, callback);
        },
    }, function (err, result) {
        data.mingxingguwen = returnData(result.mingxingguwen,'mingxingguwen');
        res.set('maxAge',1*60*1000);
        res.render('./fragment/yimin_mingxingguwen', data);
    });
};
// 移民好文精选
exports.yimin_haowenjingxuan = function (req, res, next) {
    log.debug('移民好文精选');
    var data = [];
    async.parallel({
        haowenjingxuan: function (callback) {
            //移民好文精选
            cms.yiminhaowenjingxuan({
                "per_page":7
            },callback);
        },
    }, function (err, result) {
        data.haowenjingxuan= returnData(result.haowenjingxuan,'haowenjingxuan');
        res.set('maxAge',1*60*1000);
        res.render('./fragment/yimin_haowenjingxuan', data);
    });
};
// 移民专家解读
exports.yimin_zhuanjiajiedu = function (req, res, next) {
    log.debug('移民专家解读');
    var data = [];
    var country = req.query.n || 0;
    async.parallel({
        yiminzhuanjiajiedu: function (callback) {
            //专家解读
            cms.yiminzhuanjiajiedu({
                "country": country, "per_page": 12
            }, callback);
        },
    }, function (err, result) {
        data.yiminzhuanjiajiedu= returnData(result.yiminzhuanjiajiedu,'yiminzhuanjiajiedu');
        data.zhuanjiajiedu=data.yiminzhuanjiajiedu.list;
        res.set('maxAge',1*60*1000);
        res.render('./fragment/yimin_zhuanjiajiedu', data);
    });
};
//留学方案
exports.fangan_liuxue = function (req, res, next) {
  log.debug('留学方案');
  var data = [];
  async.parallel({
    country_liuxuefangan_list0:function(callback){
      //留学方案
      cms.country_liuxuefangan_list({
        "position":"home",
        "catid":"47",
        "country":0,
        "perpage":14
      },callback);
    },
    country_liuxuefangan_list1:function(callback){
      cms.country_liuxuefangan_list({
        "position":"home",
        "catid":"47",
        "country":1,
        "perpage":14
      },callback);
    },
    country_liuxuefangan_list2:function(callback){
      cms.country_liuxuefangan_list({
        "position":"home",
        "catid":"47",
        "country":2,
        "perpage":14
      },callback);
    },
    country_liuxuefangan_list3:function(callback){
      cms.country_liuxuefangan_list({
        "position":"home",
        "catid":"47",
        "country":3,
        "perpage":14
      },callback);
    },
    country_liuxuefangan_list4:function(callback){
      cms.country_liuxuefangan_list({
        "position":"home",
        "catid":"47",
        "country":4,
        "perpage":14
      },callback);
    },
    country_liuxuefangan_list5:function(callback){
      cms.country_liuxuefangan_list({
        "position":"home",
        "catid":"47",
        "country":5,
        "perpage":14
      },callback);
    },
    country_liuxuefangan_list6:function(callback){
      cms.country_liuxuefangan_list({
        "position":"home",
        "catid":"47",
        "country":201,
        "perpage":14
      },callback);
    },
    country_liuxuefangan_list7:function(callback){
      cms.country_liuxuefangan_list({
        "position":"home",
        "catid":"47",
        "country":202,
        "perpage":14
      },callback);
    },
  }, function (err, result) {
    data.country_liuxuefangan_list0 =returnData(result.country_liuxuefangan_list0,'country_liuxuefangan_list0');
    data.country_liuxuefangan_list1 =returnData(result.country_liuxuefangan_list1,'country_liuxuefangan_list1');
    data.country_liuxuefangan_list2 =returnData(result.country_liuxuefangan_list2,'country_liuxuefangan_list2');
    data.country_liuxuefangan_list3 =returnData(result.country_liuxuefangan_list3,'country_liuxuefangan_list3');
    data.country_liuxuefangan_list4 =returnData(result.country_liuxuefangan_list4,'country_liuxuefangan_list4');
    data.country_liuxuefangan_list5 =returnData(result.country_liuxuefangan_list5,'country_liuxuefangan_list5');
    data.country_liuxuefangan_list6 =returnData(result.country_liuxuefangan_list6,'country_liuxuefangan_list6');
    data.country_liuxuefangan_list7 =returnData(result.country_liuxuefangan_list7,'country_liuxuefangan_list7');
    res.set('maxAge',1*60*10000);
    res.render('./fragment/fangan_liuxue', data);
  });
}