/**
 * Created by DXZ-Shuqin.Wang on 2018/4/8.
 */
var redisCache = {
    "host": "jjl-redis.3p6fml.0001.cnn1.cache.amazonaws.com.cn",
    "port":6379
};
var domain = '.jjl.cn';
var wwhost = 'http://www.jjl.cn';
var yiminhost = 'http://yimin.jjl.cn';
var cdnhost = '';
var prefix = 'http://internal-jjl-elb-api-1494687011.cn-north-1.elb.amazonaws.com.cn/cms/api/';
var uc_prefix = 'http://internal-jjl-elb-api-1494687011.cn-north-1.elb.amazonaws.com.cn/uc/api/';
var shequ_prefix = 'http://internal-jjl-elb-api-1494687011.cn-north-1.elb.amazonaws.com.cn/so/?/api/';
var imageshost = 'http://images.jjl.cn';
if (process.env.NODE_ENV == 'development') {
    cdnhost = 'http://www.jjl.cn:4000';
}
else if (process.env.NODE_ENV == 'production') {
    cdnhost = 'http://cdn4.jjl.cn';
}
module.exports = {
    redisCache:redisCache,
    domain:domain,
    wwhost:wwhost,
    yiminhost:yiminhost,
    cdnhost:cdnhost,
    prefix:prefix,
    uc_prefix:uc_prefix,
    shequ_prefix:shequ_prefix,
    imageshost:imageshost
}