/**
 * Created by DXZ-Weijiu.Wang on 2017/9/30.
 */

var cms = require('../model/cms');
var url = require('url');
var config = require('../config/config');
var log4js = require('../log/log');
var log = log4js.getLogger();
var wec = require('../model/wecenter');
var svgCaptcha = require('svg-captcha');

exports.login = function (req, res, next) {
  log.debug('this router login~~');
  var area = req.cookies.currentarea ? req.cookies.currentarea : 1;
  var data = [];
  data.login_nickname = '';
  //node获取地址栏url
  var l = url.parse(req.url, true).query;
  console.log('url', l.h);
  if (/\/zt\//.test(l.h)) {
    if (l.h.endswith('shtml')) {
      l.h += '.shtml'
    } else {
      l.h += '.html'
    }
  }
  if (l.h !== undefined) {
    data.url = l.h;
  } else {
    data.url = config.wwhost;
  }
  data.tdk = {
    pagekey: 'LOGIN', //key
    cityid: area, //cityid
    nationid: ''//nationi
  };

  //var captcha = svgCaptcha.create();
  //req.session.captcha = captcha.text;
  //
  //res.type('svg');
  //res.status(200).send(captcha.data);
  res.render('login/login', data)
};
//普通用户登录页面
exports.loginUser = function (req, res, next) {
  log.debug('this router loginUser~~');
  var area = req.cookies.currentarea ? req.cookies.currentarea : 1;
  var data = [];
  data.login_nickname = '';
  //node获取地址栏url
  console.log('req.query',req.query)
  // var l = url.parse(req.url, true).query;
  var l = req.query
  console.log('url', l.h);
  if (/\/zt\//.test(l.h)) {
    if (l.h.endswith('shtml')) {
      l.h += '.shtml'
    } else {
      l.h += '.html'
    }
  }
  if (l.h !== undefined) {
    data.url = l.h;
  } else {
    data.url = config.wwhost;
  }
  // ad广告统计跳转
  console.log('data.url',l.href)
  if (l.href !== undefined) {
    data.url += '&href=' + l.href;
    console.log('data.url--------',data.url)
  }
  data.tdk = {
    pagekey: 'LOGIN', //key
    cityid: area, //cityid
    nationid: ''//nationi
  };

  res.render('login/loginUser', data)
};

//普通用户验证码登录
exports.login_user = function (req, res, next) {
  log.debug('this router login_s~~');
  var username = req.body.phone;
  var password = req.body.code;

  log.debug(req.body);
  var data = [];
  var ip = req.headers['x-forwarded-for'] || req.ip || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress;
    if(ip.split(',').length>0){
        ip = ip.split(',')[0]
    }
    console.log('ip',ip);
  var async = require('async');
  // res.setHeader("Access-Control-Allow-Methods","GET,POST");
  async.parallel({
    //签证指南
    login_user: function (callback) {
      cms.login_user({phone:username, code: password, lastloginip: ip}, callback);
    }
  }, function (err, result) {

    data.login_user = result.login_user;
    
    log.debug('result.login_user----------', result.login_user);

    //res.render('login', data)
    if (result.login_user.code === 0) {
      if (data.login_user.data) {
        data.login_user.data.usertype = 1;
      }
      async.parallel({
        userinfo:function(callback){
          wec.userinfo({
              "u_id":result.login_user.data.uid,
              "to_uid":result.login_user.data.uid
          },callback);
        }
      },function (err, result){
        log.debug('result.userinfo', result.userinfo.data);
        data.login_user.data.status = result.userinfo.data.status;
        data.login_user.data.version = result.userinfo.data.version;
        log.debug('result.login_user----------', data.login_user.data);
      
        if (config.version == 'development') {//开发环境
          log.debug('result.login_user----------development');
          res.cookie("login_ss", JSON.stringify(data.login_user.data), {domain: config.domain, expires: new Date(Date.now() + 90000000)});//保存cookie
        } else {
          log.debug('result.login_user----------production');
          res.cookie("login_ss", JSON.stringify(data.login_user.data), {domain: config.domain, expires: new Date(Date.now() + 90000000)});
        }
      
        res.send(data.login_user);
      })

      
      
      
      //log.debug('config', config.wwhost);
      //res.redirect(301,config.wwhost);
      //res.end()
    }else {
      res.send(result.login_user);
    }
  });
}

