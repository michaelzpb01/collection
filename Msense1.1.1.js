/*函数目录*/

'use strict'

/************还需改进的程序开始**************/

/*放大镜magnify*/
/*九宫格拖拽改变大小*/
/*瀑布流*/

/************还需改进的程序结束**************/



/*********以下为2016.01.28日总结***********************************/

/*ready函数*/
/*事件委托binding*/
/*addWheel函数 滚轮*/
/*事件绑定*/
/*解除绑定*/
/*url2json*/
/*json2url*/
/*setStyle*/
/*getPos*/
/*getByClass*/
/*findMin*/
/*findMax*/
/*count*/
/*getStyle*/
/*findInArr*/
/*rnd*/
/*toDou*/
/*获取cookie*/
/*设置cookie*/
/*删除cookie*/
/*碰撞检测collTest*/
//角度转角度a2d
//弧度转弧度d2a
/*addClass*/
/*removeClass*/
/*zgetByClass*/
/*recursion 斐波那契算法*/
/*移入事件addMouseOver频繁触发解决开始*/
/*移入事件addMouseOut频繁触发解决开始*/
/*
** 	addClass 		添加class
** 	params
** 				[object]
** 				[string]
*/
/*
**	removeClass 		删除class
** 	parmas
** 					[object]
** 					[string]
*/
/*
**	getByClass 		通过class获取一组元素
** 	params
** 					[object]
** 					[string]
*/
/*
**	recursion 		斐波那契算法	
** 	params
** 					[month-->>number]
*/


/*一堆函数开始*/

/************还需改进的程序开始**************/

/*
**	magnify 		放大镜
** 	parmas
** 					[string]
** 					[string]
** 					[string]
*/

function magnify(obj1id, obj2id, mask) {
	var oDiv1 = document.getElementById(obj1id);
	var oDiv2 = document.getElementById(obj2id);
	var oMask = document.getElementById(mask);
	var oImg = oDiv2.children[0];
	oDiv1.onmouseover = function() {
		oMask.style.display = 'block';
		oDiv2.style.display = 'block';
	};
	oDiv1.onmouseout = function() {
		oMask.style.display = 'none';
		oDiv2.style.display = 'none';
	};

	oDiv1.onmousemove = function(ev) {
		var oEvent = ev || event;
		var l = oEvent.clientX - oDiv1.offsetLeft - oMask.offsetWidth / 2;
		var t = oEvent.clientY - oDiv1.offsetTop - oMask.offsetHeight / 2;
		if (l < 0) {
			l = 0;
		} else if (l > oDiv1.offsetWidth - oMask.offsetWidth) {
			l = oDiv1.offsetWidth - oMask.offsetWidth;
		}
		if (t < 0) {
			t = 0;
		} else if (t > oDiv1.offsetHeight - oMask.offsetHeight) {
			t = oDiv1.offsetHeight - oMask.offsetHeight;
		}
		oMask.style.left = l + 'px';
		oMask.style.top = t + 'px';
		oImg.style.left = -l * (oImg.offsetWidth - oDiv2.offsetWidth) / (oDiv1.offsetWidth - oMask.offsetWidth) + 'px';
		oImg.style.top = -t * (oImg.offsetHeight - oDiv2.offsetHeight) / (oDiv1.offsetHeight - oMask.offsetHeight) + 'px';
	};
}
/*
**	createLis 		瀑布流
*/

