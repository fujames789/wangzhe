$(function(){
	var picHeight=document.documentElement.scrollHeight/30;
	var num=0; //marginTop的高度
	$("#box .nav ul li").mouseenter(function(){
		var num=$(this).index()*picHeight;
		//console.log(num);
		$(".nav .go").stop().animate({"margin-top":-num+"px"},400);
		$("#box .nav ul li").removeClass("on");
		$(this).addClass("on");
	})

	$("#box .nav ul li").mouseenter(function(){
		var n=$(this).index()+$("#box .nav li").length;
		var num=picHeight*n;
		$("#box .go").stop().animate({"margin-top":-num+"px"},400);

		$("#box .nav ul li").removeClass("on");
		$(this).addClass("on");
		console.log(n);
	});
});