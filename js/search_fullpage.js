var myFullpage;
$(function(){
	// $('.header').addClass('position-relative').css('top', 0);

	myFullpage = new fullpage('#fullpage', {
		// autoScrolling: false,
		offsetSections: true,
		interlockedSlides: true,
		verticalCentered: false,
		// scrollOverflow: false,
		licenseKey: 'OPEN-SOURCE-GPLV3-LICENSE',
		afterLoad: function(section, origin, destination, direction, trigger) {
			if (origin.isFirst) {
				console.log('first');
			}
			if (origin.isLast) {
				myFullpage.setMouseWheelScrolling(false);
				myFullpage.setAllowScrolling(false);
				myFullpage.setKeyboardScrolling(false);
			}
		}
	});
	myFullpage.setMouseWheelScrolling(false);
	myFullpage.setAllowScrolling(false);
	myFullpage.setKeyboardScrolling(false);
});