function createLis() {
	function rnd(n, m) {
		return parseInt(Math.random() * (m - n) + n);
	}

	function createLi() {
		var oLi = document.createElement('li');
		oLi.style.height = rnd(150, 350) + 'px';
		oLi.style.background = 'rgb(' + rnd(0, 256) + ',' + rnd(0, 256) + ',' + rnd(0, 256) + ')';
		return oLi;
	}
	var oBox = document.getElementById('box');
	var aUl = oBox.getElementsByTagName('ul');
	for (var i = 0; i < 20; i++) {
		var oLi = createLi();
		var arr = [];
		for (var j = 0; j < aUl.length; j++) {
			arr.push(aUl[j]);
		}
		arr.sort(function(aUl1, aUl2) {
			return aUl1.offsetHeight - aUl2.offsetHeight;
		});
		arr[0].appendChild(oLi);
	}
}
/*
**	drag 		九宫格拖拽改变大小开始	
** 	params
** 					[object]
** 					[object]
*/
function drag(obj, parent) {
	obj.onmousedown = function(ev) {
		var oEvent = ev || event;
		var downX = oEvent.clientX;
		var downY = oEvent.clientY;
		var downWidth = oDiv.offsetWidth;
		var downHeight = oDiv.offsetHeight;
		var downLeft = oDiv.offsetLeft;
		var downTop = oDiv.offsetTop;
		document.onmousemove = function(ev) {
			var oEvent = ev || event;
			if (obj.className.indexOf('l') != -1) {
				parent.style.width = downWidth - (oEvent.clientX - downX) + 'px';
				parent.style.left = downLeft + (oEvent.clientX - downX) + 'px'
			}
			if (obj.className.indexOf('t') != -1) {
				parent.style.height = downHeight - (oEvent.clientY - downY) + 'px';
				parent.style.top = downTop + (oEvent.clientY - downY) + 'px';
			}
			if (obj.className.indexOf('r') != -1) {
				parent.style.width = downWidth + oEvent.clientX - downX + 'px';
			}
			if (obj.className.indexOf('b') != -1) {
				parent.style.height = downHeight + oEvent.clientY - downY + 'px';
			}
		};
		document.onmouseup = function() {
			document.onmousemove = null;
			document.onmouseup = null;
			obj.releaseCapture && obj.releaseCapture();
		};
		obj.setCapture && obj.setCapture();
		return false;
	};
}
/************还需改进的程序结束**************/

/*###########################已封装成品的函数开始###########################################*/
/*
**	addReady 		页面主体加载函数	
** 	params
** 					[Functiion]
*/
function addReady(fn) {
	//判断浏览器
	if (document.addEventListener) {
		//高版本浏览器dom事件 dom事件必须绑定
		document.addEventListener('DOMContentLoaded', fn, false);
	} else {
		//处理低版本ie
		document.attachEvent('onreadystatechange', function() {
			if (document.readyState == 'complete') {
				fn();
			}
		});
	}
}

/*
**	binding 		事件委托	
** 	params
** 					[object]
** 					[string]
** 					[Function]
*/
function binDing(obj , sEv, fn) {
	obj['on'+sEv] = function(ev) {
		var oEvent = ev || event;
		var oSrc = oEvent.srcElement || oEvent.target;
		fn(oSrc);
	};
}

/*
**	addWheel 		滚轮方向函数	
** 	params
** 					[object]
** 					[Function]
*/
function addWheel(obj, fn) {
	function fnWheel(ev) {
		var oEvent = ev || event;
		var down = false;
		//chrome IE
		if (oEvent.wheelDelta) {
			down = oEvent.wheelDelta < 0 ? true : false;
		} else {
			//oEvent.detail
			down = oEvent.detail < 0 ? false : true;
		}
		//down鼠标方向 向下为true 
		fn(down);
		oEvent.preventDefault && oEvent.preventDefault();
		return false;
	}
	//ff
	if (navigator.userAgent.indexOf('Firefox') != -1) {
		obj.addEventListener('DOMMouseScroll', fnWheel, false);
	} else {
		obj.onmousewheel = fnWheel;
	}
}

/*
**	addEvent 		事件绑定函数	
** 	params
** 					[object]
** 					[string]
** 					[Function]
*/
function addEvent(obj, sEv, fn) {
	if (obj.addEventListener) {
		obj.addEventListener(sEv, fn, false);
	} else {
		obj.attachEvent('on' + sEv, fn);
	}
}
/*
**	removeEvent 	事件解绑函数	
** 	params
** 					[object]
** 					[string]
** 					[Function]
*/
function removeEvent(obj, sEv, fn) {
	if (obj.removeEventListener) {
		obj.removeEventListener(sEv, fn, false);
	} else {
		obj.detachEvent('on' + sEv, fn);
	}
}
/*
**	getToday 		获取今天的函数	
*/
function getToday() {
	var oDate = new Date();
	var y = oDate.getFullYear();
	var m = oDate.getMonth() + 1;
	var d = oDate.getDate();

	return y + '/' + m + '/' + d;
}

