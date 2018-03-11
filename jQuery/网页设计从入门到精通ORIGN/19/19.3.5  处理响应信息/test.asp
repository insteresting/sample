<%@LANGUAGE="VBSCRIPT" CODEPAGE="936"%>
<%
dim user
user = Request.QueryString("name")
Response.AddHeader "Content-Type","text/html;charset=gb2312"
if user<>"admin" then 
	Response.Write "输入信息非法!"
else
	Response.Write "欢迎"&user
end if
%>