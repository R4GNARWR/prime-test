$('.header__menu-toggle, .header__left-menu-item').on('click', function(){
    $('.header__left-menu').toggleClass('header__left-menu__opened');
})

$('.modal-btn').on('click', function()
{
    let label = $(this).attr('data-label');
    let text = $(this).attr('data-text');
    let btn = $(this).attr('data-btn');
    if (label != undefined)
    {
        $('.main-form__label').html(label);
    }
    else if (label === '')
    {
        $('.main-form__label').html("ЗАПИШИТЕСЬ НА ВСТРЕЧУ")
    }
    else
    {
        $('.main-form__label').html("ЗАПИШИТЕСЬ НА ВСТРЕЧУ")
    }

    if (text != undefined)
    {
        $('.main-form__text').html(text);
    }
    else if (text === '')
    {
        $('.main-form__text').html("Мы перезвоним и обсудим детали.");
    }
    else
    {
        $('.main-form__text').html("Мы перезвоним и обсудим детали.");
    }

    if (btn != undefined)
    {
        $('.main-form__btn').html(btn);
    }
    else if (btn === '')
    {
        $('.main-form__btn').html("ЗАКАЗАТЬ ЗВОНОК")
    }
    else
    {
        $('.main-form__btn').html("ЗАКАЗАТЬ ЗВОНОК")
    }

    if ($('.main-form__label').text() == '')
    {
        $('.main-form__label').text("ЗАПИШИТЕСЬ НА ВСТРЕЧУ")
    }
    if ($('.main-form__text').text() == '')
    {
        $('.main-form__text').text("Мы перезвоним и обсудим детали.");
    }
    if ($('.main-form__btn').html() == '')
    {
        $('.main-form__btn').html("ЗАКАЗАТЬ ЗВОНОК");
    }
})

$(".range").each(function(){
    $(this).ionRangeSlider();
});

$('.modal-btn').fancybox({
    src  : '#callorder',
});

$('.flats__filter-type-chess').addClass('flats__filter-type__active');
$('.flats__row').addClass('open')

$('.flats__filter-type-list').on('click', function()
{
    $(this).addClass('flats__filter-type__active');
    $('.flats__filter-type-chess').removeClass('flats__filter-type__active')
    $('.flats__list').addClass('open')
    $('.flats__row').removeClass('open')
})
$('.flats__filter-type-chess').on('click', function()
{
    $(this).addClass('flats__filter-type__active');
    $('.flats__filter-type-list').removeClass('flats__filter-type__active')
    $('.flats__row').addClass('open')
    $('.flats__list').removeClass('open')
})