/*
**	url2json 		url2json	
** 	params
** 					[string]
*/
function url2json(url) {
	var json = {};
	var arr = url.split('&');
	for (var i = 0; i < arr.length; i++) {
		var arr2 = arr[i].split('=');
		json[arr2[0]] = arr2[1];
	}
	return json;
}


/*
**	json2url 		json2url	
** 	params
** 					[object]
*/
function json2url(json) {
	var arr = [];
	for (var i in json) {
		arr.push(i + '=' + json[i]);
	}
	var str = arr.join('&');
	return str;
}



/*
**	setStyle 		批量设置样式函数	
** 	params
** 					[object]
** 					[object]
** 					[object]
*/
function setStyle() {
	//判断参数是几个，区别是批量还是一个
	if (arguments.length == 2) {
		//obj	arguments[0];
		//json	arguments[1];
		//批量设置，用json
		for (var name in arguments[1]) {
			arguments[0].style[name] = arguments[1][name];
		}
	} else {
		//obj 		arguments[0];
		//sName 	arguments[1];
		//sValue 	arguments[2];
		//用正常的形式	
		arguments[0].style[arguments[1]] = arguments[2];
	}
}


/*
**	getPos 			获取目标位置函数	
** 	params
** 					[object]
*/
function getPos(obj) {
	var l = 0;
	var t = 0;
	while (obj) {
		l += obj.offsetLeft;
		t += obj.offsetTop;
		obj = obj.offsetParent;
	}
	return {
		left: l,
		top: t
	}
}

/*
**	getByClass 		获取class函数	
** 	params
** 					[object]
** 					[string]
*/
function getByClass(oparent, sClass) {
	if (oparent.getElementsByClassName) {
		return oparent.getElementsByClassName(sClass);
	} else {
		var aEle = oparent.getElementsByTagName('*');
		var All = [];
		for (var i = 0; i < aEle.length; i++) {
			var arr = aEle[i].className.split(' ');

			if (findInArr(sClass, arr)) {
				All.push(aEle[i]);
			}
		}
		return All;
	}
}


/*
**	findMin 		找出数组中最小数	
** 	params
** 					[number]
*/
function findMin(index) {
	var iMinIndex = 0;
	var iMin = 999999999999999;
	for (var i = index; i < arr.length; i++) {
		if (arr[i] < iMin) {
			iMin = arr[i];
			iMinIndex = i;
		}
	}
	return iMinIndex;
}

/*
**	findMax 		找出数组中最大数	
** 	params
** 					[number]
*/
function findMax(start) {
	var iMax = arr[start];
	var iMaxIndex = start;
	for (var i = start + 1; i < arr.length; i++) {
		if (arr[i] > iMax) {
			iMax = arr[i];
			iMaxIndex = i;
		}
	}
	return iMaxIndex;
}


/*
**	count 			倒计时	
** 	params
** 					[fullYear]
** 					[month]
** 					[data]
*/
function count(year, manth, date) {
	//var oS = document.getElementById('span1');
	//设置到将来的时间
	var oTarget = new Date();
	oTarget.setFullYear(year, manth, date);
	oTarget.setHours(0, 0, 0, 0);
	//获取了2016 2 14日的毫秒数
	var iTarget = oTarget.getTime();
	//alert(iTarget);

	var oNow = new Date();
	var iNow = oNow.getTime();
	//alert(iNow)
	var s = parseInt((iTarget - iNow) / 1000);
	//天
	var d = parseInt(s / 86400);
	s %= 86400; //s已经变了  出去整个天数部分 不够一天的 秒数 包含小时 分钟和秒
	var H = parseInt(s / 3600);
	//小时数
	s %= 3600; //s已经变了  不够一小时的部分  包含分钟和秒数
	var M = parseInt(s / 60);
	//分钟数
	s = s % 60; //不够一分钟的秒数

	return d + '天 ' + H + '小时 ' + M + '分钟 ' + s + '秒';
	//oS.innerHTML = d+'天 '+H+'小时 '+M+'分钟 '+s+'秒';
}


/*
**	getByClass 		获取class函数	
** 	params
** 					[object]
** 					[string]
*/
function getStyle(obj, name) {
	if (obj.currentStyle) {
		return obj.currentStyle[name];
	} else {
		return getComputedStyle(obj, false)[name];
	}
}


