
window.onload = function(){
	var color = document.getElementById("colours").getElementsByTagName("a");
	var linkcss = document.getElementsByTagName("link")[1];
	for(var i=0 ;i<color.length; i++){
		color[i].onclick = (function(i){ 
			return function(){
				var img = color[i].getElementsByTagName("img");
				var src =img[0].getAttribute("src");
				var a = src.lastIndexOf("/");
				var b = src.lastIndexOf(".");
				src = src.substring(a+1,b);
				var newcss = linkcss.getAttribute("href").replace(/(\w+)\_(\w+)(\.css)/,"$1_"+src+"$3");
				linkcss.setAttribute("href",newcss);
			}
		})(i);
	}

	initMenu("pics/class.xml");
	initThumbs("pics.xml","pics/1/");
}

function loadXML(xmlpath){//初始化XML DOM控件，并加载指定xml文件
	var xmlDoc=null;
	if (window.ActiveXObject){
		xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
	}else if (document.implementation && document.implementation.createDocument){
		xmlDoc=document.implementation.createDocument("","",null);
	}else{
		alert('你的浏览器暂时不支持XML DOM控件');
	}
	xmlDoc.async=false;
	xmlDoc.load(xmlpath);
	return xmlDoc;
}
function initMenu(xmlpath,more){//显示导航图
    var oxml=loadXML(xmlpath);
	$("#side_menu").empty();
    $(oxml).find("pics > folder").each(function(i){
		if(i>4&&more!=true){return false;};												
        var temp_str;
        temp_str= "<div><a href='#' title='"+$(this).attr("name")+"'><img src='pics/"+$(this).attr("name")+"/"+$(this).attr("class")+"' alt='"+$(this).text()+"' /></a><span>"+$(this).text()+"</span></div>";
        $(temp_str).appendTo("#side_menu");
    });
	if($(oxml).find("pics > folder").length>5){
		if(more!=true){
			temp_str="<p onclick='initMenu(\"pics/class.xml\",true);'>全部分类</p>";
			$(temp_str).appendTo("#side_menu");
		}
		if(more==true){
			temp_str="<p onclick='initMenu(\"pics/class.xml\",false);'>显示部分分类</p>";
			$(temp_str).appendTo("#side_menu");
		}
	}
	bindMenuEvent();
}

function initThumbs(xmlpath,url){//显示缩微图
    var oxml=loadXML(url+xmlpath);
    $(oxml).find("pics file").each(function(){
		var temp_str;
        temp_str= "<a href='#'><img src='pics/"+$(this).parent().attr("name")+"/t"+$(this).text()+"' title='"+$(this).text()+"' alt='"+$(this).text()+"' /></a>";
		$(".title").text($(this).parent().attr("class"));
        $(temp_str).appendTo("#thumbs");

    });
	bindThumbsEvent();
}


function bindThumbsEvent(){//为缩微图绑定事件
	$("#thumbs a").each(function(i){
		$("#thumbs a")[i].onclick = (function(i){
			return function(){
				var url = $($("#thumbs img")[i]).attr("src");
				$(".big_pic").empty();
				showBigImg(url);
			};
		})(i);
	});	
} 


function showBigImg(url){//显示大图
	var a = url.lastIndexOf("/t");
	b = url.substring(0,a);
	c = url.substring(a+2);
	var temp_str;
	temp_str= "<img src='"+b+"/"+c+"' alt='"+c+"' />";
	$(temp_str).appendTo(".big_pic");
}

function bindMenuEvent(){ //为导航图标绑定事件
	$("#side_menu a").each(function(i){
			$("#side_menu a")[i].onclick = (function(i){
				return function(){
					var url = $($("#side_menu a")[i]).attr("title");
					$("#thumbs").empty();
					initThumbs("pics.xml","pics/"+url+"/");
				};
			})(i);
	});
}