//普通用户密码登录
exports.user_login = function (req, res, next) {
  log.debug('this router user_login~~');
  // var username = req.body.phone;
  // var password = req.body.code;

  log.debug(req.body);
  var data = [];
  // var ip = req.headers['x-forwarded-for'] || req.ip || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress;
  //   if(ip.split(',').length>0){
  //       ip = ip.split(',')[0]
  //   }
  //   console.log('ip',ip);
  var async = require('async');
  // res.setHeader("Access-Control-Allow-Methods","GET,POST");
  async.parallel({
    //签证指南
    user_login: function (callback) {
      cms.user_login(req.body, callback);
    }
  }, function (err, result) {

    data.user_login = result.user_login;
    console.log('data.login_user',result.user_login.code)
    
    //res.render('login', data)
    if (result.user_login.code == 0) {
      if (data.user_login.data != undefined) {
        data.user_login.data.usertype = 1;
      }
      async.parallel({
        userinfo:function(callback){
          wec.userinfo({
              "u_id":result.user_login.data.uid,
              "to_uid":result.user_login.data.uid
          },callback);
        }
      },function (err, result){
        log.debug('result.userinfo', result.userinfo.data);
        data.user_login.data.status = result.userinfo.data.status;
        data.user_login.data.version = result.userinfo.data.version;
        log.debug('result.user_login----------', data.user_login.data);
      
        if (config.version == 'development') {//开发环境
          log.debug('result.user_login----------development');
          res.cookie("login_ss", JSON.stringify(data.user_login.data), {domain: config.domain, expires: new Date(Date.now() + 90000000)});//保存cookie
        } else {
          log.debug('result.user_login----------production');
          res.cookie("login_ss", JSON.stringify(data.user_login.data), {domain: config.domain, expires: new Date(Date.now() + 90000000)});
        }
      
        res.send(data.user_login);
      })
      
      //log.debug('config', config.wwhost);
      //res.redirect(301,config.wwhost);
      //res.end()
    }else {
      res.send(result.user_login);
    }
  });
}

//登录
exports.login_s = function (req, res, next) {
  log.debug('this router login_s~~');
  var username = req.body.username;
  var password = req.body.password;
  var adviser = req.body.adviser_type;

  //log.debug(JSON.stringify(req.body));
  log.debug(req.body);
  log.debug('adviser', adviser);
  //res.render('login', '')
  var data = [];
  var ip = req.headers['x-forwarded-for'] || req.ip || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress;
    if(ip.split(',').length>0){
        ip = ip.split(',')[0]
    }
    console.log('ip',ip);
  var async = require('async');
  async.parallel({
    //签证指南
    login_ss: function (callback) {
      cms.login_ss({username:username, password:password,adviser_type:adviser,lastloginip:ip }, callback);
    }
  }, function (err, result) {
    
    data.login_ss = result.login_ss;
    log.debug('result.login_ss----------', data.login_ss);

    //res.render('login', data)
    if (result.login_ss.code === 0) {
      if (data.login_ss.data != undefined) {
        console.log('datatatta---------------')
        data.login_ss.data.usertype = 2;
        data.login_ss.data.adviser = adviser;
      }
      async.parallel({
        userinfo:function(callback){
          wec.userinfo({
              "u_id":result.login_ss.data.uid,
              "to_uid":result.login_ss.data.uid
          },callback);
      }
      },function (err, result){
        log.debug('result.userinfo', result.userinfo);
        data.login_ss.data.status = result.userinfo.data.status;
        data.login_ss.data.version = result.userinfo.data.version;
        if (config.version == 'development') {//开发环境
          res.cookie("login_ss", JSON.stringify(data.login_ss.data), {domain: config.domain, expires: new Date(Date.now() + 90000000)});//保存cookie
        } else {
          res.cookie("login_ss", JSON.stringify(data.login_ss.data), {domain: config.domain, expires: new Date(Date.now() + 90000000)});
        }
        res.send(data.login_ss);
      })
      
      //log.debug('config', config.wwhost);
      //res.redirect(301,config.wwhost);
      //res.end()
    }else {
      res.send(result.login_ss);
    }
  });
}

