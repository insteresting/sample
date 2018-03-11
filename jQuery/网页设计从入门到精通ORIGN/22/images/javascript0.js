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
}
