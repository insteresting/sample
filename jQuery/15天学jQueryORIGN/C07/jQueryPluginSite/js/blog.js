$(document).ready(function() {

	$('.full_article a').click(function() {
		var show = $(this);
		var blog_detail = $(this).parent().prev('.blog_detail');

		if (blog_detail.css('display') == 'block') {
			blog_detail.slideUp('slow', function() {
				show.text('阅读全文');
			});
		} else {
			blog_detail.slideDown('slow', function() {
				show.text('收起全文');
			});
		}
	});

});