/*
**	findInArr 		数组查找函数	
** 	params
** 					[number]
** 					[Array]
*/
function findInArr(num, arr) {
	for (var i = 0; i < arr.length; i++) {
		if (arr[i] == num) {
			return true;
		}
	}
	return false;
}


/*
**	rnd 			随机数函数	
** 	params
** 					[number]
** 					[number]
*/
function rnd(n, m) {
	return parseInt(Math.random() * (m - n) + n);
}

/*
**	toDou 			补0函数	
** 	params
** 					[number]
*/
function toDou(n) {
	return n < 10 ? '0' + n : '' + n;
}


/*
**	getCookie 		获取cookie	
** 	params
** 					[string]
*/
function getCookie(name) {
	var arr = document.cookie.split('; ');
	for (var i = 0; i < arr.length; i++) {
		var arr2 = arr[i].split('=');
		if (arr2[0] == name) {
			return arr2[1];
		};
	}
	return '';
}


/*
**	setCookie 		设置cookie
** 	params
** 					[string]
** 					[string]
** 					[number]
*/
function setCookie(name, value, iDay) {
	var oDate = new Date();
	oDate.setDate(oDate.getDate() + iDay);
	document.cookie = name + '=' + value + ';expires=' + oDate;
}

/*
**	removeCookie 	删除cookie
** 	params
** 					[string]
*/
function removeCookie(name) {
	setCookie(name, 1, -1);
}


/*
**	collTest 		碰撞检测	
** 	params
** 					[object]
** 					[object]
*/
function collTest(obj1, obj2) {
	var l1 = obj1.offsetLeft;
	var r1 = obj1.offsetLeft + obj1.offsetWidth;
	var t1 = obj1.offsetTop;
	var b1 = obj1.offsetTop + obj1.offsetHeight;

	var l2 = obj2.offsetLeft;
	var r2 = obj2.offsetLeft + obj2.offsetWidth;
	var t2 = obj2.offsetTop;
	var b2 = obj2.offsetTop + obj2.offsetHeight;

	if (r1 < l2 || l1 > r2 || b1 < t2 || t1 > b2) {
		//alert('没有碰上');
		return false;

	} else {
		return true;
	}
}


/*
**	addMouseOver 	mouseoverBUG解决方案	
** 	params
** 					[object]
** 					[Function]
*/

function addMouseOver(obj, fn) {
	obj.onmouseover = function(ev) {
		var oEvent = ev || event;
		var oFrom = oEvent.fromElement || oEvent.relatedTarget;
		if (obj.contains(oFrom))return;
		fn();
	}
}


/*
**	addMouseOver 	mouseoverBUG解决方案	
** 	params
** 					[object]
** 					[Function]
*/
function addMouseOut(obj, fn) {
	obj.onmouseout = function(ev) {
		var oEvent = ev || event;
		var oTo = oEvent.toElement || oEvent.relatedTarget;
		if (obj.contains(oTo))return;
		fn();
	}
}


/*
**	a2d 			弧度转角度	
** 	params
** 					[number]
*/
function a2d(n){
	return n*180/Math.PI;
}
/*
**	a2d 			角度	转弧度
** 	params
** 					[number]
*/
function d2a(n){
	return n*Math.PI/180;
}


/*
** 	addClass 		添加class
** 	params
** 				[object]
** 				[string]
*/
function addClass(obj,sClass){
	//如果有class执行以下代码
	if(obj.className){
		//看一下obj的class到底有没有sClass
		var re = new RegExp('\\b'+sClass+'\\b');
		if(obj.className.search(re)==-1){
			//如果没有就加class
			obj.className += ' '+sClass;
		}
	}else{
		//没有class直接添加就行
		obj.className = sClass;
	}
	//最后去掉首尾空格，和多余的空格
	obj.className = obj.className.match(/\w+/g).join(' ');
}

/*
**	removeClass 		删除class
** 	parmas
** 					[object]
** 					[string]
*/

function removeClass(obj,sClass){
	//如果有class才需要操作，否则啥也不用管
	if(obj.className){
		var re = new RegExp('\\b'+sClass+'\\b','g');
		//把sClass干掉
		obj.className = obj.className.replace(re,'');
		//去掉首尾空格，和多余的空格
		obj.className = obj.className.match(/\w+/g).join(' ');
		//如果没有class了要把class属性去掉
		if(!obj.className){
			obj.removeAttribute('class');
		}
	}
}

