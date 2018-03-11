//===================================
//数据库操作，以及常用操作函数
//===================================
//===================================
//连接到本地数据库
//参数
//file-当前网页文件
//data-数据库文件，以及相对路径，如data/home.mdb
function connection(file, data){
	var filePath = location.href.substring(0, location.href.indexOf(file));
	var path = filePath + data;
	path = path.substring(8);
	var conn = new ActiveXObject("ADODB.Connection");
	conn.Provider = "Microsoft.Jet.OLEDB.4.0";
	conn.ConnectionString = "Data Source=" + path + ";User ID=admin;Password=;Jet OLEDB:Database Password="+uncompile(code);
	conn.open;
	return conn;
}
var conn = connection("家庭日志.html", "data/home.asp");
//===================================
//执行数据库操作，如修改、删除和更新等
//参数
//sql-数据库操作SQL字符串，字符串
function execute(sql){
	conn.execute(sql);
}
//===================================
//查询记录集
//参数
//sql-数据库查询字符串，字符串
function requeryrs(sql){
	var rs = new ActiveXObject("ADODB.Recordset"); 
	//alert(sql);
	rs.open(sql, conn);
	return rs;
}
//===================================
//关闭记录集对象
//参数
//rs-记录集，数据集合
function closers(rs){
	rs.close();
	rs = null;	
}
//===================================
//扩展Document对象的getElementsByClassName方法
//获取文档或指定对象内特定类型的对象
//参数
//className-类名，字符串
//dom-文档或文档内任何对象，DOM对象
//返回值
//返回匹配类名的DOM对象的数据集合
document.getElementsByClassName = function(className,dom) { 
	var dom  = dom || document;
    var el = [],
        _el = dom.getElementsByTagName('*');
    for (var i=0; i<_el.length; i++ ) {
       if (_el[i].className == className ) {
           el[el.length] = _el[i];
        }
   }
   return el;
}
//扩展文档元素的getElementsByClassName方法，失败...
var getElementsByClassName = function(className) { 
    var el = [],
        _el = document.getElementsByTagName('*');
    for (var i=0; i<_el.length; i++ ) {
       if (_el[i].className == className ) {
           el[el.length] = _el[i];
        }
   }
   return el;
}
//===================================
//HTML元素的方法扩展函数
//原型方法，可以把指定函数绑定到文档内所有元素身上，方便元素直接调用
//参数
//namee-名称，字符串
//fn-函数体，函数
//返回值
//返回元素自己
var DOMextend = function(name, fn){
	if( ! document.all)
		eval("HTMLElement.prototype." + name + " = fn");
	else{
		var _createElement = document.createElement;
		document.createElement = function(tag){
			var _elem = _createElement(tag);
			eval("_elem." + name + " = fn");
			return _elem;
		}
		var _getElementById = document.getElementById;
		document.getElementById = function(id){
			var _elem = _getElementById(id);
			eval("_elem." + name + " = fn");
			return _elem;
		}
		var _getElementsByTagName = document.getElementsByTagName;
		document.getElementsByTagName = function(tag){
			var _arr = _getElementsByTagName(tag);
			for(var _elem = 0; _elem < _arr.length; _elem ++ )
				eval("_arr[_elem]." + name + " = fn");
			return _arr;
		}
	}
};
//===================================
//获取元素的样式值
//参数
//e-元素对象，DOM对象
//n-样式名称，字符串
//返回值
//返回该样式的值
var getStyle  = function(e,n){
	var _this = e
	if(_this.style[n]){ 
		return _this.style[n];
	}
	else if(_this.currentStyle){ 
		return _this.currentStyle[n];
	}
	else if(document.defaultView && document.defaultView.
getComputedStyle){
		n = n.replace(/([A-Z])/g,"-$1");
		n = n.toLowerCase();
		var s = document.defaultView.getComputedStyle(_this,null); 
		if(s)
			return s.getPropertyValue(n);
	}
	else
		return null;
}
//===================================
//转换元素的样式值为数值
//参数
//e-元素对象，DOM对象
//w-获取的样式值，字符串或数字
//返回值
//返回可计算的数值
var fromStyle = function(e,w){
	var _this = e
    var p = 1;
    if(/px/.test(w) && parseInt(w) ) return parseInt(parseInt(w) * p); 
    else if(/\%/.test(w) && parseInt(w)){ 
        var b = parseInt(w) / 100;
        if((p != 1) && p) b *= p; 
        _this = _this.parentNode;
        //if(_this.tagName == "BODY") throw new Error("文档结构无尺寸，请使用其他方法获取尺寸."); 
        w = getStyle(_this,"width"); 
        return arguments.callee(_this, w, b); 
    }
    else if(/auto/.test(w)){
        var b = 1; 
        if((p != 1) && p) b *= p; 
        _this = _this.parentNode;
        //if(_this.tagName == "BODY") throw new Error("文档结构无尺寸，请使用其他方法获取尺寸.");
        w = getStyle(_this,"width");
        return arguments.callee(_this, w , b); 
    }
    else
        throw new Error("元素或其父元素的尺寸定义了特殊的单位.");
}
//===================================
//获取元素距离窗口左侧的偏移位置
//参数
//element-元素对象，DOM对象
//返回值
//返回距离的数值
function getElementLeft(element){
	var actualLeft = element.offsetLeft;
	var current = element.offsetParent;
	while (current !== null){
		actualLeft += current.offsetLeft;
		current = current.offsetParent;
	}
	return actualLeft;
}
//获取元素距离窗口顶部的偏移位置
//参数
//element-元素对象，DOM对象
//返回值
//返回距离的数值
function getElementTop(element){
	var actualTop = element.offsetTop;
	var current = element.offsetParent;
	while (current !== null){
		actualTop += current.offsetTop;
		current = current.offsetParent;
	}
	return actualTop;
}
//===================================
//数据表格动态排序
//参数
//orderbyfield-标题行中需要排序的单元格集合
//sqlstr-生成数据表格的查询字符串，利用该字符串将要提炼数据表格的默认排序字段和排序方法
var sortTable = function(orderbyfield, sqlstr){
	//定义字段集集合
	var fieldobj = {
		"id": "编号",
		"price":"金额",
		"outclass":"出账分类",
		"inclass":"入账分类",
		"shopclass":"超市分类",
		"outid":"出账编号",
		"detail":"描述",
		"class":"类名",
		"date":"日期"
	};
	//转换为小写形式
	var sqlstr = sqlstr.toLowerCase();
	//界定字符串中BY关键字的位置
	var index = sqlstr.indexOf("by");
	//字符串处理和加工，从中提出排序字段、排序方法和新的字符串
	if(index>-1){
		var newsqlstr = sqlstr.substring(0,index+2);
		if(sqlstr.indexOf("asc")>0){
			var ordermethod = "asc";
			var orderfield = sqlstr.substring(index+2,sqlstr.indexOf("asc"));
		}
		else if(sqlstr.indexOf("desc")>0){
			var ordermethod = "desc";
			var orderfield = sqlstr.substring(index+2,sqlstr.indexOf("desc"));
		}
		else{
			var ordermethod = "asc";
			var orderfield = sqlstr.substring(index+2);
		}
	}
	else{
		var newsqlstr = sqlstr + "order by "
		var ordermethod = "asc";
		var orderfield = "id";
	}
	//清除两侧空格
	orderfield = orderfield.replace(/^(\s|　)+/g,'').replace(/(\s|　)+$/g, '');
	//当插入行时，在当前行中要显示的所有字段列
	//定义字段对应的数据类型
	var fieldobj = {
	   "text" : ["detail","class","inclass", "outclass", "shopclass"],
	   "date" : ["date"],
	   "int":["price","id","outid"],
	   "float":["price"]
	};
	//获取数据区域
	var tbody = document.getElementsByTagName("tbody")[0];	
	//定义默认排序方法
	var isasc = true;
	//遍历标题列
	for(var i=0; i<orderbyfield.length; i++){
		//定义列字段名称遍历
		var orderfieldname = "";
		//获取列对应的字段名称
		for(var name in fieldobj){
			if(orderbyfield[i].firstChild.data == fieldobj[name]){
				var orderfieldname = name;
			}
		}
		//如果不存在，则设置默认值
		if(orderfieldname == "")
			orderfieldname = "id";
		//遍历字段数据类型对象，确定当前列的数据类型	
		for(var type in fieldobj){
			for(var j=0; j<fieldobj[type].length; j++){
				if(orderfieldname == fieldobj[type][j])
					var rowtype = type;
			}
		}
		//确定默认排序的列，并添加图形标志
		if(orderfield == orderfieldname){
			var img = document.createElement("img");
			if(ordermethod == "asc") 
				img.setAttribute("src","data/up.gif");
			else
				img.setAttribute("src","data/down.gif");
			img.style.margin = "0 0 -2px 3px";
			orderbyfield[i].appendChild(img);
			//为标志变量设置默认排序的列序号
			tbody.thiscol = i;
		}
		//设置标题列的样式
		orderbyfield[i].style.cursor = "pointer";
		//绑定click事件
		//传递参数说明
		/*
		orderobj：当前列的标题对象
		tbody：数据区域对象
		i：序号
		rowtype：列数据类型
		*/
		orderbyfield[i].onclick = (function(orderobj,tbody,i,rowtype){
			return function(){
				//获取所有标题单元格
				var childnodes = orderobj.parentNode.childNodes;
				//清除标题单元格中的图像
				for(var j=0; j<childnodes.length; j++){
					var tempimg = childnodes[j].getElementsByTagName("img")[0];
					if(tempimg)
						childnodes[j].removeChild(tempimg);
				}
				//切换排序方法
				isasc = !isasc;
				//调用sorttable()排序函数
				sorttable(orderobj, tbody, i, rowtype, isasc);
			}
		})(orderbyfield[i],tbody,i,rowtype);
	}
	//排序函数
	//参数说明如下：
	/*
	me：当前标题单元格对象
	tbody：数据区域
	col：列序号
	type：数据类型
	isasc：排序方法，true表示asc，false表示desc
	*/
	function sorttable(me, tbody, col, type, isasc){
		//创建img元素
		var img = document.createElement("img");
		//设置显示的图像
		if(isasc == true){
			img.setAttribute("src","data/down.gif");
		}
		else{
			img.setAttribute("src","data/up.gif");
		}
		//设置样式
		img.style.margin = "0 0 -2px 3px";
		//显示出来
		me.appendChild(img);
		//获取数据区域的所有行
		rows = tbody.rows;
		//定义临时对象
		var rowarray = [];
		//把所有行对象存储到数组中
		for(var i=0; i<rows.length; i++){
			rowarray.push(rows[i]);
		}
		//排序处理
		//如果当前行是已排序行，则倒置即可
		if(tbody.thiscol == col){
			rowarray.reverse();
		}
		//否则调用sort方法进行排序
		else{	
			rowarray.sort(compare(col,type));
		}
		//创建文档片段
		var frag = document.createDocumentFragment();
		//把数组中所有行添加到文档片段中
		for(var i=0; i<rowarray.length; i++){
			frag.appendChild(rowarray[i]);	
		}
		//不能够清空，否则出错
		//tbody.innerHTML = "";
		//把文档片段添加到数据区域中
		tbody.appendChild(frag);
		//设置当前列为排序列
		tbody.thiscol = col;
	}
	//比较函数，根据数据类型进行排序
	//参数说明如下：
	/*
	col：表示列序号
	type：数据类型
	*/	
	function compare(col,type){
		return function(row1,row2){
			var value1 = convert(row1.cells[col].firstChild.data,type);
			var value2 = convert(row2.cells[col].firstChild.data,type);
			if(value1 < value2)
				return -1;
			else if(value1 > value2)
				return 1;
			else
				return 0;
		}
	}
	//数据类型处理，根据数据类型进行数据转换
	//参数说明如下：
	/*
	value：表示数据
	type：表示数据类型
	*/	
	function convert(value,type){
		switch(type){
			case "int":
				return parseInt(value);
			case "float":
				return parseFloat(value);
			case "date":
			    var value = value.replace(/-/g,"/");
				return new Date(Date.parse(value));
			default:
				return value.toString();
		}
	}
}
//===================================
//使用标准方法绑定事件
//参数
//e-元素对象
//event-事件类型，不要添加'on'前缀
//fn-绑定的事件函数
var addEvent=function(e,event, fn) {
	if(document.addEventListener){
		return e.addEventListener(event, fn, false);
	}
	else if(document.attachEvent){
		return e.attachEvent("on"+event, fn);
	}
};
//访问权限限制
//参数
//sql-查询字符串，字符串
//tablearr-要限制的数据表，数组
//返回值
//返回true，表示通过，否则返回false表示没有通过
function key(sql,tablearr){
	//清除两侧空格
	var sql = sql.replace(/^(\s|　)+/g,"").replace(/(\s|　)+$/g,"");
	sql = sql.replace(/(\s|　)+/g," ");			
	sql = sql.toLowerCase();
	if(!(typeof tablearr == "object") && !(tablearr.constructor == Array)){
		alert("数据表列表不是数组！");
		return false;
	}
	for(var i=0;i<tablearr.length; i++){
		var tempstr = "from " + tablearr[i];
		var tempstr1 = "from [" + tablearr[i] + "]";		
		if(sql.indexOf(tempstr)>-1 || sql.indexOf(tempstr1)>-1  ){
			if( !key.income && tablearr[i] == "income" || tablearr[i] == "incomedetail"){
				var pass=prompt("请输入收入访问密码：","********");
				if(pass != uncompile(uincome)){	 
					 pass=prompt("请重新输入收入访问密码：","********"); 
					 if(pass != uncompile(uincome))
						return false;
				 }
				 key.income = true;			
			}
			if( !key.out && tablearr[i] == "out" || tablearr[i] == "outdetail"){
				var pass=prompt("请输入支出访问密码：","********");
				if(pass != uncompile(uout)){	 
					 pass=prompt("请重新输入支出访问密码：","********"); 
					 if(pass != uncompile(uout))
						return false;
				 }
				 key.out = true;			
			}			
			if( !key.blog && tablearr[i] == "blog" || tablearr[i] == "blogdetail"){
				var pass=prompt("请输入日记访问密码：","********");		
				if(pass != uncompile(ublog)){	 
					 pass=prompt("请重新输入日记访问密码：","********"); 
					 if(pass != uncompile(ublog))
						return false;
				 }
				 key.blog = true;				 
			}
			
		}
	}
	return true;
}
key.blog = false;
key.income = false;
key.out = false;
//加密函数
function compile(code){ 
	var c=String.fromCharCode(code.charCodeAt(0)+code.length);
	for(var i=1;i<code.length;i++){
		c+=String.fromCharCode(code.charCodeAt(i)+code.charCodeAt(i-1));
	}
	return (escape(c));
}
//解密函数
function uncompile(code){
	code=unescape(code);
	var c=String.fromCharCode(code.charCodeAt(0)-code.length);
	for(var i=1;i<code.length;i++){
		c+=String.fromCharCode(code.charCodeAt(i)-c.charCodeAt(i-1));
	}
	return c;
}
//创建按钮函数
//参数：
//id：属性名
//value:显示的名称
//返回值：
//返回按钮实例
function createbtn(id,value){
	var id = id || "no";
	var value = value || "确定";
	var btn = document.createElement("input");
	btn.type = "button";
	btn.className = id;
	btn.value = value;
	return btn;
}
//随机显示背景图片
//参数：
/*
	[
		{obj : DOMobj, num : number, url : "images/logo", imgclass : ".jpg"},
		{obj : DOMobj, num : number, url : "images/logo", imgclass : ".jpg"},
		{obj : DOMobj, num : number, url : "images/logo", imgclass : ".jpg"}
	]	
//obj：DOM对象,DOM元素对象
//num:最大随机数,数字
//url:相对路径的前半部分，字符串
//imgclass:扩展名以及相对路径的后半部分，字符串
*/
//返回值：
//图像的路径字符串的数组
function radiobg(paraarray){
	if( !paraarray ||  (typeof paraarray != "object") ||  !paraarray.slice){
		alert("传递的参数不对！");
		return false;
	}
	//动态更换背景图像
	var urlarray = [];
	for(var i=0; i< paraarray.length; i++){	
		var _paraarray = paraarray[i];
		//处理参数值
		if(!_paraarray.obj){
			alert("没有指明设置背景的对象！");
			return false;
		}
		else
			var obj = _paraarray.obj;
		if(!_paraarray.url){
			alert("没有指明背景图片的路径！");
			return false;
		}
		else
			var url = _paraarray.url;
		if(!_paraarray.num){
			var num = 1;
		}
		else
			var num = _paraarray.num;
		if(!_paraarray.imgclass){
			var imgclass = ".jpg";
		}
		else
			var imgclass = _paraarray.imgclass;
		num = parseInt(Math.random()*(num-1+1)+1);
		urlarray[i] = url + num +  imgclass ;
		obj.style.backgroundImage="url('" + urlarray[i] + "')";
		
	}
	return urlarray;
}
//随机显示背景图片
//参数：
//参数对象paraobj
//obj:DOM对象,DOM元素对象，包含图像的包含框
//src:图像的路径，字符串
//返回值：
//无
function bodybgpic(paraobj){
	//保存参数
	var _paraobj = paraobj;
	var paraobj = {};
	for(var name in _paraobj){
		paraobj[name] = _paraobj[name];
	}
	//处理参数值
	if(!paraobj.obj){
		alert("没有指明图像包含框！");
		return false;
	}
	else
		var obj = paraobj.obj;
	if(!paraobj.src){
		alert("没有指明图像源！");
		return false;
	}
	else
		var src = paraobj.src;
	obj.innerHTML = "";
	//检测图片是否隐藏显示，如果是则暂时显示以便获取图片尺寸
	if(obj.style.display == "none"){
		obj.style.display = "block";
		var _temp_ok = true;
	}
	else
		var _temp_ok = false;
	var bgimg = document.createElement("img");
	bgimg.src = src;
	//bgimg.src = "pics/home (115).JPG";
	bgpic.appendChild(bgimg);
	if( bgimg.width && (bgimg.width * 1)>100)
		_picsize()
	else
		setTimeout(_picsize,500);
	//恢复背景图片默认显示状态
	if(_temp_ok){
		obj.style.display = "none";
	}
	function _picsize(){
		var bgimg_w = bgimg.width * 1;
		var bgimg_h = bgimg.height * 1;	
		var body_w = parseInt(windSize().winWidth);
		var _body_h = parseInt(windSize().winHeight);	
		var body_h = parseInt(windSize().winHeight)+16;		
		if(bgimg_w/bgimg_h>1){
			var bgimg_h1 = parseInt(body_w * (bgimg_h/bgimg_w));
			var bgimg_w1 = body_w;
			if(bgimg_h1>body_h){
				bgimg_h1 = body_h;
				bgimg_w1 = parseInt(body_h * (bgimg_w/bgimg_h));			
			}
		}
		else{
			var bgimg_h1 = body_h;
			var bgimg_w1 = parseInt(body_h * (bgimg_w/bgimg_h));
			if(bgimg_w1>body_w){
				bgimg_h1 = parseInt(body_w * (bgimg_h/bgimg_w));
				bgimg_w1 = body_w;		
			}			
		}
		bgimg.width = bgimg_w1;
		bgimg.height = bgimg_h1;
		var body_sw = document.body.scrollWidth;
		var body_sh = document.body.scrollHeight;
		//if(body_sh>_body_h){
		//	bgimg.width = bgimg.width - parseInt(16 * (bgimg_w/bgimg_h));
		//	bgimg.height = bgimg.height - 16;
		//}	
	}
}
//获取浏览器窗口大小
//返回值
//paraobj对象，包含属性
//winWidth：宽
//winHeight:高
function windSize(){
	//获取窗口宽度
	if(window.innerWidth)
		winWidth=window.innerWidth;
	else if((document.body)&&(document.body.clientWidth))
		winWidth=document.body.clientWidth;
	//获取窗口高度
	if(window.innerHeight)
		winHeight=window.innerHeight;
	else if((document.body)&&(document.body.clientHeight))
		winHeight=document.body.clientHeight;
	/*nasty hack to deal with doctype swith in IE*/
	//通过深入Document内部对body进行检测，获取窗口大小
	if(document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth)	{
		winHeight=document.documentElement.clientHeight;
		winWidth=document.documentElement.clientWidth;
	}
	return {
		winWidth : winWidth,
		winHeight : winHeight	
	}
}

