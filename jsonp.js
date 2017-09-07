'use strict'
function jsonp(json){
	//json 	url,data,success
	json = json || {};
	var timer = null;
	if(!json.url)return;
	json.data = json.data || {};
	//看看回调的参数名有没有，没有给个默认的cb
	json.data.cbName = json.data.cbName||'cb';
	//回调函数的名字，要解决缓存问题
	json.data[json.data.cbName] = 'show'+Math.random();
	//函数的名字不能有,所以需要干掉.
	json.data[json.data.cbName] = json.data[json.data.cbName].replace('.','');
	var arr = [];
	for(var name in json.data){
		arr.push(name+'='+encodeURIComponent(json.data[name]));
	}
	var str = arr.join('&');
	
	var timer = setTimeout(function(){
		window[json.data[json.cbName]]=null;
		json.error&&json.error('请求失败，网络不给力');
	},json.timeout);
	
	//写一个回调函数
	window[json.data[json.data.cbName]] = function (result){
		clearTimeout(timer);
		//执行函数
		json.success&&json.success(result);
		//当数据返回之后，script不需要了，直接干掉。
		oH.removeChild(oS);
	}
	var oH = document.getElementsByTagName('head')[0];
	var oS = document.createElement('script');
	oS.src = json.url+'?'+str;
	oH.appendChild(oS);
}
