/**
 * Created by Winson on 17/7/4.
 */

var fragment = require('./fragment.js');

exports = module.exports = function (app) {// routes

  //fragments
  // app.get('/fragment/zuixinzixun', fragment.zuixinzixun);
  // app.get('/fragment/huodongyugao', fragment.huodongyugao);
  // app.get('/fragment/chenggonganli', fragment.chenggonganli);
  // app.get('/fragment/mingxingguwen', fragment.mingxingguwen);
  // app.get('/fragment/zhuanjiajiedu', fragment.zhuanjiajiedu);
  // app.get('/fragment/hot_liuxuefangan_list',fragment.hot_liuxuefangan_list);
  // app.get('/fragment/community_guwen',fragment.community_guwen);
  // app.get('/fragment/author_selection',fragment.author_selection);
  app.get('/fragment/searchguess_like',fragment.searchlikelist);
  app.get('/fragment/guess_like',fragment.guess_like);
  app.get('/fragment/xiangguanguwen',fragment.xiangguanguwen);
  app.get('/fragment/article_xiangguantuijian',fragment.article_xiangguantuijian);


 // 移民fragments
  app.get('/fragment/yimin_searchguesslike',fragment.yimin_searchguesslike);
  app.get('/fragment/yimin_guess_like',fragment.yimin_guess_like);
  app.get('/fragment/yimin_xiangguanguwen',fragment.yimin_xiangguanguwen);


  // app.get('/fragment/fangan_liuxue',fragment.fangan_liuxue);
  // app.get('/fragment/productrank_activity',fragment.productrank_activity);
  // // 移民fragments
  // app.get('/fragment/yimin_huodongyugao', fragment.yimin_huodongyugao);  //移民活动
  // app.get('/fragment/yimin_mingxingguwen', fragment.yimin_mingxingguwen);  //移民顾问
  // app.get('/fragment/yimin_haowenjingxuan', fragment.yimin_haowenjingxuan);  //移民好文精选
  // app.get('/fragment/yimin_zhuanjiajiedu', fragment.yimin_zhuanjiajiedu);   //移民专家解读
};

