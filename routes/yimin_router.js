/**
 * Created by DXZ-Shuqin.Wang on 2018/3/12.
 */
var controller = require('./controller.js');
exports = module.exports = function (app) {// routes
    //����վ
    app.get('/',function(req,res,next){
        res.send('aaa')
    });//������ҳ
    app.get('/yimin',controller.yiminHome);//������ҳ
};