/*
**	getByClass 		通过class获取一组元素
** 	params
** 					[object]
** 					[string]
*/
function zgetByClass(oParent,sClass){
	//如果系统提供的方法能用，就用
	if(oParent.getElementsByClassName){
		return oParent.getElementsByClassName(sClass);
	}else{
		//需要一个容器装元素
		var aResult = [];
		var re = new RegExp('\\b'+sClass+'\\b');
		//获取到父级下所有的元素
		var aEle = oParent.getElementsByTagName('*');
		
		for(var i=0;i<aEle.length;i++){
			if(aEle[i].className.search(re)!=-1){
				aResult.push(aEle[i]);
			}
		}
		//返回一组元素
		return aResult;
	}
}
/*
**	recursion 		斐波那契算法	
** 	params
** 					[month-->>number]
*/
function recursion(n){
	if(n==1){
		return 1;
	}else if(n==2){
		return 1;
	}else{
		if(!arr[n]){
			arr[n] = recursion(n-1)+recursion(n-2);
		}
		return arr[n];
	}
}
/*
**	getUrlResault 	获取url参数	
** 	params
** 					[String]
**	eg				'http://m.uzhuang.com/mobile-company_detail/complateid5162/'
*/

function getUrlResault(name){
	var oStringUrl = window.location.href;
	var oUrlResault = url.split('/');
	console.log(oUrlResault);
	var urlData;
	for(var i = 0;i<oUrlResault.length;i++){
		if(oUrlResault[i].search(name) != -1){
			urlData = oUrlResault[i].replace(name,'');
		}
	}
	return urlData;
}
/*
 **	scaleImg 			移动端图片取中间部分显示
 ** 	params
 ** 					object
 **
 */


function scaleImg(imgs) {
	for(var i=0; i<imgs.length; i++) {
		imgs[i].onload = function(){
			var boxW = $(this).parent().width(); //区域宽度
			var boxH = $(this).parent().height(); //区域高度
			var img = new Image();
			img.src = this.src;
			var imgW = img.width;
			var imgH = img.height;

			var imgleft = (boxH*imgW/imgH - boxW)/2;
			var imgtop = (boxW*imgH/imgW - boxH)/2;

			if(imgW > imgH){
				this.style.height = '100%';
				this.style.marginLeft = -imgleft+'px';
			} else {
				this.style.width = '100%';
				this.style.marginTop = -imgtop+'px';
			}
		};
	}
}
/*###########################已封装成品的函数结束###########################################*/



var browser={
	versions:function(){
		var u = navigator.userAgent, app = navigator.appVersion;
		return {
			trident: u.indexOf('Trident') > -1, //IE内核
			presto: u.indexOf('Presto') > -1, //opera内核
			webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
			gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,//火狐内核
			mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
			ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
			android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
			iPhone: u.indexOf('iPhone') > -1 , //是否为iPhone或者QQHD浏览器
			iPad: u.indexOf('iPad') > -1, //是否iPad
			webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
			weixin: u.indexOf('MicroMessenger') > -1, //是否微信
			weibo: u.indexOf('weibo') > -1, //是否微博
			qq: u.match(/\sQQ/i) == " qq" //是否QQ
		};
	}(),
	language:(navigator.browserLanguage || navigator.language).toLowerCase()
}


//url canshu
function GetQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null)return unescape(r[2]);
	return null;
}
//获取目标位置函数//原生对象
function getPos(obj) {
	var l = 0;
	var t = 0;
	while (obj) {
		l += obj.offsetLeft;
		t += obj.offsetTop;
		obj = obj.offsetParent;
	}
	return {
		left: l,
		top: t
	}
}


