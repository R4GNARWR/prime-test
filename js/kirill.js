$('.header__menu-toggle, .header__left-menu-item').on('click', function(){
    $('.header__left-menu').toggleClass('header__left-menu__opened');
})


$(".range").each(function(){
    $(this).ionRangeSlider();
});



$('.modal-btn').fancybox({
    src  : '#mainForm',
});

$('.modal-btn').on('click', function()
{
    let label = $(this).attr('data-label');
    let text = $(this).attr('data-text');
    // console.log(label)
    // console.log(text)
    if (label != undefined)
    {
        $('.main-form__label').html(label);
        console.log('1')
        console.log(label)
    }
    else if (label === '')
    {
        $('.main-form__label').html("ЗАПИШИТЕСЬ НА ВСТРЕЧУ")
        console.log('2')
        console.log(label)
    }
    else
    {
        $('.main-form__label').html("ЗАПИШИТЕСЬ НА ВСТРЕЧУ")
        console.log('3')
        console.log(label)
    }

    if (text != undefined)
    {
        $('.main-form__text').html(text);
        console.log('1')
        console.log(text)
    }
    else if (text === '')
    {
        $('.main-form__text').html("Мы перезвоним и обсудим детали.");
        console.log('2')
        console.log(text)
    }
    else
    {
        $('.main-form__text').html("Мы перезвоним и обсудим детали.");
        console.log('3')
        console.log(text)
    }

    if ($('.main-form__label').text() == '')
    {
        $('.main-form__label').text("ЗАПИШИТЕСЬ НА ВСТРЕЧУ")
    }
    if ($('.main-form__text').text() == '')
    {
        $('.main-form__text').text("Мы перезвоним и обсудим детали.");
    }
})