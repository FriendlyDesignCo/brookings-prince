/*
 * Equalize heights of items in a row
 */
(function($) {
	$.fn.equalHeight = function(options) {

		// Build main options before element iteration
		var opts = $.extend({}, $.fn.equalHeight.defaults, options);

		var leftHeight,
			$prevItem,
			parentH = this.parent().height();

		// Loop through each matched element
		return this.each(function(i) {

			var $this = $(this),
				h = $this.height(),
				pt = Math.ceil($this.css('padding-top').replace('px','')) || 0,
				pb = Math.ceil($this.css('padding-bottom').replace('px','')) || 0,
				bt = Math.ceil($this.css('border-top-width').replace('px','')) || 0,
				bb = Math.ceil($this.css('border-bottom-width').replace('px','')) || 0,
				box = pt + pb + bt + bb;

			if( opts.cols === 0 ) {
				$this.css('height', parentH - box);
			} else if( (i % opts.cols) > 0 ) {
				// Right column
				if( h < leftHeight ) {
					// Match height of left item
					$this.css('height', leftHeight);
				} else if ( h > leftHeight ) {
					// Increase left item height
					$prevItem.css('height', h);
				}
			} else {
				// Left Column
				leftHeight = h;
			}

			$prevItem = $this;
		});

	};

	// Plugin defaults
	$.fn.equalHeight.defaults = {
		cols: 0
	};

})(jQuery);
