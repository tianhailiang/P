var rewrite = require('express-urlrewrite');
var URL = require('url');

function url_rewrite(app) {
  url_decode(app);
}


function url_decode(app) {
  app.use(function(req, res, next) {
    var url = req.url;
    url = url.replace(/\.html/g, "");
    req.url = req.originalUrl = url;
    req.query = URL.parse(req.url, true).query;
    next('route');
  });
}

function replaceChat(source,pos,newChar){
  if(pos<0||pos>=source.length||source.length==0){
    return "invalid parameters...";
  }
  var iBeginPos= 0, iEndPos=source.length;
  var sFrontPart=source.substr(iBeginPos,pos);
  var sTailPart=source.substr(pos+1,source.length);
  var sRet=sFrontPart+newChar+sTailPart;
  return sRet;
}

module.exports = url_rewrite;