//绑定手机号
exports.bind_phone = function (req, res, next) {
  log.debug('this router login_s~~');
  log.debug(req.body);
  //res.render('login', '')
  var data = [];
  var async = require('async');

  async.parallel({
    //绑定
    bind_phone: function (callback) {
      cms.bind_phone(req.body, callback);
    }
  }, function (err, result) {

    data.bind_phone = result.bind_phone;
    log.debug('result.login_ss----------', result.bind_phone);
    if (config.version == 'development' && result.bind_phone.code == 0) {//开发环境
      res.cookie("login_ss", JSON.stringify(result.bind_phone.data), {domain: config.domain, expires: new Date(Date.now() + 90000000)});//保存cookie
    } else {
      res.cookie("login_ss", JSON.stringify(result.bind_phone.data), {domain: config.domain, expires: new Date(Date.now() + 90000000)});
    }
    //res.render('login', data)

    res.send(result.bind_phone);
      //log.debug('config', config.wwhost);
      //res.redirect(301,config.wwhost);
      //res.end()
  });
}

exports.register = function (req, res, next) {
  log.debug('this router register~~');
  var area = req.cookies.currentarea ? req.cookies.currentarea : 1;
  var data = [];
  data.login_nickname = '';
  var l = req.query
  console.log('url', l.h);
  if (l.h !== undefined) {
    data.url = l.h;
  } else {
    data.url = config.wwhost;
  }
  data.tdk = {
    pagekey: 'REGISTER', //key
    cityid: area, //cityid
    nationid: ''//nationi
  };
  res.render('login/register', data)
}

exports.binding = function (req, res, next) {
  log.debug('this router binding~~');
  var area = req.cookies.currentarea ? req.cookies.currentarea : 1;
  var data = [];
  data.login_nickname = '';
  console.log("oauth_login", req.cookies.oauth_login);
  data.oauth_data = JSON.parse(req.cookies.oauth_login);
  data.tdk = {
    pagekey: 'BINDING', //key
    cityid: area, //cityid
    nationid: ''//nationi
  };
  res.render('login/binding', data)
}

//注册
exports.register_s = function (req, res, next) {
  log.debug('this router register_s~~');
  var username = req.body.username;
  var password = req.body.password;
  var code = req.body.code;

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
    register_ss: function (callback) {
      cms.register_ss(req.body, callback);
    }
  }, function (err, result) {

    data.register_ss = result.register_ss;
    log.debug('result.login_ss----------', result.register_ss);

    if (result.register_ss.code == 0) {
      if (data.register_ss.data != undefined) {
        data.register_ss.data.usertype = 1;
      }
      async.parallel({
        userinfo:function(callback){
          wec.userinfo({
              "u_id":result.register_ss.data.uid,
              "to_uid":result.register_ss.data.uid
          },callback);
        }
      },function (err, result){
        log.debug('result.userinfo', result.userinfo.data);
        data.register_ss.data.status = result.userinfo.data.status;
        data.register_ss.data.version = result.userinfo.data.version;
        log.debug('result.login_user----------', data.register_ss.data);
      
        if (config.version == 'development') {//开发环境
          log.debug('result.login_user----------development');
          res.cookie("login_ss", JSON.stringify(data.register_ss.data), {domain: config.domain, expires: new Date(Date.now() + 90000000)});//保存cookie
        } else {
          log.debug('result.login_user----------production');
          res.cookie("login_ss", JSON.stringify(data.register_ss.data), {domain: config.domain, expires: new Date(Date.now() + 90000000)});
        }
      
        res.send(data.register_ss);
      })
      
      //log.debug('config', config.wwhost);
      //res.redirect(301,config.wwhost);
      //res.end()
    }else {
      res.send(result.register_ss);
    }

      // res.send(result.register_ss)

  });

}

