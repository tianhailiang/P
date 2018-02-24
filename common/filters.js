/**
 * Created by Winson on 17/7/28.
 */

'use strict';
var moment = require('moment');
var common = require('./common');
var config = require('../config/config')
// filters add here
var customFilters = {
  shorten: function(str, count) {
      if (str) {
          return str.slice(0, count || 5);
      }
  },
  //显示一定长度的字符，超过一定长度显示省略号
  ellipsis: function (str, count) {
    var resultStr = '';
    if (str) {
        if (str.length > (count || 116)) {
            var sliceStr = str.slice(0, count || 116);
            resultStr = sliceStr + '...';
        }
        else {
            resultStr = str;
        }
    }
    return resultStr;
  },
  getDefaultFormat: function (str, count) {
    return moment.unix(str).format(count || 'YYYY-MM-DD');
  },
  //时间戳格式化
  timeStampFormat: function (str) {
    var y = moment.unix(str).format('YYYY');
    var month = moment.unix(str).format('M');
    var m = month > 10 ? month : month.substr(0, 1);
    var d = moment.unix(str).format('DD');
    var time = moment.unix(str).format('HH:mm');
    return y + '年' + month + '月' + d + '日' + ' ' + time;
  },
  getHuodongTimeFormat: function (str, count) {
    return moment.unix(str).format(count || 'MM.DD');
  },
  //截取字符串
  substrs:function(str,count){
    return str.substring(count)
  },
  //根据id获取国家名
  getCountry: common.getCountryChinese,
  //根据id获取国家名
  getCountryyimin: common.getCountryChinese,
  getCountryEn: common.getCountryEn,
  getCountryId: common.getCountryId,
  getCity: common.getCityChinese,
  getCitys: common.getCityEn,
  getCityId: common.getCityId,
  getEdu: common.getEduName,
  getProject: common.getProjectName,
  //路径追溯url
  urlsource: function (url, source) {
    var resultUrl = '';
    if (url.indexOf("&") == -1) {
      resultUrl += '?' + source;
    }
    else {
      resultUrl += '&' + source
    }
    return resultUrl;
  },
  //表情过滤
  replace_em:function(str){
    str = str.replace(/\</g,'&lt;');
    str = str.replace(/\>/g,'&gt;');
    str = str.replace(/\n/g,'<br/>');
    str = str.replace(/\[em_([0-9]*)\]/g,'<img src="'+config.cdnhost+'/assets/img/gif/$1.gif" border="0" />');
    return str;
  }
}
function loadfilters(env = null) {
  var envwrap = env;
  for(var name in customFilters) {
    envwrap.addFilter(name, customFilters[name]);
  }
}
module.exports.load = loadfilters;
