/**
 * Created by DXZ-Shuqin.Wang on 2018/3/12.
 */
var controller = require('./controller.js');
exports = module.exports = function (app) {// routes
    //移民站
    app.get('/',function(req,res,next){
        res.send('aaa')
    });//移民首页
    app.get('/yimin',controller.yiminHome);//移民首页
};
