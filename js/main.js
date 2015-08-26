var tool = tool || {};

(function($) {

	tool.listeners = function() {

		$("nav a.pure-menu-link").click(function(e) {
			e.preventDefault();

			$("nav li").removeClass('pure-menu-selected');
			$(this).parents('li').addClass('pure-menu-selected');
			$.scrollTo($(this).attr('href'), 750, 'swing');
		});

	}();

})(jQuery);