//发送验证码
exports.sendcode_s = function (req, res, next) {
  log.debug('this router sendcode_s~~');
  var data = [];
  var async = require('async');
  var phone = req.body.phone;
  log.debug('phone', phone);
  var page_param_code = req.body.param_code;
  var local_param_code = req.session.param_code;
  if (page_param_code == local_param_code) {
    // res.send('0');
    //res.send(JSON.parse({"code":0}));
    console.log('0--------------');
    async.parallel({
      //验证码
      sendcode_ss: function (callback) {
        cms.sendcode_ss({m: 'sendcode',phone: phone}, callback);
      }
    }, function (err, result) {
  
      data.sendcode_ss = result.sendcode_ss;
      log.debug('result.login_ss----------', result.sendcode_ss.code);
      if (result.sendcode_ss.code == 0) {
        log.debug('ok', result.sendcode_ss);
        // res.send("cb("+JSON.stringify(result.sendcode_ss)+")");
        res.send(result.sendcode_ss)

        //清除session
        req.session.destroy(function(err) {
          log.debug('session destroy err',err);
        })
      } else {
        res.send(result.sendcode_ss)
      }

    });
  }
  else {
    //res.send(JSON.parse({"code":1}));
    console.log('1---------------');
    res.send('1');
  }
  //log.debug(JSON.stringify(req.body));
  //res.render('login', '')
  
  // res.setHeader("Access-Control-Allow-Methods","GET,POST");
  
  
}

//发送验证码-优惠券
exports.sendcode_s_coupon = function (req, res, next) {
  log.debug('this router sendcode_s~~');
  var data = [];
  var async = require('async');
  var phone = req.body.phone;
  log.debug('phone', phone);
  var page_param_code = req.body.param_code;
    // res.send('0');
    //res.send(JSON.parse({"code":0}));
    console.log('0--------------');
    async.parallel({
      //验证码
      sendcode_ss: function (callback) {
        cms.sendcode_ss({m: 'sendcode',phone: phone}, callback);
      }
    }, function (err, result) {
  
      data.sendcode_ss = result.sendcode_ss;
      log.debug('result.login_ss----------', result.sendcode_ss.code);
      if (result.sendcode_ss.code == 0) {
        log.debug('ok', result.sendcode_ss);
        // res.send("cb("+JSON.stringify(result.sendcode_ss)+")");
        res.send(result.sendcode_ss)

        //清除session
        req.session.destroy(function(err) {
          log.debug('session destroy err',err);
        })
      } else {
        res.send(result.sendcode_ss)
      }

    });
  //log.debug(JSON.stringify(req.body));
  //res.render('login', '')
  
  // res.setHeader("Access-Control-Allow-Methods","GET,POST");
  
  
}

//验证手机是否已被使用
exports.use_phone_s = function (req, res, next) {
  log.debug('this router register_s~~');
  var phone = req.query.phone;

  //log.debug(JSON.stringify(req.body));
  log.debug('phone', phone);
  //res.render('login', '')
  var data = [];
  var async = require('async');
  //var cookie = require('cookie-parser');
  //var area = req.cookies.currentarea ? req.cookies.currentarea : 1;
  //var qianzhengzhinan_currentPage=req.query.page || 1;
  //var qianzhengzhinan_pagesizee=req.query.pagesize || 12;
  //var country = req.query.country || 1;
  async.parallel({
    //验证码
    sendcode_ss: function (callback) {
      cms.sendcode_ss({m: 'checkphone',phone: phone}, callback);
    }
  }, function (err, result) {
    data.sendcode_ss = result.sendcode_ss;
    log.debug('result.login_ss----------', result.sendcode_ss);
    res.send(result.sendcode_ss);
      //res.send(result.sendcode_ss)


  });
}

exports.forget = function (req, res, next) {
  log.debug('this router forget~~');
  var area = req.cookies.currentarea ? req.cookies.currentarea : 1;
  var data = [];
  data.login_nickname = '';
  data.tdk = {
    pagekey: 'FORGETPWD', //key
    cityid: area, //cityid
    nationid: ''//nationi
  };
  res.render('login/forget', data)
}

exports.forgetUser = function (req, res, next) {
  log.debug('this router forgetUser~~');
  var area = req.cookies.currentarea ? req.cookies.currentarea : 1;
  var data = [];
  data.login_nickname = '';
  var l = req.query
  console.log('url', l.h);
  if (l.h !== undefined) {
    data.url = l.h;
  } else {
    data.url = config.wwhost;
  }
  data.tdk = {
    pagekey: 'FORGETPWD', //key
    cityid: area, //cityid
    nationid: ''//nationi
  };
  res.render('login/forgetUser', data)
}

exports.oauth = function (req, res, next) {
  var data = [], oauth_data=[];
  if (req.cookies.oauth_login) {
    var oauth_data = JSON.parse(req.cookies.oauth_login);
  }
  data.oauth_data = oauth_data;
  data.tdk = {
    pagekey: 'OAUTH', //key
  };
  res.render('login/oauth',data);
}

