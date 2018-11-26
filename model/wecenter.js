var api = require('../model/apiRequest');
var config = require('../config/config');
var log4js = require('../log/log');
var log = log4js.getLogger();

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

function _api_path_url_shequ(data, url) {
  if (url == null || url == undefined || url == "") {
    log.debug(url + '　接口不存在！');
    return null;
  }
  for(var item in data){
    url += '__' + item + '-' + data[item];
  }
  return url;
}
//文章发布
exports.publish_article = function (data, callback) {
  var url = config.apis.post_publish_article;
  if (url == null){
    callback('404');
    return;
  }
  api.apiRequest_post(url ,data ,callback);
}

/*修改用户信息*/
exports.xiugai_info = function (data, callback) {

  var url = config.apis.xiugai_info;
  if (url == null){
    callback('404');
    return;
  }
  api.apiRequest_post(url ,data ,callback);
  log.debug('url------------', url)
}

/*修改密码*/
exports.xiugai_password = function (data, callback) {
  console.log('333')
  var url = config.apis.xiugai_password;
  if (url == null){
    callback('404');
    return;
  }
  api.apiRequest_post(url ,data ,callback);
  log.debug('url------------', url)
}

/*文章点赞*/
exports.article_vote = function (data, callback) {
  var url = config.apis.article_vote;
  if (url == null){
    callback('404');
    return;
  }
  api.apiRequest_post(url ,data ,callback);
}

/*文章收藏*/
exports.favorite_article = function (data, callback) {
  var url = config.apis.favorite_article;
  if (url == null){
    callback('404');
    return;
  }
  api.apiRequest_post(url ,data ,callback);
}

//文章评论
exports.reviewArticle = function(data,callback){
  var url = config.apis.get_reviewArticle;

  if (url == null){
    callback('404');
    return;
  }
  api.apiRequest_post(url ,data ,callback);
};

//用户中心-顾问专栏列表
exports.user_article_list = function (data, callback) {
  var url = _api_path_url_shequ(data, config.apis.user_article_list);
  if (url == null){
    callback('404');
    return;
  }
  api.apiRequest(url ,callback);
};

//用户中心-我的关注
exports.user_follow = function (data, callback) {
  var url = _api_path_url_shequ(data, config.apis.get_user_follow);
  if (url == null){
    callback('404');
    return;
  }
  api.apiRequest(url ,callback);
};

//顾问中心-关注我的
exports.follow_list = function (data, callback) {

  var url = _api_path_url_shequ(data, config.apis.get_follow_list);
  if (url == null){
    callback('404');
    return;
  }
  api.apiRequest(url ,callback);
};

/*
 *  获取用户信息（普通用户，顾问，参赞）
 */

exports.userinfo = function(data,callback){
  var url = _api_path_url_shequ(data, config.apis.get_userinfo);
  if (url == null){
    callback('404');
    return;
  }
  api.apiRequest(url ,callback);
}

/*
 *  文章详情
 */
exports.article = function(data,callback){
  var url = _api_url_path(data, config.apis.get_article);
  if (url == null){
    callback('404');
    return;
  }
  api.apiRequest(url ,callback);
};

/*
 *  文章id获取顾问
 */
exports.article_getUid = function(data,callback){
  var url = _api_url_path(data, config.apis.get_article_uid);
  if (url == null){
    callback('404');
    return;
  }
  api.apiRequest(url ,callback);
};

/*
 *  编辑文章详情
 */
exports.article_info = function(data,callback){
  var url = _api_url_path(data, config.apis.get_article_info);
  if (url == null){
    callback('404');
    return;
  }
  api.apiRequest(url ,callback);
};
/*
 * 用户相册
 *
 */
exports.album_list = function (data,callback) {
  var url = _api_path_url_shequ(data, config.apis.get_album_list);
  if (url == null){
    callback('404');
    return;
  }
  api.apiRequest(url ,callback);
}

/*
 * 文本编辑器发布接口
 *
 */
exports.publish_article = function (data, callback) {
  var url = config.apis.post_publish_article;
  if (url == null){
    callback('404');
    return;
  }
  api.apiRequest_post(url ,data ,callback);
}

/*
 * 关注用户
 *
 */
exports.follow_people = function (data, callback) {
  var url = config.apis.follow_people;
  if (url == null){
    callback('404');
    return;
  }
  console.log('url------', url)
  api.apiRequest_post(url ,data ,callback);
};

//个人中心-收到的评论
exports.comment_list = function (data, callback) {
  var url = _api_path_url_shequ(data, config.apis.get_comment_list);
  if (url == null){
    callback('404');
    return;
  }
  api.apiRequest(url ,callback);
}

//普通用户中心-收到的评论（又名：回复）
exports.answer_list = function (data, callback) {

  var url = _api_path_url_shequ(data, config.apis.get_answer_list);
  if (url == null){
    callback('404');
    return;
  }
  api.apiRequest(url ,callback);
  console.log('url+++++', url)
}

//回复文章评论
exports.save_comment_ans =function(data,callback){
  var url = config.apis.post_save_comment_ans;
  if (url == null){
    callback('404');
    return;
  }
  api.apiRequest_post(url ,data,callback);
}

//获取专栏或者案例列表 接口
exports.article_list = function (data, callback) {
  var url = _api_path_url_shequ(data, config.apis.user_article_list);
  if (url == null){
    callback('404');
    return;
  }  
  api.apiRequest(url ,callback);
};

