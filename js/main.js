var tool = tool || {};

(function($) {

	tool.gmap = {};

	tool.listeners = function() {

		$("nav a.pure-menu-link").click(function(e) {
			e.preventDefault();

			$("nav li").removeClass('pure-menu-selected');
			$(this).parents('li').addClass('pure-menu-selected');
			$.scrollTo($(this).attr('href'), 750, 'swing');
		});

		$(".engagement-nav-top").click(function(e) {
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

	tool.initMap = function() {

		var mapDiv = $("#directions-map")[0],
			centerPos = {lat: 39.8065172, lng: -75.5523234},
			mapOptions = {
				center: centerPos,
				zoom: 15,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			};

		tool.gmap.map = new google.maps.Map(mapDiv, mapOptions);
		tool.gmap.service = new google.maps.places.PlacesService(tool.gmap.map);
		tool.gmap.infoWindow = new google.maps.InfoWindow();

		tool.gmap.service.getDetails({
			placeId: 'ChIJLyY7wp_8xokRdt_Cn1C9uQc'
		}, function(place, status) {
			if (status === google.maps.places.PlacesServiceStatus.OK) {
				tool.gmap.map.center = place.geometry.location;

				tool.gmap.marker = new google.maps.Marker({
					map: tool.gmap.map,
					position: place.geometry.location
				});

				google.maps.event.addListener(tool.gmap.marker, 'click', function() {
					var content = "<p id='place-info'><strong>" + place.name + "</strong><br />" + place.formatted_address + "<br /><br />" + place.formatted_phone_number + "</p>";
					tool.gmap.infoWindow.setContent(content);
					tool.gmap.infoWindow.open(tool.gmap.map, this);
				});
			}
		});
	}();

})(jQuery);