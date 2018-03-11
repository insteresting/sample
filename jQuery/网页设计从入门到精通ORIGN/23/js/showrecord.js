//===================================
//把记录集中的数据转换为表格显示
//===================================
//===================================
//外部调用接口：显示表格化数据，并进行初始化，设置各种关系和逻辑，绑定事件
//本函数内部调用子函数：showData()、rowtoForm()、updateData()、insertData()
//参数
//paraobj {
	//box：显示数据的包含框，DOM对象
	//rs：显示的记录集，数据集合对象
	//table：显示数据对应的数据表，字符串
	//sql：记录集查询的SQL字符串，以备查看和调用，可选，字符串
//}
//返回值
//如果操作成功返回true，否则返回false
var exeshow = function(paraobj){
	//保存参数
	var _paraobj = paraobj;
	var paraobj = {};
	for(var name in _paraobj){
		paraobj[name] = _paraobj[name];
	}
	//处理参数值
	if(!paraobj.box){
		alert("没有指明显示数据的包含框！");
		return false;
	}
	else
		var box = paraobj.box;
	if(!paraobj.table){
		alert("没有指明当前表格显示数据对应的数据表！");
		return false;
	}
	else
		var table = paraobj.table;
	if(!paraobj.rs){
		alert("没有传递记录集！");
		return false;
	}
	else
		var rs = paraobj.rs;		
	//显示包含框
	box.style.display = "block";
	//清空包含框
	box.innerHTML = "";
	//绘制数据表格，显示数据
	//如果返回false，则跳出
	if(!showdata(paraobj))
		return false; 
	//===================================	
	//为数据表格绑定数据行基本操作行为
	//===================================		
	//编辑数据行行为
	var edit =  document.getElementsByClassName("edit", box);
	//遍历可编辑行
	for(var i=0; i< edit.length; i++){
		//创建并添加修改按钮
		var btn = createbtn("editbtn","修改");
		edit[i].innerHTML = "";
		edit[i].appendChild(btn);		
		//绑定单击事件
		btn.onclick = (function(cell,btn){
			return function(){
				//获取行
				var row = cell.parentNode;
				//为参数对象添加row属性，并传递当前表格行对象
				paraobj.row = row;
				//获取行内所有单元格
				var childnodes = row.childNodes;
				//使行处于可编辑状态，并保存原表格行中的数据
				var rowoldvalue = rowtoForm(paraobj);
				//为参数对象添加rowoldvalue属性，并传递当前表格行原来的数据
				paraobj.rowoldvalue = rowoldvalue;				
				//清空单元格内所有信息
				cell.innerHTML = "";
				//创建修改按钮
				var savebtn = createbtn("savebtn","保存");
				//清空单元格内所有内容
				cell.innerHTML = "";
				//在单元格中显示保存按钮
				cell.appendChild(savebtn);
				//为保存按钮添加行为
				savebtn.onclick = function(){
					//把修改的数据保存到数据库	
					if(updateData(paraobj)){
						//再次清空单元格内所有内容
						cell.innerHTML = "";
						//恢复默认的修改按钮
						cell.appendChild(btn);
					}
				}
				//创建取消按钮
				var resetbtn = createbtn("resetbtn","取消");
				//在单元格中追加取消按钮
				cell.appendChild(resetbtn);
				//为取消按钮绑定行为
				resetbtn.onclick = function(){
					//恢复表格行原来的值
					resettData(paraobj);
					//清空单元格内所有的内容
					cell.innerHTML = "";
					//恢复默认的修改按钮
					cell.appendChild(btn);
				}			
			}
		})(edit[i],btn);
	}
	//删除数据行行为
	var del =  document.getElementsByClassName("del",paraobj.box);
	//遍历可删除行
	for(var i=0; i< del.length; i++){
		//创建删除按钮
		var btn = createbtn("delbtn","删除");
		//清空单元格内容
		del[i].innerHTML = "";
		//显示删除按钮
		del[i].appendChild(btn);
		//绑定行为
		btn.onclick = (function(cell){
			return function(){
				//获取当前行对象
				var row = cell.parentNode;
				//为参数对象添加row属性，并传递当前表格行对象
				paraobj.row = row;				
				//执行删除操作
				delData(paraobj);
			}				
		})(del[i]);			
	}
	//查看记录明细行为
	var detail =  document.getElementsByClassName("detail",paraobj.box);
	if(detail){
		//遍所包含或者可能包含明细的记录行
		for(var i=0; i< detail.length; i++){
			//获取当前单元格对象
			var cell = detail[i];
			//获取当前行所有单元格列表
			var rowlist = cell.parentNode.childNodes;
			//获取当前行记录的id和upperid值
			for(var j=0; j<rowlist.length; j++){
				var td = rowlist[j];
				var classname = td.className;
				if(classname == "id" ){
					var id = parseInt(td.firstChild.data);
				}
				if(classname == "title"){
					var uppertitle = td.firstChild.data;
				}
			}
			if(!id){
				alert("当前记录没有指定ID值！");
				return false; 					
			}
			 //判断当前数据表是否包含明细或子类表格
			if(tableobj[table][4]!="no"){
				//定义查询字符串
				var sql = "select * from " + tableobj[table][4] + "  where  upperid = "+ id;			
				//查询数据
				var detailrs = requeryrs(sql);
				//如果查找到明细记录
				//或者如果没有找到明细表，但是是分类数据表，则可以显示空表格，允许进行添加操作				
				if(!detailrs.eof  || tableobj[table][5]=="class" ){
					//如果是分类表，则当前记录没有明细记录，则修改单元格中的文本
					if(tableobj[table][5]=="class" && detailrs.eof)
						var btn = createbtn("addbtn","添加");
					else
						var btn = createbtn("detailbtn","查看");
					//清空单元格内所有内容	
					cell.innerHTML = "";
					//显示按钮
					cell.appendChild(btn);
					//为按钮绑定行为
					btn.onclick = (function(cell, id, btn){
						return function(){
							//高亮显示当前行
							var row = cell.parentNode.childNodes
							for(var i=0;i<row.length;i++){	
								row[i].style.color = "red";
							}
							//定义查询字符串，查询明细表或者子类表数据
							var sql = "select * from " + tableobj[table][4] + "  where  upperid = "+ id;
							//查询数据
							var subrs = requeryrs(sql);
							//如果不是tbody内最后一行
							if(cell.parentNode.nextSibling != null){
								//获取下一行对象
								var cankao = cell.parentNode.nextSibling;
								//获取下一行第2个单元格的x轴坐标
								var x = getElementLeft(cankao.firstChild.nextSibling);
								//获取下一行y轴坐标
								var y = getElementTop(cankao);
							}
							//如果是tbody内最后一行，则获取tfoot内第一行对象的偏移坐标
							else{
								var cankao = cell.parentNode.parentNode.nextSibling.firstChild;
								var x = getElementLeft(cankao.firstChild) + 58;
								var y = getElementTop(cankao);
							}
							//获取当前单元格的x轴坐标
							var x1 = getElementLeft(cell);
							//计算明细表格框显示的宽度
							var w = x1-x;
							//显示明细表格包含框，并进行定位，定义大小、位置
							if(box === showdetailbox){
								var subbox = showsubdetailbox
							}
							else{
								var subbox = showdetailbox;
							}
							subbox.style.display = "block";
							subbox.style.position = "absolute";						
							subbox.style.left = (x-10) + "px";
							subbox.style.top = (y-5) + "px";
							subbox.style.width = w + "px";
							//在明细包含框中绘制数据表格，显示当前记录的明细信息
							exeshow({
								box : 	subbox,
								rs	:	subrs,
								table:	tableobj[table][4],
								sql:	sql,
								id:		id, 			//为参数对象添加id属性，并传递当前表格行的记录编号
								cell:	cell,
								showsubinfo:	true	//指示在信息面板中显示缩进信息，而不是覆盖信息板上原信息
							});
							//为明细表包含框添加清除明细表格包含框的行为按钮
							var del_detailbox = document.getElementsByClassName("del_detailbox",subbox)[0];
							if(del_detailbox){
								del_detailbox.style.cursor = "pointer";
								del_detailbox.onclick = (function(box){
									return function(){
										if(box === showdetailbox){
											box.innerHTML = "";
											box.style.display = "none";									
											showsubdetailbox.innerHTML = "";
											showsubdetailbox.style.display = "none";							
										}
										else {
											box.innerHTML = "";
											box.style.display = "none";
										}
										//恢复父表中当前行的字体色
										var row = cell.parentNode.childNodes
										for(var i=0;i<row.length;i++){
											if(row[i].className == "price"){
												row[i].style.color = "red";
											}
											else {
												row[i].style.color = "#000";
											}
										}
										//清空参数对象中的单元格属性
										paraobj.cell = null;
									}
								})(subbox)
							}
						}				
					})(cell, id, btn );
				}
				//否则清空单元格内的文本
				else{
					cell.innerHTML = "";
				}
				//关闭记录集
				closers(detailrs);
			}
		}
	}
	//添加新数据
	var add = document.getElementsByClassName("add_tfoot",paraobj.box);
	if(add){
		for(var i=0; i< add.length; i++){
			var cell = add[i];
			//设置样式和行为
			cell.style.cursor = "pointer";
			cell.onclick = (function(cell){
				return function(){
					var row = cell.parentNode;
					//为参数对象添加row属性，并传递当前表格行对象
					paraobj.row = row;
					//把数据行转换为可编辑的表单形式				
					newrowForm(paraobj);
				}
			})(cell);
		}
	}
	//===================================	
	//为数据表绑定查询、隐藏等外部操作行为
	//===================================	
	//单列搜索
	var searchcol = document.getElementsByClassName("searchcol",paraobj.box);
	var tenptable = paraobj.box.getElementsByTagName("table")[0];
	var tbody = paraobj.box.getElementsByTagName("tbody")[0];
	var tr = tbody.firstChild;
	var tdlist = tr.childNodes;
	if(searchcol){
		for(var i=0; i< searchcol.length; i++){
			var cell = searchcol[i];
			var input = cell.lastChild;
			input.onkeyup = (function(input,i){
				return function(){
					var td = tdlist[i];
					var classname = td.className;
					//调用uiTableFilter插件
					$.uiTableFilter( $(tenptable) , this.value,  fieldobj[classname][1]);	
				}
			})(input,i);
		}
	}
	//隐藏单列搜索
	searchcol[0].parentNode.style.display = "none";
	searchcol[0].parentNode.ok = false;
	var colsearch = document.getElementsByClassName("colsearch",paraobj.box)[0];
	if(colsearch){
		colsearch.onclick = function(){
			if(!searchcol[0].parentNode.ok){
				searchcol[0].parentNode.style.display = "";
				searchcol[0].parentNode.ok = true;
				colsearch.style.color = "blue";		
			}
			else{
				searchcol[0].parentNode.style.display = "none";
				searchcol[0].parentNode.ok = false;	
				colsearch.style.color = "red";	
			}
		}
	}	
	//表格搜索	
	var tableinput = document.getElementsByClassName("tableinput",paraobj.box)[0];
	tableinput.style.display = "none";
	tableinput.ok = false;
	var input = tableinput.firstChild
	input.onkeyup = function(){
		$.uiTableFilter( $(tenptable) , this.value);	//调用uiTableFilter插件
	}
	//隐藏表格搜索		
	var tablesearch = document.getElementsByClassName("tablesearch",paraobj.box)[0];
	if(tablesearch){
		tablesearch.onclick = function(){
			if(!tableinput.ok){
				tableinput.style.display = "";
				tableinput.ok = true;
				tablesearch.style.color = "blue";				
			}
			else{
				tableinput.style.display = "none";
				tableinput.ok = false;
				tablesearch.style.color = "red";
			}
		}
	}
	//数据列隐藏
	var hidecol = document.getElementsByClassName("hidecol",paraobj.box);
	var tenptable = paraobj.box.getElementsByTagName("table")[0];
	var tbody = paraobj.box.getElementsByTagName("tbody")[0];
	var thlist = paraobj.box.getElementsByTagName("th");
	var tr = tbody.firstChild;
	var tdlist = tr.childNodes;
	if(hidecol){
		for(var n=0; n< hidecol.length; n++){
			var cell = hidecol[n];
			var input = cell.lastChild;
			input.onclick = (function(input,n){
				return function(){
					var td = tdlist[n];
					var classname = td.className;
					if(!input.checked){
						input.checked = false;
						thlist[n].style.display = "none";
						var checkedfield = document.getElementsByClassName(classname,paraobj.box);
						for(var j=0; j< checkedfield.length; j++){
							var subcell = checkedfield[j];
							subcell.style.display = "none";
						}
					}
					else{
						input.checked = true;
						thlist[n].style.display = "";
						var checkedfield = document.getElementsByClassName(classname,paraobj.box);
						for(var j=0; j< checkedfield.length; j++){
							var subcell = checkedfield[j];
							subcell.style.display = "";
						}
					}					
					
				}
			})(input,n);
		}
	}
	//隐藏数据列隐藏
	hidecol[0].parentNode.style.display = "none";
	hidecol[0].parentNode.ok = false;
	var colhide = document.getElementsByClassName("colhide",paraobj.box)[0];
	if(colhide){
		colhide.onclick = function(){
			if(!hidecol[0].parentNode.ok){
				hidecol[0].parentNode.style.display = "";
				hidecol[0].parentNode.ok = true;
				colhide.style.color = "blue";		
			}
			else{
				hidecol[0].parentNode.style.display = "none";
				hidecol[0].parentNode.ok = false;
				colhide.style.color = "red";			
			}
		}
	}
	//单列过滤
	var filtercol = document.getElementsByClassName("filtercol",paraobj.box);
	var tenptable = paraobj.box.getElementsByTagName("table")[0];
	var tbody = paraobj.box.getElementsByTagName("tbody")[0];
	var tr = tbody.firstChild;
	var tdlist = tr.childNodes;
	if(filtercol){
		for(var i=0; i< filtercol.length; i++){
			var cell = filtercol[i];
			var input = cell.lastChild;
			input.onkeyup = (function(input,i){
				return function(){
					var td = tdlist[i];
					var classname = td.className;
					//调用uiTableFilter_hide插件
					$.uiTableFilter_hide( $(tenptable) , this.value,  fieldobj[classname][1]);	
				}
			})(input,i);
		}
	}
	//隐藏单列过滤
	filtercol[0].parentNode.style.display = "none";
	filtercol[0].parentNode.ok = false;
	var colfilter = document.getElementsByClassName("colfilter",paraobj.box)[0];
	if(colfilter){
		colfilter.onclick = function(){
			if(!filtercol[0].parentNode.ok){
				filtercol[0].parentNode.style.display = "";
				filtercol[0].parentNode.ok = true;
				colfilter.style.color = "blue";				
			}
			else{
				filtercol[0].parentNode.style.display = "none";
				filtercol[0].parentNode.ok = false;	
				colfilter.style.color = "red";		
			}
		}
	}
	//表格过滤	
	var tableinput_filter = document.getElementsByClassName("tableinput_filter",paraobj.box)[0];
	tableinput_filter.style.display = "none";
	tableinput_filter.ok = false;
	var input = tableinput_filter.firstChild
	input.onkeyup = function(){
		$.uiTableFilter_hide( $(tenptable) , this.value);	//调用uiTableFilter插件
	}
	//隐藏表格过滤	
	var tablefilter = document.getElementsByClassName("tablefilter",paraobj.box)[0];
	if(tablefilter){
		tablefilter.onclick = function(){
			if(!tableinput_filter.ok){
				tableinput_filter.style.display = "";
				tableinput_filter.ok = true;
				tablefilter.style.color = "blue";							
			}
			else{
				tableinput_filter.style.display = "none";
				tableinput_filter.ok = false;
				tablefilter.style.color = "red";
			}
		}
	}	
	//统计金额
	if(tableobj[paraobj.table][5] != "class"){
		var sumprice = document.getElementsByClassName("sumprice",paraobj.box)[0];
		var pricelist = document.getElementsByClassName("price",paraobj.box);
		var sumpricevalue = document.getElementsByClassName("sumpricevalue",paraobj.box)[0];
		sumprice.onclick = function(){
			sumprice.style.color = "blue";	
			var sumvalue = 0;
			var sumn = 0;
			for(var i=0; i< pricelist.length; i++){
				var cell = pricelist[i];
				var show = cell.parentNode.style.display;
				if(show !="none"){
					var value = cell.innerHTML;
					value =  parseFloat(value);
					sumvalue += value;
					sumn += 1;
				}
			}
			sumvalue = sumvalue.toFixed(2);
			sumpricevalue.innerHTML = "（共<b class='red'>"+ sumn +"</b>条记录，合计<b class='red'>" + sumvalue +"</b>元）<span class='clearsumprice'>清除信息</span>";
			var clearsumprice = document.getElementsByClassName("clearsumprice",paraobj.box)[0];
			clearsumprice.onclick = function(){
				sumpricevalue.innerHTML = '';
				sumprice.style.color = "red";	
			}
		}
	}
	//===================================	
	//为数据表绑定外围信息服务
	//===================================
	showinfobox.style.display = "block";
	if(!paraobj.showsubinfo){
		if(paraobj.tabletitle){
			showinfobox.innerHTML = "<h2><span class='red blod'>" + paraobj.tabletitle + "</span></h2>";
			paraobj.tabletitle = null;
		}
		else{
			showinfobox.innerHTML = "<h2><span class='red blod'>" + tableobj[paraobj.table][1] + "</span></h2>";
		}
		showinfobox.innerHTML += "<p>SQL语句：<span class='red blod'>" + paraobj.sql + "</span></p>";
		var rstemp =  requeryrs(paraobj.sql);
		var rstempn = 0;
		var rstempprice = 0;
		while(!rstemp.eof){
			rstempn += 1;
			if(tableobj[paraobj.table][5] != "class" && tableobj[paraobj.table][6] != 3){
				rstempprice += parseFloat(rstemp("price")) ;
			}
			rstemp.moveNext;
		}
		if(rstempn >0){
			showinfobox.innerHTML += "<p>查到<span class='red blod'>" + rstempn + "条记录</span></p>";	
		}
		if(rstempprice>0){
			showinfobox.innerHTML += "<p>合计<span class='red blod'>" + parseFloat(rstempprice).toFixed(2) + "</span>元</p>";			
		}
		showinfobox.innerHTML += "<p>";	
		showinfobox.innerHTML += "<input type='button' value = '关闭下面数据面板' class='cleartable' />";
		showinfobox.innerHTML += "<input type='button' value = '关闭当前信息提示面板' class='clearinfo' />";
		showinfobox.innerHTML += "<input type='button' value = '关闭所有信息面板' class='cleartableinfo' />";	
		showinfobox.innerHTML += "</p>";	
		var cleartableinfo = document.getElementsByClassName("cleartableinfo")[0];
		var cleartable = document.getElementsByClassName("cleartable")[0];
		var clearinfo = document.getElementsByClassName("clearinfo")[0];		
		cleartableinfo.onclick = function(){
			showinfobox.innerHTML  = "";		
			showinfobox.style.display = "none";
			showtablebox.innerHTML  = "";		
			showtablebox.style.display = "none";
			showdetailbox.innerHTML  = "";		
			showdetailbox.style.display = "none";
			showsubdetailbox.innerHTML  = "";		
			showsubdetailbox.style.display = "none";			
		}
		clearinfo.onclick = function(){
			showinfobox.innerHTML  = "";		
			showinfobox.style.display = "none";		
		}		
		cleartable.onclick = function(){
			showtablebox.innerHTML  = "";		
			showtablebox.style.display = "none";
			showdetailbox.innerHTML  = "";		
			showdetailbox.style.display = "none";
			showsubdetailbox.innerHTML  = "";		
			showsubdetailbox.style.display = "none";	
		}	
		//初始化菜单中控制数据表的按钮状态
		window.hidetable = false;
		hidetable.innerHTML = "隐藏数据表";
	}
}
//===================================
//在指定的包含框中显示指定记录集中的数据
//参数
//paraobj {
	//box：显示数据的包含框，DOM对象
	//rs：显示的记录集，数据集合对象
	//table：显示数据对应的数据表，字符串
