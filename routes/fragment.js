/**
 * Created by Winson on 2017/12/1.
 */
var cms = require('../model/cms');
var wec = require('../model/wecenter');
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

//猜你喜欢
exports.searchlikelist = function(req,res,next){
  log.debug('search猜你喜欢')
  var data = {};
  var area = req.query.c || 1;
  async.parallel({
    guess_like: function (callback) {
      cms.channel_list({
          order: 'comments desc',
          city_id:area,
          "per_page": "10",
          "page": 1
      }, callback)
    }
  },function(err,result){
    data.likelist = returnData(result.guess_like,'guess_like');
    res.render('./fragment/guess_like', data);
  });
}

exports.guess_like = function(req,res,next){
  log.debug('猜你喜欢')
  var data = {};
  var country = req.query.n ? req.query.n.split(',')[0] : 1;
  var area = req.query.c || 1;
  async.parallel({
    guess_like: function (callback) {
      cms.channel_list({
        "country_id":country,
        "city_id":area,
        "per_page":5,
        "order":"views desc"
      }, callback)
    }
  },function(err,result){
    data.likelist = returnData(result.guess_like,'guess_like');
      // log.debug(data)

    res.render('./fragment/guess_like', data);
  });
}

//相关顾问
exports.xiangguanguwen = function(req,res,next){
  log.debug('相关顾问.......')
  var data = {};
  var country = req.query.n ? req.query.n.split(',')[0] : 1;
  var area = req.query.c || 1;
  async.parallel({
    xiangguan_guwen: function (callback) {
      wec.xiangguan_guwen({
        "country_id":country,
        "city_id":area,
        "per_page":5,
        "order":"comments desc"
      }, callback)
    }
  },function(err,result){
    data.xiangguan_guwen = returnData(result.xiangguan_guwen,'xiangguan_guwen');
    //console.log(data.xiangguan_guwen);
    res.render('./fragment/xiangguanguwen', data);
  });
}