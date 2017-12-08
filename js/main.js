window.onload=function(){
	var oDiv=document.getElementById("playImages");
	var oBtnPrev=getByClass(oDiv,'prev')[0];
	var oBtnNext=getByClass(oDiv,'next')[0];
	var oMarkLeft=getByClass(oDiv,'mark_left')[0];
	var oMarkRight=getByClass(oDiv,'mark_right')[0]
	var oSmallUl=getByClass(oDiv,'small_pic')[0].getElementsByTagName("ul")[0];
	var oSmallLi=oSmallUl.getElementsByTagName('li');
	var oBigUl=getByClass(oDiv,'big_pic')[0];
	var oBigLi=oBigUl.getElementsByTagName("li");
	var iNow=0; //鼠标经过当前的小图下标
	var iMinZindex=2; //改变大图的z-index值,在鼠标经过小图时.
	var timer=null;

oSmallUl.style.width=oSmallLi.length*oSmallLi[0].offsetWidth+'px';//小图UL的真实水平宽度

autoPlay();
//左右按钮
oBtnPrev.onmouseover=oMarkLeft.onmouseover=function(){
	startMove(oBtnPrev,'opacity',100);
}

oBtnPrev.onmouseout=oMarkLeft.onmouseout=function(){
	startMove(oBtnPrev,'opacity',0);
}

oBtnNext.onmouseover=oMarkRight.onmouseover=function(){
	startMove(oBtnNext,'opacity',100);
}

oBtnNext.onmouseout=oMarkRight.onmouseout=function(){
	startMove(oBtnNext,'opacity',0);
}

//点小图切换大图==>tab选项卡
for(var i=0; i<oSmallLi.length; i++){
	oSmallLi[i].index=i;

	//一.小图鼠标经过opacity效果
	oSmallLi[i].onmouseover=function(){
		startMove(this,'opacity',100);//当前图片清晰
	}

	oSmallLi[i].onmouseout=function(){
		if(this.index != iNow){//除当前图片外,其它图片半透明
			startMove(this,'opacity',60);
		}
	}

	//二.点小图,显示大图. 原理:TAB选项卡
	oSmallLi[i].onclick=function(){
		clearInterval(timer);//去除频繁点击大图上左右箭头出现的bug
		if(this.index==iNow) return; //频繁点击小图时,不再响应
		iNow=this.index;//当前小图的下标
		tab();	

		setTimeout(autoPlay,4000);//2秒后,自动轮播	
	}

/*
做动画代码的规则: 任何时候
先停止clearInterval(timer),再运动play().
*/
	//点击大图上左侧箭头
	oBtnPrev.onclick=function(){	
		clearInterval(timer);//去除频繁点击大图上左右箭头出现的bug
		iNow--;
		if(iNow==-1){//左侧: 最后一张时,切换为第一张
			iNow=oSmallLi.length-1;
		}
		tab();
		setTimeout(autoPlay,4000);//2秒后,自动轮播
	} 

	oBtnNext.onclick=function(){//右侧箭头
		clearInterval(timer);//去除频繁点击大图上左右箭头出现的bug
		iNow++;
		if(iNow==oSmallLi.length){
			iNow=0;
		}
		tab();
		setTimeout(autoPlay,4000);//2秒后,自动轮播
	}
}

//自动轮播
function autoPlay(){
	clearInterval(timer);
	timer=setInterval(function(){
		iNow++;
			if(iNow==oSmallLi.length){
				iNow=0;
			}
			tab();	
	},3000);	
}



function getByClass(oParent,oClass){
	var allEle=document.getElementsByTagName("*");
	var aResult=[];

	for(var i=0; i<allEle.length; i++){
		if(allEle[i].className==oClass){
			aResult.push(allEle[i]);
		}
	}
	return aResult;
}

function tab(){
	for(var j=0; j<oSmallLi.length; j++){
			startMove(oSmallLi[j],'opacity',60);
		}
		
		startMove(oSmallLi[iNow],'opacity',100);
		oBigLi[iNow].style.zIndex=iMinZindex++;//显示大图切换
		oBigLi[iNow].style.width=1;
		startMove(oBigLi[iNow], 'width', oBigUl.offsetWidth);
		//console.log(oBigUl.offsetHeight);

		//三.小图的无缝滚动操作
		/*
		原理: 无缝滚动中: 开始二张图和结尾二张图,在移动到极限时,坐标位置不变. 其它图片会移动.见原理图
		*/
		//console.log('iNow='+iNow);
		if(iNow==0){//网页刚加载时,第一张小图状态
			startMove(oSmallUl,'left',0);
		}else if(iNow==oSmallLi.length-1){
			startMove(oSmallUl,'left',-(iNow-2)*oSmallLi[0].offsetWidth);//5-2=3 -390px
		}else{
			startMove(oSmallUl,'left',-(iNow-1)*oSmallLi[0].offsetWidth);//4-1=3 -390px
			//console.log(-(iNow-1)*oSmallLi[0].offsetWidth);
		}

	}
/*
实现:
1.加载图片信息: 数组
2.加载图片数量: 当前图片iNow+1/图片总数oSmallLi.length

*/
}

