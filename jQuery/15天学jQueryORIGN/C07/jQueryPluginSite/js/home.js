$(document).ready(function() {	
	$('#number_slideshow').number_slideshow({
		slideshow_autoplay: 'enable',                   //允许自动播放
		slideshow_time_interval: 5000,                  // 自动播放间隔
		slideshow_window_background_color: '#ffffff',   //播放背影色
		slideshow_window_padding: '0',                  //图片与div的内边距
		slideshow_window_width: '680',                  //播放窗口宽度
		slideshow_window_height: '330',                 //播放窗口高度
		slideshow_border_size: '0',                     //边框尺寸
		slideshow_transition_speed: 500,                //转场速度
		slideshow_border_color: '#006600',              //边框颜色
		slideshow_show_button: 'enable',                //允许显示按钮
		slideshow_show_title: 'disable',                //不显示图片标题
		slideshow_button_text_color: '#ffffff',         //导航按钮的样式设置
		slideshow_button_current_text_color: '#ffffff',
		slideshow_button_background_color: '#000066',
		slideshow_button_current_background_color: '#669966',
		slideshow_button_border_color: '#006600',
		//动态加载图像时的加载进度图像
		slideshow_loading_gif: 'third_party/jquery-number-slideshow/loading.gif',
		slideshow_button_border_size: '0'
	});
	
	//为video按钮关联事件处理代码
	$('#video').fancybox({
		'padding': 0,             //视频内边距为0
		'autoScale': false,      //不允许自动缩放
		'transitionIn': 'none',   //不使用转入和转出的转场效果
		'transitionOut': 'none'
	});

});