function scaleImg(imgs) {
	for (var i = 0; i < imgs.length; i++) {
		imgs[i].onload = function () {
			var boxW = parseFloat($(this).parent().css('width').match(/\d+/g)); //区域宽度
			var boxH = parseFloat($(this).parent().css('height').match(/\d+/g)); //区域高度
			var img = new Image();
			img.src = this.src;
			var imgW = img.width;
			var imgH = img.height;

			var imgleft = -(boxH * imgW / imgH - boxW) / 2;
			var imgtop = -(boxW * imgH / imgW - boxH) / 2;

			//console.log(boxW+'  '+boxH+' imgwidthheight '+imgW+'---'+imgH+' marginlefttop '+imgleft+'---'+imgtop);
			if (imgW > imgH) {
				this.style.height = '100%';
				this.style.marginLeft = imgleft + 'px';
			} else {
				this.style.width = '100%';
				this.style.marginTop = imgtop + 'px';
			}
		};
	}
}


//imgtab

function showBigPic() {

	//$(".lazy-bimg").dxLazyLoad();
	var caseDom = $("#case-info"),
		docH = $(document).height(),
		winH = $(window).height(),
		winW = $(window).width();
	var index = parseInt($(this).attr("index"));
	$('.pic-info').height(winH);
	$('.pic-local').width(winW);
	// caseDom.height(winH);

	$("#big-pic").show().css({
		width: winW,
		height: winH,
		overflow: "auto"
	});
	caseDom.css({
		height: winH,
		overflow: "hidden"
	});
	var swipe = new Swipe(document.getElementById('slider'), {
		speed: 400,
		startSlide: index - 1,
		callback: function () {
			//current index position
			var index = this.getPos() + 1;
			$("#current-number").text(index);
			// preLoadImg(index);
		}
	});
	//初始化
	$("#current-number").text(swipe.getPos() + 1);
	//total index position
	$("#total-number").text(swipe.getLength());
	$('.pic-info').each(function () {
		new RTP.PinchZoom($(this), {});
	});

	$(document).on('touchstart', ".go-back", function () {
		var headerH = $("header").height(),
			btmH = $(".bottom-btn").height();
		$("#big-pic").hide();
		// caseDom.height(docH-headerH-btmH);
		caseDom.css({
			height: "auto",
			overflow: ""
		});
		return false;
	});
}

//imgtab html
//<script src="{R}msite/base/js/pinchzoom.min.js"></script>
//<section id="big-pic">
//	<a class="go-back"><i class="iconfont icon-goback"></i></a>
//	<div class="page">
//	<div class="pic-local"><span id="current-number" class="num"></span>/<span id="total-number" class="num"></span>
//	</div>
//	<div id='slider'>
//	<ul id="big-pic-content">
//	<!-- <li class="single-pic">
//	<div class="pic-info">
//	<img src="img/big_img.png" alt="图片">
//	<div class="pic-local"><span class="num">1</span>/<span class="num">7</span></div>
//	</div>
//	</li>
//	<li class="single-pic">
//	<div class="pic-info">
//	<img src="img/frog.jpg" alt="图片">
//	<div class="pic-local"><span class="num">1</span>/<span class="num">7</span></div>
//	</div>
//	</li>
//	<li class="single-pic">
//	<div class="pic-info">
//	<img src="img/case2.png" alt="图片">
//	<div class="pic-local"><span class="num">1</span>/<span class="num">7</span></div>
//	</div>
//	</li>
//	<li class="single-pic">
//	<div class="pic-info">
//	<img src="img/case3.png" alt="图片">
//	<div class="pic-local"><span class="num">1</span>/<span class="num">7</span></div>
//	</div>
//	</li> -->
//	</ul>
//	</div>
//	</div>
//	</section>




var errorMsg = '<p id="tip"><span id="tip-con"></span></p>';

function checkTip(str, id ,selid) {
	$("#tip").remove();
	$(errorMsg).appendTo(id);
	$("#tip-con").html(str);
	$(selid).attr('style','border-color:#f60');
	setTimeout(function() {
		$("#tip").remove();
		$(selid).removeAttr('style');
	}, 2000);
}
function checkName() {

	var regExp1 = /[^\u4e00-\u9fa5]/;
	if ($("#username").val() == '') {
		$("#username").focus();
		checkTip("请输入您的姓名", ".adv_name","#username");
		return false;
	} else if (regExp1.test($("#username").val().trim())) {
		$("#username").focus();
		checkTip("请输入中文名", ".adv_name","#username");
		return false;
	}else{
		return true;
	}

}