//}
//返回值
//如果操作成功返回true，否则返回false
var showdata = function(paraobj){
	//保存参数
	var _paraobj = paraobj;
	var paraobj = {};
	for(var name in _paraobj){
		paraobj[name] = _paraobj[name];
	}
	//处理参数值
	if(!paraobj.box){
		alert("没有指明显示数据的包含框！");
		return false;
	}
	else
		var box = paraobj.box;
	if(!paraobj.table){
		alert("没有指明当前表格显示数据对应的数据表！");
		return false;
	}
	else
		var table = paraobj.table;
	if(!paraobj.rs){
		alert("没有传递记录集！");
		return false;
	}
	else
		var rs = paraobj.rs;		
	//验证记录集是否为空
	//针对分类表，可允许记录集为空，以方便用户新添加类别
	if( rs.eof && (tableobj[table][5] != "class" )){
		box.style.display = "none";
		alert("没有查询到任何数据！");
		return false;
	}
	//生成数据表格的HTML结构字符串	
	//=========================
	//表格头部
	var html = "<table><thead>";
	html += "<tr>";
	//记录集的字段集合
	fds = rs.Fields;
	//遍历字段集，生成标题行
	for(var i=0; i<fds.count; i++){
		html += "<th class='"+ fds.Item(i).name +"_thead'>" + fieldobj[fds.Item(i).name][1] + "</th>";
	}
	//操作列
	html += "<th>修改</th>";
	html += "<th>删除</th>";
	if(tableobj[table][4] != "no")
		html += "<th>明细</th>";	
	html += "</thead>";
	//=========================
	//表格数据区域
	if(!rs.eof) {
		html += "<tbody>";
		while (!rs.eof){
			//显示被更新记录的数据行
			if(rs("update") != null && String(rs("update")).length > 8  ){
				//格式化时间显示
				var showvalue =  formatData(rs("update"),{
					field:	"update" 
				});
				if(showvalue)
					html += "<tr class='updated' title='本条记录已被修改，修改时间为："+ showvalue +"'>";
				else
					html += "<tr>";
			}
			//显示为被修改的记录数据列
			else{
				html += "<tr>";
			}
			//显示单元格数据
			for(var i=0; i<fds.count; i++){
				var fieldname = fds.Item(i).name;
				var rsvalue = rs(fieldname);
				var showvalue = formatData(rsvalue,{
					field:	fieldname,
					table:	 table
				});
				if(!showvalue) showvalue = "";
				html += "<td class='"+ fieldname +"'>" + showvalue + "</td>";
			}
			html += "<td class='edit'>修改</td>";
			html += "<td class='del'>删除</td>"
			//如果包含明细信息，则多显示一个单元格，添加查看按钮	
			if(tableobj[table][4] != "no")
				html += "<td class='detail'>查看</td>"	;
			html += "</tr>"
			rs.moveNext;
		}
		html += "</tbody>"
	}
	//如果记录集为空，则新添加一行隐藏的空数据行
	else {
		html += "<tbody>";
		html += "<tr class='hide'>";
		//显示单元格数据
		for(var i=0; i<fds.count; i++){
			html += "<td class='"+ fds.Item(i).name +"'></td>";
		}
		html += "<td class='edit'></td>";
		html += "<td class='del'></td>"
		//如果包含明细信息，则多显示一个单元格	
		if(tableobj[table][4] != "no")
			html += "<td></td>"		
		html += "</tr>"
	}
	//=========================
	//表格页脚
	html += "<tfoot>";
	//第1行
	html += "<tr>"
	//如果不是分类表，则显示金额统计功能
	if(tableobj[table][5] != "class"){
		html += "<td class='_tfoot'  colspan="+fds.count+"><span class='colsearch'>查询列</span><span class='tablesearch'>查询表</span><span class='tableinput'><input value='' type=text /></span><span class='colfilter'>过滤列</span><span class='tablefilter'>过滤表</span><span class='tableinput_filter'><input value='' type=text /></span><span class='colhide'>隐藏列</span><span class='sumprice'>统计当前金额</span><span class='sumpricevalue'></span></td>";
	}
	//如果是分类表，则不添加金额统计功能
	else{
		html += "<td class='_tfoot'  colspan="+fds.count+"><span class='colsearch'>查询列</span><span class='tablesearch'>查询表</span><span class='tableinput'><input value='' type=text /></span><span class='colfilter'>过滤列</span><span class='tablefilter'>过滤表</span><span class='tableinput_filter'><input value='' type=text /></span><span class='colhide'>隐藏列</span></td>";			
	}
	//添加记录按钮
	html += "<td class='add_tfoot'>添加记录</td>";
	//如果是明细表，则添加隐藏明细表的按钮
	if(box.getAttribute("id") == "showdetailbox" || box.getAttribute("id") == "showsubdetailbox")
		html += "<td  class='del_detailbox'>关闭面板</td>";
	else
		html += "<td  class='del_tfoot'></td>";
	//如果包含明细信息，则多显示一个单元格
	if(tableobj[table][4] != "no")
		html += "<td class='detail_tfoot'></td>"
	html += "</tr>"
	//第2行
	html += "<tr>"	
	//添加字段列搜索文本框
	for(var i=0; i<fds.count; i++){
		html += "<td class='searchcol'><div>"+ fieldobj[fds.Item(i).name][1] +"</div><input value='' type=text /></td>";
	}
	//空单元格
	html += "<td>（查询）</td>";
	html += "<td></td>";
	//如果包含明细信息，则多显示一个单元格	
	if(tableobj[table][4] != "no")
		html += "<td></td>"
	html += "</tr>"	
	//第3行
	//为每个字段列添加复选框，以便显示或隐藏该列
	html += "<tr>"
	for(var i=0; i<fds.count; i++){
		html += "<td class='hidecol'><div>"+ fieldobj[fds.Item(i).name][1] +"</div><input type='checkbox' checked='checked'  /></td>";
	}
	//空单元格	
	html += "<td>（显隐）</td>";
	html += "<td></td>";
	//如果包含明细信息，则多显示一个单元格
	if(tableobj[paraobj.table][4] != "no")
		html += "<td></td>"
	html += "</tr>"	
	//第3行结束
	//第4行
	html += "<tr>"	
	//添加字段列过滤文本框
	for(var i=0; i<fds.count; i++){
		html += "<td class='filtercol'><div>"+ fieldobj[fds.Item(i).name][1] +"</div><input value='' type=text /></td>";
	}
	//空单元格
	html += "<td>（过滤）</td>";
	html += "<td></td>";
	//如果包含明细信息，则多显示一个单元格	
	if(tableobj[table][4] != "no")
		html += "<td></td>"
	html += "</tr>"	
	//第4行结束	
	html += "</tfoot>"	
	html += "</table>";
	//=========================	
	//在查询显示框中显示查询数据
	box.innerHTML = html;
	//其他需要处理的问题
	//临时保存数据表主体数据的最后一行，当数据被删除完后备用，添加记录时，需要用数据行
	window.tbodytr = box.getElementsByTagName("tbody")[0].lastChild;
	//设置表格动态样式
	tablebg("#EAF3FC","#fff");
	//为表格绑定列排序外部插件，需要jQuery配合
	$('table').tablesorter({
		cancelSelection:true,	// 禁止选区表头
		cssAsc:"up",			// 设置升序样式
		cssHeader:"head",		// 设置表头默认样式		
		cssDesc:"down"			// 设置降序样式
	});
	//显示成功最后返回true
	return true;
}


