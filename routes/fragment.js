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

//搜索文章猜你喜欢
exports.searchlikelist = function(req,res,next){
  log.debug('search猜你喜欢')
  var data = {};
  var area = req.query.c || 1;
  var country = req.query.n ? req.query.n:0;
  async.parallel({
    guess_like: function (callback) {
      cms.channel_list({
         "country_id":country,
          order: 'views desc',
          city_id:area,
          "per_page": "10",
          "page": 1,
          "is_immi":1
      }, callback)
    }
  },function(err,result){
    data.likelist = returnData(result.guess_like,'guess_like');
    res.render('./fragment/guess_like', data);
  });
}

//移民搜索文章猜你喜欢
exports.yimin_searchguesslike = function(req,res,next){
  log.debug('移民search猜你喜欢')
  var data = {};
  var area = req.query.c || 1;
  async.parallel({
    guess_like: function (callback) {
      cms.channel_list({
          order: 'comments desc',
          city_id:area,
          "per_page": "10",
          "page": 1,
          "is_immi":2
      }, callback)
    }
  },function(err,result){
    data.likelist = returnData(result.guess_like,'guess_like');
    // console.log(data.likelist)
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
        "is_immi":1,
        "per_page":5,
        "order":"views desc"
      }, callback)
    }
  },function(err,result){
    data.likelist = returnData(result.guess_like,'guess_like');
    // console.log(data.likelist)
    res.render('./fragment/guess_like', data);
  });
}

//移民猜你喜欢
exports.yimin_guess_like = function(req,res,next){
  log.debug('移民猜你喜欢')
  var data = {};
  var country = req.query.n ? req.query.n.split(',')[0] : 1;
  var area = req.query.c || 1;
  async.parallel({
    guess_like: function (callback) {
      cms.channel_list({
        "country_id":country,
        "city_id":1,
        "is_immi":2,
        "per_page":5,
        "order":"views desc"
      }, callback)
    }
  },function(err,result){
    data.likelist = returnData(result.guess_like,'guess_like');
      // log.debug(data)
    // console.log('猜你喜欢=====' + data.likelist)
    res.render('./fragment/guess_like', data);
  });
}

//相关顾问
exports.xiangguanguwen = function(req,res,next){
  log.debug('相关顾问.......')
  var data = {};
  var country = req.query.isArticle ? req.query.n : req.query.n.split(',').join('_');
  var isArticle = req.query.isArticle ? req.query.isArticle : 0;
  var uid = req.query.uid;
  var area = req.query.c || 1;

  async.parallel({
    xiangguan_guwen: function (callback) {
      wec.xiangguan_guwen({
        "country_id":country,
        "city_id":area,
        "per_page":5,
        "isArticle":isArticle,
        "uid": uid
      }, callback)
    }
  },function(err,result){
    data.xiangguan_guwen = returnData(result.xiangguan_guwen,'xiangguan_guwen');
    res.render('./fragment/xiangguanguwen', data);
  });
}
//移民相关顾问
exports.yimin_xiangguanguwen = function(req,res,next){
  log.debug('移民相关顾问.......')
  var data = {};
  // var country = req.query.n ? req.query.n.split(',')[0] : 1;
  var country = req.query.isArticle ? req.query.n : req.query.n.split(',').join('_');
  var isArticle = req.query.isArticle ? req.query.isArticle : 0;
  var area = req.query.c || 1;
  var uid = req.query.uid;
  var isIm = req.query.isIm ? req.query.isIm : 0;
  async.parallel({
    xiangguanguwen: function (callback) {
      wec.yimin_xiangguanguwen({
        "country_id":country,
        "city_id":1,
        "per_page":5,
        "uid":uid,
        "isArticle":isArticle,
        "isIm":isIm
      }, callback)
    }
  },function(err,result){
    data.xiangguan_guwen = returnData(result.xiangguanguwen,'xiangguanguwen');
    // console.log(data.xiangguan_guwen)
    res.render('./fragment/xiangguanguwen', data);
  });
}
//相关推荐
exports.article_xiangguantuijian = function(req,res,next){
  log.debug('相关推荐.......',req.query)
  var data = {};
  var country = req.query.n ? req.query.n.split(',')[0] : 1;
  var area = req.query.c || 1;
  var is_news = req.query.is_news || '';
  var tag_list = encodeURI(req.query.tag_list) || '';
  var now_articleId = req.query.article_id;
  async.parallel({
    relation_recommend: function (callback) {
      wec.relation_recommend({
        "country_id":country,
        "city_id":area,
        //"is_immi":2,
        "is_news": is_news,
        "tag_list": tag_list,
        "per_page":5
      }, callback)
    }
  },function(err,result){
    data.relation_recommend = returnData(result.relation_recommend,'relation_recommend');
    res.render('./fragment/article_xiangguantuijian', data);
  });
}
//友情链接
exports.linkList = function (req, res, next) {
    var data = {}
    var area = req.query.c || 1;
    // console.log('友情链接',area);
    // var resData = [];
    async.parallel({
        link:function(callback){
            cms.link({
                "city_id": area
            },callback);
        }
    },function(err, result){
        data.linkList = [];
        for (key in result.link) {
            data.linkList.push(JSON.parse(result.link[key]));
        }
        // console.log("友情链接--------------",data.linkList)
        res.render('./fragment/linkList', data);
    })
}