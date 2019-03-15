/**
 * Created by DXZ-Weijiu.Wang on 2017/8/3.
 */

var moment = require('moment');
var config = require('../config/config');
var common = require('./common');

function strcut(str, count) {
  return str.slice(0, count || 5);
}
function getDefaultFormat (str, count) {
  return moment.unix(str).format(count || 'YYYY-MM-DD');
}
/**
 * 常规url拼装  开发、测试区分
 */
function paramurlgen() {
  var isyimin = false;
  var url = '',chan = '',param = '',nation = '',city = '',nationid='',cityid='';
  if(arguments.length == 0){
    return ;
  }
  //get chan & subchan
  for(var i= 0 ; i < arguments.length;i++){
    if(i == 0 && arguments[i] == 'yimin'){
      isyimin = true;
      continue;
    }
    if(arguments[i] == '' || arguments[i].split('=').length > 1)
    {
      break;
    }
    else
    {
      chan += '/' + arguments[i];
    }
  }
  // i is hold
  for(i; i < arguments.length;i++){
    if (nationid = seo_to_url(arguments[i], 'n')) {
      nation = common.getCountryEn(nationid);
    }
    if (cityid = seo_to_url(arguments[i], 'c')) {
      if (chan.match(/^\/news(\w*)/) && cityid == 0) { //城市资讯（全国）cityid为0
        city = 0;
      }
      else {
        city = common.getCityEn(cityid);
      }
    }
    if(!nationid && !cityid && arguments[i] != ''){
      /*过滤默认参数 start*/
      var can_type = arguments[i].split('=')[0];
      var can_val = arguments[i].split('=')[1];
      if (((can_type == 'order') && (can_val == 1 || can_val == 'score'||  can_val == 'score desc')) || ((can_type == 'page') && (can_val == 1)) || ((can_type == 'crowd') && (can_val == 0))  || ((can_type == 'time') && (can_val == 0)) || ((can_type == 'e') && (can_val == 0)) || ((can_type == 'serve') && (can_val == 0)) || ((can_type == 't') && (can_val == 1)) ) {
        continue;
      }
      /*过滤默认参数 end*/
      if (param == '') {
        param += '/' + arguments[i].replace(/=/g, "-");
      }
      else {
        param += '__' + arguments[i].replace(/=/g, "-");
      }
    }
  }
  if(chan.match(/yimin/g)){
    url += "/yimin"+(city?"/"+city:"") + ((nation && nation != 'all')?"/"+nation:"") + chan.replace(/\/yimin/, "") + param + ".html";
  }else{
    if (chan.match(/^(.*)schoollib(.*)$/)) {
      url += ((nation && nation != 'all')?"/"+nation:"/") + chan.replace(/\//,"") + param + ".html";
    }
    else if (chan == '/nationrank'&& !isyimin) {
      url += ((nation && nation != 'all')?"/"+nation:"");
    }
    else {
      url += ((city && city != 0)?"/"+city:"") + ((nation && nation != 'all')?"/"+nation:"") + chan + param + ".html";
    }
  }
  //url += (city?"/"+city:"") + (nation?"/"+nation:"") + chan + param + ".html";
  if(url == "/.html"  ||  url=='.html'){
    url = "/";
  }
  if (/\/zt\//.test(url)) {
    if (/index/.test(url)) {
      url += '.html'
    }
  }
  else if(!exits_static_page(chan + param + ".html")){
    url = url.replace(/\.html/g, "");
  }else{
    if(chan=='/branch_home'){
      url = url.replace(/branch_home.html/g, "");
      url = url.replace(/branch_home/g, "");
    }
  }
  //liuxue
  if (!isyimin && config.version == 'development') { //如果是開發環境
    if( (chan.indexOf('/p/') != -1 || chan.indexOf('/p1/') != -1 || chan.indexOf('/article/') != -1 || chan.indexOf('/case/') != -1 || chan.indexOf('center') != -1 || chan.match(/^\/p$/) || chan.indexOf('/blog') != -1 ) && chan.indexOf('/yimin/')==-1 && chan.indexOf('/canzan')==-1) {
      url = config.wwhost + ':4000' + url;//social
    }
    else {
      url = config.wwhost + ':4000' + url;//web
    }
  }

  //yimin
  if (isyimin && config.version == 'development') { //如果是開發環境
    url = 'http://' + config.yiminhostname + ':3000' + url;//web
  }
  return url;
}
function active_urlgen(){
  var url = '',chan = '',param = '',nation = '',city = '',nationid='',cityid='';
  if(arguments.length == 0){
    return ;
  }
  //get chan & subchan
  for(var i= 0 ; i < arguments.length;i++){
    if(arguments[i] == '' || arguments[i].split('=').length > 1)
    {
      break;
    }
    else
    {
      chan += '/' + arguments[i];
    }
  }
  // i is hold
  for(i; i < arguments.length;i++){
    if (cityid = seo_to_url(arguments[i], 'c')) {
      city = common.getCityEn(cityid);
    }
    if(!cityid && arguments[i] != ''){
      /*过滤默认参数 start*/
      var can_type = arguments[i].split('=')[0];
      var can_val = arguments[i].split('=')[1];
      if (((can_type == 'order') && (can_val == 1 || can_val == 'inputtime' ||  can_val == 'inputtime desc' ||  can_val == 'add_time desc' ||  can_val == 'score')) || ((can_type == 'page') && (can_val == 1)) || ((can_type == 'crowd') && (can_val == 0))  || ((can_type == 'time') && (can_val == 0)) || ((can_type == 'e') && (can_val == 0)) || ((can_type == 'serve') && (can_val == 0)) || ((can_type == 't') && (can_val == 1)) || ((can_type == 'n') && (can_val == 0)) || ((can_type == 'type') && (can_val == '全部' || can_val == '')) || ((can_type == 'tag') && (can_val == '全部'|| can_val == '')) ) {
        continue;
      }
      /*过滤默认参数 end*/
      if (param == '') {
        param += '/' + arguments[i].replace(/=/g, "-");
      }
      else {
        param += '__' + arguments[i].replace(/=/g, "-");
      }
    }
  }
  url += ((city && city != 0)?"/"+city:"") + chan + param+'.html';
  if (/\/zt\//.test(url)) {
    if (/index/.test(url)) {
      url += '.html'
    }
  }
  else if(!exits_static_page(chan + param + ".html")){
    url = url.replace(/\.html/g, "");
  }
  if (config.version == 'development') { //如果是開發環境
    url = config.wwhost + ':4000' + url;//web
  }
  return url;
}
/**
 * url拼装  开发、测试区分
 */
function urlgen() {
  var isyimin = false;
  var url = '',chan = '',param = '',city='',cityid='';
  if(arguments.length == 0){
    return ;
  }
  //get chan & subchan
  for(var i= 0 ; i < arguments.length;i++){
    if(i == 0 && arguments[i] == 'yimin'){
      isyimin = true;
      continue;
    }
    if(arguments[i] == '' || arguments[i].toString().split('=').length > 1)
    {
      break;
    }
    else
    {
      chan += '/' + arguments[i];
    }
  }
  // i is hold
  for(i; i < arguments.length;i++){
    if (cityid = seo_to_url(arguments[i], 'c')) {
      city = common.getCityEn(cityid);
    }
    if(!cityid && arguments[i] != '') {
      continue;
    }
    if (param == '') {
      param += '/' + arguments[i].replace(/=/g, "-");
    }
    else {
      param += '__' + arguments[i].replace(/=/g, "-");
    }
  }
  url += chan + param;
  if (isyimin) {
    if (config.version == 'development') { //如果是開發環境
      url = config.yiminhost + ':4600' + url;
    }else{
      url = config.yiminhost + url;
    }
    return url;
  }
  else {
    if(chan=='/branch_home'){
      url = ((city && city != 0)?"/"+city:"")+"/";
    }
    if(url.match(/^(.*)\/article\/(\d+)$/g) || url.match(/^(.*)\/case\/(\d+)$/g)|| url.match(/(culture|events|cooperation|contact|canzan|lawyer)/)){
      url = url + '.html';
    }
    if (config.version == 'development') { //如果是開發環境
      url = config.wwhost + ':4000' + url;
    }else{
      url = config.wwhost + url;
    }
    return url;
  }
}

function articleUrlgen(){
  var url = '',chan = '',param = '';
  //get chan & subchan
  for(var i= 0 ; i < arguments.length;i++){
    if(arguments[i] == '' || arguments[i].split('=').length > 1)
    {
      break;
    }
    else
    {
      chan += '/' + arguments[i];
    }
  }
  for(i; i < arguments.length;i++){
    /*过滤默认参数 end*/
    if (param == '') {
      param += '/' + arguments[i].replace(/=/g, "_");
    }
  }
  url = chan + param + ".html";
  if (config.version == 'development') { //如果是開發環境
      url = config.wwhost + ':4000' + url;//social
  }
  return url;
}
//转换url中国家及城市字段
function seo_to_url(arguments, agtype) {
  var data = "";
  if(arguments.indexOf("=") >= 0 ){
    //判断是否存在n=?国家数据
    if(agtype == "c"){
      var regData = arguments.match(/c=(\w+)/g);
    }else if(agtype == "n"){
      var regData = arguments.match(/n=(\w+)/g);
    }
    //console.log("nation", nationData);
    if(regData){
      var n = regData[0].split("=");
      data = n[1];
      return data;
    }else{
      return "";
    }
  }else{
    return "";
  }
}
/**
 * 区分静态和伪静态， 伪静态中n变量需要存在不能去掉
 */
function exits_static_page(path) {
  var reg_list = path.match(/^((?!yimin).*)\/(glue|news|countrynews|focus|visa|prereq|cost|nation|recommand|interpret|scholarship|media|eduquestion|school|adviser|activity|case|schoollib|yimin|product|special|chief)(\/*)((?![0-9])[0-9A-Za-z\-_%]*).html$/g);

  var rank = path.match(/^(.*)\/(nationrank|productrank|schoolrank).html$/g);
  var edu = path.match(/^(.*)\/(under|middle|master|team|canzan|blog).html$/g);
  var so_reg = path.match(/^\/(blog)\/(\d+).html$/g);
  var so_center = path.match(/^\/(advisor_center|canzan_center|user_center|login|register|forget|blog)((?!rereq)(?!roduct).*).html$/g);
  //移民好文精选
  var yimin_reg = path.match(/^\/(news|case)\/order-hits.html$/g);
  var yimin_list_reg = path.match(/^\/(news|interpret|activity|case).html$/g);

  var schoolrank_list = path.match(/^\/(schoolrank)[0-9A-Za-z\-_/]*.html$/g);
  var so_pigination = path.match(/^((?!yimin).*)\/(so_activity|so_case|so_news|so_school|so_advisor|so_article|yimin_so_article|yimin_so_advisor|articles|case)(.*).html$/g);
  if((reg_list || so_reg || so_center || yimin_reg || yimin_list_reg || schoolrank_list || so_pigination || edu) && !rank){
    return false;
  }
  return true;
}

function prefixInteger(num, length) {
  return (Array(length).join('0') + num).slice(-length);
}
//用户头像url组装
function avaterimg(uid, size, status, version,usertype){
  uid = prefixInteger(uid, 9);
  var dir1 = uid.substr(0, 3);
  var dir2 = uid.substr(3, 2);
  var dir3 = uid.substr(5, 2);
  if(version == 0 || version == null){
    if (usertype == 1) {
      return 'http://images.jjl.cn/avatar/default_avatar_small.jpg'
    }
    else {
      return 'http://images.jjl.cn/avatar/default_jjl.png'
    }
  }else{
    if (version == 1) {
      return config.imageshost + '/avatar/' + dir1+'/'+dir2+'/'+dir3+'/'+uid.substring(uid.length-2)+"_avatar_"+size+".jpg";//ie8不兼容uid.substr(-2)
    }
    else {
      return config.imageshost + '/avatar/' + dir1+'/'+dir2+'/'+dir3+'/'+uid.substring(uid.length-2)+"_avatar_"+size+"_"+ version +".jpg";//ie8不兼容uid.substr(-2)
    }
  }
}
//成功案例院校logo
function school_logo (school_id) {
  if (school_id == null) {
    console.log('学校id没有啊没有啊#######');
  }
  else {
    return config.imageshost + '/content/school/logo_' + school_id + '.jpg';
  }
}
//获取页面TDK数据
function pageTDK(flag, tdkParam) {
  //console.log('tdkParam', tdkParam);
  var node_cache = require('memory-cache');
  var tdkData = node_cache.get('pageTDK');
  var tdkDefault = require('../tdk/tdk_conf');
  var tdk_string = '';
  var page_name = tdkParam.pagekey;
  var nationid = tdkParam.nationid;
  var cityid = tdkParam.cityid;
  var title = tdkParam.title;
  var description = tdkParam.description;
  var keywords = tdkParam.keywords;
  var pageNum = tdkParam.pageNum;
  var realname = tdkParam.realname;
  var edu = tdkParam.edu;
  var tag = tdkParam.tag;

  if(!page_name){
    //console.log("page_name is null !");
    tdk_string = tdkDefault.default_tdk[flag];
  }else{
    if(tdkData){
      //console.log("tdkData is not null !");
      if(tdkData[page_name]){
        if(tdkData[page_name][flag]){
          tdk_string = tdkData[page_name][flag];
        }else{
          tdk_string = tdkDefault.default_tdk[flag];
        }
      }else {
        tdk_string = tdkDefault.default_tdk[flag];
      }
    }else {
      //console.log("tdkData is null !");
      tdk_string = tdkDefault.default_tdk[flag];
    }
  }
  var nationName = '', cityName = '';
  if(nationid){
    var nationName = common.getCountryChinese(nationid);
  }
  if(cityid){
    var cityName = common.getCityChinese(cityid);
  }
  return tdk_param_replace(tdk_string, nationName, cityName, title, description, keywords, pageNum, realname, edu, tag);
}

function tdk_param_replace(tdk_string, nationName, cityName, title, description, keywords, pageNum, realname, edu, tag) {
  var ret = tdk_string;
  if(nationName){
    ret = ret.replace(/\{nationName\}/g, nationName);
  }else{
    ret = ret.replace(/\{nationName\}/g, "");
  }
  if(cityName){
    ret = ret.replace(/\{cityName\}/g, cityName);
  }else{
    ret = ret.replace(/\{cityName\}/g, "");
  }
  if(title){
    ret = ret.replace(/\{title\}/g, title);
  }else{
    ret = ret.replace(/\{title\}/g, "");
  }
  if(description){
    ret = ret.replace(/\{description\}/g, description);
  }else{
    ret = ret.replace(/\{description\}/g, "");
  }
  if(keywords){
    ret = ret.replace(/\{keywords\}/g, keywords);
  }else{
    ret = ret.replace(/\{keywords\}/g, "");
  }

  if(edu){
      ret = ret.replace(/\{edu\}/g, edu);
  }else{
      ret = ret.replace(/\{edu\}/g, "");
  }

  if(tag){
      ret = ret.replace(/\{tag\}/g, tag);
  }else{
      ret = ret.replace(/\{tag\}/g, "");
  }

  //替换字符串中的{realname}
  if(realname){
    ret = ret.replace(/\{realname\}/g, realname);
  }else{
    ret = ret.replace(/\{realname\}/g, "");
  }

  if(edu){
      ret = ret.replace(/\{edu\}/g, edu);
  }else{
      ret = ret.replace(/\{edu\}/g, "");
  }

  //替换year
  var date=new Date;
  var year=date.getFullYear();
  ret = ret.replace(/\{year\}/g, year);

  if(pageNum){
    if(pageNum > 1){
      ret = ret.replace(/\{pageNum\}/g, pageNum);
    }else{
      ret = ret.replace(/\{pageNum\}/g, "");
    }
  }else{
    ret = ret.replace(/\{pageNum\}/g, "");
  }
  return ret;
}

//图片缩略图 拼装
function imageThumb(imageUrl, spec, isyimin) {
  if(imageUrl !=undefined && imageUrl != ''){
    if(spec){
      if (isyimin && isyimin == 2) {
        return imageUrl + "!ym" + spec;
      }
      else {
        return imageUrl + "!" + spec;
      }
    }else {
      return imageUrl;
    }
  }
}

function esiurlformat(args) {
  var chan = '',param = '';
  if(args.length < 2){
    return '';
  }
  //get chan & subchan
  for(var i= 1 ; i < args.length;i++){
    if(args[i].split('=').length > 1)
    {
      chan +=  '?' + args[i];
      break;
    }else{
      chan += '/' + args[i];
    }
  }
  // i is hold
  for(i+=1; i < args.length;i++){
    param += '&' + args[i];
  }
  console.log(args[0] + '!' + chan + param)
  return args[0] + '!' + chan + param;
}

function esinclude(){
  return esiurlformat(arguments);
}

function getLink(pageKey) {
  var node_cache = require('memory-cache');
  var tdkLink = node_cache.get('pageLink');
  //console.log("link list ",tdkLink);
 // console.log(pageKey+"link  ",tdkLink[pageKey]);
  if(tdkLink && tdkLink[pageKey]){
    return tdkLink[pageKey];
  }else{
    return "";
  }
}

//学历标签选中函数
function eduChecked(val,checkedList){
  var html =`<span class="level-sel" >
              <i class="level-sel-i iconfont"></i>
              <i>${val}</i>
            </span>`;
  if(checkedList==undefined){
     checkedList = []
  }else{
    checkedList =checkedList.split(',');
  }
  for (let item of checkedList) {
    if(val == item){
      html = `<span class="level-sel" checked="checked">
                <i class="level-sel-i iconfont" style="border:none;color:#c13232;margin-right:7px;font-size:16px;">&#xe640;</i>
                <i>${val}</i>
              </span>`;
    }
  }
  return html;
}
//推荐标签选中函数
function tagChecked(name,val,checkedList,checkedCountryId){
  var html ='';
  var specialStyle = '';  
  var specialId = '';
  if (name == "QS排名") {
    specialStyle ="style='margin-right:38px;'"
  }
  if (name == '动漫留学') {
    specialId = "id='special-tag'";
    if (checkedCountryId != 51) {
      html =`<span class="recommend-sel" data-str="${val}" ${specialStyle} ${specialId} style="display:none;">
            <i class="level-sel-i iconfont"></i>
            <i>${val}</i>
          </span>`;
    }
    else {
      html =`<span class="recommend-sel" data-str="${val}" ${specialStyle} ${specialId}>
            <i class="level-sel-i iconfont"></i>
            <i>${val}</i>
          </span>`;
    }    
  }
  else {
    html =`<span class="recommend-sel" data-str="${val}" ${specialStyle} ${specialId}>
            <i class="level-sel-i iconfont"></i>
            <i>${val}</i>
          </span>`;       
  }
  if(name=="留学案例"){
    html =`<span class="recommend-sel" style="display: block;" data-str="${val}" id="recommend-sel-case">
            <i class="level-sel-i iconfont"></i>
            <i>${val}</i>
            <i class="numTip" style="margin-left:30px;">
            注：选中【留学案例】标签即发布至顾问个人主页-案例中
            </i>
          </span>`;
  }
  if(name=="自定义标签"){
    html =`<div  style="display: block;">
            <span class="recommend-sel" style="margin-right: 0px;" data-str="${val}" id="recommend-sel-custom">
              <i class="level-sel-i iconfont"></i>
              <i>自定义标签</i>
            </span>
            <input class="recommend-input" maxlength="5" type="text" placeholder="请输入您的自定义标签" id ="recommend-input" />
          </div>`;
  }
  if(checkedList==undefined){
     checkedList = []
  }else{
    checkedList =checkedList.split('/');
  }
  for (let item of checkedList) {
    if(val == item){
      if (name == "QS排名") {
        specialStyle ="style='margin-right:38px;'"
      }
      if (name == '动漫留学') {
        specialId = "id='special-tag'";
        if (checkedCountryId != 51) {
          html = `<span class="recommend-sel" checked="checked" data-str="${val}" ${specialStyle} ${specialId} style="display:none;">
                  <i class="level-sel-i iconfont" style="border:none;color:#c13232;
                  margin-right:7px;font-size:16px;line-height:18px;">&#xe640;</i>
                  <i>${val}</i>
                </span>`;
        }
        else {
          html = `<span class="recommend-sel" checked="checked" data-str="${val}" ${specialStyle} ${specialId}>
                  <i class="level-sel-i iconfont" style="border:none;color:#c13232;
                  margin-right:7px;font-size:16px;line-height:18px;">&#xe640;</i>
                  <i>${val}</i>
                </span>`;
        }
      }
      else {
        html = `<span class="recommend-sel" checked="checked" data-str="${val}" ${specialStyle} ${specialId}>
                  <i class="level-sel-i iconfont" style="border:none;color:#c13232;
                  margin-right:7px;font-size:16px;line-height:18px;">&#xe640;</i>
                  <i>${val}</i>
                </span>`;
      }
      if(name=="留学案例"){
        html =`<span class="recommend-sel" style="display: block;" data-str="${val}" checked="checked" id="recommend-sel-case">
                <i class="level-sel-i iconfont" style="border:none;color:#c13232;
                margin-right:7px;font-size:16px;line-height:18px;">&#xe640;</i>
                <i>${val}</i>
                <i class="numTip" style="margin-left:30px;">
                注：选中【留学案例】标签即发布至顾问个人主页-案例中
                </i>
              </span>`;
      }
      if(name=="自定义标签"){
        console.log(val)
        html =`<div  style="display: block;">
            <span class="recommend-sel" style="margin-right: 0px;" data-str="" checked="checked" id="recommend-sel-custom">
              <i class="level-sel-i iconfont" style="border:none;color:#c13232;
                margin-right:7px;font-size:16px;line-height:18px;">&#xe640;</i>
              <i>自定义标签</i>
            </span>
            <input class="recommend-input" maxlength="5" type="text" placeholder="请输入您的自定义标签" id ="recommend-input" value= "${val}" />
          </div>`;
      }
    }
  }
  return html;
}
function adseatCompare(seat,dest){
  if(seat == "SEAT" + dest.toString()){
    return true
  }else{
    return false
  }
}
//生成6位随机数
function rndNum(){
  var rnd = "";
  for(let i = 0;i < 6; i++)
    rnd += Math.floor(Math.random()*9);
  return rnd;
}
module.exports = {
  cut: strcut ,
  getDefault: getDefaultFormat,
  urlgen: urlgen,
  paramurlgen:paramurlgen,
  active_urlgen:active_urlgen,
  avaterimg: avaterimg,
  cdnhost: config.cdnhost,
  version: config.version,
  pageTDK:pageTDK,
  imageThumb:imageThumb,
  include: esinclude,
  school_logo: school_logo,
  getLink: getLink,
  articleUrlgen:articleUrlgen,
  eduChecked:eduChecked,
  tagChecked:tagChecked,
  adseatCompare:adseatCompare,
  rndNum:rndNum
};