//===================================
//外部调用接口：显示格式化的博客信息，并进行初始化，设置各种关系和逻辑，绑定事件
//本函数内部调用子函数：
//参数
//paraobj {
	//box：显示数据的包含框，DOM对象
	//rs：显示的记录集，数据集合对象
	//sql：记录集查询的SQL字符串，以备查看和调用，可选，字符串
//}
//返回值
//如果操作成功返回true，否则返回false
var exeblog = function(paraobj){
	//保存参数
	var _paraobj = paraobj;
	var paraobj = {};
	for(var name in _paraobj){
		paraobj[name] = _paraobj[name];
	}
	//处理参数值
	if(!paraobj.box){
		alert("没有指明显示数据的包含框！");
		return false;
	}
	else
		var box = paraobj.box;
	if(!paraobj.table){
		var table = "blog";
	}
	else
		var table = paraobj.table;
	if(!paraobj.rs){
		alert("没有传递记录集！");
		return false;
	}
	else
		var rs = paraobj.rs;		
	//显示包含框
	box.style.display = "block";
	//清空包含框
	box.innerHTML = "";
	//绘制数据表格，显示数据
	//如果返回false，则跳出
	hideform.ok = true;
	showformbox.style.display = "none";
	hideform.innerHTML = "显示表单";
	//当显示表单时，则恢复导航菜单的默认样式
	window.clickmenu = resetmenu();
	//显示博客内容			
	if(!showblog(paraobj))
		return false; 
		
	//查询所有博客分类，如果博客表的id值发生变化，应该手动修改该值
	var sql = "select * from [class2] where upperid = 16";
	var rs2 = requeryrs(sql);		
	if(!rs2.eof) {
		var html = "<div id='redshowblog'>关注：";
		while (!rs2.eof){
			var classid = rs2("id") * 1;
			var title = rs2("title") + "";
			html += "<span id='blog" + classid + "' title='" + title + "'>" + title + "</span>";

			rs2.moveNext;
		}
		//清除记录集
		closers(rs2);
		html += "</div>";
		var classshow  = document.getElementById("classshow");
		classshow.innerHTML = html;
		var redshowblog  = document.getElementById("redshowblog");
		if(redshowblog){
			var redshowli  = redshowblog.getElementsByTagName("span");
			if(redshowli){
				for(var i=0;i<redshowli.length;i++){
					var _spanid = redshowli[i].getAttribute("id");
					redshowli[i].ok = true;
					var styleSheets = document.styleSheets[0];	// 获取样式表引用指针
					var ruleName = (document.styleSheets[0].cssRules) ? 'cssRules' : 'rules';// 样式规则名称，IE 和 FireFox 不同
					redshowli[i].index = styleSheets[ruleName].length;	// 获取样式表中包含样式的个数
					redshowli[i].onclick = (function(_spanid,i){
						return function(){
							if(redshowli[i].ok){
								redshowli[i].index = styleSheets[ruleName].length;
								if(styleSheets.insertRule){ 		
								   // 判断浏览器是否支持insertRule()方法
								   // 使用insertRule()方法在文档内部样式表中增加一个p标签选择符的样式，设置段落背景色为红色，字体颜色为白色，补白为一个字体大小。插入位置在样式表的末尾
								   styleSheets.insertRule("."+ _spanid +"{display:none;}", redshowli[i].index);
								}else{							// 如果浏览器不支持insertRule()方法
								   styleSheets.addRule("."+ _spanid , "display:none;", redshowli[i].index);
								}
								redshowli[i].style.color = "gray";
								redshowli[i].ok = false;
								index = styleSheets[ruleName].length;
							}
							else{
								if(styleSheets.insertRule){ 		
								   // 判断浏览器是否支持insertRule()方法
								   // 使用insertRule()方法在文档内部样式表中增加一个p标签选择符的样式，设置段落背景色为红色，字体颜色为白色，补白为一个字体大小。插入位置在样式表的末尾
								   styleSheets.deleteRule(redshowli[i].index);
								}else{							// 如果浏览器不支持insertRule()方法
								   styleSheets.removeRule(redshowli[i].index);
								}
								for(var j=0;j<redshowli.length;j++){
									if(redshowli[j].index>redshowli[i].index)
										redshowli[j].index = redshowli[j].index-1;
								}
								redshowli[i].style.color = "blue";
								redshowli[i].ok = true;							
							}
						}
					})(_spanid,i);
				}
			}
		}		
		
	}	
	

	var closeblog = document.getElementById("closeblog");
	closeblog.onclick = function(){
		showtablebox.innerHTML  = "";		
		showtablebox.style.display = "none";
		showdetailbox.innerHTML  = "";		
		showdetailbox.style.display = "none";
		showsubdetailbox.innerHTML  = "";		
		showsubdetailbox.style.display = "none";
	}
	var oldday = document.getElementById("oldday");	
	oldday.onclick = function(){
		var showtodate = window.showtodate + "";
		todatearr = showtodate.split("-");
		var todayy = todatearr[0];
		var todaym = todatearr[1];
		var todayd = todatearr[2];
		var yestd = getLastDay(todayy,todaym,todayd);
		if(todayd-yestd != 1 && 1!=todaym){
			var yestm = todaym -1;
			var yesty = todayy;
		}
		else if((todayd-yestd != 1) && (1==todaym)){
			var yestm =12;
			var yesty = todayy - 1;
		}
		else{
			var yestm = todaym;
			var yesty = todayy;				
		}
		var _datestr = yesty + "-" + yestm + "-" + yestd ;
		var sql = "select * from [blog] where datediff('d',[adddate], cdate('"+ _datestr +"'))=0";
		//设置口令
		if(!key(sql,table1limit))
			return false;
		var rs = requeryrs(sql);	
		var datebox = document.getElementById("showbloginfo_head").getElementsByTagName("h2")[0];	
		var _box = document.getElementById("showbloginfo_body");	
		//调用exeData()方法，处理查询的数据
		showblogcontent({
			box:	_box, 
			rs:		rs, 
			table:	"blog",
			sql:	sql,
			todate : _datestr,
			tabletitle: this.value + "（Blog）",
			datebox : datebox
		});	
	}
	var newday = document.getElementById("newday");
	newday.onclick = function(){
		var showtodate = window.showtodate + "";
		todatearr = showtodate.split("-");
		var todayy = todatearr[0];
		var todaym = todatearr[1];
		var todayd = todatearr[2];
		var mondays = hasManyDays(todayy, todaym);
		var yestd = todayd*1 + 1;
		var yestm = todaym*1;
		var yesty = todayy*1;
		if(yestd >mondays ){
			  yestd = 1;
			  yestm = yestm +1;
		}
		if(yestm > 12){
			  yestm = 1;
			  yesty = yesty + 1;
		}	
		var _datestr = yesty + "-" + yestm + "-" + yestd ;
		var sql = "select * from [blog] where datediff('d',[adddate], cdate('"+ _datestr +"'))=0";
		//设置口令
		if(!key(sql,table1limit))
			return false;
		var rs = requeryrs(sql);
		var datebox = document.getElementById("showbloginfo_head").getElementsByTagName("h2")[0];	
		var _box = document.getElementById("showbloginfo_body");	
		//调用exeData()方法，处理查询的数据
		showblogcontent({
			box:	_box, 
			rs:		rs, 
			table:	"blog",
			sql:	sql,
			todate : _datestr,
			tabletitle: this.value + "（Blog）",
			datebox : datebox
		});	
	}				
}
//===================================
//在指定的包含框中显示指定记录集中的数据
//参数
//paraobj {
	//box：显示数据的包含框，DOM对象
	//rs：显示的记录集，数据集合对象
	//table：显示数据对应的数据表，字符串
	//todate:显示哪天日记，格式2011-9-6
