		function mgetStyle(obj,sName){
			return (obj.currentStyle||getComputedStyle(obj,false))[sName];
		}
		function a2d(n){
			return n*180/Math.PI;
		}
		function startMove(obj,json,options){
			options = options || {};
			options.duration = options.duration || 700;
			options.easing = options.easing || 'ease-out';
			var start = {};
			var dis = {};
			
			for(var name in json){
				start[name] = parseFloat(mgetStyle(obj,name));
				if(isNaN(start[name])){
					switch(name){
                        case 'width':
							start[name] = obj.offsetWidth;
							break;
						case 'height':
							start[name] = obj.offsetHeight;
							break;
						case 'left':
							start[name] = obj.offsetLeft;
							break;
						case 'top':
							start[name] = obj.offsetTop;
							break;
						case 'opacity':
							start[name] = 1;
							break;
						case 'borderWidth':
							start[name] = 0;
							break;
					}
				}
				dis[name] = json[name] - start[name];
			}
			var count = Math.floor(options.duration/16);
			var n = 0;
			clearInterval(obj.timer);
			obj.timer = setInterval(function(){
				n++;
				for(var name in json){
					switch(options.easing){
						case 'linear':
							var cur = start[name]+dis[name]*n/count;
							break;
						case 'ease-in':
							var a = n/count;
							var cur = start[name]+dis[name]*Math.pow(a,3);
							break;
						case 'ease-out':
							var a = 1-n/count;
							var cur = start[name]+dis[name]*(1-Math.pow(a,3));
							break;
						default:
							var a = 1-n/count;
							var cur = start[name]+dis[name]*(1-Math.pow(a,3));
							break;
					}
					if(name=='opacity'){
						obj.style.opacity = cur;
						obj.style.filter = 'alpha(opacity:'+cur*100+')';
					}else{
						obj.style[name] = cur+'px';
					}
				}
				if(n==count){
					clearInterval(obj.timer);
					options.complete&&options.complete();
				}
			},16);
		}
		function addEvent(obj, sEv, fn) {
			if (obj.addEventListener) {
				obj.addEventListener(sEv, fn, false);
			} else {
				obj.attachEvent('on' + sEv, fn);
			}
		}
		function MaskHoverDir(obj,ev){
			//console.log(obj)
			var sT = document.documentElement.scrollTop||document.body.scrollTop;
			var sL = document.documentElement.scrollLeft||document.body.scrollLeft;
			var w = obj.offsetWidth;
			//alert(w);
			var h = obj.offsetHeight;
			//alert(h);
			var x = obj.offsetLeft+w/2-(ev.clientX+sL);
			//alert(x);
			var y = obj.offsetTop+h/2-(ev.clientY+sT);
			//alert(y);
			//alert(Math.round((a2d(Math.atan2(y,x))+180)/90)%4)
			return Math.round((a2d(Math.atan2(y,x))+180)/90)%4;
		}
		function MaskThrough(obj,Time){
			var oS = obj.children[0];
			Time = Time||300;
			function mouseOver(ev,_this){
				var oEvent = ev||event;
				alert(_this.tagName);
				//oForm = oEvent.formElement||oEvent.relatedTarget;
				//if(_this.contains(oForm))return;
				var dir = MaskHoverDir(_this,oEvent);
				switch(dir){
					case 0:
						//右
						oS.style.left = obj.offsetWidth+'px';
						oS.style.top = 0;
						break;
					case 1:
						//下
						oS.style.left = 0;
						oS.style.top = obj.offsetHeight+'px';
						break;
					case 2:
						//左
						oS.style.left = '-'+obj.offsetWidth+'px';
						oS.style.top = 0;
						break;
					case 3:
						//上
						oS.style.left = 0;
						oS.style.top = '-'+obj.offsetHeight+'px';
						break;
				}
				startMove(oS,{top:0,left:0},{duration:Time});
			}
			var oC = document.getElementById('child1');
			function mouseOut(ev,_this){
				var oEvent = ev||event;
				//var oTo = oEvent.toElement||oEvent.relatedTarget;
				//if(_this.contains(oTo))return;
				var dir = MaskHoverDir(_this,oEvent);
				console.log(dir);
				switch(dir){
					case 0:
						//右
						startMove(oS,{left:obj.offsetWidth+4,top:0},{duration:Time});
						break;
					case 1:
						//下
						startMove(oS,{left:0,top:obj.offsetHeight+4},{duration:Time});
						break;
					case 2:
						//左
						startMove(oS,{left:-obj.offsetWidth-4,top:0},{duration:Time});
						break;
					case 3:
						//上
						startMove(oS,{left:0,top:-obj.offsetHeight-4},{duration:Time});
						break;
					default:
						startMove(oS,{left:-200,top:0},{duration:Time});
				}
			}
			addEvent(obj,'mouseenter',function(ev){
				var oEvent = ev||event;
				//mouseOver.call(this,this);
				mouseOver(oEvent,this);
			});
			addEvent(obj,'mouseleave',function(ev){
				var oEvent = ev||event;
				mouseOut(oEvent,this);
			});
		}
		function zgetByClass(oParent,sClass){
			if(oParent.getElementsByClassName){
				return oParent.getElementsByClassName(sClass);
			}else{
				var aResult = [];
				var re = new RegExp('\\b'+sClass+'\\b');
				var aEle = oParent.getElementsByTagName('*');
				for(var i=0;i<aEle.length;i++){
					if(aEle[i].className.search(re)!=-1){
						aResult.push(aEle[i]);
					}
				}
				return aResult;
			}
		}
