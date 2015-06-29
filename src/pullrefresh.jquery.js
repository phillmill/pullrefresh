$.fn.pullrefresh = function( options ) {
	
	// Establish our default settings
    var settings = $.extend({
        fetch_data : false
    }, options);

	return this.each(function() {
		var originalY;

		$(this).on('touchstart', function(e) {
			originalY = e.originalEvent.touches[0].pageY;
		});
		$(this).on('touchmove', function(e) {
			var difference = e.originalEvent.touches[0].pageY - originalY;
			// No negative pulling
			if(difference < 0)
				difference = 0;

			// Cant pull more than 100px
			if(difference > 100)
				difference = 100;
			$(this).css({
				'-webkit-transform': 'translate3d(0, '+difference+'px, 0)',
				'transform': 'translate3d(0, '+difference+'px, 0)'
			})
		});
		$(this).on('touchend', function(e) {
			var $elem = $(this);
			if(settings.fetch_data !== undefined && typeof settings.fetch_data == 'function') {
				settings.fetch_data().done(function(html) {
					$elem.html(arguments[0]);
					$elem.css({
						'-webkit-transform': 'translate3d(0, 0, 0)',
						'transform': 'translate3d(0, 0, 0)',
						'-webkit-transition': '-webkit-transform .3s ease',
						'transition': 'transform .3s ease'
					});
					setTimeout(function() {
						$elem.removeAttr('style');
					}, 300)
					originalY = false;
				});
			} else {
				throw "Error: No fetch_data function provided";
			}
		});


	});
}