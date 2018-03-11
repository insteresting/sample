<%@LANGUAGE="VBSCRIPT" CODEPAGE="936"%>
<%
dim user													'定义ASP脚本变量
user = Request.QueryString("name")							'获取Ajax发送的请求信息
Response.AddHeader "Content-Type","text/html;charset=gb2312"		'设置返回信息的字符编码
if user<>"admin" then										'如果用户输入的信息不为admin
	    Response.Write "输入信息非法!" 							'则返回错误信息
else														'如果输入信息等于admin
	    Response.Write "欢迎"&user								'则返回欢迎信息
end if
%>
