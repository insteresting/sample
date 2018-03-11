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
<?php
	$pid=$_GET["pid"];
	
	$con=mysql_connect("localhost","root","");
	if(!$con)
	{
		echo "failed";
	}else
	{
		mysql_query("set names utf8");
		mysql_select_db("myblog", $con);
		
		$sql_query="SELECT * FROM lanmu";
		$result=mysql_query($sql_query,$con);
	}
?>  
	<div data-role="page" data-theme="c">
    	<div data-role="panel" id="mypanel" data-theme="a">
        	<ul data-role="listview" data-inset="true" data-theme="a">
			<?php
				while($row = mysql_fetch_array($result))
				{
				echo "<li><a href='";
				echo "list.php?pid=";
				echo $row['pid'];
				echo "'>";
				echo $row['name'];
				echo "</a></li>";
				}
			?>
            </ul>
		</div>
        <div data-role="content">
        	<ul data-role="listview" data-inset="true">
    		<?php
				$sql_query="SELECT * FROM wenzhang WHERE pid=$pid";
				$result=mysql_query($sql_query,$con);
				while($row = mysql_fetch_array($result))
				{
					echo "<li>";
					echo "<a href='";
					echo "neirong.php?id=";
					echo $row['id'];
					echo "&pid=";
					echo "$pid";
					echo "'><h4>";
					echo $row['title'];
					echo "</h4>";
					echo "<p>";
					echo $row['neirong'];;
					echo "</p>";
                    echo "</a>";
					echo "</li>";
				}
			?>
			</ul>
        </div>
	</div>
	<?php
		mysql_close($con);
	?>
</body>
</html>
