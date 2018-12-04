var controller = require('./controller.js');
var user = require('./user.js');
var about = require('./about.js');
var login = require('./login.js');
exports = module.exports = function (app) {// routes
  //nav
  app.get('/', controller.index);
  app.get(/^\/(bj|cd|cq|cs|cc|cz|dl|dg|fs|fz|gz|gy|hz|hf|heb|hs|hd|hn|jn|jl|km|lz|ly|nj|nc|nb|nn|qd|sh|sy|sjz|shz|sz|tj|ty|ts|wh|wx|wz|xa|xm|xz|xn|xj|yt|yc|ych|zz)(\/*)$/, controller.index_page);
  // app.get('/', controller.index);
  //搜索页
  app.get(/^\/so_article(\/*)(.*)+$/,controller.so_article);
  //顾问搜索页
  app.get(/^\/so_advisor(\/*)(.*)+$/,controller.so_adviser);
  //案例搜索页
  app.get(/^\/so_case(\/*)(.*)+$/,controller.so_case);
  //移民顾问搜索页
  app.get(/^\/yimin_so_advisor(\/*)(.*)+$/,controller.so_adviser_yimin);
  //移民搜索页
  app.get(/^\/yimin_so_article(\/*)(.*)+$/,controller.so_article_yimin);
  //社区首页
  app.get('/blog', controller.community_index);
  //国家列表页
  app.get(/articles(\/*)((?![0-9])[0-9A-Za-z\-_%]*)$/, controller.country_list);
  //留学案例
  app.get(/^\/case(\/*)((?![0-9])[0-9A-Za-z\-_%]*)$/, controller.case_list);
  //留学攻略
  app.get(/glue(\/*)((?![0-9])[0-9A-Za-z\-_%]*)$/, controller.glue);
  //顾问聚合页
  app.get(/adviser(\/*)((?![0-9])[0-9A-Za-z\-_%]*)$/, controller.adviser);
  //用户视角 顾问主页
  app.get(/^\/(\d+)(\/*)$/, controller.adviser_main);
  //用户视角 参赞主页
  //app.get('/p1/:id', controller.adviser_main);
  //用户 顾问专栏
  app.get(/^\/(\d+)\/article/, controller.adviser_special);
  //用户视角 案例
  app.get(/^\/(\d+)\/case/, controller.adviser_case);
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
  //顾问中心 数据中心
  app.get('/advisor_center/data_center', controller.data_center);
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
  app.get(/^\/(\d+)\/album/, controller.adviser_photo_p);
  // app.get('/:id/album', controller.adviser_photo_p);
  //参赞 相册（用户视角）
  //app.get('/p1/:id/album', controller.adviser_photo_p);
  //案列底页（用户视角）
  app.get('/case/:id',controller.case_detail); 
  //专栏底页（用户视角）
  app.get('/article/:id', controller.article_detail);
  //文章评论接口
  app.post('/soapi/reviewArticle',controller.reviewArticle);
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
  //海外律师团队
  app.get('/lawyer', about.lawyer);
  app.get(/^\/(bj|cd|cq|cs|cc|cz|dl|dg|fs|fz|gz|gy|hz|hf|hd|heb|hs|hn|jn|jl|km|lz|ly|nj|nc|nb|nn|qd|sh|sy|sjz|shz|sz|tj|ty|ts|wh|wx|wz|xa|xm|xz|xn|xj|yt|yc|ych|zz)\/activity(\/*)$/, about.activity);
  app.get(/^\/(bj|cd|cq|cs|cc|cz|dl|dg|fs|fz|gz|gy|hz|hf|hd|heb|hs|hn|jn|jl|km|lz|ly|nj|nc|nb|nn|qd|sh|sy|sjz|shz|sz|tj|ty|ts|wh|wx|wz|xa|xm|xz|xn|xj|yt|yc|ych|zz)\/activity\/(\d+)/, about.activity_detail);
  app.get('/activity', about.activity_ip);
  //关于我们
  app.get('/about', about.about);//金吉列简介
  app.get('/about/culture',about.culture);//企业文化
  // app.get('/about/events',about.events);//金吉列大事记
  app.get('/about/events',about.new_events);// 新金吉列大事记
  app.get('/soapi/eventsmore',about.eventsfmore); // 新金吉列大事记加载更多
  app.get('/about/cooperation',about.cooperation);//商务合作
  app.get('/about/contact',about.contact);//联系我们
  //顾问登录
  app.get('/login', login.login);
  //普通用户登录
  app.get('/loginUser', login.loginUser);
  //顾问忘记密码
  app.get('/forget', login.forget);
  //普通用户快速注册
  app.get('/register',login.register);
  //普通用户忘记密码
  app.get('/forgetUser',login.forgetUser);
  //普通用户绑定手机号
  app.get('/binding', login.binding);
  //手机验证码
  app.post('/sendcode_s', login.sendcode_s);
  //手机验证码-优惠券
  app.post('/sendcode_s_coupon',login.sendcode_s_coupon);
  //忘记密码
  app.post('/forget_s', login.forget_s);
  //绑定手机号
  app.post('/bind_phone', login.bind_phone);
  //普通用户登录
  app.post('/login_user', login.login_user);
  //普通用户密码登录
  app.post('/user_login',login.user_login);
  //普通用户快速注册
  app.post('/register_s', login.register_s);
  //表单提交
  app.post('/save_feedback',controller.save_feedback);
  //退出
  app.get('/login_out', login.login_out);
  //用户视角 精华
  app.get(/^\/(\d+)\/hot/, controller.hot);
  app.get('/qq_login', login.qq_login);//第三方登录
  app.get('/sina_login', login.sina_login);//第三方登录
  app.get('/weixin_login', login.weixin_login);//第三方登录
  app.get('/oauth', login.oauth);
  app.get("/agreement",controller.agreement);//金吉列简介
  app.get('/about/cultures',about.cultures);//公司简介
  app.get("/about/culture/:id",about.culture_detail);//金色力量底页
  app.get("/act_form",controller.act_form);//活动表单
  app.get('/employment',about.employment);//招聘页面

  //文章置顶接口
  app.post('/article_top', controller.article_top);
  app.get('/param_code',login.param_code);//生成图片验证码
  app.post('/session_param_code',login.check_param_code)//验证图片验证码
  app.get('/ad_tongji', login.ad_tongji);//广告位统计登录
  app.get("/schooltopic/:id",about.schooltopic);//金色力量底页
  app.get("/liuxue_item_nunjucks",controller.liuxue_item_nunjucks);//首页代码段落
  app.get('/soapi/chiefmore',controller.chiefmore); // 首席顾问加载更多
  app.get(/chief(\/*)((?![0-9])[0-9A-Za-z\-_%]*)$/,controller.chief); //首席顾问

  //意见反馈
  app.post('/userFeedback',controller.userFeedback)
  app.get('/sendSms',controller.sendsms);//活动 发送短信验证码
  app.get('/getCoupons',controller.getCoupons);//获取优惠券
  app.get('/gwzs', login.gwzs); // 顾问个人主页确认文章数
};