//}
//返回值
//如果操作成功返回true，否则返回false
var showblog = function(paraobj){
	//保存参数
	var _paraobj = paraobj;
	var paraobj = {};
	for(var name in _paraobj){
		paraobj[name] = _paraobj[name];
	}
	//处理参数值
	if(!paraobj.box){
		alert("没有指明显示数据的包含框！");
		return false;
	}
	else
		var box = paraobj.box;
	if(!paraobj.table){
		var table = "blog";
	}
	else
		var table = paraobj.table;
	if(!paraobj.rs){
		alert("没有传递记录集！");
		return false;
	}
	else
		var rs = paraobj.rs;
	if(!paraobj.todate){
		alert("没有传递日期！");
		return false;
	}
	else{
		var todate = paraobj.todate;
		window.showtodate = todate;
	}
	//生成数据表格的HTML结构字符串	
	//=========================
	//日期标题
	var todatearr = todate.split("-");
	var todayy = todatearr[0];
	var todaym = todatearr[1]-1;
	var todayd = todatearr[2];
	var _today = new Date(todayy,todaym,todayd);
	var html = "<div id='showbloginfo'><div id='showbloginfo_head'>";
	html += "<h2>";
	html +=  todate  + "（星期" + weekDaySting[_today.getDay()] + "）";
	html += "</h2>";
	html += "<div>";
	html += "<span id='oldday' title='浏览前一天的日记'>前翻</span>";
	html += "<span id='newday' title='浏览后一天的日记'>后翻</span>";
	html += "<span id='classshow'></span>";	
	html += "<span id='closeblog'>关闭窗口</span>";
	//该模块功能暂时停止，思路没有想好
	/*
	if(false) {
		html += "<div id='boldshowblog'>重点阅读：";
		var _tempobj = {};
		while (!rs.eof){
			var classid = rs("class") * 1;
			if(_tempobj[classid]){
				rs.moveNext;
				continue;
			}
			else
			 _tempobj[classid] = true;
			var sql = "select * from [class2] where id = " + classid;
			var rs1 = requeryrs(sql);
			var title = rs1("title") + "";
			html += "<span id='blog" + classid + "' title='" + title + "'>" + title + "</span>";
			//清除记录集
			closers(rs1);
			rs.moveNext;
		}
		html += "</div>";
		rs.moveFirst;
	}	
	*/
	html += "</div>";
	html += "</div>";
	//=========================
	//详细信息
	if(!rs.eof) {
		html += "<div id='showbloginfo_body'>";
		html += _beginshowblog(rs);		
		html += "</div>";		
	}
	//如果记录集为空
	else {		
		html += "<div id='showbloginfo_body'>";
		html += "<h2>今天你也太懒散了，为什么不留点痕迹呢，梳理、总结一下呢？！</h2";
		html += "</div>";	
	}
	html += "</div>";
	//在查询显示框中显示查询数据
	box.innerHTML = html;
	//显示成功最后返回true
	return true;
}
//===================================
//在指定的包含框中显示指定的博客内容，本函数是showblog函数的特殊处理，以便在body中仅显示博客内容，不覆盖顶部的导航控制按钮
//参数
//paraobj {
	//box：显示数据的包含框，DOM对象
	//rs：显示的记录集，数据集合对象
	//table：显示数据对应的数据表，字符串
	//todate:显示哪天日记，格式2011-9-6
	//datebox:显示博客内容的包含框	，DOM对象
