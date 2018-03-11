// JavaScript Document

;(function($){
   $.extend({
      "modalwindow":function(options){
         //设置属性
         options=$.extend({
            url:"http://www.micorsoft.com", //打开的网址
            vArguments:null,               //参数
			dialogHeight:"200px",           //对话框高度
            dialogWidth:"500px",            //对话框宽度
			dialogLeft:"100px",             //左侧位置
			dialogTop:"50px",               //顶部位置
			status:"no",                    //是否显示状态条
			help:"no",                      //是否显示帮助按钮
			resizable:"no",                 //是否允许调整尺寸
			scroll:"no"                      //是否显示滚动条
         },options);
		 //弹出窗口
      	   var retVal = window.showModalDialog(options.url,options.vArguments,"dialogHeight:"+options.dialogHeight+"; dialogWidth:"+options.dialogWidth+"; dialogLeft:"+options.dialogLeft+";dialogTop:"+options.dialogTop+";status:"+options.status+"; help:"+options.help+";resizable:"+options.resizable+";scroll:"+options.scroll+";");   
	   //返回弹出式窗口
	   return retVal;                       //返回窗口引用值
      }
   });
})(jQuery)
