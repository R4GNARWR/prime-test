var _floors = {},
	_flats = {};

$(function(){
	var window_width = $(window).width(),
		$choice = $('.choice'),
		$facade = $('.facade2'),
		$svg = $('.facade2__svg', $facade),
		svg = $svg.get(0),
		$facade_floor = $('.facade2__floor', $facade),
		facade_floor = $facade_floor.get(0),
		$facade_floor_val = $('.facade2__floor-2', $facade_floor),
		$facade_floor_count = $('.facade2__floor-4', $facade_floor),
		$facade_floor_tr = $('.facade2__floor-tr', $facade_floor),
		facade_floor_tr = $facade_floor_tr.get(0),
		facade_active = null,
		facade_hover = null,
		facade_floor_timeout = null,
		// $floors = $('[data-floor]', $svg),
		$floors = $('> g', $svg),

		$floor = $('.floor'),
		$floor__floors = $('.floor__floors', $floor),
		$floor__ul = $('ul', $floor__floors),
		$floor__li = $floor__ul.children().first().clone(),

		$flat = $('.flat'),
		$flat_title = $('[data-flat-title]', $flat),
		$flat_props = $('[data-flat-props]', $flat),
		$flat_pdf = $('[data-flat-pdf]', $flat),
		$flat_callorder = $('[data-flat-callorder]', $flat),
		$flat_plan = $('[data-flat-plan]', $flat),
		$flat_thumbs = $('[data-flat-thumbs]', $flat),
		$flat_floor_img = $('[data-flat-floor-img]', $flat),
		$flat_floor_svg = $('[data-flat-floor-svg]', $flat),
		$flat_floor_svg = $('[data-flat-floor-svg]', $flat);

	$('[data-choice]').on('click', function(){
		var $this = $(this),
			show_params = $this.data('choice') === 'params';
		$('.choice__title.active').removeClass('active');
		$this.addClass('active');
		$choice.toggleClass('choice_search', show_params);
		if (show_params) {
			$('.choice__filter').fadeIn(1000);
			$('.search-list').fadeIn(1000);
			$floor.hide();
			$flat.hide();
		} else {
			$('.choice__filter').fadeOut();
			$('.search-list').fadeOut();
			$floor.hide();
			$flat.hide();
		}
	});

	var floor__floors__change = null;
	// инициализация floor__floors
	(function(){
		var $up = $('[data-floor-up]', $floor__floors),
			$down = $('[data-floor-down]', $floor__floors),
			max = 7,
			count = $floors.length,
			cur_page = 0,
			cur_value = 0,
			$active = null;

		$floor__ul.html('');

		floor__floors__change = function(value, page) {
			if (!page) {
				page = Math.ceil(value / max);
				if (value <= cur_page * max && value > count - max) {
					page = cur_page;
				}
			}
			if (!value) {
				value = cur_value;
			}

			if (value !== cur_value) {
				cur_value = value;
				if ($active)
					$active.removeClass('active');
				$active = $floor__ul.find('[data-floor="'+value+'"]').addClass('active');
			}

			if (page !== cur_page) {
				$up.addClass('btn-primary').removeClass('btn-outline-primary').removeClass('disabled');
				$down.addClass('btn-primary').removeClass('btn-outline-primary').removeClass('disabled');
				if (Math.ceil(count / max) === page) {
					// последняя страница
					$up.removeClass('btn-primary').addClass('btn-outline-primary').addClass('disabled');
				}
				if (page === 1) {
					// первая страница
					$down.removeClass('btn-primary').addClass('btn-outline-primary').addClass('disabled');
				}

				cur_page = page;

				var height = $floor__ul.height(),
					new_height = height,
					mp = max * page;

				$floor__ul.css('height', height);

				$floor__ul.children().each(function(i){
					var $li = $(this),
						floor = $li.data('floor');
					if ((floor <= mp) && ((mp > count && floor > count - max) || (floor > mp - max))) {
						if (floor === value)
							$li.addClass('active');
						$li.show();
					} else {
						$li.hide();
					}
				});

				new_height = $floor__ul.css('height', '').height();
				if (height !== new_height) {
					$floor__ul.css('height', height);
					$floor__ul.animate({
						height: new_height
					}, 200, function(){
						$floor__ul.css('height', '');
					});
				}
			}
		};

		$floor__floors.on('click', '[data-floor-up]', function(){
			floor__floors__change(cur_value, cur_page + 1);
			return false;
		});
		$floor__floors.on('click', '[data-floor-down]', function(){
			floor__floors__change(cur_value, cur_page - 1);
			return false;
		});
		$floor__ul.on('click', 'a', function(){
			setFloor($(this).data('id'));
			return false;
		});

		$('.floor__svg', $floor).on('click', '.floor__flat', function(e){
			$(e.delegateTarget).find('.active').removeClass('active');
			$(this).addClass('active');
			setFlat($(this).data('flat'));

			$flat.slideDown();
			$([document.documentElement, document.body]).animate({
				scrollTop: $flat.offset().top
			}, 700);
		});

		$('.search-list').on('click', '[data-flat]', function(){
			setFlat($(this).data('flat'));
			$.fancybox.open({
				src: '#flatBlock',
				touch: false,
			});
			return false;
		});
	})();

	// инициализируем этажи
	$floors.each(function(i){
		var $group = $(this),
			id = $group.data('id'),
			data = $group.data('floor');

		// ----
		// для теста на верстке
		data = {};
		id = i;
		// -----

		if (data.flats_available) {
			data.flats_text = data.flats_available + ' ' + declOfNum(data.flats_available, ['квартира', 'квартиры', 'квартир']) + ' в&nbsp;продаже';
		} else {
			data.flats_text = 'нет квартир в&nbsp;продаже'
		}
		data.path = $('.facade2__path', $group).data('id', id).get(0);
		data.line = $('.facade2__line', $group).get(0);
		data.group = $group.get(0);
		data.id = id;
		data.top = null;
		data.marginTop = null;
		data.loading = false;
		data.loaded = false;
		_floors[id] = data;

		var $li = $floor__li.clone();
		$li.attr('data-floor', data.floor).find('a').data('id', id).find('span').html(data.floor);
		$floor__ul.prepend($li);

		recalcFacade(_floors[id]);
	});
	floor__floors__change(1, 1);

	// наводи мышь на этаж на фасаде
	$svg.on('mouseover', '.facade2__path', function(e){
		var $path = $(this),
			id = $path.data('id'),
			flag = false;
		if (facade_active !== null) {
			if (facade_active.id == id) {
				return false;
			}
		} else {
			flag = true;
		}
		facade_hover = _floors[id];
		redrawFacade(facade_hover);
		if (flag) $facade_floor.addClass('show');
	});

	// убираем мышь с этажа на фасаде - возвращаем блок к активному этажу
	$svg.on('mouseout', '.facade2__path', function(e){
		if (!facade_active) return false;
		redrawFacade(facade_active);
	});

	// выбор этажа на фасаде
	$svg.on('click', '.facade2__path', function(e){
		setFloor($(this).data('id'));

		$floor.slideDown();
		$([document.documentElement, document.body]).animate({
			scrollTop: $floor.offset().top
		}, 700);
	});

	// вернуться на выбор этажа
	$floor.on('click', '[data-floor-select]', function(){
		$floor.slideUp();
		$([document.documentElement, document.body]).animate({
			scrollTop: $choice.offset().top
		}, 700);
	});

	function setFloor(id) {
		var floor = _floors[id];
		if (floor.loading) return;
		floor.loading = true;
		$floor.addClass('loading');

		if (facade_active !== null) {
			$(facade_active.path).removeClass('active');
		} else {
			$facade_floor.addClass('show');
		}
		$(floor.path).addClass('active');
		facade_active = floor;
		redrawFacade(facade_active);

		loadFloor(floor.id, function(floor){
			floor__floors__change(floor.floor, null);

			$('.floor__img', $floor)
				.attr('src', floor.img.src)
				.attr('width', floor.img.width)
				.attr('height', floor.img.height);

			$flat_floor_img
				.attr('src', floor.img.src)
				.attr('width', floor.img.width)
				.attr('height', floor.img.height);
			$flat_floor_svg
				.attr('viewBox', '0 0 ' + floor.img.width + ' ' + floor.img.height);

			var $floor__svg = $('.floor__svg', $floor);
			$floor__svg.html('')
				.attr('viewBox', '0 0 ' + floor.img.width + ' ' + floor.img.height);

			var $floor__text = $('.floor__text', $floor),
				$floor__text_ul = $('ul', $floor__text).html(''),
				floor__text = {
					1: 0,
					2: 0,
					3: 0
				};

			for (var id in floor.flats) {
				var flat = floor.flats[id];
				// flat.floor = floor;
				if (typeof floor__text[flat.rooms] !== 'undefined') floor__text[flat.rooms] += 1;
				$floor__svg.append($(makeSVG('path', {
					class: 'floor__flat',
					d: flat.path,
					'data-flat': id,
				})));
				// _flats[id] = floor.flats[id];
			}

			floor__text = {
				1: {
					count: floor__text[1],
					text: declOfNum(floor__text[1], ['студия', 'студии', 'студий']),
				},
				2: {
					count: floor__text[2],
					text: declOfNum(floor__text[2], ['двухкомнатная', 'двухкомнатные', 'двухкомнатных']),
				},
				3: {
					count: floor__text[3],
					text: declOfNum(floor__text[3], [
						'трехкомнатная смарт планировка',
						'трехкомнатные смарт планировки',
						'трехкомнатных смарт планировок'
					]),
				}
			};

			var hide_text = true;
			for (var key in floor__text) {
				var text = floor__text[key];
				if (!text.count) continue;
				hide_text = false;
				$floor__text_ul.append($('<li><span>' + text.count + ' ' + text.text + '</span></li>'));
			}
			if (hide_text) {
				$floor__text.hide();
			} else {
				$floor__text.show();
			}

			floor.loading = false;
			$floor.removeClass('loading');
		});
	}

	function setFlat(id) {
		loadFlat(id, function(flat){
			$flat_title.html('Квартира №' + flat.num);

			$flat_props.html('');
			if (flat.area.length) $flat_props.append('<div class="h1 mt-0 text-primary">' + flat.area + ' м²</div>');

			var props = [
					{ title: 'Этаж', value: flat.floor_num },
					{ title: 'Номер кв', value: flat.num },
					'br',
					{ title: 'Общая площадь', value: flat.area, postfix: 'м²', bold: true },
					{ title: 'Жилая площадь', value: flat.good_area, postfix: 'м²' },
					{ title: 'Площадь лоджии', value: flat.loggia_area, postfix: 'м²' },
					{ title: 'Площадь кухни', value: flat.kitchen_area, postfix: 'м²' },
					'br',
					{ title: 'Вид из окон', value: flat.windows_view },
					{ title: 'Количество санузлов', value: flat.bathrooms_num },
					{ title: 'Количество лоджий', value: flat.loggias_num },
					'br',
					{ title: 'Отделка', value: flat.decoration },
					{ title: 'Срок сдачи', value: flat.deadline },
					{ title: 'Цена за м²', value: numberWithSpaces(flat.price_m2), postfix: ' рублей' },
					{ title: 'Цена', value: numberWithSpaces(flat.price), postfix: ' рублей' },
				],
				br = false;

			for (let i = 0; i < props.length; i++) {
				var prop = props[i];
				if (prop === 'br') {
					if (!br) $flat_props.append('<br>');
					br = true;
					continue;
				}
				if (!prop.value || !prop.value.length) continue;
				var title = prop.bold ? '<b>' + prop.title + ': </b>' : prop.title + ': ',
					postfix = prop.postfix ? prop.postfix : '';
				$flat_props.append('<p>' + title + '<b>' + prop.value + postfix + '</b></p>');
				br = false;
			}

			$flat_pdf.attr('href', '/print/?f=' + id);
			$flat_callorder
				.data('modal-title', '')
				.data('modal-submit-title', '')
				.data('modal-desc', '')
				.data('extra', 'Квартира №' + flat.num);

			var plans = [
					{ title: 'С мебелью', value: flat.layout_isometric },
					{ title: 'С размерами', value: flat.layout_plan },
					{ title: '3Д тур', value: flat.layout_3d },
				],
				first = true;

			$flat_plan.html('');
			$flat_thumbs.html('');
			for (let i = 0; i < plans.length; i++) {
				var plan = plans[i];
				if (!plan.value || !plan.value.SRC.length) continue;
				$flat_plan.append(
					$('<div data-tab="' + i + '" ' + (first ? '':'style="display: none;"' ) + '></div>').append(
						$('<a href="' + plan.value.SRC + '" data-fancybox class="flat__img"></a>').append(
							$('<img src="' + plan.value.SRC + '" height="'+plan.value.HEIGHT+'" width="'+plan.value.WIDTH+'">')
						)
					)
				);
				$flat_thumbs.append(
					$('<label class="flat__thumb '+ (first ? 'active' : '') +'"></label>')
						.append('<input type="radio" name="plan" value="' + i + '"' + (first ? 'checked' : '') + '>')
						.append('<img src="' + plan.value.SRC + '">')
						.append('<span>' + plan.title + '</span>')
				);
				first = false;
			}
			$flat_plan.append($('<img class="flat__north" src="/img/north.svg" style="transform: rotate(0deg)">'));

			$flat_floor_svg.html('').append(
				$(makeSVG('path', {
					fill: '#008F63',
					d: flat.path,
					opacity: 0.7
				}))
			);
		});
	}

	function loadFlat(id, callback) {
		var flat = _flats[id];
		if (typeof flat === 'undefined') {
			_flats[id] = {
				id: id,
				loaded: false,
				floor: null,
			};
			flat = _flats[id];
		} else if (flat.loaded) {
			callback(flat);
			return;
		}

		$.ajax({
			url: '/flats2/ajax.php',
			type: 'POST',
			dataType: 'json',
			data: {
				flat_id: flat.id,
				action: 'get_flat'
			}
		}).done(function(result){
			console.log('get_flat', flat.id, result);
			Object.assign(flat, result.data);

			loadFloor(flat.floor_id, function(floor){
				flat.loaded = true;
				flat.floor = floor;
				floor.flats[flat.id] = flat;
				callback(flat);
			});
		});
	}

	function loadFloor(id, callback) {
		var floor = _floors[id];
		if (typeof floor === 'undefined') {
			_floors[id] = {
				id: id,
				loaded: false,
				flats: {},
			};
			floor = _floors[id];
		} else if (floor.loaded) {
			callback(floor);
			return;
		}

		$.ajax({
			url: '/flats2/ajax.php',
			type: 'POST',
			dataType: 'json',
			data: {
				floor_id: floor.id,
				action: 'get_floor'
			}
		}).done(function(result){
			console.log('get_floor', floor.id, result);
			Object.assign(floor, result.data);
			floor.loaded = true;
			callback(floor);
		});
	}

	function recalcAll() {
		for (var id in _floors) {
			recalcFacade(_floors[id]);
		}
	}

	function recalcFacade(floor_el) {
		var line = floor_el.line,
			line_rect = line.getBoundingClientRect(),
			facade_floor_rect = facade_floor.getBoundingClientRect(),
			facade_floor_tr_rect = facade_floor_tr.getBoundingClientRect(),
			// left = facade_floor_rect.left + facade_floor_rect.width + facade_floor_tr_rect.width - line_rect.left,
			left = facade_floor_tr_rect.left - line_rect.left,
			percent = left / line_rect.width * line.getTotalLength(),
			y = line.getPointAtLength(percent).y,
			top = y / svg.viewBox.baseVal.height * 100,
			svg_rect = svg.getBoundingClientRect(),
			margin_top = svg_rect.height - (svg_rect.height * top/100 + facade_floor_rect.height / 2);
console.log(left);
		if (margin_top > 0)
			margin_top = 0;

		floor_el.top = top;
		floor_el.marginTop = margin_top;
	}

	function redrawFacade(floor_el) {
		console.log(floor_el);
		$facade_floor.css({
			top: floor_el.top + '%',
			marginTop: floor_el.marginTop,
		});

		$facade_floor_tr.css({
			top: -2*floor_el.marginTop,
		});

		$facade_floor_count.html(floor_el.flats_text);
		$facade_floor_val.html(floor_el.floor);
	}

	$(window).on('resize', function(){
		var new_width = $(window).width();
		if (window_width === new_width) return;
		window_width = new_width;

		clearTimeout(facade_floor_timeout);
		$facade_floor.removeClass('show');
		facade_floor_timeout = setTimeout(function(){
			recalcAll();
			redrawFacade(facade_hover);
			$facade_floor.addClass('show');
		}, 300);
	});
});

function declOfNum(n, text_forms) {
    n = Math.abs(n) % 100;
    var n1 = n % 10;
    if (n > 10 && n < 20) { return text_forms[2]; }
    if (n1 > 1 && n1 < 5) { return text_forms[1]; }
    if (n1 == 1) { return text_forms[0]; }
    return text_forms[2];
}

function makeSVG(tag, attrs) {
	var el= document.createElementNS('http://www.w3.org/2000/svg', tag);
	for (var k in attrs)
		el.setAttribute(k, attrs[k]);
	return el;
}

function numberWithSpaces(x) {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    return parts.join(".");
}
