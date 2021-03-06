$.fn.pullrefresh = function( options ) {
	
	// Establish our default settings
	var settings = $.extend({
		fetch_data : false,
		pull_amount: 60,
		animation_speed: 300,
		spinner_image: 'img/loading-graphic.png',
		spinner_width: 32,
		spinner_height: 32
	}, options);

	return this.each(function() {
		var originalY;
		var $spinner;
		var $list = $(this);

		// Set up the spinner
		if(!$('#pullrefresh-spinner').length) {
			$spinner = $('<div id="pullrefresh-spinner"><img src="'+settings.spinner_image+'" width="'+settings.spinner_width+'" height="'+settings.spinner_height+'" alt="Loading spinner graphic" /></div>');
			$spinner.css({
				'position': 'absolute',
				'z-index': '-1',
				'width': settings.spinner_width,
				'height': settings.spinner_height,
				'left': '50%',
				'margin-left': Math.floor((settings.spinner_width / 2) * -1),
				'top': ($list.offset().top + (Math.floor(settings.pull_amount / 2) - Math.floor(settings.spinner_height / 2))) + 'px',
				'opacity': 0
			});
			$spinner.prependTo('body');
		} else {
			$spinner = $('#pullrefresh-spinner');
		}

		$(this).on('touchstart', function(e) {
			originalY = e.originalEvent.touches[0].pageY;
		});
		$(this).on('touchmove', function(e) {
			var scroll_top = $('body').scrollTop();
			if(scroll_top < 1) {
				var difference = e.originalEvent.touches[0].pageY - originalY;
				// No negative pulling
				if(difference < 0) {
					difference = 0;
				} else {
					e.preventDefault();
				}

				// Cant pull more than the pull mount
				if(difference > settings.pull_amount)
					difference = settings.pull_amount;
				$(this).css({
					'-webkit-transform': 'translate3d(0, '+difference+'px, 0)',
					'transform': 'translate3d(0, '+difference+'px, 0)'
				})
				$spinner.css({
					'opacity': (difference / settings.pull_amount)
				})
			}
		});
		$(this).on('touchend', function(e) {
			var scroll_top = $('body').scrollTop();
			if(scroll_top < 1) {
				var $elem = $(this);
				if(settings.fetch_data !== undefined && typeof settings.fetch_data == 'function') {
					// When the (assumed remote) data is retrieved, animate the list back up to it's natural spot
					settings.fetch_data().done(function(html) {
						$elem.html(arguments[0]);
						$elem.css({
							'-webkit-transform': 'translate3d(0, 0, 0)',
							'transform': 'translate3d(0, 0, 0)',
							'-webkit-transition': '-webkit-transform '+(settings.animation_speed/1000)+'s ease',
							'transition': 'transform '+(settings.animation_speed/1000)+'s ease'
						});
						setTimeout(function() {
							$elem.removeAttr('style');
						}, settings.animation_speed)
						originalY = false;
					});
				} else {
					throw "Error: No fetch_data function provided";
				}
			}
		});
	});
}
