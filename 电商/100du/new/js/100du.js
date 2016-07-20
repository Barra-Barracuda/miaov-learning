$(function(){
	//搜索切换
	(function(){
	 var aLi = $('.menu li');
	 var oText = $('#search .form').find('.text');
	 var arrText = [
			'例如：荷棠鱼坊烧鱼 或 樱花日本料理',
			'例如：昌平区育新站龙旗广场2号楼609室',
			'例如：万达影院双人情侣券',
			'例如：东莞出事了，大老虎是谁？',
			'例如：北京初春降雪，天气变幻莫测'
		];
		
	var iNow =0; //必须创建，因为index在循环结束就不能调用了	
    oText.val(arrText[iNow]); //初始化
	 	
	 aLi.each(function(index){
		 
		 $(this).click(function(){
			 aLi.attr('class','gradient');
			 $(this).attr('class','active');
			 
			 iNow = index; //此时iNow的外面 var iNow就是index
			 oText.val(arrText[iNow]);
			 })
		 })
	
	oText.focus(function(){
		
		if($(this).val() == arrText[iNow]){
			$(this).val('');
			}
		
		}).blur(function(){
			if($(this).val()== ''){
				oText.val(arrText[iNow])
				}
			})	 
		})();

	//update文字滚动
	 	//创建好li	
	(function(){
		var oUl = $('.update ul');
		var iH = 0;
		var arrData = [
			{ 'name':'萱萱', 'time':4, 'title':'那些灿烂华美的瞬间', 'url':'http://www.miaov.com/2013/' },
			{ 'name':'畅畅', 'time':5, 'title':'广东3天抓获涉黄疑犯', 'url':'http://www.miaov.com/2013/#curriculum' },
			{ 'name':'萱萱', 'time':6, 'title':'国台办回应王郁琦', 'url':'http://www.miaov.com/2013/#about' },
			{ 'name':'畅畅', 'time':7, 'title':'那些灿烂华美的瞬间', 'url':'http://www.miaov.com/2013/#message' },
			{ 'name':'萱萱', 'time':8, 'title':'那些灿烂华美的瞬间', 'url':'http://www.miaov.com/2013/' },
			{ 'name':'畅畅', 'time':9, 'title':'广东3天抓获涉黄疑犯', 'url':'http://www.miaov.com/2013/#curriculum' },
			{ 'name':'萱萱', 'time':10, 'title':'国台办回应王郁琦', 'url':'http://www.miaov.com/2013/#about' },
			{ 'name':'畅畅', 'time':11, 'title':'那些灿烂华美的瞬间', 'url':'http://www.miaov.com/2013/#message' }
		];
		var str = '';
		var oBtnUp = $('#updateUpBtn');
		var oBtnDown = $('#updateDownBtn');
		var iNow =0;
		var timer =null;
		var oDiv = $('.update');
	
		for(var i=0;i<arrData.length;i++){
			str += '<li><a href="'+ arrData[i].url +'"> <strong>'+ arrData[i].name +'</strong> <span>' +arrData[i].time +'分钟前</span> 写了一篇新文章:' +arrData[i].title+ '...</a></li>';
			}
			oUl.append(str);
			
			var iH = oUl.find('li').height();

			
		//点击动作	
		oBtnUp.click(function(){
			doMove(-1);
		
			});
		oBtnDown.click(function(){
			doMove(1);
		
			});	
		
		//鼠标移上去
		oDiv.hover(function(){
			clearInterval(timer);
			},autoPlay);
		
		
		//定时器	
		function autoPlay(){
			timer = setInterval(function(){
				doMove(-1);
				},1000)
			}
		autoPlay();	//自动播放	
			
		//封装公用函数	
			function doMove(num){ 
				iNow += num;//再点击更新num值
				
				if(Math.abs(iNow)>arrData.length-1){
					iNow = 0;
					}
					if(iNow>0){
					iNow = -(arrData.length-1);
					}	
				oUl.stop().animate({"top":iH*iNow},500,'elasticOut'); //stop()防止连点bug
				}	
		
	})();
	
	//options 选项卡切换
		//先在html里找到ul加个class来切换，有几个切换图标就加几个ul，点击的时候，一个隐藏一个显示
	(function(){
		fnTab($('.tabNav1'),$('.tabCon1'),'click');
		fnTab($('.tabNav2'),$('.tabCon2'),'click');
		fnTab($('.tabNav3'),$('.tabCon3'),'mouseover');
		fnTab($('.tabNav4'),$('.tabCon4'),'mouseover');
		
		function fnTab(oNav,aCon,sEvent){
			var aElem = oNav.children();//li
			aCon.hide().eq(0).show(); //初始化，只显示第一个ul
			
			aElem.each(function(index){
				$(this).on(sEvent,function(){
					aElem.removeClass('active').addClass('gradient');
					$(this).removeClass('gradient').addClass('active');
					aElem.find('a').attr('class','triangle_down_gray');
					$(this).find('a').attr('class','triangle_down_red');
					
					aCon.hide().eq(index).show();
					
					})
				
				})
			
			}
		
		})();
		
	//自动播放的焦点图
	
	(function (){
		var oDiv = $('#fade');
		var aUlLi = oDiv.find('ul li');
		var aOlLi = oDiv.find('ol li');
		var oP = oDiv.find('p');
		var arr = [ '爸爸去哪儿啦~', '人像摄影中的光影感', '娇柔妩媚、美艳大方' ];
		var iNow = 0;
		var timer = null;
		
		fnFade();//初始化
		
		aOlLi.click(function(){
			iNow = $(this).index();
			fnFade();
			})
		
		function autoPlay(){
			timer = setInterval(function(){
				iNow++;
				iNow%=arr.length;
				fnFade();
				},1000)
			}	
		autoPlay();
		
		oDiv.hover(function(){
			clearInterval(timer);
			},autoPlay)
		
		function fnFade() {
			aUlLi.each(function (i){
				if ( i != iNow ) {
					aUlLi.eq(i).fadeOut().css('zIndex', 1);
					aOlLi.eq(i).removeClass('active');
						
				} else {
					aUlLi.eq(i).fadeIn().css('zIndex', 2);
					aOlLi.eq(i).addClass('active');
						}
				});
			oP.text(arr[iNow]);
			}
		})();
	
	//日历提示说明
	(function(){
var aSpan = $('.calendar h3 span');
		var aImg = $('.calendar .img');
		var oPrompt = $('.today_info');
		var oImg = oPrompt.find('img');
		var oStrong = oPrompt.find('strong');
		var oP = oPrompt.find('p');
		
		aImg.hover(function (){
			var iTop = $(this).parent().position().top - 30; //找到当前元素的父级li所在的top和left值.-30，+55是为了避免层覆盖了
			var iLeft = $(this).parent().position().left + 55;
			var index = $(this).parent().index()%aSpan.size(); //img的父级li的索引值，size是在aSpan的第几个
			
			oPrompt.show().css({'left':iLeft,'top':iTop});
			oP.text($(this).attr('info'));
			oImg.attr('src',$(this).attr('src'));
			oStrong.text(aSpan.eq(index).text());
			
			
			},function(){
			oPrompt.hide();	
				})
		
		})();
	
	
	
	//BBS高亮显示
	(function(){
		$('.bbs ol li').mouseover(function(){
			$('.bbs ol li').removeClass('active').eq($(this).index()).addClass('active');
			})
		
		})();
		
	//HOT鼠标提示效果
	(function(){
		var arr = [
			'',
			'用户1<br />人气1',
			'用户名：性感宝贝<br />区域：朝阳CBD<br />人气：124987',
			'用户3<br />人气3',
			'用户4<br />人气4',
			'用户5<br />人气5',
			'用户6<br />人气6',
			'用户7<br />人气7',
			'用户8<br />人气8',
			'用户9<br />人气9',
			'用户10<br />人气10'
		];
		
		$('.hot_area li').mouseover(function(){
			
			if($(this).index() == 0)return;
			
			$('.hot_area li p').remove();
			//$(this).width()-12; //减掉padding值
			
			$(this).append('<p style="width:'+($(this).width()-12)+'px;height:'+($(this).height()-12)+'px">'+arr[$(this).index()]+'</p>');
			
			})
		
		})();	
	
})