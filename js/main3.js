$(function(){
	var picWidth=document.documentElement.scrollWidth;
	var num=0;					 //marginTop的高度
	$('.z').css({'width':(picWidth*9)+'px','position':'absolute'});
	$('.z div').css({'width':picWidth+'px','float':'left'})
	$("#box .sLeft li").mouseenter(function(){
		var num=$(this).index()*picWidth;
		console.log(num);
		$(".z").animate({"left":-num+"px"},300);
		$("#box ul li").removeClass("on");
		$(this).addClass("on");
	})
});