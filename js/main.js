$(function() {
	$.fancybox.defaults.hash = false;

	var $sgal = $(),
		$menu = $('.header__left-menu');

	$('a[data-gal]').on('click', function(e){
		var $this = $(this),
			$gal = $($this.data('gal')),
			item = $this.data('gal-item');

		if (!$gal.length) return false;
		if (typeof item !== "number") item = 1;

		var $swiper = $gal.find('.s-gal-swiper');
		if ($swiper.length && $swiper.get(0).swiper) {
			$swiper.get(0).swiper.slideTo(item - 1);
		}

		$sgal.removeClass('show');
		$gal.addClass('show');
		$sgal = $gal;

		if ($.fn.pagepiling) {
			$.fn.pagepiling.setAllowScrolling(false);
			$.fn.pagepiling.setKeyboardScrolling(false);
			$.fn.pagepiling.setMouseWheelScrolling(false);
		}

		return false;
	});

	$('.s-gal').on('click', '.close', function(e){
		$(e.delegateTarget).removeClass('show');
		$sgal.removeClass('show');
		$sgal = $();

		if ($.fn.pagepiling) {
			$.fn.pagepiling.setAllowScrolling(true);
			$.fn.pagepiling.setKeyboardScrolling(true);
			$.fn.pagepiling.setMouseWheelScrolling(true);
		}
	});

	$('.s-gal-swiper').each(function(){
		var $gal = $(this),
			id = $gal.closest('.s-gal').attr('id');

		new Swiper($gal.get(0), {
			autoHeight: true,
			effect: "fade",
			fadeEffect: {
				crossFade: true,
			},
			navigation: {
				nextEl: "#" + id + " .s-gal-next",
				prevEl: "#" + id + " .s-gal-prev",
			},
			breakpoints: {
				960: {
					autoHeight: false,
				},
			},
		});
	});

	(function() {
		// breakpoint where swiper will be destroyed
		// and switches to a dual-column layout
		const breakpoint = window.matchMedia( '(max-width:959px)' );

		// keep track of swiper instances to destroy later
		// let myPiling;

		//////////////////////////////////////////////////////////////////
		//////////////////////////////////////////////////////////////////
		//////////////////////////////////////////////////////////////////

		const breakpointChecker = function() {

		  // if larger viewport and multi-row layout needed
		  if ( breakpoint.matches === true ) {

			// clean up old instances and inline styles when available
			// if ( myPiling !== undefined ) myPiling.destroy( true, true );
			if ($.fn.pagepiling && typeof $.fn.pagepiling.destroy !== 'undefined')
				$.fn.pagepiling.destroy('all');

			// or/and do nothing
			return;

			// else if a small viewport and single column layout needed
			} else if ( breakpoint.matches === false ) {

			  // fire small viewport version of swiper
			  return enablePiling();

			}

		};

		//////////////////////////////////////////////////////////////////
		//////////////////////////////////////////////////////////////////
		//////////////////////////////////////////////////////////////////

		var mapReady = !1,
			$map = $('.map');

		const enablePiling = function() {
			var $slides = null;
			$('#pagepiling').pagepiling({
				normalScrollElements: '.map',
				verticalCentered: false,
				menu: '#menu',
				anchors: ['s01', 's02', 's03', 's04', 's05', 's06', 's07', 's08', 's09', 's10', 's11', 's12', 's13', 's14', 's15', 's16', 's17', 's18', 's19', 's20'],
				afterRender: function(a){
					$slides = $(this);
				},
				onLeave: function(index, nextIndex, direction){
					if ($sgal.length) {
						$sgal.removeClass('show');
						$sgal = $();
						$.fn.pagepiling.setAllowScrolling(true);
						$.fn.pagepiling.setKeyboardScrolling(true);
						$.fn.pagepiling.setMouseWheelScrolling(true);
					}
					console.log('onLeave', index, nextIndex, direction);

					if (index === 18) {
						$($slides.get(17)).removeClass('pp-scrollable');
					}
					if (index === 19) {
						$($slides.get(18)).removeClass('pp-scrollable');
					}

					$menu.removeClass('header__left-menu__opened');
				},
				afterLoad: function(anchorLink, index){
					console.log('afterLoad', anchorLink, index);
					if (index === 13) {
						var $video = $($slides.get(13)).find('video');
						if ($video.length) {
							if (!$video.data('play')) {
								$video.data('play', 1);
								$video.attr('src', $video.data('src'));
								$video.get(0).play();
							}
						}
					}
					if (index === 18) {
						$($slides.get(17)).addClass('pp-scrollable');
					}
					if (index === 19) {
						$($slides.get(18)).addClass('pp-scrollable');

						var $iframe = $($slides.get(18)).find('iframe');
						if ($iframe.length) {
							if (!$iframe.data('play')) {
								$iframe.data('play', 1);
								$iframe.attr('src', $iframe.data('src'));
							}
						}
					}

					if (index === 4) {
						if (!mapReady && $map.length) {
							mapReady = true;
							loadScript($map.data('api-key'));
						}
					}
				}
			});

		};

		//////////////////////////////////////////////////////////////////
		//////////////////////////////////////////////////////////////////
		//////////////////////////////////////////////////////////////////

		// keep an eye on viewport size changes
		breakpoint.addListener(breakpointChecker);

		// kickstart
		breakpointChecker();



	})();



	/*
	$('form.callorder').on('submit', function(e) {
        e.preventDefault();

        var $form = $(this),
            status = $form.data('status'),
            error = function(error) {
                console.log(error);
                $('#mainForm_done [data-title]').html('Ошибка');
                $('#mainForm_done [data-message]').html('Не удалось отправить заявку');
                $.fancybox.open($('#mainForm_done'));
            };

        if (status === 'loading')
            return false;
        $form.data('status', 'loading');
        $form.addClass('loading');
        $form.find('[name="ajax"]').val(1);

        $.ajax({
            method: "POST",
            url: '/mail.php',
            data: $form.serializeArray(),
            dataType: 'json',
        }).done(function(res) {
            if ($form.closest('.form').length) {
                $.fancybox.close();
            }

            $form.data('status', 'loaded');
            $form.removeClass('loading');

            var ym_id = $form.find('[name="ym"]').val(),
                form_extra = $form.find('[name="extra"]').val() || 'Неизвестная форма';
            if (!!ym_id) {
                console.log('submit_form', { form: ym_id });
                if (typeof ym !== 'undefined') {
                    // ym(84885514, 'reachGoal', 'submit_form', { form: ym_id });
                }
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'submit', {
                        'event_category': 'zakaz',
                        'event_label': form_extra,
                    });
                }
            }

            if (res.status === 'success') {
                $('#mainForm_done [data-title]').html('ДАННЫЕ УСПЕШНО ОТПРАВЛЕНЫ');
                $('#mainForm_done [data-message]').html('Мы перезвоним в ближайшее время.');
                $.fancybox.open($('#mainForm_done'));
            } else {
                error(res.message);
            }
        }).fail(function() {
            if ($form.closest('.form').length) {
                $.fancybox.close();
            }

            $form.data('status', 'loaded');
            $form.removeClass('loading');
            error();
        });

        return false;
    });

    $(document).on('beforeShow.fb', function(e, instance, slide) {
        if (slide.src === '#callorder') {
            var $button = slide.opts.$orig,
                $modal = $(slide.src),
                $form = $modal.find('form'),
                ym_id = $button.data('ym'),
                modal_title = $button.data('modal-title') || 'Оставьте заявку',
                modal_submit_title = $button.data('modal-submit-title') || 'Отправить',
                modal_desc = $button.data('modal-desc') || false;

            if (!!ym_id) {
                $form.find('[name="ym"]').val(ym_id);
                console.log('open_form', { form: ym_id });
                if (typeof ym !== 'undefined') {
                    console.log('ym');
                    // ym(84885514, 'reachGoal', 'open_form', { form: ym_id });
                } else {
                    $form.find('[name="ym"]').val('not_init');
                }
            } else {
                $form.find('[name="ym"]').val('');
            }

            if (modal_title) $modal.find('.modal_title').text(modal_title);
            if (modal_desc)
                $modal.find('.modal_desc').text(modal_desc).show();
            else
                $modal.find('.modal_desc').text('').hide();
            if (modal_submit_title) $modal.find('.modal_submit_title').text(modal_submit_title);

            if ($button.data('extra')) {
                $form.find('[name="extra"]').val($button.data('extra'));
            } else {
                $form.find('[name="extra"]').val('');
            }
        }
    });
	*/

});