//}
//返回值
//如果操作成功返回true，否则返回fal
var showblogcontent = function(paraobj){
	//保存参数
	var _paraobj = paraobj;
	var paraobj = {};
	for(var name in _paraobj){
		paraobj[name] = _paraobj[name];
	}
	//处理参数值
	if(!paraobj.box){
		alert("没有指明显示数据的包含框！");
		return false;
	}
	else
		var box = paraobj.box;
	if(!paraobj.table){
		var table = "blog";
	}
	else
		var table = paraobj.table;
	if(!paraobj.rs){
		alert("没有传递记录集！");
		return false;
	}
	else
		var rs = paraobj.rs;
	if(!paraobj.todate){
		alert("没有传递日期！");
		return false;
	}
	else{
		var todate = paraobj.todate;
		window.showtodate = todate;
	}
	if(!paraobj.datebox){
		alert("没有传递日期标题包含框！");
		return false;
	}
	else{
		var datebox = paraobj.datebox;
		window.datebox = datebox;
	}	
	//生成数据表格的HTML结构字符串	
	//=========================
	//日期标题
	var todatearr = todate.split("-");
	var todayy = todatearr[0];
	var todaym = todatearr[1]-1;
	var todayd = todatearr[2];
	var _today = new Date(todayy,todaym,todayd);
	var html = todate  + "（星期" + weekDaySting[_today.getDay()] + "）";
	datebox.innerHTML = html;
	var redshowblog  = document.getElementById("redshowblog");
	if(!rs.eof) {
		redshowblog.style.display = "";
		var _tempobj = {};
		while (!rs.eof){
			var classid = rs("class") * 1;
			if(_tempobj[classid]){
				rs.moveNext;
				continue;
			}
			else
				_tempobj[classid] = true;
			rs.moveNext;
		}
		rs.moveFirst;
		var redshowblog  = document.getElementById("redshowblog");
		if(redshowblog){
			var redshowli  = redshowblog.getElementsByTagName("span");
			if(redshowli){
				for(var i=0;i<redshowli.length;i++){
					redshowli[i].style.display = "";
				}				
				for(var i=0;i<redshowli.length;i++){
					var _spanid = redshowli[i].getAttribute("id");
					_spanid = _spanid.substring(4);
					if(!_tempobj[_spanid])
						redshowli[i].style.display = "none";
				}
			}
		}
	}	
	//详细信息
	var html = "";
	if(!rs.eof) {
		html += _beginshowblog(rs);	
	}
	//如果记录集为空
	else {
		redshowblog.style.display = "none";
		html += "<div id='showbloginfo_body'>";
		html += "<h2>今天你也太懒散了，为什么不留点痕迹呢，梳理、总结一下呢？！</h2";
		html += "</div>";	
	}
	//在查询显示框中显示查询数据
	box.innerHTML = html;
	//显示成功最后返回true
	return true;
}
	//===================================
	//showblogcontent和showblog两个函数的内部函数：集成代码，优化管理
	//参数
	//rs：显示的记录集，数据集合对象
	//返回值
	//如果html字符串
	function _beginshowblog(rs){
		//显示补记
		var html = "";
		var tempinfo = _showblog({
			rs : rs,
			classid : 32,
			classname : "buji",
			title   :  "昨天、前天……",
		})
		if(tempinfo)
			html += tempinfo ;		
		/*
		//显示天气
		var tempinfo = _showblog({
			rs : rs,
			classid : 24,
			classname : "tianqi",
			title   :  "今天天气",
		})		
		var tempinfo = _showblog({
			rs : rs,
			classid : 25,
			classname : "xinqing",
			title   :  "今天心情",
		})
		if(tempinfo)
			html += tempinfo;	
		*/			
		//显示其他内容
		var tempinfo = _showblog({
			rs : rs,
			classid : -1,
			noclassid : [26,27,32],
			classname : "qita",
			title   :  "流水账",
		})
		if(tempinfo)
			html += tempinfo;
		//显示总结
		var tempinfo = _showblog({
			rs : rs,
			classid : 27,
			classname : "zongjie",
			title   :  "总结",
		})		
		if(tempinfo)
			html +=  tempinfo;
		var tempinfo = _showblog({
			rs : rs,
			classid : 26,
			classname : "jihua",
			title   :  "计划",
		})
		if(tempinfo)
			html +=  tempinfo;
		return html;
	}
	//===================================
	//showblogcontent和showblog两个函数的内部函数：显示博客数据
	//参数
	//paraobj {
		//rs：显示的记录集，数据集合对象
		//classid：显示分类的id值，数字,如果为-1，则显示所有分类记录
		//noclassid : 不显示分类的id值，数组，数组元素为数字
		//classname：显示分类的名称，字符串
		//title：显示在网页中显示的标题，字符串		
	//}
	//返回值
	//如果操作成功返回true，否则返回false	
	function _showblog(paraobj){
		//保存参数
		var _paraobj = paraobj;
		var paraobj = {};
		for(var name in _paraobj){
			paraobj[name] = _paraobj[name];
		}
		//处理参数值
		if(!paraobj.rs){
			alert("没有指明记录集！");
			return false;
		}
		else{
			var rs = paraobj.rs;
			rs.moveFirst;
		}
		if(!paraobj.classid){
			alert("没有指明类别！");
			return false;
		}
		else
			var classid = paraobj.classid;
		if(!paraobj.classname){
			alert("没有指明类名！");
			return false;
		}
		else
			var classname = paraobj.classname;
		if(!paraobj.title){
			alert("没有指明标题！");
			return false;
		}
		else
			var title = paraobj.title;
		if(!paraobj.noclassid){
			var noclassid = [];
		}
		else
			var noclassid = paraobj.noclassid;	
		//显示数据								
		var html = "";
		var _html = "<dl class='" + classname + "'><dt>" + title + "</dt>";
		blogclass: while (!rs.eof){
			//过滤掉不要显示的分类记录
			for(var i=0; i<noclassid.length;i++){
				if(rs("class") == noclassid[i]){
					rs.moveNext;
					continue blogclass;
				}
			}
			if((rs("class")*1) == classid  ){
				var blogclass = rs("class") + "";
				if(blogclass){
					html += "<dd class='blog" + blogclass + "'>";
					var _sql = "select * from [class2] where id = " + blogclass;
					var _rs = requeryrs(_sql);
					var title = _rs("title") + "";
					//清除记录集
					closers(_rs);
				}
				else{
				    html += "<dd>";
					var title = "";
				}
				var remark = rs("remark") + "";
				remark = formatBlog(remark);
				if(remark)
					html += "<span class='blogremark'>" + remark + "</span>";
				if(title)
					html += "<span class='blogtitle'>（" + title  + ")</span>";					
				var adddate = rs("adddate") + "";
				adddate = formatData(adddate,{
					field:	"adddate",
					table:	"blog"
				});
				if(adddate)
					html += "<span class='blogadddate'>（写于" + adddate  + "）</span>";
				var update = rs("update") + "";	
				update = formatData(update,{
					field:	"update",
					table:	"blog"
				});
				if(update)
					html += "<span class='blogupdate'>（改于" + update  + "）</span>";										
				html += "</dd>"	;
			}
			else if( classid == -1 ){
				var blogclass = rs("class") + "";			
				if(blogclass){
					html += "<dd class='blog" + blogclass + "'>";
					var _sql = "select * from [class2] where id = " + blogclass;
					var _rs = requeryrs(_sql);
					var title = _rs("title") + "";
					//清除记录集
					closers(_rs);
				}
				else{
				    html += "<dd>";
					var title = "";
				}
				var remark = rs("remark") + "";
				remark = formatBlog(remark);
				if(remark)
					html += "<span class='blogremark'>" + remark + "</span>";
				if(title)
					html += "<span class='blogtitle'>（" + title  + ")</span>";					
				var adddate = rs("adddate") + "";
				adddate = formatData(adddate,{
					field:	"adddate",
					table:	"blog"
				});
				if(adddate)
					html += "<span class='blogadddate'>（写于" + adddate  + ")</span>";
				var update = rs("update") + "";
				update = formatData(update,{
					field:	"update",
					table:	"blog"
				});
				if(update)
					html += "<span class='blogupdate'>（改于" + update  + ")</span>";										
				html += "</dd>"	
			}
			rs.moveNext;
		}
		if(html) html = _html + html + "</dl>";
		else html = "";
		return html;
	}
//===================================
//在表格行内单元格转换为可编辑的表单域
//参数
//paraobj {
	//row：当前行对象，DOM对象
	//table：当前显示数据对应的数据表，字符串
