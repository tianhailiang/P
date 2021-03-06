/**
 *
 * @type {{host: string, port: number}}
 */
'use strict';

const redisCache = {
  "host": "192.168.122.111",
  "port":6379
};
var wwhost = 'http://www2.jjlvip.cn';
var cdnhost = 'http://www2.jjlvip.cn';
var prefix = 'http://internal-jjl-elb-api-1494687011.cn-north-1.elb.amazonaws.com.cn/cms/api/';
var uc_prefix = 'http://internal-jjl-elb-api-1494687011.cn-north-1.elb.amazonaws.com.cn/uc/api/';
var shequ_prefix = 'http://internal-jjl-elb-api-1494687011.cn-north-1.elb.amazonaws.com.cn/so/?/api/';
var imageshost = 'http://images.jjl.cn';
var apis = {
  "get_answer_list": shequ_prefix + 'account/comment_ans_to_me/',
  "adviser_main": shequ_prefix + 'article/list/', //
  "xiugai_password": uc_prefix + 'index.php?m=editpassword',//社区 修改密码
  "xiugai_info": uc_prefix + 'index.php?m=edituserinfo', //社区 修改用户信息
  "favorite_article": shequ_prefix + 'article/favorite_article/',//社区 文章收藏
  "article_vote": shequ_prefix + 'article/article_vote/',//社区 文章点赞
  "user_article_list": shequ_prefix + 'account/user_article_list/',//社区 专栏列表
  "post_login": uc_prefix + 'index.php?m=login',
  "post_register": uc_prefix + 'index.php?m=register',
  "lists": prefix + 'lists',
  "get_city_list": prefix + 'city_list',
  "get_city_guwen": prefix + 'city_guwen',
  "get_liuxuejiaodian": prefix + 'lists',
  "get_hot_search": prefix + 'lists',
  "get_liuxuezhuanqu_recommend_left": prefix + 'lists',
  "get_liuxuezhuanqu_recommend_middle": prefix + 'zhuanqu_content',
  "get_liuxuezhuanqu_recommend_school_rank": prefix + 'lists',
  "get_liuxuezhuanqu_recommend_zq_scholarship": prefix + 'lists',
  "get_liuxuezhuanqu_mg_left": prefix + 'lists',
  "get_liuxuezhuanqu_mg_middle": prefix + 'lists',
  "get_liuxuezhuanqu_mg_scholarship": prefix + 'lists',
  "get_liuxuezhuanqu_yg_left" : prefix + 'lists',
  "get_liuxuezhuanqu_yg_middle": prefix + 'lists',
  "get_liuxuezhuanqu_yg_scholarship": prefix + 'lists',
  "get_liuxuezhuanqu_jnd_left" : prefix + 'lists',
  "get_liuxuezhuanqu_jnd_middle": prefix + 'lists',
  "get_liuxuezhuanqu_jnd_scholarship": prefix + 'lists',
  "get_liuxuezhuanqu_az_left" : prefix + 'lists',
  "get_liuxuezhuanqu_az_middle": prefix + 'lists',
  "get_liuxuezhuanqu_az_scholarship": prefix + 'lists',
  "get_liuxuezhuanqu_xxl_left" : prefix + 'lists',
  "get_liuxuezhuanqu_xxl_middle": prefix + 'lists',
  "get_liuxuezhuanqu_xxl_scholarship": prefix + 'lists',
  "get_liuxuezhuanqu_yz_left" : prefix + 'lists',
  "get_liuxuezhuanqu_yz_middle": prefix + 'lists',
  "get_liuxuezhuanqu_yz_scholarship": prefix + 'lists',
  "get_liuxuezhuanqu_oz_left" : prefix + 'lists',
  "get_liuxuezhuanqu_oz_middle": prefix + 'lists',
  "get_liuxuezhuanqu_oz_scholarship": prefix + 'lists',
  "get_liuXueGuWen": prefix + 'sql',
  "get_meiTiBaoDao": prefix + 'lists',
  "get_shenqingfangan_recommend": prefix + 'fangan_recommend',
  "get_shenqingfangan_mg": prefix + 'fangan_country',
  "get_shenqingfangan_yg": prefix + 'fangan_country',
  "get_shenqingfangan_jnd": prefix + 'fangan_country',
  "get_shenqingfangan_az": prefix + 'fangan_country',
  "get_shenqingfangan_xxl": prefix + 'fangan_country',
  "get_shenqingfangan_yz": prefix + 'fangan_country',
  "get_shenqingfangan_oz": prefix + 'fangan_country',
  //"get_liuxuehuodong": prefix + 'liuxuehuodong',
  //签证指南
  "get_qianzhengzhinan": prefix + 'qianzhengzhinan',
  //最新咨询
  "get_zuixinzixun": prefix + 'common_recommend',
  //活动预告
  "get_zuixinzixun_list": prefix + 'zuixinzixun_list',
  "get_huodongyugao": prefix + 'common_recommend',
  //明星顾问
  "get_mingxingguwen": prefix + 'common_recommend',
  //栏目列表
  "get_channel_list": shequ_prefix + 'article/list/',
  //成功案例侧栏
  "get_chenggonganli": prefix + 'common_recommend',
  //专家解读
  "get_zhuanjiajiedu": prefix + 'common_recommend',
  //金牌顾问
  "get_wecenter":prefix + 'common_recommend',
  //增值服务
  "get_zengzhifuwu_list": prefix + 'common_recommend',
  //大学排名
  "get_daxuepaiming": prefix + 'common_recommend',
  //大学排名列表
  "get_daxuepaiming_list": prefix + 'daxuepaiming_list',
  //留学社区
  "get_liuxueshequ": prefix + 'liuxueshequ',
  //留学聚焦
  "get_liuxuejujiao": prefix + 'common_recommend',
  //专题
  "get_zhuanti": prefix + 'common_recommend',
  //留学专题
  "get_liuxuezhuanti": prefix + 'liuxuezhuanti',
  //精彩专题
  "get_jingcaizhuanti": prefix + 'jingcaizhuanti',
  //热门专业
  "get_remenzhuanye": prefix + 'remenzhuanye',
  //专业推荐
  "get_zhuanyetuijian_list": prefix + 'zhuanyetuijian_list',
  "get_zhuanyetuijian": prefix + 'common_recommend',
  //热门院校
  "get_remenyuanxiao": prefix + 'common_recommend',
  //院校推荐
  "get_yuanxiaotuijian_list": prefix + 'yuanxiaotuijian_list',
  //首页---->申请案例
  "get_shengqinganli_list": prefix + 'shengqinganli_list',
  //栏目综合页---->栏目］留学奖学金
  "get_liuxuejiangxuejin_list": prefix + 'liuxuejiangxuejin_list',
  //栏目综合页---->留学方案（不带学历）
  "get_liuxuefangan_list": prefix + 'liuxuefangan_list',
  //栏目综合页---->［栏目］媒体播报
  "get_meitibobao_list": prefix + 'meitibobao_list',
  //栏目综合页---->［栏目］留学常见问题
  "get_lxcjquestion_list": prefix + 'lxcjquestion_list',
  //学历频道页---->留学常见问题
  "get_lxcjquestion": prefix + 'common_recommend',
  //产品频道----> 最新留学方案初始化接口
  "get_new_liuxuefangan_init": prefix + 'new_liuxuefangan_init',
  //栏目综合页---->详情页通用接口
  "get_detail": prefix + 'detail',
  //栏目综合页---->［栏目］国家介绍
  "get_country_introduce_list": prefix + 'country_introduce_list',
  //国家频道---->国家介绍
  //"get_country_introduce": prefix + 'country_introduce',
  "get_country_introduce": prefix + 'common_recommend',

  "get_contact_way_list": prefix + 'contact_way_list',

  "get_memorabilia_list": prefix + 'memorabilia_list',

  "get_company_culture_list": prefix + 'company_culture_list',

  "get_business_cooperation_list": prefix + 'business_cooperation_list',
  //留学活动列表
  "get_liuxuehuodong_list": prefix + 'liuxuehuodong_list',
  //文案团队
  "get_wenantuandui_list": prefix + 'wenantuandui_list',
  //国家频道---》留学方案
  //"get_country_liuxuefangan_list": prefix + 'country_liuxuefangan_list',
  "get_country_liuxuefangan_list": prefix + 'common_recommend',
  //学历频道 ---》热门留学方案
  "get_hot_liuxuefangan_list": prefix + 'common_recommend',
  //产品频道----> 最新留学方案（带学历）
  "get_new_liuxuefangan_list": prefix + 'new_liuxuefangan_list',
  //产品频道----> 亚洲 欧洲 聚合
  "get_countryLiuxuefanganRecommend":prefix + 'countryLiuxuefanganRecommend',
  //近期精彩活动
  "get_new_jingcaihuodong_list":prefix + "newshuodong",
  //活动预告
  "huodongyugao": prefix + 'huodongyugao',
  //页面轮播图
  "get_lunbo_list": prefix + 'lunbo_list',
  //分公司首页----》媒体播报
  "get_meitibobao": prefix + 'common_recommend',
  //分公司首页----》增值服务
  "get_zengzhifuwu": prefix + 'common_recommend',
  //分公司首页----》留学社区
  "get_home_liuxueshequ": prefix + 'common_recommend',
  //分公司首页----》留学聚焦
  "get_home_liuxuejujiao": prefix + 'common_recommend',
  //首页留学专区推荐
  "get_liuxuezhuanqu_rec": prefix + 'liuxuezhuanqu_rec',
  //首页留学专区推荐位
  "get_liuxuezhuanqu_country": prefix + 'liuxuezhuanqu_country',
  //首页推荐位－>l大学排名推荐位
  "get_daxuepaiming_recommend": prefix + 'daxuepaiming_recommend',
  //文章评论
  "get_reviewArticle": shequ_prefix + 'article/save_comment/',
  // 获取用户信息（普通用户，顾问，参赞）
  "get_userinfo": shequ_prefix + 'account/info/',
  //用户中心-我的关注
  "get_user_follow": shequ_prefix + 'account/friends/',
  //顾问中心-关注我的
  "get_follow_list": shequ_prefix + 'account/fans/',
  //个人中心-收到的评论
  "get_comment_list": shequ_prefix + 'account/comments_to_me/',
  //文章详情
  "get_article":shequ_prefix + 'article/',
  //用户相册
  "get_album_list": shequ_prefix + 'account/album_list/',
  //发布文章
  "post_publish_article": shequ_prefix + 'publish/publish_article/',
  //关注用户
  "follow_people": shequ_prefix + 'account/follow_people/',
  //回复文章评论
  "post_save_comment_ans":shequ_prefix + 'article/save_comment_ans/',
  //删除文章接口
  "post_delete_article": shequ_prefix + 'article/remove_article/',
  //回复列表
  "get_comment_ans":shequ_prefix + 'article/comment_ans/',
  //分页获取评论article_comments
  "get_article_comments":shequ_prefix +'article/article_comments/',
  //添加相册接口
  "post_album_add": shequ_prefix + 'account/album_add/',
  //编辑相册接口
  "post_album_update": shequ_prefix + 'account/album_update/',
  //删除相册接口
  "post_album_del": shequ_prefix + 'account/album_del/',
  //草稿箱发布接口
  "post_draft_to_article":shequ_prefix +'article/draft_to_article/',
  //收藏列表
  "get_collection_list":shequ_prefix + 'account/favorite_list/',
  //站内消息
  "get_msg_list": prefix + 'webmailList',
  //图片库
  "get_attachment":prefix + 'attachment',
  //删除评论接口
  "post_remove_comment":shequ_prefix+'article/remove_comment/',
  //删除回复接口
  "post_remove_comment_ans":shequ_prefix+'article/remove_comment_ans/',
  //院校搜索
  "get_search_school":shequ_prefix+'search/search_school/',
};
module.exports = {
  redisCache: redisCache,
  apis : apis,
  wwhost: wwhost,
  cdnhost: cdnhost,
  imageshost: imageshost
};