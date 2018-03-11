<!DOCTYPE html>     
<html>     
<head>     
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />   
<meta name="viewport" content="width=device-width, initial-scale=1">  
</head>               
<body>
	<?php
		$con=mysql_connect("localhost","root","");       //建立到数据库的连接命令
		mysql_query("set names utf8");				  //执行连接命令
		if(!$con)
		{
			echo "failed connect to database";		  //如果连接失败则输出信息
		}else
		{
			echo "succeed connect to database";	 //连接成功
			echo "</br>";
			mysql_select_db("myblog", $con);		 //选择数据库
			//从表wenzhang中读取数据
			$result=mysql_query("SELECT * FROM `wenzhang`",$con);
			//将读取到的数据进行整理
			while($row = mysql_fetch_array($result))
			{
				echo "id	==>";		//输出文章编号
				echo $row[0];
				echo "</br>";
				
				echo "题目	==>";		//输出文章题目
				echo $row[1];
				echo "</br>";
				
				echo "作者	==>";		//输出文章作者
				echo $row[2];
				echo "</br>";
				
				echo "内容	==>";		//输出文章内容
				echo $row[3];
				echo "</br>";
				
				echo "日期	==>";		//输出文章发表日期
				echo $row[4];
				echo "</br>";
			}
			mysql_close($con);				//终止对数据库的连接
		}
	?>
</body>
</html>