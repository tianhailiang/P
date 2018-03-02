var controller = require('./controller.js');
var user = require('./user.js');
var about = require('./about.js');
var login = require('./login.js');
exports = module.exports = function (app) {// routes
  //nav
  app.get('/', controller.index);
  app.get(/^\/(bj|cd|cq|cs|cc|cz|dl|dg|fs|fz|gz|gy|hz|hf|heb|hs|gc|hn|jn|jl|km|lz|ly|nj|nc|nb|nn|qd|sh|sy|sjz|suz|sz|tj|ty|ts|hk|wc|wx|wz|xa|sm|xz|xn|xj|yt|yc|yic|zz)(\/*)$/, controller.index);
  //搜索页
  app.get(/^\/so_article(\/*)((?![0-9])[0-9A-Za-z\-_%]*)$/,controller.so_article);
  //社区首页
  app.get('/blog', controller.community_index);
  //用户视角 顾问主页
  app.get('/blog/:id', controller.adviser_main);
  //用户视角 参赞主页
  //app.get('/p1/:id', controller.adviser_main);
  //用户 顾问专栏
  app.get('/blog/:id/article', controller.adviser_special);
  //用户视角 案例
  app.get('/blog/:id/case', controller.adviser_case);
  //用户 顾问专栏加载更多/参赞
  app.get('/soapi/user/adviser_special_more', controller.adviser_special_more);
  //案例列表接口(type=1)
  app.get('/soapi/article_list', controller.article_list);
  //文章点赞
  app.post('/soapi/article_vote', user.article_vote);
  //文章收藏
  app.post('/soapi/favorite_article', user.favorite_article);
  //修改用户信息
  app.post('/soapi/user_info', user.user_info);
  //修改个人资料
  app.post('/soapi/user_ziliao', user.user_ziliao);
  //修改密码
  app.post('/soapi/user_password', user.user_password);
  //修改用户头像
  app.post('/soapi/modify_portrait', user.modify_portrait);
  //登出
  app.get('/login_out', login.login_out);
  //登录
  app.post('/login_s', login.login_s);
  //参赞中心 编辑个人资料
  app.get('/canzan_center/profile',controller.counsellor_personal);
  //参赞中心 账户设置
  app.get('/canzan_center/acount', controller.counsellor_set);
  //顾问中心 编辑个人资料
  app.get('/advisor_center/profile',controller.advisor_profile);
  //顾问中心 账户设置
  app.get('/advisor_center/acount', controller.advisor_acount);
  //用户中心 账户设置
  app.get('/user_center/acount', controller.advisor_acount);
  //用户中心 个人信息
  app.get('/user_center/profile', controller.user_information);

  //顾问 关注我的
  app.get('/advisor_center/follow', controller.center_follow);
  //参赞 关注我的
  app.get('/canzan_center/follow', controller.center_follow);
  //参赞 关注我的
  app.get('/canzan_center/follow', controller.center_follow);
  //用户中心
  app.get('/user_center', controller.user_comment);//收到的回复（普通用户）
  //用户中心 我关注的
  app.get('/user_center/followee', controller.user_followee);
  //用户中心 我关注的
  app.get('/user_center/question', controller.user_followee);
  //用户中心 收到的评论
  app.get('/user_center/revcomment', controller.user_comment);//收到的回复（普通用户）
  //顾问中心 我的主页
  app.get('/advisor_center', controller.center_main);
  //顾问中心 我的案例
  app.get('/advisor_center/case', controller.center_case);
  //顾问中心 我的案例/我的专栏 加载更多
  app.get('/soapi/advisor_list', controller.advisor_list);
  //顾问中心 收到的评论
  app.get('/advisor_center/revcomment', controller.center_comment);
  //参赞中心 收到的评论
  app.get('/canzan_center/revcomment', controller.center_comment);
  //顾问 收到的消息
  app.get('/advisor_center/revmsg', controller.center_message);
  //顾问 我的收藏
  app.get('/advisor_center/collection', controller.center_collection);
  //用户中心 我的收藏
  app.get('/user_center/collection', controller.center_collection);
  //参赞 我的收藏
  app.get('/canzan_center/collection', controller.center_collection);
  //顾问 我的专栏
  app.get('/advisor_center/article', controller.center_article);
  //参赞 我的专栏
  app.get('/canzan_center/article', controller.center_article);
  //参赞中心 我的主页
  app.get('/canzan_center', controller.center_main);
  //参赞 收到的消息
  app.get('/canzan_center/revmsg', controller.center_message);
  //用户 收到的消息
  app.get('/user_center/revmsg', controller.center_message);
  //顾问 相册（用户视角）
  app.get('/blog/:id/album', controller.adviser_photo_p);
  //参赞 相册（用户视角）
  //app.get('/p1/:id/album', controller.adviser_photo_p);
  //案列底页（用户视角）
  app.get('/case/:id',controller.case_detail); 
  //专栏底页（用户视角）
  app.get(/^\/blog\/(\d+)\/article_(\d+)$/, controller.article_detail);
  //文章评论接口
  app.post('/soapi/reviewArticle',controller.reviewArticle);
  //案列发布页面
  app.get('/advisor_center/postcase',controller.release_case);
  //参赞 我的相册
  app.get('/canzan_center/album', controller.center_photo);
  //顾问 我的相册
  app.get('/advisor_center/album', controller.center_photo);
  //相册接口
  app.get('/soapi/get_photos', controller.get_photos);
  //文本编辑器发布接口
  app.post('/soapi/publish_article',controller.publish_article);
  //专栏发布页面 (顾问)
  app.get("/advisor_center/postarticle",controller.release_article);
  //专栏发布页面 (参赞)
  app.get("/canzan_center/postarticle",controller.release_article);
  //关注用户接口
  app.post("/soapi/follow_people",controller.follow_people);
  //回复文章评论
  app.post("/soapi/save_comment_ans",controller.save_comment_ans);
  //删除文章接口
  app.post("/soapi/delete_article",controller.delete_article);
  //获取回复列表
  app.get("/soapi/comment_ans",controller.comment_ans);
  //分页获取评论
  app.get('/soapi/article_comments',controller.article_comments);
  //专栏底页 （顾问视角）
  app.get('/advisor_center/article/:id',controller.center_article_detail);
  //案例底页 (顾问视角)
  app.get('/advisor_center/case/:id',controller.center_case_detail);
  //专栏底页 （参赞视角）
  app.get('/canzan_center/article/:id',controller.center_article_detail);
  //添加相册接口
  app.post("/soapi/album_add",controller.album_add);
  //编辑相册接口
  app.post("/soapi/album_update",controller.album_update);
  //删除相册接口
  app.post("/soapi/album_del",controller.album_del);
  // 顾问中心 我的草稿箱
  app.get("/advisor_center/draft",controller.draft);
  // 参赞中心 我的草稿箱
  app.get("/canzan_center/draft",controller.draft);
  //顾问编辑专栏
  app.get("/advisor_center/postarticle/:id",controller.edit_article);
  //参赞编辑专栏
  app.get("/canzan_center/postarticle/:id",controller.edit_article);
  //草稿发布文章接口
  app.post("/soapi/draft_to_article",controller.draft_to_article);
  //顾问编辑案列
  app.get("/advisor_center/postcase/:id",controller.edit_case);
  //参赞编辑案列
  app.get("/advisor_center/postcase/:id",controller.edit_case);
  //收藏加载更多
  app.get('/soapi/favList',controller.favList);
  //图片库接口
  app.get('/soapi/attachment',controller.attachment);
  // app.get('/upload',controller.upload); //上传图片测试
  //分享页面
  app.get('/share',controller.share);
  //删除评论接口
  app.post('/soapi/remove_comment',controller.remove_comment);
  //删除回复接口
  app.post('/soapi/remove_comment_ans',controller.remove_comment_ans);
  // 聚合页加载更多
  app.get('/soapi/loadmore',controller.loadmore);
  //搜索院校库
  app.get('/soapi/search_school',controller.search_school);
  //举报接口
  app.post('/soapi/userReport',controller.userReport);
  //浏览量接口
  app.get('/cmsapi/article_count', controller.article_count);
  app.post('/cmsapi/assessment', controller.assessment);//在线评估

  //顾问中心 上传我的二维码
  app.get('/advisor_center/post_code', controller.post_code);

  //参赞聚合页
  app.get('/canzan', about.canzan);
  //关于我们
  app.get('/about', about.about);//金吉列简介
  app.get('/about/culture',about.culture);//企业文化
  app.get('/about/events',about.events);//金吉列大事记
  app.get('/about/cooperation',about.cooperation);//商务合作
  app.get('/about/contact',about.contact);//联系我们
  //顾问登录
  app.get('/login', login.login);
  //顾问忘记密码
  app.get('/forget', login.forget);
  //普通用户绑定手机号
  app.get('/binding', login.binding);
  //手机验证码
  app.get('/sendcode_s', login.sendcode_s);
  //忘记密码
  app.post('/forget_s', login.forget_s);
  //绑定手机号
  app.post('/bind_phone', login.bind_phone);
  //普通用户登录
  app.post('/login_user', login.login_user);
  //退出
  app.get('/login_out', login.login_out);
  //用户视角 精华
  app.get('/blog/:id/hot', controller.hot);
  app.get('/qq_login', login.qq_login);//第三方登录
  app.get('/sina_login', login.sina_login);//第三方登录
  app.get('/weixin_login', login.weixin_login);//第三方登录
  app.get('/oauth', login.oauth);

};