//}
//返回值
//返回原表格行单元格的值
var rowtoForm = function(paraobj){
	//保存参数
	var _paraobj = paraobj;
	var paraobj = {};
	for(var name in _paraobj){
		paraobj[name] = _paraobj[name];
	}
	//处理参数值
	if(!paraobj.row){
		alert("没有指明当前行！");
		return false;
	}
	else
		var row = paraobj.row;
	if(!paraobj.table){
		alert("没有指明当前表格显示数据对应的数据表！");
		return false;
	}
	else
		var table = paraobj.table;
	//获取行的第一个单元格的编号值
	if(row.firstChild.firstChild)
		var id = parseInt(row.firstChild.firstChild.data);
	//获取当前行所有单元格
	var childnodes = row.childNodes;
	//保存行旧值的变量
	var rowoldvalue = {};
	//遍历所有单元格
	for(var j=0; j<childnodes.length; j++){
		//获取单元格
		var cell = childnodes[j];
		//清除单元格的补白
		cell.style.padding = "0";
		//获取单元格的类名
		var classname = cell.className;
		//如果不存在类名，跳过
		if(!classname)
			continue;
		//保存单元格原来的值
		rowoldvalue[classname] = cell.innerHTML; 
		//单元格的字段类型
		var type = fieldobj[classname][2];
		//如果不允许编辑，则跳过
		if( type == "no")
			continue;
		//文本框编辑
		if(type == "text"){
			var formfield = document.createElement("input");				
			//检测是否存在文本节点
			if(cell.firstChild)
				formfield.value = cell.firstChild.data;
			else{
				if(classname == "price"){
					formfield.value = "0.00"; 
				}
				else
					formfield.value = "";
			}
			//清空单元格
			cell.innerHTML = "";
			//嵌入文本框
			cell.appendChild(formfield);
		}
		//文本区域编辑
		else if(type == "textarea"){
			var formfield = document.createElement("textarea");							
			//检测是否存在文本节点
			if(cell.firstChild){
				var temp = cell.innerHTML;
				//如果把表格中的换行标签替换为换行符
				temp = temp.replace(/\<br \/>/gi, "\n\r").replace(/\<br>/gi, "\n\r")
				formfield.value = temp;
			}
			else
				formfield.value = "";
			//清除单元格以前的值
			cell.innerHTML = "";
			//嵌入文本区域
			cell.appendChild(formfield);
		}
		//下拉列表框编辑
		else if(type == "select"){
			//创建option选项
			var formfield = document.createElement("select");
			//分类字段
			if(classname == "class"){
				//主数据表
				if(tableobj[table][5] == "data"){
					var sql = "select * from "+ tableobj[table][2] +"  where upperid = "+ tableobj[table][0] ;
					var rs = requeryrs(sql);
					//生成下拉菜单选项
					while(!rs.eof){
						var option = document.createElement("option");
						option.value = rs("id");
						if(cell.firstChild){
							if(cell.firstChild.data == rs("title"))
								option.selected = true;
						}
						else if(paraobj.id && (paraobj.id == parseFloat(rs("id"))))
							option.selected = true;						
						option.innerHTML = rs("title");
						formfield.appendChild(option);
						rs.moveNext;
					}
					//清除记录集
					closers(rs);
				}
				//明细表，需要从明细表对应的主表中找到该记录的分类编号，然后到class3中过滤明三级细分类
				else if(tableobj[table][5] == "detail"){
					//如果存在从主表传递过来的id编号
					if(paraobj.id){
						//在明细表对应主表中查询指定编号的记录
						var sql = "select * from "+ tableobj[table][8] +" where id = "+ paraobj.id ;
						var temprs = requeryrs(sql);
						//获取该记录的分类号
						var classid = parseFloat(temprs("class"));
						closers(temprs);
						//在三级分类表中过滤同类分类项
						sql = "select * from class3 where upperid = "+ classid;
					}
					//如果不存在paraobj.id，说明不是通过单击明细栏中的查看或添加按钮打开的明细表
					else {
						//在当前表中重新获取当前记录
						var sql = "select * from "+ table +" where id = "+ id ;
						var temprs = requeryrs(sql);
						//获取当前记录的分类号
						var classid = parseFloat(temprs("class"));
						closers(temprs);	
						//在class3表中找到对应分类号的记录
						var sql = "select * from  class3 where id = "+ classid ;
						var temprs = requeryrs(sql);
						//获取该记录的upperid，找到同类选项的上级编号
						var classid = parseFloat(temprs("upperid"));
						closers(temprs);
						//在三级分类表中过滤同类分类项
						sql = "select * from class3 where upperid = "+ classid;					
					}	
					var rs = requeryrs(sql);
					//生成下拉菜单选项
					while(!rs.eof){
						var option = document.createElement("option");
						option.value = rs("id");
						if(cell.firstChild){
							if(cell.firstChild.data == String(rs("title")))
								option.selected = true;
						else if(paraobj.id && (paraobj.id == parseFloat(rs("id"))))
							option.selected = true;
						}
						option.innerHTML = rs("title");
						formfield.appendChild(option);
						rs.moveNext;
					}
				}
			}
			//upperid字段
			else if(classname == "upperid"){
				//明细表
				if(tableobj[table][5] == "detail"){
					//在当前表中重新获取当前记录
					var sql = "select * from "+ table +" where id = "+ id ;
					var temprs = requeryrs(sql);
					//获取当前记录的分类号
					var classid = parseFloat(temprs("class"));
					closers(temprs);	
					//在class3表中找到对应分类号的记录
					var sql = "select * from  " + table + " where class = "+ classid ;
					var rs = requeryrs(sql);
					//生成下拉菜单选项
					while(!rs.eof){
						var option = document.createElement("option");
						//option.value = rs("id");
						option.value = rs("upperid");
						if(cell.firstChild){
							if(cell.firstChild.data == parseFloat(rs("upperid")))
								option.selected = true;
						}
						else if(paraobj.id && (paraobj.id == parseFloat(rs("id"))))
							option.selected = true;						
						option.innerHTML = rs("upperid");
						formfield.appendChild(option);
						rs.moveNext;
					}
				}
				//分类表
				if(tableobj[table][5] == "class"){
					var datatable = tableobj[table][8];
					//获取当前记录的upperid值
					if(cell.firstChild){
						var uppertitle = cell.firstChild.data;
						//清除两侧空格
						uppertitle = uppertitle.replace(/^(\s|　)+/g,"").replace(/(\s|　)+$/g,"");
						var sql = "select * from "+ datatable + "  where title = '" +  uppertitle + "'";
						var temprs = requeryrs(sql);
						if(!temprs.eof){
							if(datatable == "class1"){
								var upperid = parseFloat(temprs("id"));
								sql = "select * from "+ datatable;
							}
							else{
								var upperid = parseFloat(temprs("upperid"));
								sql = "select * from "+ datatable + "  where upperid = " +  parseFloat(upperid);
							}
						}
						else{
							sql = "select * from "+ datatable;
						}
					}
					else if(paraobj.id){
						//在明细表对应主表中查询指定编号的记录
						var sql = "select * from "+ tableobj[table][8] +" where id = "+ paraobj.id ;
						var temprs = requeryrs(sql);
						//获取该记录的分类号
						var upperid = parseFloat(temprs("upperid"));
						closers(temprs);
						//在三级分类表中过滤同类分类项
						sql = "select * from  " + datatable + " where upperid = "+ upperid;
					}
					else{
						sql = "select * from "+ datatable;
					}
					var rs = requeryrs(sql);
					//生成下拉菜单选项
					while(!rs.eof){
						var option = document.createElement("option");
						option.value = rs("id");
						if(cell.firstChild){
							if(cell.firstChild.data == String(rs("title")))
								option.selected = true;
						}
						else if(paraobj.id && (paraobj.id == parseFloat(rs("id"))))
							option.selected = true;						
						option.innerHTML = rs("title");
						formfield.appendChild(option);
						rs.moveNext;
					}
				}
				//清除记录集
				closers(rs);
			}
			//清除单元格以前的值
			cell.innerHTML = "";
			//嵌入下拉菜单
			cell.appendChild(formfield);		
		}
	}
	//为文本区域绑定外部自动伸缩插件
	$('textarea').elastic();
	//返回当前行的修改前的默认值
	return rowoldvalue;
}
//===================================
//把表格行内已修改的数据写入到数据表中
//参数
//paraobj {
	//row：当前行对象，DOM对象
	//table：当前显示数据对应的数据表，字符串
//}
//返回值
//如果成功，则返回true，否则返回false
var updateData = function(paraobj){
	//保存参数
	var _paraobj = paraobj;
	var paraobj = {};
	for(var name in _paraobj){
		paraobj[name] = _paraobj[name];
	}
	//处理参数值
	if(!paraobj.row){
		alert("没有指明当前行！");
		return false;
	}
	else
		var row = paraobj.row;
	if(!paraobj.table){
		alert("没有指明当前表格显示数据对应的数据表！");
		return false;
	}
	else
		var table = paraobj.table;
	//获取行的第一个单元格的编号值
	if(row.firstChild.firstChild)
		var id = parseInt(row.firstChild.firstChild.data);
	else{
		alert("当前行没有编号，无法进行删除操作！");
		return false;		
	}
	//生成SQL字符串
	var sql = "update [" + table + "] set ";
	//获取行内单元格
	var childnodes = row.childNodes;
	//遍历行内单元格
	for(var j=0;j<childnodes.length;j++){
		var cell = childnodes[j];
		var field = cell.className;
		//如果不存在类名，则跳过
		if(!field){
			continue;
		}
   		//处理包含表单域的可编辑单元格
		if(fieldobj[field][2] != "no"){
			var value = cell.firstChild.value;
			 if(!value){
				alert("请输入"+ fieldobj[field][1] +"列的值！");
				return false;			 
			 }
			 else{
				//验证数据
				var verifyvalue = verifyData(value,{
					field:	field,
					table:	table
				});
				//如果没有通过验证，则恢复默认显示效果，并失败返回
				if(!verifyvalue){
					//resettData(paraobj);
					return false;
				}
			 } 
			if( fieldobj[field][0] == "text" ){
				sql += "[" +field + "]='" + value + "', ";
			}
			else if( fieldobj[field][0] == "num" ){
				sql +="[" +field + "]=" + value + ", ";
			}	
		}
	}
	//获取当前更新时间
	var date = new Date(); 
	var updatetime = date.getFullYear() +"-" + (date.getMonth()+1) +"-" + date.getDate() +" " + date.getHours()+":" + date.getMinutes() +":" +date.getSeconds();
	//设计更新字符串
	sql += "[update]= #" + updatetime + "# ";
	sql += " where id =" + parseInt(id);
	//是否确定执行查询操作
	if(confirm("确定要修改当前行记录？")){
		//清除参数对象中的rowoldvalue值
		paraobj.rowoldvalue = null;
		//在参数对象中添加updatetime属性和值
		if(updatetime)
			paraobj.updatetime = updatetime;
		resettData(paraobj);
		//执行数据库更新操作
		execute(sql);
	}
	return true;
}
//===================================
//在表格中删除指定行，并删除数据表中对应记录
//参数
//paraobj {
	//row：当前行对象，DOM对象
	//table：当前显示数据对应的数据表，字符串
