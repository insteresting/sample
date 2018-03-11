
$(function(){
	//动态下拉菜单
	var menu = $("#nav2 li");
	menu.each(function(i){
		if($(this).children().is("ul")){
			$(this).css("background","url(images/right.png) 13px right no-repeat");
			$(this).mouseover(function(){
				$(this).children("ul").show();	
			});
			$(this).mouseout(function(){
				$(this).children("ul").hide("");	
	
			});	
		}
	});			   
	//延迟的下拉菜单
	$("#header p").mouseover(function(){
		timeout = setTimeout(function(){
			$("#header p span").fadeIn("slow");
		},2000);
	});
	$("#header p").mouseout(function(){
			clearTimeout(timeout);
			
	 });
	$("#header p span").mouseout(function(){
			clearTimeout(timeout);
			$(this).fadeOut("slow");
			
	 });
	//自定义折叠面板	
	$("#sub dt").each(function(i){
		$(this).click(function(){
			$(this).toggleClass("sub_dt2");
			$($("#sub dd")[i]).slideToggle("normal");
		});
	});
	//鼠标移过时的动态效果	
	var li = $(".icon li");
	var icon = ["dw","fl","ps","ai","fw","acr","sb","ct","br","devcen","vrscue"];
	var icon1 = ["dw1","fl1","ps1","ai1","fw1","acr1","sb1","ct1","br1","devcen1","vrscue1"];
	
	li.each(function(i){
					$(this).css("background-image","url(images/"+icon[i]+".png)");
					$(this).mouseover(function(){
						$(this).css("background-image","url(images/"+icon1[i]+".png)");	
					});
					$(this).mouseout(function(){
						$(this).css("background-image","url(images/"+icon[i]+".png)");	
					});	
	});
	//左右推拉面板
	$(".left").click(function(){
		  $("#temp1").animate({left: '30px'}, "slow");
		  $("#temp2").animate({left: '-800px'}, "slow");  
		  return false;
	});
	$(".right").click(function(){
		  $("#temp1").animate({left: '800px'}, "slow");
		  $("#temp2").animate({left: '30px'}, "slow"); 
		  return false;
	}); 
});