exports.qq_login = function (req, res, next) {
  var code = req.query.code;
  var async = require('async');
  if(code){
    var data = [];
    //res.redirect(config.ucwaihost+"/api/index.php?m=qq_login&code="+code);
    async.parallel({
      //签证指南
      oauth: function (callback) {
        cms.oauth({'m': 'qq_login', 'code': code}, callback);
      }
    }, function (err, result) {
      console.log("qq_login", result.oauth);
      if(result.oauth.code == 0 && result.oauth.data){
        data.oauth = result.oauth;
        async.parallel({
          userinfo:function(callback){
            wec.userinfo({
                "u_id":result.oauth.data.uid,
                "to_uid":result.oauth.data.uid
            },callback);
        }
        },function (err, result){
          log.debug('result.userinfo', result.userinfo);
          data.oauth.data.status = result.userinfo.data.status;
          data.oauth.data.version = result.userinfo.data.version;

          if(result.userinfo.data.ym_adviser == 2 && result.userinfo.data.lx_adviser == 1){
            data.oauth.data.adviser = 2;
          }
          if(result.userinfo.data.lx_adviser == 2){
            data.oauth.data.adviser = 1;
          }
          if (config.version == 'development') {//开发环境
            res.cookie("login_ss", JSON.stringify(data.oauth.data), {domain: config.domain, expires: new Date(Date.now() + 90000000)});//保存cookie
          } else {
            res.cookie("login_ss", JSON.stringify(data.oauth.data), {domain: config.domain, expires: new Date(Date.now() + 90000000)});
          }
          res.redirect("oauth");
        })
        // res.cookie("login_ss", JSON.stringify(result.oauth.data), {domain: config.domain, expires: new Date(Date.now() + 90000000)});//保存cookie
        // res.redirect("oauth");
      }
      else if(result.oauth.code == 1110018){
        var oauth_data = JSON.parse(req.cookies.oauth_login);
        oauth_data.oauthid = result.oauth.data.oauthid;
        oauth_data.befrom = result.oauth.data.befrom;
        oauth_data.title = 'QQ';
        //data.oauth_data = oauth_data;
        //console.log(oauth_data);
        //res.render('binding', data);
        res.cookie("oauth_login", JSON.stringify(oauth_data), {domain: config.domain, expires: new Date(Date.now() + 90000000)});
        res.redirect('binding');
      }
    });
  }else{
    var h = req.query.h;
    var url_cookie = {'h':h, 'befrom':'qq'};
    res.cookie("oauth_login", JSON.stringify(url_cookie), {domain: config.domain, expires: new Date(Date.now() + 90000000)});//保存cookie
    //res.redirect(config.uchost+"/api/index.php?m=qq_login");
    async.parallel({
      oauthRedirect: function (callback) {
        cms.oauth({'m': 'qq_login'}, callback);
      }
    }, function (err, result) {
      if(result.oauthRedirect.code==0){
        res.redirect(result.oauthRedirect.data.redirect_url);
      }
    });
  }
}