//删除文章接口
exports.delete_article =function(data,callback){
  var url = config.apis.post_delete_article;
  if (url == null){
    callback('404');
    return;
  }
  api.apiRequest_post(url ,data,callback);
}

//获取回复列表接口
exports.comment_ans =function(data,callback){
  var url = _api_path_url_shequ(data, config.apis.get_comment_ans);
  if (url == null){
    callback('404');
    return;
  }  

  api.apiRequest(url ,callback);  
}

//分页获取评论
exports.article_comments = function(data,callback){
  var url = _api_url_path(data, config.apis.get_article_comments);
  if (url == null){
    callback('404');
    return;
  }  
  api.apiRequest(url ,callback);  
};

//收藏列表
exports.collection_list = function(data,callback){
  var url = _api_path_url_shequ(data, config.apis.get_collection_list);
  if (url == null){
    callback('404');
    return;
  }
  api.apiRequest(url ,callback);
};

//站内消息
exports.msg_list = function (data,callback) {
  var url = _api_url_path(data, config.apis.get_msg_list);
  if (url == null){
    callback('404');
    return;
  }
  log.debug('站内消息url： ' + url);
  api.apiRequest(url ,callback);
};

//添加相册接口
exports.album_add =function(data,callback){
  var url = config.apis.post_album_add;
  if (url == null){
    callback('404');
    return;
  }
  api.apiRequest_post(url ,data,callback);
};
//编辑相册接口
exports.album_update =function(data,callback){
  var url = config.apis.post_album_update;
  if (url == null){
    callback('404');
    return;
  }
  api.apiRequest_post(url ,data,callback);
};
//删除相册接口
exports.album_del =function(data,callback){
  var url = config.apis.post_album_del;
  if (url == null){
    callback('404');
    return;
  }
  api.apiRequest_post(url ,data,callback);
}

//草稿箱发布接口
exports.draft_to_article = function(data,callback){
  var url = config.apis.post_draft_to_article;
  if (url == null){
    callback('404');
    return;
  }
  api.apiRequest_post(url ,data,callback);
}

// 顾问主页列表
exports.adviser_main=function(data,callback){
  var url = _api_url_path(data, config.apis.adviser_main);
  if (url == null) {
    callback('404');
    return;
  }
  api.apiRequest(url, callback);
  console.log('url-----', url);
}
// 顾问主页列表踩你喜欢
exports.likelist=function(data,callback){
  var url = _api_url_path(data, config.apis.likelist);
  if (url == null) {
    callback('404');
    return;
  }
  api.apiRequest(url, callback);
}
// 顾问主页-相关顾问
exports.xiangguan_guwen=function(data,callback){
  var url = _api_url_path(data, config.apis.xiangguan_guwen);
  if (url == null) {
    callback('404');
    return;
  }
  api.apiRequest(url, callback);
}
// 顾问主页-相关推荐
exports.relation_recommend=function(data,callback){
  var url = _api_url_path(data, config.apis.relation_recommend);
  if (url == null) {
    callback('404');
    return;
  }
  api.apiRequest(url, callback);
}
// 移民踩你喜欢
exports.yimin_likelist=function(data,callback){
  var url = _api_path_url_shequ(data, config.apis.yimin_likelist);
  if (url == null) {
    callback('404');
    return;
  }
  api.apiRequest(url, callback);
}
// 移民相关顾问
exports.yimin_xiangguanguwen=function(data,callback){
  var url = _api_url_path(data, config.apis.yimin_xiangguanguwen);
  if (url == null) {
    callback('404');
    return;
  }
  api.apiRequest(url, callback);
}
//删除评论接口
exports.remove_comment = function(data,callback){
  var url = config.apis.post_remove_comment;
  if (url == null){
    callback('404');
    return;
  }
  api.apiRequest_post(url ,data,callback);
}

//删除回复接口
exports.remove_comment_ans = function(data,callback){
  var url = config.apis.post_remove_comment_ans;
  if (url == null){
    callback('404');
    return;
  }
  api.apiRequest_post(url ,data,callback);
}
//搜索院校库
exports.search_school = function(data,callback){
  var url = _api_path_url_shequ(data,config.apis.get_search_school); 
  if (url == null){
    callback('404');
    return;
  }
  api.apiRequest(url ,callback);
}

//修改头像
exports.modify_portrait = function(data,callback){
  var url = config.apis.modify_portrait;
  if (url == null){
    callback('404');
    return;
  }
  api.apiRequest_post(url ,data,callback);
}
//社区首页list
exports.community_index = function(data,callback){
  var url = _api_path_url_shequ(data,config.apis.community_index);
  if (url == null){
    callback('404');
    return;
  }
  api.apiRequest(url ,callback);
}
//首席顾问
exports.top_adviser_list = function (data,callback){
  var url = _api_url_path(data, config.apis.top_adviser_list);
  if (url == null) {
    callback('404');
    return;
  }
  api.apiRequest(url, callback);
  console.log('url-----', url);
}
//首席顾问国家tab
exports.getChiefCountryList = function (data,callback){
  var url = _api_url_path(data, config.apis.getChiefCountryList);
  if (url == null) {
    callback('404');
    return;
  }
  api.apiRequest(url, callback);
  console.log('url-----', url);
}
// 顾问个人主页文章统计
exports.gwzs = function (data,callback){
  var url = _api_url_path(data, config.apis.article_count);
  if (url == null) {
    callback('404');
    return;
  }
  api.apiRequest(url, callback);
  console.log('url-----', url);
}
