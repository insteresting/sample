<!DOCTYPE html>     
<html>     
<head>     
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />   
<meta name="viewport" content="width=device-width, initial-scale=1">  
<!--<script src="cordova.js"></script>-->   
<link rel="stylesheet" href="jquery.mobile.min.css" />     
<script src="jquery.js"></script>     
<script src="jquery.mobile.min.js"></script>   
<script>
	$( "#mypanel" ).trigger( "updatelayout" ); 
</script> 
<script type="text/javascript">
    $(document).ready(function(){
      $("div").bind("swiperight", function(event) {
        $( "#mypanel" ).panel( "open" );
      });  
    });
</script>
</head>             
<body>
<?php include("wenzhang.php"); ?>
<?php
	$id=$_GET["id"];
	$pid=$_GET["pid"];
	
	$con=mysql_connect("localhost","root","");
	if(!$con)
	{
		echo "failed";
	}else
	{
		mysql_query("set names utf8");
		mysql_select_db("myblog", $con);
		
		$sql_query="SELECT * FROM wenzhang WHERE id=$id";
		$result=mysql_query($sql_query,$con);
		
		$row = mysql_fetch_array($result);
	
		$show=new wenzhang();
		$show->id=$row["id"];
		$show->pid=$row["pid"];
		$show->title=$row["title"];
		$show->neirong=$row["neirong"];
		$show->pubdate=$row["date"];
		$show->author=$row["author"];
		//文章显示部分
	}
?>  
	<div data-role="page" data-theme="c">
    	<div data-role="panel" id="mypanel" data-theme="a">
        	<ul data-role="listview" data-inset="true" data-theme="a">
			<?php
				$sql_query="SELECT * FROM wenzhang WHERE pid=$pid";
				$result=mysql_query($sql_query,$con);
				while($row = mysql_fetch_array($result))
				{
				echo "<li><a href='neirong.php?id=";
				echo $row["id"];
				echo "&pid=";
				echo $row["pid"];
				echo "'>";
				echo $row["title"];
				echo "</a></li>";
				}
			?>
            </ul>
		</div>
        <div data-role="header" data-position="fixed" data-theme="c">
        	<a href="list.php?pid=<?php echo $show->get_pid(); ?>" data-icon="back">返回</a>
        	<h1><?php echo $show->get_title(); ?></h1>
        </div>
        <div data-role="content">
        	<h4 style="text-align:center;"><small>作者：<?php echo $show->get_author(); ?> 发表日期：<?php echo $show->get_pubdate(); ?></small></h4>
            <h4>
				<?php echo $show->get_neirong(); ?>
			</h4>
        </div>
        <div data-role="footer" data-position="fixed" data-theme="c">
        	<div data-role="navbar">
				<ul>
				<?php
					$show->id=$show->id-1;
					$sql_query="SELECT * FROM wenzhang WHERE pid=$show->pid and id=$show->id";
					$result=mysql_query($sql_query,$con);
					$row = mysql_fetch_array($result);
					
					if(!$row)
					{
						echo "<li><a id='chat' href='#' data-icon='arrow-l'>没有上一篇</a></li>";
					}else
					{
						echo "<li><a id='pre' href='neirong.php?id=";
						echo $row["id"];
						echo "&pid=";
						echo $row["pid"];
						echo "' data-icon='arrow-l'>上一篇</a></li>";
					}
				?>        
				<?php
					$show->id=$show->id+2;
					$sql_query="SELECT * FROM wenzhang WHERE pid=$show->pid and id=$show->id";
					$result=mysql_query($sql_query,$con);
					$row = mysql_fetch_array($result);
					
					if(!$row)
					{
						echo "<li><a id='chat' href='#' data-icon='arrow-l'>没有下一篇</a></li>";
					}else
					{
						echo "<li><a id='pre' href='neirong.php?id=";
						echo $row["id"];
						echo "&pid=";
						echo $row["pid"];
						echo "' data-icon='arrow-r'>下一篇</a></li>";
					}
				?>                 
				</ul>
			</div>
        </div>
	</div>
</body>
</html>
