// JavaScript Document

;(function($){
  $.fn.extend({
	  //为jQuery添加一个实例级别的border插件
      "border":function(options){
		 //设置属性
         options=$.extend({
            width:"1px",
            line:"solid",
            color:"#090"
         },options);
		 //设置样式
       this.css("border",options.width+' '+options.line+' '+options.color);
	   //返回对象，以便支持链式语法
	   return this;       
      }
   });
})(jQuery)
