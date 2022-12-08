$(function() {
	var $map = $('.map'),
		mapReady = !1;

	if ($map.length) {
		$(window).scroll(function () {
			if (!mapReady) {
				var pTop = window.pageYOffset || document.documentElement.scrollTop,
					oTop = $map.offset().top - window.innerHeight;
				if (pTop > oTop) {
					mapReady = !0;
					loadScript($map.data('api-key'));
				}
			}
		}).trigger('scroll');
	}
});

function loadScript(api_key) {
	var script = document.createElement("script");
	if (typeof api_key === 'undefined')
		api_key = '';
	script.type = "text/javascript";
	script.src = "https://api-maps.yandex.ru/2.1/?lang=ru_RU&load=package.map&onload=loadMaps&apikey="+api_key;
	document.body.appendChild(script);
}

function loadMaps() {
	$('.map').each(function(){
		var funcName = $(this).data('onload');
		if (funcName && typeof window[funcName] === 'function') {
			window[funcName]($(this));
		}
	});
}

function mainMap($map) {
	var center = [ $map.data('lat'), $map.data('lng') ],
		zoom = $map.data('zoom'),
		myMap = new ymaps.Map($map.attr('id'), {
			center: center,
			zoom: zoom,
			controls: ['zoomControl', 'fullscreenControl']
		});

	ymapsTouchScroll(myMap);
}
