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
};