//判断给定的年否是闰年判断模块,是闰年则为1,不是则为0
function isLeapyear(year) {
	var iYear = parseInt(year);
	if((0 == iYear % 400) || ((0 == iYear % 4) && (0 != iYear % 100 )))
		return 1;
	else
		return 0;
}

//判断给定的月有多少天
function hasManyDays(year, month) {
	var iMonth = parseInt(month);
	var iYear = parseInt(year);
	/*说明代码块
	 switch (iMonth)
	 {
	 case 1,3,5,7,8,10,12:
	 return 31;
	 case 4,6,9,11:
	 return 30;
	 break;
	 case 2:
	 if (isLeapyear(year))
	 return 29;
	 else
	 return 28;
	 }*/

	if(2 == iMonth) {
		if(isLeapyear(year))
			return 29;
		else
			return 28;
	}
	//var day31Month=new Array(1,3,5,7,8,10,12);
	var day30Month = new Array(4, 6, 9, 11);
	i = 0;
	do {
		if(iMonth == day30Month[i])
			return 30;
		i++;
	} while(i<day30Month.length);
	return 31;

}

//返回给定月份的上一个月
function getLastMonth(month) {
	var iMonth = parseInt(month);
	var lastMonth = undefined;
	if(1 == iMonth)
		lastMonth = 12
	else
		lastMonth = iMonth - 1;
	return lastMonth;
}

