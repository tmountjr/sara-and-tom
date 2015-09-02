var tool = tool || {};

(function($) {

	tool.listeners = function() {

		$("nav a.pure-menu-link").click(function(e) {
			e.preventDefault();

			$("nav li").removeClass('pure-menu-selected');
			$(this).parents('li').addClass('pure-menu-selected');
			$.scrollTo($(this).attr('href'), 750, 'swing');
		});

		$(".about-nav-top").click(function(e) {
			e.preventDefault();
			$.scrollTo($(this).attr('href'), 750, 'swing');
		});

		$("footer").click(function() {
			// find which article we're currently on and advance to the next
		});

		$("li.carousel-photo").hoverIntent({
			over: function() {
				var toShow = $(this).data('content');
				$(".photo-content").promise().done(function() {
					$(toShow).fadeIn();
				});
			},
			out: function() {
				$(".photo-content").promise().done(function() {
					$(".photo-content").fadeOut();
				});
			},
			interval: 250
		});

	}();

})(jQuery);