function isPhoneNumber(){
	var phone_id = $("#phone_number").val();
	var tel = /^1[3|4|5|7|8|9][0-9]\d{8}$/;
	if (phone_id == "") {
		checkTip("请输入您的电话", ".adv_phone","#phone_number");
		$("#phone_number").focus();
		return false;
	}
	if (!tel.test(phone_id)) {
		checkTip("您输入的电话有误，请重新输入", ".adv_phone","#phone_number");
		$("#phone_number").focus();
		return false;
	} else {
		return true;
	}

}


//密码校验密码强度
//密码的强度必须是包含大小写字母和数字的组合，不能使用特殊字符，长度在8-10之间。
var parseWordPower =  '^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,10}$';


//2. 校验中文
//字符串仅能是中文。

var checkChineseName  ='^[\\u4e00-\\u9fa5]{0,}$';


//Email

var checkEmail = "[\\w!#$%&'*+/=?^_`{|}~-]+(?:\\.[\\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\\w](?:[\\w-]*[\\w])?\\.)+[\\w](?:[\\w-]*[\\w])?";

//身份证号15位even18位odd
var checkNameNumEven = '^[1-9]\\d{7}((0\\d)|(1[0-2]))(([0|1|2]\\d)|3[0-1])\\d{3}$';

var checkNameNumbOdd = '^[1-9]\\d{5}[1-9]\\d{3}((0\\d)|(1[0-2]))(([0|1|2]\\d)|3[0-1])\\d{3}([0-9]|X)$';

//check date “yyyy-mm-dd“
var checkDate = '^(?:(?!0000)[0-9]{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29)$';

//金额精准到小数点后两位

var checkManny = '^[0-9]+(.[0-9]{2})?$';

//shouji

var checkPhoneNumber = '^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\\d{8}$';




//13. 提取URL链接
//下面的这个表达式可以筛选出一段文本中的URL。
//
//^(f|ht){1}(tp|tps):\\/\\/([\\w-]+\\.)+[\\w-]+(\\/[\\w- ./?%&=]*)?
//	14. 文件路径及扩展名校验
//验证windows下文件路径和扩展名（下面的例子中为.txt文件）
//
//^([a-zA-Z]\\:|\\\\)\\\\([^\\\\]+\\\\)*[^\\/:*?"<>|]+\\.txt(l)?$
//	15. 提取Color Hex Codes
//有时需要抽取网页中的颜色代码，可以使用下面的表达式。
//
//^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$
//16. 提取网页图片
//假若你想提取网页中所有图片信息，可以利用下面的表达式。
//
//\\< *[img][^\\\\>]*[src] *= *[\\"\\']{0,1}([^\\"\\'\\ >]*)
//
//文／技匠（简书签约作者）
//原文链接：http://www.jianshu.com/p/e7bb97218946
//	著作权归作者所有，转载请联系作者获得授权，并标注“简书签约作者”。
//
//17. 提取页面超链接
//提取html中的超链接。
//(<a\\s*(?!.*\\brel=)[^>]*)(href="https?:\\/\\/)((?!(?:(?:www\\.)?'.implode('|(?:www\\.)?', $follow_list).'))[^"]+)"((?!.*\\brel=)[^>]*)(?:[^>]*)>
//
//18. 查找CSS属性
//通过下面的表达式，可以搜索到相匹配的CSS属性。
//
//^\\s*[a-zA-Z\\-]+\\s*[:]{1}\\s[a-zA-Z0-9\\s.#]+[;]{1}
//19. 抽取注释
//如果你需要移除HMTL中的注释，可以使用如下的表达式。
//
//<!--(.*?)-->
//20. 匹配HTML标签
//通过下面的表达式可以匹配出HTML中的标签属性。
//
//<\\/?\\w+((\\s+\\w+(\\s*=\\s*(?:".*?"|'.*?'|[\\^'">\\s]+))?)+\\s*|\\s*)\\/?>
//
//文／技匠（简书签约作者）
//原文链接：http://www.jianshu.com/p/e7bb97218946
//	著作权归作者所有，转载请联系作者获得授权，并标注“简书签约作者”。

