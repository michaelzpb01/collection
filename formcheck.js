'use strict'
var reJson = {
	email:/^\w+\@[a-zA-Z0-9\-]+(\.[a-zA-Z]{2,8}){1,2}$/,
	phone:/^1[34578]\d{9}$/,
	telephone:/^0[1-9]\d{1,2}\-[1-9]\d{6,7}$/
};
function formCheck(id){
	var oForm = document.getElementById(id);
	var aEle = oForm.getElementsByTagName('*');
	function check(obj){
		var re = reJson[obj.name];
		if(re){
			if(re.test(obj.value)){
				obj.className='ok';
				return true;
			}else{
				obj.className='err';
				return false;
			}
		}
		return true;
	}
	for(var i=0;i<aEle.length;i++){
		aEle[i].onblur=function(){
			check(this);
		};
	}
	oForm.onsubmit=function(){
		var bOk = true;
		
		for(var i=0;i<aEle.length;i++){
			//alert(check(aEle[i]));
			if(!check(aEle[i])){
				bOk = false;
			}
		}
		
		if(!bOk){
			return false;
		}
		
	};
}