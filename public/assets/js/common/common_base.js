/**
 * Created by DXZ-Shuqin.Wang on 2017/9/21.
 */
;(function (global, document) {
    var fn = global.fn = {
       countryArr: {
            "0": ["全部", "all"],
            "1": ["美国", "usa"],
            "2": ["英国", "uk"],
            "3": ["加拿大", "canada"],
            "4": ["澳大利亚", "australia"],
            "5": ["新西兰", "newzealand"],
            "50": ["韩国", "korea"],
            "51": ["日本", "japan"],
            "52": ["新加坡", "singapore"],
            "53": ["马来西亚", "malaysia"],
            "54": ["中国香港", "hongkong"],
            "100": ["俄罗斯", "russion"],
            "101": ["乌克兰", "ukraine"],
            "102": ["白俄罗斯", "belarus"],
            "103": ["德国", "germany"],
            "104": ["法国", "france"],
            "105": ["挪威", "norway"],
            "106": ["瑞典", "sweden"],
            "107": ["芬兰", "finland"],
            "108": ["爱尔兰", "ireland"],
            "109": ["荷兰", "netherlands"],
            "110": ["丹麦", "denmark"],
            "111": ["意大利", "italy"],
            "112": ["西班牙", "spain"],
            "113": ["瑞士", "switzerland"],
            "7": ["希腊", "greece"],
            //移民新增（澳洲用网站的澳大利亚）
            "8": ["马耳他", "malta"],
            "10": ["葡萄牙", "portugal"],
            "11": ["塞浦路斯", "cyprus"],
            "12": ["安提瓜", "antigua"],
            "13": ["多米尼克", "dominica"],
            "14": ["圣基茨", "saintkitts"],
            "15": ["格林纳达", "grenada"]
            //移民新增国家end
        },
       cityArr: {
          "1": ["北京", "bj"],
          "5": ["成都", "cd"],
          "7": ["重庆", "cq"],
          "19": ["长沙", "cs"],
          "25": ["长春", "cc"],
          "41": ["常州", "cz"],
          "13": ["大连", "dl"],
          "43": ["东莞", "dg"],
          "37": ["佛山", "fs"],
          "39": ["福州", "fz"],
          "3": ["广州", "gz"],
          "35": ["贵阳", "gy"],
          "6": ["杭州", "hz"],
          "22": ["合肥", "hf"],
          "24": ["哈尔滨", "heb"],
          "26": ["呼市", "hs"],
          "32": ["邯郸", "gc"],
          "46": ["海南", "hn"],
          "9": ["济南", "jn"],
          "30": ["吉林", "jl"],
          "21": ["昆明", "km"],
          "27": ["兰州", "lz"],
          "48": ["洛阳", "ly"],
          "16": ["南京", "nj"],
          "29": ["南昌", "nc"],
          "34": ["宁波", "nb"],
          "38": ["南宁", "nn"],
          "10": ["青岛", "qd"],
          "2": ["上海", "sh"],
          "8": ["沈阳", "sy"],
          "12": ["石家庄", "sjz"],
          "20": ["深圳", "suz"],
          "23": ["苏州", "sz"],
          "4": ["天津", "tj"],
          "17": ["太原", "ty"],
          "18": ["唐山", "ts"],
          "14": ["武汉", "wh"],
          //"50": ["武昌", "wc"],
          "33": ["无锡", "wx"],
          "42": ["温州", "wz"],
          "15": ["西安", "xa"],
          "28": ["厦门", "sm"],
          "36": ["徐州", "xz"],
          "45": ["西宁", "xn"],
          "47": ["新疆", "xj"],
          "31": ["烟台", "yt"],
          "40": ["银川", "yc"],
          "44": ["宜昌", "yic"],
          "11": ["郑州", "zz"]
        },
        //生成符合静态规范的跳转链接
        urlgen: function () {
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
                if(arguments[i].split('=').length > 1)
                {
                    if (nationid = seo_to_url(arguments[i], 'n')) {
                        nation = this.getCountryEn(nationid);
                    }
                    if (cityid = seo_to_url(arguments[i], 'c')) {
                        city = this.getCityEn(cityid);
                    }
                    if(!nationid && !cityid){
                        chan += '/' + arguments[i].replace(/=/g, "-");
                    }
                    break;
                }
                else
                {
                    chan += '/' + arguments[i];
                }
            }
            // i is hold
            for(i+=1; i < arguments.length;i++){
                if (nationid = seo_to_url(arguments[i], 'n')) {
                    nation = this.getCountryEn(nationid);
                }
                if (cityid = seo_to_url(arguments[i], 'c')) {
                    city = this.getCityEn(cityid);
                }
                if(!nationid && !cityid){
                    param += '__' + arguments[i].replace(/=/g, "-");
                }
            }

            if(chan.match(/yimin/g)){
                url += "/yimin"+(city?"/"+city:"") + (nation?"/"+nation:"") + chan.replace(/\/yimin/, "") + param + ".html";
            }else{
                url += (city?"/"+city:"") + (nation?"/"+nation:"") + chan + param + ".html";
            }

            if(url == "/.html"){
                url = "/";
            }

            if(!exits_static_page(chan + param + ".html")){
                url = url.replace(/\.html/g, "");
            }else{
                if(chan=='/branch_home'){
                    url = url.replace(/branch_home.html/g, "");
                }
            }

            if (!isyimin && js_api_config.version == 'development') { //如果是開發環境
                if( (chan.indexOf('/p/') != -1 || chan.indexOf('/p1/') != -1 || chan.indexOf('/article/') != -1 || chan.indexOf('/case/') != -1 || chan.indexOf('center') != -1 || chan.indexOf('/blog/') != -1) && chan.indexOf('/yimin/')==-1) {
                    url = js_api_config.wwhost + ':4000' + url;//social
                }
                else {
                    url = js_api_config.wwhost + ':3000' + url;//web
                }
            }

          if (isyimin && js_api_config.version == 'development') { //如果是開發環境
            url = js_api_config.yiminhost + ':3000' + url;//web
          }
            return url;
        },
        /*生成栏目页不需要静态化的跳转链接*/
        no_urlgen: function () {
            console.log(arguments);
            var url = '',chan = '',param = '',nation = '',city = '',nationid='',cityid='';
            if(arguments.length == 0){
                return ;
            }
            //get chan & subchan
            for(var i= 0 ; i < arguments.length;i++){
                if(arguments[i].split('=').length > 1)
                {
                    if (nationid = seo_to_url(arguments[i], 'n')) {
                        nation = this.getCountryEn(nationid);
                    }
                    if (cityid = seo_to_url(arguments[i], 'c')) {
                        city = this.getCityEn(cityid);
                    }
                    if(!nationid && !cityid){
                        chan += '/' + arguments[i].replace(/=/g, "-");
                    }
                    break;
                }
                else
                {
                    chan += '/' + arguments[i];
                }
            }

            // i is hold
            for(i+=1; i < arguments.length;i++){
                if (nationid = seo_to_url(arguments[i], 'n')) {
                    nation = this.getCountryEn(nationid);
                }
                if (cityid = seo_to_url(arguments[i], 'c')) {
                    city = this.getCityEn(cityid);
                }
                if(!nationid && !cityid){
                    if (param == '') {
                        param += '/' + arguments[i].replace(/=/g, "-");
                    }
                    else {
                        param += '__' + arguments[i].replace(/=/g, "-");
                    }
                }
            }
            url += (city?"/"+city:"") + (nation?"/"+nation:"") + chan + param;
            if (js_api_config.version == 'development') { //??????_?l?h??
                if (chan.indexOf('yimin') == -1 && (chan.indexOf('/p/') != -1 || chan.indexOf('/article/') != -1 || chan.indexOf('/case/') != -1 || chan.indexOf('center') != -1)) {
                    url = js_api_config.wwhost + ':4000' + url;
                }
                else {
                    url = js_api_config.wwhost + ':4000' + url;
                }
            }
            return url;
        },
        curlgen:function () {
          var chan = '',param = '';
          if(arguments.length == 0){
            return ;
          }
          //get chan & subchan
          for(var i= 0 ; i < arguments.length;i++){
            if(arguments[i].split('=').length > 1)
            {
              chan +=  '?' + arguments[i];
              break;
            }
            else
            {
              chan += '/' + arguments[i];
            }
          }

          for(i+=1; i < arguments.length;i++){
            param += '&' + arguments[i];
          }
          var url = '';
          if (js_api_config.version == 'development') { //������_�l�h��
            if(chan.indexOf('/login')!=-1){
              url += js_api_config.wwhost + ':4000' + chan + param;
            }
            else {
              url += js_api_config.wwhost + ':4000' + chan + param;
            }

          }else {
            url += chan + param;
          }
          return url;
        },
        articleUrlgen:function (){
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
          if (js_api_config.version == 'development') { //如果是開發環境
              url = js_api_config.wwhost + ':4000' + url;//social
          }
          return url;
        },
        getCountryEn: function (id) {
            var obj = normalize(this.countryArr[id],this.countryArr[0]);
            return obj[1];
        },
        getCityEn: function (id) {
            var obj = normalize(this.cityArr[id],this.cityArr[0]);
            return obj[1];
        },
        //用户头像url组装
        avaterimg: function (uid, size, status,version){
            uid = prefixInteger(uid, 9);
            var dir1 = uid.substr(0, 3);
            var dir2 = uid.substr(3, 2);
            var dir3 = uid.substr(5, 2);
            if(!version){
              version =parseInt(Date.parse(new Date())/60000);
            }
            if(status == 1){
                return ajaxUrlPrefix.imageshost + '/avatar/' + dir1+'/'+dir2+'/'+dir3+'/'+uid.substr(-2)+"_avatar_"+size+"_1.jpg"+"?"+version;
            }else{
                return ajaxUrlPrefix.imageshost + '/avatar/' + dir1+'/'+dir2+'/'+dir3+'/'+uid.substr(-2)+"_avatar_"+size+".jpg"+"?"+version;
            }
        },
        //根据id获取学历名
        getEdu: function (id) {
            var education = {
                "0": "全部",
                "1": "本科",
                "2": "研究生",
                "19": "中小学"
            };
            return education[id];
        },
        //获取理想的时间格式
        getFormatDate: function (timestamp,p) {
            timestamp = parseInt(timestamp + '000');
            var newDate = new Date(timestamp);
            Date.prototype.format = function (format) {
                var date = {
                    'M+': this.getMonth() + 1,
                    'd+': this.getDate(),
                    'h+': this.getHours(),
                    'm+': this.getMinutes(),
                    's+': this.getSeconds(),
                    'q+': Math.floor((this.getMonth() + 3) / 3),
                    'S+': this.getMilliseconds()
                };
                if (/(y+)/i.test(format)) {
                    format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
                }
                for (var k in date) {
                    if (new RegExp('(' + k + ')').test(format)) {
                        format = format.replace(RegExp.$1, RegExp.$1.length == 1
                            ? date[k] : ('00' + date[k]).substr(('' + date[k]).length));
                    }
                }
                return format;
            }
            // return newDate.format('yyyy-MM-dd h:m');
            if(p==1){
                return newDate.format('yyyy');
            }else if(p==2){
                return newDate.format('MM');
            }else if(p==3){
                return newDate.format('dd');
            }else if(p==4){
                return newDate.format('yyyy-MM');
            }
        },
        //图片缩略图 拼装
        imageThumb:function (imageUrl, spec) {
          if(imageUrl !=undefined && imageUrl != ''){
            if(spec){
              return imageUrl + "!" + spec;
            }else {
              return imageUrl;
            }
          }
        }
    }
    function seo_to_url(arguments, agtype) {
        var data = "";
        if(arguments.indexOf("=") >= 0 ){
            //判断是否存在n=?国家数据
            if(agtype == "c"){
                var regData = arguments.match(/c=(\d+)/g);
            }else if(agtype == "n"){
                var regData = arguments.match(/n=(\d+)/g);
            }
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
    //区分静态和伪静态， 伪静态中n变量需要存在不能去掉
    function exits_static_page(path) {
        //留学网站伪静态
        var reg = path.match(/^\/(glue|news|focus|visa|prereq|cost|nation|schoolranknews|recommand|interpret|scholarship|media|eduquestion|school|adviser|activity|cases|schoollib|yimin|product|special).html$/g);
        //栏目列表页带国家的数据
        var list_reg = path.match(/^\/(\w+)\/(special).html$/g);
        //社区页面
        var so_reg = path.match(/^\/(p|p1)\/(\d+)(.*).html$/g);
        var so_center = path.match(/^\/(advisor_center|canzan_center|user_center|login|register|forget).html$/g);//advisor_center
        //移民好文精选
        var yimin_reg = path.match(/^\/yimin\/news\/order-hits.html$/g);
        var yimin_list_reg = path.match(/^\/yimin\/(news|interpret|activity|case).html$/g);

        if(reg || list_reg || so_reg || so_center || yimin_reg || yimin_list_reg){
            return false;
        }
        return true;
    }
    function normalize(value, defaultValue) {
        if(value === null || value === undefined || value === false) {
            return defaultValue;
        }
        return value;
    };
    //生成头像的uid
    function prefixInteger (num, length) {
        return (Array(length).join('0') + num).slice(-length);
    }
})(this, document);