exports.sina_login = function (req, res, next) {
  var code = req.query.code;
  console.log("sina h",req.query.h);
  var async = require('async');
  if(code){
    var data = [];
    async.parallel({
      //签证指南
      oauth: function (callback) {
        cms.oauth({'m': 'sina_login', 'code': code}, callback);
      }
    }, function (err, result) {
      console.log("sina_login", result.oauth);
      if(result.oauth.code == 0 && result.oauth.data){
        data.oauth = result.oauth;
        async.parallel({
          userinfo:function(callback){
            wec.userinfo({
                "u_id":result.oauth.data.uid,
                "to_uid":result.oauth.data.uid
            },callback);
        }
        },function (err, result){
          log.debug('result.userinfo', result.userinfo);
          data.oauth.data.status = result.userinfo.data.status;
          data.oauth.data.version = result.userinfo.data.version;
          if(result.userinfo.data.ym_adviser == 2 && result.userinfo.data.lx_adviser == 1){
            data.oauth.data.adviser = 2;
          }
          if(result.userinfo.data.lx_adviser == 2){
            data.oauth.data.adviser = 1;
          }

          if (config.version == 'development') {//开发环境
            res.cookie("login_ss", JSON.stringify(data.oauth.data), {domain: config.domain, expires: new Date(Date.now() + 90000000)});//保存cookie
          } else {
            res.cookie("login_ss", JSON.stringify(data.oauth.data), {domain: config.domain, expires: new Date(Date.now() + 90000000)});
          }
          res.redirect("oauth");
        })
        // res.cookie("login_ss", JSON.stringify(result.oauth.data), {domain: config.domain, expires: new Date(Date.now() + 90000000)});//保存cookie
        // res.redirect("oauth");
      }else if(result.oauth.code == 1110018){
        var oauth_data = JSON.parse(req.cookies.oauth_login);
        oauth_data.oauthid = result.oauth.data.oauthid;
        oauth_data.befrom = result.oauth.data.befrom;
        oauth_data.title = '新浪';
        console.log(oauth_data);
        res.cookie("oauth_login", JSON.stringify(oauth_data), {domain: config.domain, expires: new Date(Date.now() + 90000000)});
        res.redirect('binding');
      }
    });
  }else{
    var h = req.query.h;
    var url_cookie = {'h':h, 'befrom':'sina'};
    res.cookie("oauth_login", JSON.stringify(url_cookie), {domain: config.domain, expires: new Date(Date.now() + 90000000)});//保存cookie
    //res.redirect(config.uchost+"/api/index.php?m=sina_login");
    async.parallel({
      oauthRedirect: function (callback) {
        cms.oauth({'m': 'sina_login'}, callback);
      }
    }, function (err, result) {
      if(result.oauthRedirect.code==0){
        res.redirect(result.oauthRedirect.data.redirect_url);
      }
    });
  }
}

exports.weixin_login = function (req, res, next) {
  var code = req.query.code;
  var state = req.query.state;
  console.log("sina h",req.query.h);
  var async = require('async');
  if(code){
    var data = [];
    async.parallel({
      //签证指南
      oauth: function (callback) {
        cms.oauth({'m': 'weixin_login', 'code': code, 'state':state}, callback);
      }
    }, function (err, result) {
      console.log("weixin_login", result.oauth);
      if(result.oauth.code == 0 && result.oauth.data){
        data.oauth = result.oauth;
        async.parallel({
          userinfo:function(callback){
            wec.userinfo({
                "u_id":result.oauth.data.uid,
                "to_uid":result.oauth.data.uid
            },callback);
        }
        },function (err, result){
          log.debug('result.userinfo', result.userinfo);
          data.oauth.data.status = result.userinfo.data.status;
          data.oauth.data.version = result.userinfo.data.version;
          if(result.userinfo.data.ym_adviser == 2 && result.userinfo.data.lx_adviser == 1){
            data.oauth.data.adviser = 2;
          }
          if(result.userinfo.data.lx_adviser == 2){
            data.oauth.data.adviser = 1;
          }

          if (config.version == 'development') {//开发环境
            res.cookie("login_ss", JSON.stringify(data.oauth.data), {domain: config.domain, expires: new Date(Date.now() + 90000000)});//保存cookie
          } else {
            res.cookie("login_ss", JSON.stringify(data.oauth.data), {domain: config.domain, expires: new Date(Date.now() + 90000000)});
          }
          res.redirect("oauth");
        })
        // res.cookie("login_ss", JSON.stringify(result.oauth.data), {domain: config.domain, expires: new Date(Date.now() + 90000000)});//保存cookie
        // res.redirect("oauth");
      }else if(result.oauth.code == 1110018){
        var oauth_data = JSON.parse(req.cookies.oauth_login);
        oauth_data.oauthid = result.oauth.data.oauthid;
        oauth_data.befrom = result.oauth.data.befrom;
        oauth_data.title = '微信';
        console.log(oauth_data);
        res.cookie("oauth_login", JSON.stringify(oauth_data), {domain: config.domain, expires: new Date(Date.now() + 90000000)});
        res.redirect('binding');
      }
    });
  }else{
    var h = req.query.h;
    var url_cookie = {'h':h, 'befrom':'weixin'};
    res.cookie("oauth_login", JSON.stringify(url_cookie), {domain: config.domain, expires: new Date(Date.now() + 90000000)});//保存cookie
    //res.redirect(config.uchost+"/api/index.php?m=weixin_login");
    async.parallel({
      oauthRedirect: function (callback) {
        cms.oauth({'m': 'weixin_login'}, callback);
      }
    }, function (err, result) {
      if(result.oauthRedirect.code==0){
        res.redirect(result.oauthRedirect.data.redirect_url);
      }
    });
  }
}

