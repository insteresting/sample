<%@LANGUAGE="VBSCRIPT" CODEPAGE="936"%>
<%
dim user
user = Request.QueryString("name")
Response.AddHeader "Content-Type","text/html;charset=gb2312"
if user<>"admin" then 
	Response.Write "������Ϣ�Ƿ�!"
else
	Response.Write "��ӭ"&user
end if
%>