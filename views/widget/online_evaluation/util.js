function transferViewIdToShort(viewerId){
	var v = null;
	var pre = langConfig['visitor'];
	if(viewerId!=null && viewerId.length>=5){  	
	    v= pre + viewerId.charCodeAt(viewerId.length-5)+viewerId.charCodeAt(viewerId.length-4)+viewerId.charCodeAt(viewerId.length-3)+viewerId.charCodeAt(viewerId.length-2)+viewerId.charCodeAt(viewerId.length-1);
    	if(v.length>7){
    	 	 v = v.substring(0,7);
   		}
	    return v;
  	}
	return pre+viewerId;
 }

function replaceQuot(msg)
{
	var string = msg+"";
	
	string = string.replaceAll("\r", "" );
	string = string.replaceAll("\n", " " );
	string = string.replaceAll("\"", "&quot;" );
	string = string.replaceAll("\'", "\\\'" );
	return string;
}

function replaceHtml(msg)
{
	var string = msg+"";
	
	string = string.replaceAll("&", "&amp;" );
	string = string.replaceAll("<", "&lt;" );
	string = string.replaceAll(">", "&gt;" );
	string = string.replaceAll("\r", "" );
	string = string.replaceAll("\n", " " );
	string = string.replaceAll("\"", "&quot;" );
	
	return string;
}
String.prototype.replaceAll = stringReplaceAll;

function stringReplaceAll(AFindText,ARepText){
	raRegExp = new RegExp(AFindText,"g");
	return this.replace(raRegExp,ARepText);
}
function getTimeString(){
	var now = new Date();
	var year = now.getFullYear();
	var mon = now.getMonth() + 1;
	if (mon <10)
		mon = '0' + mon;
	var day = now.getDate();
	if(day < 10)
		day = '0' + day;
	var hour = now.getHours();
	if(hour < 10)
		hour = '0' + hour;
	var min = now.getMinutes();
	if(min < 10)
		min = '0' + min;
	var sec = now.getSeconds();
	if(sec < 10)
		sec = '0' + sec;
	var sep = '-';
		
	var rtn = year + sep + mon + sep + day + ' ';
	rtn += hour + ':' + min + ':' + sec;
	return rtn;
}

function getShortId(vId,rtnName,role) {
	
	var temp = "" +vId;
	if(role==6){
		return temp.substring(temp.length-3)+'会议室';
	}
	
    if (getRole(vId) == 1) {
        return rtnName==null?vId:rtnName;
    } else {
        return transferViewIdToShort(vId);
    }
}

function getRole(vId) {
    var idLength = vId.length;
    if (idLength > 30) {
        return 2;
    } else {
        return 1;
    }
}

function replacelinkHtml(s) {
    var reg = /(http:\/\/|https:\/\/|ftp:\/\/|www)((?:\&amp;|[\w\.\:\/=%_\-,~\?\&\*])*)/g;
    s = s.replace(reg, function($0, $1, $2) {
        $2 = $2.replace(/\&amp;/g, function(s) {
            return '&';
        });
        var u = ($1 == 'www' ? 'http://www' : $1) + $2;
        return '<a class="linkText" href="' + u + '" target="_blank">' + u + '</a>';
    });
    return s;
}


function closeWindow(){
	try {
		if (typeof WeixinJSBridge != 'undefined'){
            WeixinJSBridge.invoke('closeWindow', {}, function (res) {
            });
		}
        window.open('', '_self', '').close();
        window.close();
    } catch (e) {

    }
}

function changeTab(tabName){
	var h = window.location.href;
	var args = h.split("?");
	var arr = new Array();
	if(args[0] != h && args.length>1){
		var params = args[1].split("&");
		for(var i=0; i<params.length; i++){
			var kv = params[i].split("=");
			if(kv.length>1 & kv[0] == "command"){
				continue;
			}else{
				arr.push(params[i]);
			}
		}				
	}
	var cmd = '';
	if(tabName =='robot'){
		cmd = 'robotChat';
	}else if(tabName =='leaveMsg'){
		cmd = 'leaveMessage';
	}else if(tabName == 'online'){
		cmd = 'inviteChat';
	}else if(tabName == 'freecall'){
		cmd = 'freecall';
	}else{
		return;
	}
	window.location.href = "chat.do?command="+cmd+"&"+arr.join("&");
}