//忘记密码
exports.forget_s = function (req, res, next) {
  log.debug('this router forget_s~~');
  var phone = req.body.phone;
  var code = req.body.code;
  var newpwd = req.body.newpwd;
  var qrnewped = req.body.qrnewpwd;

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
    forget: function (callback) {
      cms.forget(req.body, callback);
    }
  }, function (err, result) {

    data.forget = result.forget;
    log.debug('result.login_ss----------', result.forget);
    log.debug('ok', result.forget.code)
    res.send(result.forget)

  });

}

//登出
exports.login_out = function (req, res, next) {
  console.log('login_out');
  //console.log('req', req);
  res.setHeader("Access-Control-Allow-Methods","GET,POST");
  res.clearCookie("login_ss", {domain: config.domain});
  //res.cookie(prop, 'login_ss', {expires: new Date(0)});
  console.log('login_out1');
  // res.send('0');
  res.send("cb(0)");
  //res.redirect(req.query.h);
};

// 生成图形验证码
exports.param_code = function (req,res,next){
  var codeConfig = {
  size: 4,// 验证码长度
  ignoreChars: '0o1ilI', // 验证码字符中排除 0o1i
  noise: 0, // 干扰线条的数量
  height: 50,
  width: 90
  }
  var captcha = svgCaptcha.create(codeConfig);
  if (req.session) {
      console.log('有session',req.session,req.session.param_code)
  }else {
      console.log('无session')
  }
 if(captcha.text.toLowerCase()){
     req.session.param_code = captcha.text.toLowerCase(); //存session用于验证接口获取文字码
     console.log('cishu~~')
 }
  console.log('存储session~~`',req.session,req.session.param_code)
  res.send(captcha.data);
}
//check_param_code
exports.check_param_code = function (req,res,next){
 console.log('check_param_code data~~',req.body,req.session.param_code)
 var page_param_code = req.body.param_code;
 var local_param_code = req.session.param_code;
 if (page_param_code == local_param_code) {
     res.send('0');
     //res.send(JSON.parse({"code":0}));
 }
 else {
     res.send('1');
     //res.send(JSON.parse({"code":1}));
 }
}

//公告位登录统计
exports.ad_tongji = function (req,res,next){
  var data = {}
  data.login_nickname = '';
  // var l = url.parse(req.url, true).query;
  var l = req.query;
    console.log('url', config.wwhost+req.url);
    if (l.href !== undefined) {
        data.url = l.href;
    } else {
        data.url = config.wwhost+req.url;
    }
    if ( req.cookies.login_ss !== undefined) {
        // 已登录

        // ad广告统计redis
        console.log('data.url',data.url)
        var login_a = JSON.parse(req.cookies.login_ss)
        cms.ad_tongji(login_a.uid, login_a.username);

        res.redirect(data.url);
    } else {
      // 未登录
      // https://apply.mcard.boc.cn/apply/pc/product/goProductDetails?newInTypeCode=0095&masterOrSubFlag=1&formVersion=GPB1A&shortId=ueuuyq&channelSource=1
      // 

      console.log('config.wwhost', config.wwhost);
      console.log('req.url', req.url);
      console.log('data.url',data.url);
      res.redirect('loginUser?h='+config.wwhost+'/ad_tongji?href='+data.url);
    }
  // res.render('login/forget', data)
}

// 顾问个人主页确认文章数
exports.gwzs = function (req,res,next){
  var data = {}
  data.login_nickname = '';
  // var l = url.parse(req.url, true).query;
  var l = req.query;
  console.log('url', config.wwhost+req.url);
  if (l.href !== undefined) {
      data.url = l.href;
  } else {
      data.url = config.wwhost+req.url;
  }
  if ( req.cookies.login_ss !== undefined) {
    // 已登录

    // ad广告统计redis
    console.log('已登录')
    // var login_a = JSON.parse(req.cookies.login_ss) 暂时不需要记录redis数据库
    // cms.gwzs(login_a.uid);
    res.send('0');
  } else {
    // 未登录
    console.log('未登录')
    res.send('1')

  }
}