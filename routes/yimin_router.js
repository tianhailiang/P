/**
 * Created by DXZ-Shuqin.Wang on 2018/3/12.
 */
var controller = require('./controller.js');
var login = require('./login.js');
exports = module.exports = function (app) {// routes
    //移民站
   /* app.get('/',function(req,res,next){
        res.send('aaa')
    });//移民首页*/
    app.get('/',controller.yiminHome);//移民首页
    //普通用户登录
    app.post('/login_user', login.login_user);
};
