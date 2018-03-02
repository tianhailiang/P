/**
 * Support simple Bigpipe
 * Created by Winson on 2018/3/1.
 */
var chars = ['0','1','2','3','4','5','6','7','8','9',
  'A','B','C','D','E','F','G','H','I','J','K','L','M',
  'N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

function genrandom(n) {
  var res = "";
  for(let i = 0; i < n ; i ++) {
    var id = Math.ceil(Math.random()*35);
    res += chars[id];
  }
  return res;
}

var resproto = require('express/lib/response')
resproto.pipe = function (selector, html, replace) {
  var defjs = '$("#' + selector + '").' + 'replaceWith' +
    '("' + html.replace(/"/g, '\\"').replace(/<\/script>/g, '<\\/script>') +
    '")'

  var layjs = '<script>' + 'require(["' + '\/static\/htmlaz.js' +'"],function (lz) {' +
    'lz.add(document.getElementById("' + selector + '"),function() {' + defjs + '})})</script>'

  this.write(layjs)
}

function PipeLayer (res, name) {
  res.pipeCount = res.pipeCount || 0
  res.pipeMap = res.pipeMap || {}
  if (res.pipeMap[name]) return
  res.pipeCount++
  res.pipeMap[name] = this.id = 'layer_' + res.pipeCount.toString() + genrandom(5);
  this.res = res
  this.name = name
}

resproto.pipelayer = function (name) {
  return new PipeLayer(this, name)
}

resproto.layout = function (options) {
  var res = this
  res.layernum = options ;
}

resproto.quickly = function (view, options) {
  var res = this
  res.layernum = res.layernum || 0;
  options.lazyopt_ = options.lazyopt_ || [];
  for(let i=0; i < res.layernum;i++){
    options.lazyopt_[i] = res.pipelayer('layer'+ (i+1)).id
  }

  res.render(view, options, function (err, str) {
    if (err) return res.req.next(err)
    res.setHeader('content-type', 'text/html; charset=utf-8')
    res.write(str)
    if (!res.pipeCount) res.end()
  })
}

resproto.pagelet = function (name, view, options) {
  var res = this
  if(res.layernum == undefined || res.layernum == 0) return;
  res.render(view, options, function (err, str) {
    if (err) return res.req.next(err)
    res.pipe(res.pipeMap[name], str.replace(/\r|\n|\r\n/g, ''), true)
    --res.pipeCount || res.end()
  })
}

module.exports = resproto;