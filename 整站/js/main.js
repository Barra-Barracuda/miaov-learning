window.onload = function(){
	mv.app.toTip();
	mv.app.toBanner();
	mv.app.toSel();
	mv.app.toRun();
	}

var mv = {}; //命名空间

mv.tools = {};

mv.tools.getByClass = function(oParent,sClass){
	var aEle = oParent.getElementsByTagName('*');
	var arr = [];
	
	for(var i=0;i<aEle.length;i++){
		if(aEle[i].className == sClass){
			arr.push(aEle[i]);
			}
		}
		return arr;
	};
	
mv.tools.getStyle = function(obj,attr){
	if(obj.currentStyle){
		return obj.currentStyle[attr];
	}
	else{
		return getComputedStyle(obj,false)[attr];
	}
};

mv.ui = {};

mv.ui.textChange = function(obj,str){
	
	obj.onfocus = function(){
		if(this.value == str){ //如果默认是str就变成空，如果是空就变为默认
			this.value = '';
			}
		};
		
	obj.onblur = function(){
		if(this.value == ''){
			this.value = str;
			}
		
		}	
		
	};
	
mv.ui.fadeIn = function(obj){
	var iCur = mv.tools.getStyle(obj,'opacity');
	if(iCur==1){ return false; }
		var value = 0;
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		var iSpeed = 5;
		if(value==100){
			clearInterval(obj.timer);
			}else{
				value += iSpeed;
				obj.style.opacity = value/100;  
				/*opacity是0到1的数值*/
				obj.style.filter = 'alpha(opacity='+value+')';
				}
		
		},30)
	
	};

mv.ui.fadeOut = function(obj){
	
	var iCur = mv.tools.getStyle(obj,'opacity');
	if(iCur==0){ return false; }
	
	var value = 100;
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		var iSpeed = -5;
		if(value==0){
			clearInterval(obj.timer);
			}else{
				value += iSpeed;
				obj.style.opacity = value/100;  
				/*opacity是0到1的数值*/
				obj.style.filter = 'alpha(opacity='+value+')';
				}
		
		},30)
	
	}
	

mv.ui.moveLeft = function(obj,old,now){
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		var iSpeed = (now - old)/10;  
		iSpeed = iSpeed >0?Math.ceil(iSpeed):Math.floor(iSpeed); //让速度取整
		
		if(now == old){
			clearInterval(obj.timer)
			}else{
				old += iSpeed;
				obj.style.left = old + 'px';
				}
		
		},30)
	}

mv.app ={};

mv.app.toTip = function(){
	var oText1 = document.getElementById('text1');
	var oText2 = document.getElementById('text2');
	
	mv.ui.textChange(oText1,'Search Website');
	mv.ui.textChange(oText2,'Search Website');	
	
	};
	
mv.app.toBanner = function(){
	var oDd = document.getElementById('ad');
	var aLi = oDd.getElementsByTagName('li');
	var iNow =0;
	var oPrevBg = mv.tools.getByClass(oDd,'prev_bg')[0];
	var oNextBg = mv.tools.getByClass(oDd,'next_bg')[0];
	
	var oPrev = mv.tools.getByClass(oDd,'prev')[0];
	var oNext = mv.tools.getByClass(oDd,'next')[0];
	
	var timer = setInterval(auto,3000);
	
	function auto(){
		if(iNow == aLi.length-1){
		iNow=0;
		}else{
			iNow++;
			}
	for(var i=0;i<aLi.length;i++){
		mv.ui.fadeOut(aLi[i]);
		}
		mv.ui.fadeIn(aLi[iNow]);
	};
	
	function autoPrev(){
		if(iNow == 0){
		iNow= aLi.length-1;
		}else{
			iNow--;
			}
	for(var i=0;i<aLi.length;i++){
		mv.ui.fadeOut(aLi[i]);
		}
		mv.ui.fadeIn(aLi[iNow]);
	};
	
	oPrevBg.onmouseover = oPrev.onmouseover = function(){
		oPrev.style.display = 'block';
		clearInterval(timer);
		};
		
	oNextBg.onmouseover = oNext.onmouseover = function(){
		oNext.style.display = 'block';
		clearInterval(timer);
		};	
	oNextBg.onmouseout =oNext.onmouseout = function(){
		oNext.style.display = 'none';
	timer = setInterval(auto,3000);
		};
	oPrevBg.onmouseout = oPrev.onmouseout = function(){
		oPrev.style.display = 'none';
		timer = setInterval(auto,3000);
		};	
		
	oPrev.onclick = function(){
		autoPrev();
		};
		
	oNext.onclick = function(){
		auto();
		};	
			
	};	
	
mv.app.toSel = function(){
	var oSel = document.getElementById('sel1');
	var aDd = oSel.getElementsByTagName('dd');
	var aUl = oSel.getElementsByTagName('ul');
	var aH2 = oSel.getElementsByTagName('h2');
	
	for(var i=0;i<aDd.length;i++){
		aDd[i].index = i;
		aDd[i].onclick = function(ev){
			
			var ev = ev || window.event;
			
			var This = this; //因为document的点击事件的this不应该指向document，而是aDd[i],所以存起来
			
			for(var i=0;i<aUl.length;i++){//点击的时候，其他ul隐藏
				aUl[i].style.display = 'none';
				}
			
			aUl[this.index].style.display ='block'; //让点击的ul显示出来
			
			document.onclick = function(){
				aUl[This.index].style.display = 'none';
				};
				
			 ev.cancelBubble = true; //因为document的点击事件冒泡不能点击所以要阻止默认事件
			}
		}
	for(var i=0;i<aUl.length;i++){
		aUl[i].index = i;//ul的索引找到h2
		(function(ul){ //闭包
			var aLi = ul.getElementsByTagName('li');
			
			for(var i=0;i<aLi.length;i++){
				aLi[i].onmouseover = function(){
					this.className = 'active';
					}
				aLi[i].onmouseout = function(){
					this.className = '';
					};	
				aLi[i].onclick = function(ev){
					
					var ev = ev || window.event;
					
					aH2[this.parentNode.index].innerHTML = this.innerHTML;
					
					ev.cancelBubble = true; //防止冒泡到dd的点击上
					
					this.parentNode.style.display = 'none';
					}	
					
				}
			})(aUl[i]);
		}
	
	}	
	
mv.app.toRun = function(){
	var oRun =document.getElementById('run1');
	var oUl = oRun.getElementsByTagName('ul')[0];
	var aLi = oUl.getElementsByTagName('li');
	
	var oPrev = mv.tools.getByClass(oRun,'prev')[0];
	var oNext = mv.tools.getByClass(oRun,'next')[0];
	
	var iNow = 0;
	
	oUl.innerHTML += oUl.innerHTML;
	
	oUl.style.width = aLi.length * aLi[0].offsetWidth + 'px';
	
	oPrev.onclick = function(){
			if(iNow == 0){
				iNow = aLi.length/2;
				oUl.style.left = -oUl.offsetWidth/2 + 'px';
				
			}
			mv.ui.moveLeft(oUl,-iNow*aLi[0].offsetWidth,-(iNow-1)*aLi[0].offsetWidth);
		
			iNow--;		
		};	
		
	
		
		oNext.onclick = function(){
			
			if(iNow == aLi.length/2){
				iNow = 0;
				oUl.style.left = 0;
				
			}
			mv.ui.moveLeft(oUl,-iNow*aLi[0].offsetWidth,-(iNow+1)*aLi[0].offsetWidth);
		
			iNow++;		
		};	
	};