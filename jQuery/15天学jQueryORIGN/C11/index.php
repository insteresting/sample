<!DOCTYPE html>     
<html>     
<head>     
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />   
<meta name="viewport" content="width=device-width, initial-scale=1">  
<!--<script src="cordova.js"></script>-->   
<link rel="stylesheet" href="jquery.mobile.min.css" />     
<script src="jquery.js"></script>     
<script src="jquery.mobile.min.js"></script>    
<script type="text/javascript">
$(document).ready(function()
{
	$screen_width=$(window).width();							//获取屏幕宽度
	$pic_height=$screen_width*2/3;							//图片高度为屏幕宽度的倍数
	$pic_height=$pic_height+"px";
	$("div[data-role=top_pic]").width("100%").height($pic_height);		//设置图片尺寸
});
</script> 
</head>               
<body>
	<div data-role="page" data-theme="c">
        <div data-role="top_pic" style="background-color:#000; width:100%;">
	        	<img src="images/top.jpg" width="100%" height="100%"/>
        </div>
        <div data-role="content">
	        	<ul data-role="listview" data-inset="true">
			<?php
				//连接到数据库
				$con=mysql_connect("localhost","root","");
				if(!$con)
				{
					echo "failed";					//连接失败则报错
				}else
				{	//设置页面编码方式
					mysql_query("set names utf8");
					//选择数据库
					mysql_select_db("myblog", $con);
					//生成查询命令
					$sql_query="SELECT * FROM lanmu";
					//执行查询操作
					$result=mysql_query($sql_query,$con);
				}
				while($row = mysql_fetch_array($result))
				{
					//显示栏目列表
					echo "<li><a href='list.php?pid=";
					echo $row['pid'];
					echo "'><h1>";
					echo $row['name'];
					echo "</h1></a></li>";
				}
			?>
			</ul>
        </div>
	</div>
</body>
</html>