//图片上传
;(function(){

	var res = [];
	window.onload = function () {
		var input = document.getElementById("file_input");
		var result, div;

		if (typeof FileReader === 'undefined') {
			result.innerHTML = "抱歉，你的浏览器不支持 FileReader";
			input.setAttribute('disabled', 'disabled');
		} else {
			input.addEventListener('change', readFile, false);
		}

		function readFile() {
			for (var i = 0; i < this.files.length; i++) {
				if (!input['value'].match(/.jpg|.gif|.png|.bmp/i)) {　　//判断上传文件格式
					return alert("上传的图片格式不正确，请重新选择");
				}
				var reader = new FileReader();
				reader.readAsDataURL(this.files[i]);

				reader.onload = function (e) {
					var url = this.result;
					result = '<div id="result"><img src="' + this.result + '" alt=""/></div>';
					div = document.createElement('div');
					res.push(url)
					console.log(res)
					div.innerHTML = result;
					document.getElementById('body').appendChild(div);
				}
			}
		}

		$('.btn').click(function () {
			console.log(res)
		});
	}
})();

/*未完待续············*/

/************************************JS BASE64编码解码************************************/
var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var base64DecodeChars = new Array(
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63,
    52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1,
    -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
    15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1,
    -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
    41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);
//编码的方法
function base64encode(str) {
    var out, i, len;
    var c1, c2, c3;
    len = str.length;
    i = 0;
    out = "";
    while (i < len) {
        c1 = str.charCodeAt(i++) & 0xff;
        if (i == len) {
            out += base64EncodeChars.charAt(c1 >> 2);
            out += base64EncodeChars.charAt((c1 & 0x3) << 4);
            out += "==";
            break;
        }
        c2 = str.charCodeAt(i++);
        if (i == len) {
            out += base64EncodeChars.charAt(c1 >> 2);
            out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
            out += base64EncodeChars.charAt((c2 & 0xF) << 2);
            out += "=";
            break;
        }
        c3 = str.charCodeAt(i++);
        out += base64EncodeChars.charAt(c1 >> 2);
        out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
        out += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
        out += base64EncodeChars.charAt(c3 & 0x3F);
    }
    return out;
}

//解码的方法
function base64decode(str) {
    var c1, c2, c3, c4;
    var i, len, out;
    len = str.length;
    i = 0;
    out = "";
    while (i < len) {

        do {
            c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
        } while (i < len && c1 == -1);
        if (c1 == -1)
            break;

        do {
            c2 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
        } while (i < len && c2 == -1);
        if (c2 == -1)
            break;
        out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));

        do {
            c3 = str.charCodeAt(i++) & 0xff;
            if (c3 == 61)
                return out;
            c3 = base64DecodeChars[c3];
        } while (i < len && c3 == -1);
        if (c3 == -1)
            break;
        out += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2));

        do {
            c4 = str.charCodeAt(i++) & 0xff;
            if (c4 == 61)
                return out;
            c4 = base64DecodeChars[c4];
        } while (i < len && c4 == -1);
        if (c4 == -1)
            break;
        out += String.fromCharCode(((c3 & 0x03) << 6) | c4);
    }
    return out;
}

function utf16to8(str) {
    var out, i, len, c;
    out = "";
    len = str.length;
    for (i = 0; i < len; i++) {
        c = str.charCodeAt(i);
        if ((c >= 0x0001) && (c <= 0x007F)) {
            out += str.charAt(i);
        } else if (c > 0x07FF) {
            out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
            out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
            out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
        } else {
            out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
            out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
        }
    }
    return out;
}

//js代码加密
function compile(code)
{
    var c=String.fromCharCode(code.charCodeAt(0)+code.length);
    for(var i=1;i<code.length;i++){
        c+=String.fromCharCode(code.charCodeAt(i)+code.charCodeAt(i-1));
    }
    alert(escape(c));
}
//compile('alert("黑客防线");')

//js 代码解密
function uncompile(code)
{
    code=unescape(code);
    var c=String.fromCharCode(code.charCodeAt(0)-code.length);
    for(var i=1;i<code.length;i++){
        c+=String.fromCharCode(code.charCodeAt(i)-c.charCodeAt(i-1));
    }
    return c;
}
//eval(uncompile("o%CD%D1%D7%E6%9CJ%u9EF3%uFA73%uF1D4%u14F1%u7EE1Kd"));