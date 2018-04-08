/**
 * Created by DXZ-Shuqin.Wang on 2018/3/12.
 */
var controller = require('./controller.js');
var login = require('./login.js');
exports = module.exports = function (app) {// routes
    //����վ
   /* app.get('/',function(req,res,next){
        res.send('aaa')
    });//������ҳ*/
    app.get('/',controller.yiminHome);//������ҳ
    //��ͨ�û���¼
    app.post('/login_user', login.login_user);
    app.get('/param_code',login.param_code);//生成图片验证码
    app.post('/session_param_code',login.check_param_code)//验证图片验证码
};