//}
//返回值
//如果成功，则返回true，否则返回false
var delData = function(paraobj){
	//保存参数
	var _paraobj = paraobj;
	var paraobj = {};
	for(var name in _paraobj){
		paraobj[name] = _paraobj[name];
	}
	//处理参数值
	if(!paraobj.row){
		alert("没有指明当前行！");
		return false;
	}
	else
		var row = paraobj.row;
	if(!paraobj.table){
		alert("没有指明当前表格显示数据对应的数据表！");
		return false;
	}
	else
		var table = paraobj.table;
	//获取行的第一个单元格的编号值
	if(row.firstChild.firstChild)
		var id = parseInt(row.firstChild.firstChild.data);
	else{
		alert("当前行没有编号，无法进行删除操作！");
		return false;		
	}
	//过滤是否检索被引用的数据表
	if(tableobj[table][4]!="no"){
		//定义查询字符串
		var sql = "select * from " + tableobj[table][4] + "  where  upperid = "+ id;
		//查询数据
		var rs = requeryrs(sql);
		if(!rs.eof){
			alert("当前记录已被引用！\n        引用明细表：" + tableobj[table][4] + "  \n      被引用记录编号：" + id + "\n只有先删除明细表中引用的记录之后，才能够删除当前记录！");
			//关闭记录集
			closers(rs);
			return false;
		}
		//关闭记录集
		closers(rs);
	}
	//如果被多个表引用，则需要逐一进行复查
	if(tableobj[table][9]!="no"){
		//定义查询字符串
		var array = tableobj[table][9];
		if(!(typeof array == "object") && !(array.constructor == Array)){
			alert("映射值不是数组！");
			return false;
		}
		for(var i=0;i<array.length; i++){
			var sql = "select * from " + array[i] + "  where  class = "+ id;
			//查询数据
			var rs = requeryrs(sql);
			if(!rs.eof){
				alert("当前记录已被引用！\n        引用分类表：" + array[i] + "  \n      被引用记录编号：" + id + "\n只有先删除详细表中引用的记录之后，才能够删除当前记录！");
				//关闭记录集
				closers(rs);
				return false;
			}
			//关闭记录集
			closers(rs);
		}
	}	
	if(confirm("慎重操作：\n        删除数据将无法恢复，确定要删除编号为 "+ id +" 的记录？")){
		//定义字符串
		var sql = "delete * from [" + table + "]  where id= " + id; 
		//在数据库中执行删除操作
		execute(sql);
		//移出当前行
		row.parentNode.removeChild(row);
		return true;
	}
	else
		return false;
}
//===================================
//在表格数据行末尾添加一行新数据
//参数
//paraobj {
	//row：当前行对象，DOM对象
	//table：当前显示数据对应的数据表，字符串
//}
//返回值
//如果成功，则返回true，否则返回false
var newrowForm = function(paraobj){
	//保存参数
	var _paraobj = paraobj;
	var paraobj = {};
	for(var name in _paraobj){
		paraobj[name] = _paraobj[name];
	}
	//处理参数值
	if(!paraobj.row){
		alert("没有指明当前行！");
		return false;
	}
	else
		var row = paraobj.row;
	if(!paraobj.table){
		alert("没有指明当前表格显示数据对应的数据表！");
		return false;
	}
	else
		var table = paraobj.table;
	//获取tbody元素最后一个子元素
	var lastdatarow = row.parentNode.previousSibling.lastChild;
	//如果不存在，则使用全局变量备份的tbody数据行
	if(lastdatarow == null)
		var lastdatarow = window.tbodytr;
	//复制最后一行结构
	var newdatarow = lastdatarow.cloneNode(true);
	//清除复制行的title属性
	if(newdatarow.hasAttributes("title"))
		newdatarow.removeAttribute("title");
	//清除复制行的class属性
	if(newdatarow.hasAttributes("class"))
		newdatarow.removeAttribute("class");	
	//把复制的行附加到tbody元素的最后一个子元素后	
	var newlastrow = row.parentNode.previousSibling.appendChild(newdatarow);
	//获取新添加行的所有单元格
	var childnodes = newlastrow.childNodes;
	//把新添加行传递给row，重写该变量
	row = newlastrow;
	//重写参数对象中的row值
	paraobj.row = row;
	//遍历行内单元格
	for(var j=0;j<childnodes.length;j++){
		var cell = childnodes[j];
		//清除每个单元格的onclick事件
		//cell.onclick = null;
		//获取每个单元格的类名
		var field = cell.className;
		if(!field)
			continue;
		//清除单元格中文本，如果是准备以下拉列表框显示并编辑的单元格，则不清除，将会用到该值
		if( fieldobj[field][2] == "text" || fieldobj[field][2] == "textarea"  ){
			cell.innerHTML = "";			
		}	
		//绑定执行插入操作行为
		if( field == "edit" ){
			var btn = createbtn("savebtn","保存");
			cell.innerHTML = "";
			cell.appendChild(btn);
			//绑定行为
			btn.onclick = function(){
				insertData(paraobj);
			}		
		}
		//取消插入操作，删除该行
		if( field == "del"){	
			var btn = createbtn("resetbtn","取消");
			cell.innerHTML = "";
			cell.appendChild(btn);
			//绑定行为
			btn.onclick = function(){
				row.parentNode.removeChild(row);	
			}			
		}		
	}
	//把可编辑单元格显示为表单域
	var rowoldvalue = rowtoForm(paraobj);
}
//===================================
//把表格行内新添加的记录数据插入到数据表中
//参数
//paraobj {
	//row：插入行对象，DOM对象
	//table：当前显示数据对应的数据表，字符串
//}
//返回值
//如果插入成功，则返回true，否则返回false
var insertData = function(paraobj){
	//保存参数
	var _paraobj = paraobj;
	var paraobj = {};
	for(var name in _paraobj){
		paraobj[name] = _paraobj[name];
	}
	//处理参数值
	if(!paraobj.row){
		alert("没有指明输入数据所在的行！");
		return false;
	}
	else
		var row = paraobj.row;
	if(!paraobj.table){
		alert("没有指明当前表格显示数据对应的数据表！");
		return false;
	}
	else
		var table = paraobj.table;
	//生成SQL字符串
	var sql = "insert into [" + table + "] (";
	var fieldname = [];
	var fieldvalue = [];	
	//获取行内单元格
	var childnodes = row.childNodes;
	//遍历行内单元格
	for(var j=0;j<childnodes.length;j++){
		//获取当前单元格
		var cell = childnodes[j];
		//获取单元格类名
		var field = cell.className;
		//不存在类名，则跳过
		if(!field){
			continue;
		}
   		//如果单元格为可编辑的表单域，则进行处理，获取修改的值
		if(fieldobj[field][2] != "no"){
			//获取单元格包含表单域的值
			var value = cell.firstChild.value;
			//如果不存在，则提醒
			if(!value){
				alert("请输入"+ fieldobj[field][1]  +"列的值！");
				return false;			 
			 }
			 //开始处理值
			 else{
				//验证值
				var value = verifyData(value,{
					field:	field,
					table:	table
				});
				//如果没有通过验证，则失败返回
				if(!value){
					return false;
				}
			 }
			 //处理文本值，加引号
			if( fieldobj[field][0] == "text" ){
				fieldname.push("["+field+"]");
				fieldvalue.push("'" + value + "'");	
			}
			//处理数字的值，默认
			else if( fieldobj[field][0] == "num" ){
				fieldname.push("["+field+"]");
				fieldvalue.push(value);
			}
			//处理时间值，加井号
			else if( fieldobj[field][0] == "time" ){
				fieldname.push("["+field+"]");
				fieldvalue.push("#" + value + "#");
			}
		}
		//编辑行
		if( field == "edit"){
			//该标签
			//cell.innerHTML = "修改";
			//绑定行为
			var btn = createbtn("editbtn","修改");
			cell.innerHTML = "";
			cell.appendChild(btn);
			btn.onclick = (function(cell,btn){
				return function(){
					//把行转换为表单域显示，并保留原表格行的值
					var rowoldvalue = rowtoForm(paraobj);
					//清空修改二字
					cell.innerHTML = "";
					//创建保存按钮
					var savebtn = createbtn("savebtn","保存");
					cell.innerHTML = "";
					cell.appendChild(savebtn);
					//绑定行为
					savebtn.onclick = function(){
						//把修改的数据保存到数据库	
						if(updateData(paraobj)){
							//清空单元格内的数据
							cell.innerHTML = "";
							//显示修改按钮
							cell.appendChild(btn);
						}
					}
					//创建取消按钮
					var resetbtn = createbtn("resetbtn","取消");
					cell.appendChild(resetbtn);
					//绑定行为
					resetbtn.onclick = function(){
						//恢复表格行原来的值
						resettData(paraobj);
						//清空单元格内的数据
						cell.innerHTML = "";
						//显示修改按钮
						cell.appendChild(btn);
					}					
				}
			})(cell,btn);			
		}
		//删除行
		if( field == "del"){	
			var btn = createbtn("delbtn","删除");
			cell.innerHTML = "";
			cell.appendChild(btn);
			//绑定行为
			btn.onclick = function(){
				//删除行
				delData(paraobj);
			}			
		}
	}
	//把数组转换字符串
	var namestr = fieldname.join(",");
	var valuestr = fieldvalue.join(",");
	//生成字符串
	sql += namestr + ") values (" + valuestr + ")";
	//是否确定执行查询操作
	if(confirm("确定在数据表中插入记录？")){
		//执行数据库更新操作
		execute(sql);
		//恢复行数据显示
		resettData({
			row: row,
			table:	table
		});	
		//查询写入数据库中的记录
		sql = "select top 1 * from "+ table+" order by id desc";
		var rs = requeryrs(sql);
		//恢复该记录的id值
		var id = rs("id");
		//获取添加时间
		var adddate = rs("adddate");
		//把id和添加时间显示在表格行中
		for(var j=0;j<childnodes.length;j++){
			//单元格
			cell = childnodes[j];
			//类名
			field = cell.className;
			//在第一个单元格显示id值
			if( field == "id"){
				cell.innerHTML =String(id);
			}
			//在更新时间列显示更新时间
			if( field == "adddate"){
				var showvalue = formatData(adddate, {
					field:	field,
					table:	table
				});
				if(!showvalue) showvalue = "";
				cell.innerHTML = showvalue;
			}	
		}
		closers(rs);
		return true;
	}
	else{
		return false;
	}
	return true;
}
//===================================
//恢复表格行默认显示样式
//参数
//paraobj {
	//row：恢复值的行对象，DOM对象
	//table：恢复值的数据表，字符串
	//update：更新时间，可选
	//rowoldvalue：行默认值，数据集合对象，名称为字段名称field，值为单元格默认值，可选