//返回给定年份的上一年日期
function getLastYear(year) {
	var iYear = parseInt(year);
	return iYear - 1;
}

//得到给定日期的昨天的日期
function getLastDay(year, month, day) {
	var iDay = parseInt(day);
	var iYear = parseInt(year);
	var iMonth = parseInt(month);
	if(1 == iDay)
		return hasManyDays(iYear, getLastMonth(iMonth));
	else
		return iDay - 1;
}

function getCurrentOFLastDate() {
	var currentDate = new Date()
	var currentYear = currentDate.getFullYear();
	var currentMonth = currentDate.getMonth() + 1;
	var currentDay = currentDate.getDate();
	alert(currentYear + " " + currentMonth + " " + currentDay);
	var lastYear = undefined;
	var lastMonth = undefined;
	var lastDay = undefined;

	if((1 == currentDay) && (1 == currentMonth))
		lastYear = getLastYear();
	else
		lastYear = currentYear;
	if(1 == currentDay)
		lastMonth = getLastMonth(currentMonth);
	else
		lastMonth = currentMonth;
	lastDay = getLastDay(currentYear, currentMonth, currentDay);
	return lastYear + "年" + lastMonth + "月" + lastDay + "日";

}



/*
 说明：使用javascript 获取页面上有选择符的 CSS 规则
 包括'内部样式块'和'外部样式表文件'http://www.CodeBit.cn 
*/
function getCssRule() {
	// 样式总数
	var styleSheetLen = document.styleSheets.length;
	if(!styleSheetLen)
		return;
	// 样式规则名称，IE 和 FireFox 不同
	var ruleName = (document.styleSheets[0].cssRules) ? 'cssRules' : 'rules';
	//FireFox:cssRules || IE:rules
	// 初始结果
	var result = {};
	var totalRuleLen = 0;
	var totalSelectorLen = 0;
	var totalProperty = 0;
	for(var i = 0; i < styleSheetLen; i++) {        // 获取每个样式表定义
		var styleSheet = document.styleSheets[i];
		// 每个样式表的规则数
		var ruleLen = styleSheet[ruleName].length;
		totalRuleLen += ruleLen;
		for(var j = 0; j < ruleLen; j++) {
			// 获取当前规则的选择符
			// 传入选择符转换为小写
			var selectors = styleSheet[ruleName][j].selectorText.toLowerCase().split(",");
			var selectorLen = selectors.length;
			totalSelectorLen += selectorLen;
			for(var s = 0; s < selectorLen; s++) {
				// 去除选择符左右的空格
				selector = selectors[s].replace(/(^\s*)|(\s*$)/g, "");
				// 初始化当前选择符
				result[selector] = {};
				// 获取当前样式
				var styleSet = styleSheet[ruleName][j].style;
				for(property in styleSet) {                    // 获取规则
					if(styleSet[property] && property != 'cssText') {                        //
						alert(selector + '=>' + property + ':' + styleSet[property])
						result[selector][property] = styleSet[property];
						totalProperty += 1;
					}
				}
			}
		}
	}
	// 统计数据
	result.totalSheet = styleSheetLen;
	//样式块
	result.totalRule = totalRuleLen;
	//规则数
	result.totalSelector = totalSelectorLen;
	//选择符
	result.totalProperty = totalProperty;
	//属性
	return result;
}
/*
	// 获取规则
	var css = getCssRule();
	// 获取指定选择符下面的 CSS 属性值
	// selector:选择符（小写）
	// attribute:查询的 CSS 属性，脚本模式（如：background-color 为 backgroundColor）
	function getCssValue(selector, attribute) {
		return (css[selector]) ? (css[selector][attribute]) ? css[selector][attribute] : false : false;
	}
	document.write("<strong>统计数据</strong> <br />");
	document.write(css.totalSheet + " 个 CSS 样式块（包括&lt;link /&gt;标签和&lt;style&gt;&lt;/style&gt;样式块） <br />");
	document.write(css.totalRule + " 条规则（FireFox 下分组选择符如：body, form, p {} 算一条， IE 将分开计算） <br />");
	document.write(css.totalSelector + " 个选择符（将分组选择符分开计算） <br />");
	document.write(css.totalProperty + " 条 CSS 属性（如：border:1px solid #eee;） <br /><br />");
	// 传入选择符为小写，属性为脚本模式
	document.write("<strong>选择符为 'a.test' 的背景颜色(backgroundColor) 为：</strong> <br />");
	document.write("<strong>语法：</strong>getCssValue('a.test', 'backgroundColor'); <br />");
	document.write("<strong>结果：</strong>" + getCssValue('a.test', 'backgroundColor') + "<br />");
	document.write("IE 直接返回属性值，但 FireFox 返回 RGB 值");
*/