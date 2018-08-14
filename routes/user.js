/**
 * Created by DXZ-Weijiu.Wang on 2017/10/12.
 */

var cms = require('../model/cms');
var wecent = require('../model/wecenter');
var log4js = require('../log/log');
var config = require('../config/config');

var log = log4js.getLogger();
//文章点赞
exports.article_vote = function (req, res, next) {
  log.debug('文章点赞~~');
  var data = {};
  data.login_nickname = '';
  if ( req.cookies.login_ss !== undefined) {
    var login_a = JSON.parse(req.cookies.login_ss);
    data.login_nickname = login_a;
  }else{
    res.send("cb("+JSON.stringify({"code":1})+")");
    return false;
  }
  var item_id = req.body.item_id;
  var item_type = req.body.item_type;
  log.info(data.login_nickname.uid)
  log.info(item_id)
  log.info(item_type)
  res.setHeader("Access-Control-Allow-Methods","GET,POST");
  wecent.article_vote({u_id: data.login_nickname.uid, item_id: item_id, item_type: item_type}, function (err,result) {
    if(err){
      res.send("cb("+JSON.stringify(err)+")");
    }else{
      res.send("cb("+JSON.stringify(result)+")");
    }
  });

}
//文章收藏
exports.favorite_article = function (req, res, next) {
  log.debug('文章收藏~~');
  var data = {};
  data.login_nickname = '';
  if ( req.cookies.login_ss !== undefined) {
    var login_a = JSON.parse(req.cookies.login_ss);
    data.login_nickname = login_a;
  }else{
    res.send("cb("+JSON.stringify({"code":1})+")");
    return false;
  }
  var article_id = req.body.article_id;
  log.info(data.login_nickname.uid);
  log.info(article_id);
  res.setHeader("Access-Control-Allow-Methods","GET,POST");
  wecent.favorite_article({u_id: data.login_nickname.uid, article_id: article_id}, function (err,result) {
    if(err){
      res.send("cb("+JSON.stringify(err)+")");
    }else{
      res.send("cb("+JSON.stringify(result)+")");
    }
  });
}

//修改用户信息
exports.user_info = function (req, res, next) {
  log.debug('修改用户信息~~');
  var nickname = req.body.nickname;
  var realname = req.body.realname;
  var birthday = req.body.birthday;
  var sex = req.body.sex;
  var introduce = req.body.introduce;
  var data = {};
  data.login_nickname = '';
  if ( req.cookies.login_ss !== undefined) {
    var login_a = JSON.parse(req.cookies.login_ss);
    data.login_nickname = login_a;
  }
  console.log(req.body);
  console.log('u_id',data.login_nickname.uid)
  res.setHeader("Access-Control-Allow-Methods","GET,POST");
  wecent.xiugai_info({u_id: data.login_nickname.uid, realname: realname, nickname: nickname, birthday: birthday, sex: sex, introduce: introduce}, function (err,result) {
    if(err){
      res.send("cb("+JSON.stringify(err)+")");
    }else{
      console.log('result',result);

      if(result.code === 0){
        data.login_nickname.nickname = nickname
        if (config.version == 'development') {//开发环境
          res.cookie("login_ss", JSON.stringify(data.login_nickname), {domain: config.domain, expires: new Date(Date.now() + 90000000)});//保存cookie
        } else {
          res.cookie("login_ss", JSON.stringify(data.login_nickname), {domain: config.domain, expires: new Date(Date.now() + 90000000)});
        }
      }

      
      res.send("cb("+JSON.stringify(result)+")");
    }
  });
}

//修改个人资料
exports.user_ziliao = function (req, res, next) {
  log.debug('修改个人资料~~');
  var introduce = req.body.introduce;
  var data = {};
  data.login_nickname = '';
  if ( req.cookies.login_ss !== undefined) {
    var login_a = JSON.parse(req.cookies.login_ss);
    data.login_nickname = login_a;
  }
  console.log(req.body);
  res.setHeader("Access-Control-Allow-Methods","GET,POST");
  wecent.xiugai_info({u_id: data.login_nickname.uid, introduce: introduce}, function (err,result) {
    if(err){
      res.send("cb("+JSON.stringify(err)+")");
    }else{
      res.send("cb("+JSON.stringify(result)+")");
    }
  });
}

//修改密码
exports.user_password = function (req, res, next) {
  log.debug('修改密码~~');
  var oldpass = req.body.oldpass;
  var newpass = req.body.newpass;
  var data = {};
  data.login_nickname = '';
  if ( req.cookies.login_ss !== undefined) {
    var login_a = JSON.parse(req.cookies.login_ss);
    data.login_nickname = login_a;
  }
  console.log(req.body);
  res.setHeader("Access-Control-Allow-Methods","GET,POST");
  wecent.xiugai_password({uid: data.login_nickname.uid, oldpass: oldpass, newpass: newpass}, function (err,result) {
    if(err){
      console.log('err------', err);
      res.send("cb("+JSON.stringify(err)+")");
    }else{
      console.log('result------', result)
      res.send("cb("+JSON.stringify(result)+")");
    }
  });
}

//修改头像
exports.modify_portrait = function (req, res, next) {
  log.debug('修改头像');
  var data = {};
  console.log('uid', req.query.uid);
  console.log('ttttt', req.body);

  /*wecent.modify_portrait({uid: req.query.uid}, function (err,result) {
    if(err){
      console.log('err------', err);
      res.send("cb("+JSON.stringify(err)+")");
    }else{
      console.log('result------', result)
      res.send("cb("+JSON.stringify(result)+")");
    }
  });*/
}

//登出
exports.login_out = function (req, res, next) {
  console.log('login_out');
  //console.log('req', req);
  res.clearCookie("login_ss", {domain: config.domain});
  //res.cookie(prop, 'login_ss', {expires: new Date(0)});
  console.log('login_out1');
  res.send('ok')
  //res.redirect(req.query.h);
};

//登录
exports.login_s = function (req, res, next) {
  log.debug('this router login_s~~');
  var username = req.body.username;
  var password = req.body.password;

  //log.debug(JSON.stringify(req.body));
  log.debug(req.body);
  //res.render('login', '')
  var data = [];
  var async = require('async');
  //var cookie = require('cookie-parser');
  //var area = req.cookies.currentarea ? req.cookies.currentarea : 1;
  //var qianzhengzhinan_currentPage=req.query.page || 1;
  //var qianzhengzhinan_pagesizee=req.query.pagesize || 12;
  //var country = req.query.country || 1;
  async.parallel({
    //签证指南
    login_ss: function (callback) {
      cms.login_ss(req.body, callback);
    }
  }, function (err, result) {

    data.login_ss = result.login_ss;
    log.debug('result.login_ss----------', result.login_ss);

    //res.render('login', data)
    if (result.login_ss.code === 0) {
      log.debug('ok', result.login_ss.code);
      if (config.version == 'development' && result.login_ss.code === 0) {//开发环境
        res.cookie("login_ss", JSON.stringify(result.login_ss.data), {domain: config.domain});//保存cookie
      } else {
        res.cookie("login_ss", JSON.stringify(result.login_ss.data), {domain: config.domain});
      }
      res.send(result.login_ss);
      //log.debug('config', config.wwhost);
      //res.redirect(301,config.wwhost);
      //res.end()
    }else {
      res.send(result.login_ss);
    }
  });
}