//}
//返回值
//无
var resettData = function(paraobj){
	//保存参数
	var _paraobj = paraobj;
	var paraobj = {};
	for(var name in _paraobj){
		paraobj[name] = _paraobj[name];
	}
	//处理参数值
	if(!paraobj.row){
		alert("没有指明要恢复显示的行！");
		return false;
	}
	else
		var row = paraobj.row;
	if(!paraobj.table){
		alert("没有指明要恢复显示的数据表！");
		return false;
	}
	else
		var table = paraobj.table;
	var updatetime = paraobj.updatetime;
	var rowoldvalue = paraobj.rowoldvalue;	
	//获取行内单元格
	var childnodes = row.childNodes;
	//遍历行内单元格，恢复默认显示效果
	for(var j=0;j<childnodes.length;j++){
		//获取单元格
		var cell = childnodes[j];
		//恢复补白
		cell.style.padding = "2px";
		//获取类名
		var field = cell.className;
		//如果不存在类名，跳过该单元格
		if(!field)
			continue;
		//恢复显示可编辑（表单）的单元格数据
		//同时考虑如果没有传递要具体恢复的默认值	
		if((fieldobj[field][2] != "no") && !rowoldvalue){
			//如果单元格包含子元素
			if(cell.firstChild)
				//获取表单的值
				var value = cell.firstChild.value || cell.firstChild.data ; 
			//否则恢复默认值为空
			else 
				var value = "";
			//格式化值
			var value = formatData(value, {
				field:	field,
				table:	table
			});	
			//如果是分类单元格
			if(field == "class" && !value){
				alert(1);
				//查询对应分类表中该值对应的标签名称
				var sql = "select * from "+ tableobj[table][2] +"  where id = "+ value ;
				var rs = requeryrs(sql);
				cell.innerHTML = String(rs("title"));
				//清除记录集 
				closers(rs);
			}
			//不是分类单元格，则直接显示值
			else{
				cell.innerHTML = value;
			}
		}
		//如果参数中设置了恢复的默认值，则使用指定的值进行恢复显示
		else if(rowoldvalue && field != "edit" && field != "del" && field != "detail"){
			cell.innerHTML = rowoldvalue[field];
		}
		//当不是取消操作时，修改完成后应该显示更新的时间
		else if(field == "update" && !!updatetime){
			cell.innerHTML = updatetime;
		}
	}
}
//===================================
//根据类型格式化数据
//类型包括时间、金额、文本区域、下拉列表
//参数
//value：格式化的值
//paraobj {
	//table：格式化的值对应的数据表，字符串
	//field：格式化的值对应的字段名称，字符串
//}
//返回值
//返回被格式化的值，如果返回false，表示格式化失败
function formatData(value,paraobj){
	//处理参数值
	if(!value){
		alert("没有提供格式化的值");
		return false;
	}
	if(!paraobj.field){
		alert("没有指明格式化的值的类型！");
		return false;
	}
	else
		var field = paraobj.field;
	var table = paraobj.table;
	//根据类型验证值
	//添加时间和更新时间
	if(field == "adddate" || field == "update"){
		var datestr = String(value);
		//确定时国际时间
		if(datestr.length >8){
			//根据空格把时间劈为数组
			datestr = datestr.split(" ");
			//处理月份，获取正常月份值
			for(var j=0; j < monthstr.length; j++){
				if( datestr[1] == monthstr[j]) {
					var tempvalue = j+1;
				}
			}
			//返回格式化的日期格式
			return  datestr[5] + "-" +  tempvalue + "-" + datestr[2] + " "  + datestr[3];
		}
		//非日期值返回false
		else{
			return false;
		}		
	}
	//金额
	else if(field == "price"){
		//如果为非数字，则返回false
		if(isNaN(parseFloat(value)))
			return false;
		//返回保留2位小数的数值
		return  parseFloat(value).toFixed(2);
	}
	//备注
	else if(field == "remark"){
		//把换行符和回车符替换为换行标签
		//通过临时创建一个textarea元素来间接实现
		var textarea = document.createElement("textarea");
		//使用textarea元素接收数据库中的值
		textarea.value = value;
		//再读取textarea中的值
		var showvalue = textarea.value;
		//使用正则表达式进行匹配即可
		showvalue = showvalue.replace(/\n/ig,"<br />").replace(/\r/ig,"");
		//清空临时textarea元素对象
		textarea = null;
		//返回能够在网页中换行显示的文本
		return showvalue
	}
	//类别			
	else if(field == "class"){
		if(!table){
			alert("没有指定数据表，无法格式化！");
			return false;
		}
		if(isNaN(parseFloat(value))){
			alert("输入的值不是数字！");
			return false;
		}
		var classtable = tableobj[table][2];
		var sql = "select * from " + classtable + " where id = " + parseFloat(value);
		var rs = requeryrs(sql);
		if(!rs.eof)
			var showvalue = String(rs("title"));
		else{
			alert("数据表中没有对应记录，无法格式化。");
			return false;
		}
		//关闭记录集
		closers(rs);
		//返回分类编号对应的标签名称
		return showvalue;			
	}
	//upperid			
	else if(field == "upperid"){
		if(!table){
			alert("没有指定数据表，无法格式化！");
			return false;
		}
		var upperindtable = tableobj[table][8];		
		var sql = "select * from " + upperindtable + " where id = " + parseFloat(value);
		var rs = requeryrs(sql);
		if(!rs.eof && tableobj[table][5] == "class" )
			var showvalue = String(rs("title"));
		else if(!rs.eof)
			var showvalue = String(rs("id"));
		else{
			alert("数据表中没有对应记录，无法格式化。");
			return false;
		}
		//关闭记录集
		closers(rs);
		//返回分类编号对应的标签名称
		return showvalue;
	}	
	//其他类型，则不进行格式化
	else{
		return value;
	}
}
function formatBlog(value){
	//处理参数值
	if(!value){
		alert("没有提供格式化的值");
		return false;
	}
	//把换行符和回车符替换为换行标签
	//通过临时创建一个textarea元素来间接实现
	var textarea = document.createElement("textarea");
	//使用textarea元素接收数据库中的值
	textarea.value = value;
	//再读取textarea中的值
	var showvalue = textarea.value;
	//使用正则表达式进行匹配即可
	showvalue = showvalue.replace(/\n/ig,"<br /><span class='indent2em'></span>").replace(/\r/ig,"");
	//清空临时textarea元素对象
	textarea = null;
	//返回能够在网页中换行显示的文本
	return showvalue;
}
//===================================
//根据类型验证数据
//参数
//value：验证值
//paraobj {
	//table：验证值对应的数据表，字符串
	//field：验证值对应的字段名称，字符串
//}
//返回值
//返回处理后的值，如果返回false表示非法值
function verifyData(value,paraobj){
	//处理参数值
	if(!value){
		alert("没有提供验证的值");
		return false;
	}
	if(!paraobj.field){
		alert("没有指明验证的类型！");
		return false;
	}
	else
		var field = paraobj.field;
	if(paraobj.table)
		var table = paraobj.table;
	//根据类型验证值
	//时间
	if(fieldobj[field][0] == "time"){					
		var value  = String(value);
		//清除两侧空格
		value = value.replace(/^(\s|　)+/g,"").replace(/(\s|　)+$/g,"");
		//日期格式验证
		var reg = /(\d{4})-(\d{1,2})-(\d{1,2}).*/;
		var temp = value.match(reg);
		if(temp){
			if(parseInt(temp[1])>2020 || parseInt(temp[1])<1900 || parseInt(temp[2])>12 || parseInt(temp[3])>31){
				alert("日期格式不正确！");
				return false;
			}
		}
		else{
			alert("输入的值不是日期值！");
			return false;                
		}
		return value;
	}
	//金额
	else if(field == "price"){
		//数据验证
		if(isNaN(parseFloat(value)) || parseFloat(value) == 0){
			alert("输入的值不是金额值！");
			return false;
		}
		return parseFloat(value).toFixed(2);
	}
	//下拉分类
	else if(field == "class"){
		//数据验证
		if(isNaN(parseFloat(value)) || parseFloat(value) < 1){
			alert("输入的值不是自动编号值！");
			return false;
		}
		else{
			var sql = "select * from " + tableobj[table][2] + " where id = "+ parseFloat(value);
			//查询数据
			var rs = requeryrs(sql);
			if(rs.eof){
				alert("在关联的表中不存在对应记录！\n        对应表：" + tableobj[paraobj.table][2] + "  \n      对应编号：" + value );
				//关闭记录集
				closers(rs);
				return false;
			}
			//关闭记录集
			closers(rs);
		}
		return parseFloat(value);
	}
	//其他
	else{
		return value
	}				
}

