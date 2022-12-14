// $('.header__menu-toggle, .header__left-menu-item').on('click', function(){
//     $('.header__left-menu').toggleClass('header__left-menu__opened');
// })


$(".range").each(function(){
    $(this).ionRangeSlider();
});



$('.modal-btn').fancybox({
    src  : '#callorder',
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


$('.header__menu-toggle, .header__left-menu-item').on('click', function(){
    $('.header__left-menu').toggleClass('header__left-menu__opened');
})


$(".range").each(function(){
    $(this).ionRangeSlider();
});



$('.modal-btn').fancybox({
    src  : '#callorder',
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

$(function()
{
slides = []
function addSlides(html, year, i)
{
    slides[i] =
    {
        html: html,
        year:  year,
    }
}

$('.progress-archive__swiper-slide').each(function(i = 0){
    
    year = $(this).attr('data-year');
    html = '<div class="swiper-slide progress-archive__swiper-slide" data-year="'+ year+ '">' + $(this).html() + '</div>';
    addSlides(html, year, i);
    i++;
})
console.log(slides)

const swiper = new Swiper('.progress-archive__swiper', {
    direction: 'horizontal',
    spaceBetween: 24,
    centeredSlides: true,
    loop: false,

    navigation: {
      nextEl: '.progress-archive__next',
      prevEl: '.progress-archive__prev',
    },
  
    scrollbar: {
      el: '.progress-archive__scrollbar',
    },

    breakpoints: {
        1: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 3,
        }
      }
  });
    

    let archiveValue

    archiveValue = $('input[name="year"]:checked').val();

    if(archiveValue == undefined)
    {
    archiveValue = $('.radio__type-item').first().children('input').val();
    $('.radio__type-item').first().children('input').attr('checked', true)
    }

    function hideArchiveSlides(value)
    {
        swiper.removeAllSlides()
        for (var i = 0; i < slides.length; i++) {
            if(slides[i].year == value)
            {
                swiper.appendSlide(slides[i].html)
            }
            swiper.slideTo(1)
        }
    }
    hideArchiveSlides(archiveValue)
    
    $('input[name="year"]').on('change', function(){
        archiveValue = $(this).val()
        hideArchiveSlides(archiveValue)
        setTimeout(()=>{ $('.progress-archive__swiper').css('opacity', '0')}, 500);
        setTimeout(()=>{ $('.progress-archive__swiper').css('opacity', '1')}, 500);
    })
  })


$(function(){
    let loadValue = 0;
    let loaded = 3;
    images = []
    function addImages(element, i)
    {
        images[i] =
        {
            element: element,
        }
    }
    console.log(images)

    $('.progress__img-wrap').each(function(i = 0)
    {
        $(this).removeClass('progress__img-wrap-open')
        loadValue++;
        element = $(this);
        addImages(element, i)
        i++;
    })

    function loadImg(value)
    {
        for (var i = 0; i < value; i++) 
        {
            images[i].element.addClass('progress__img-wrap-open')
        }
        
    }
    
    loadImg(loaded)

    $('.progress__btn').on('click', function(){
        if( loaded < loadValue)
        {
            loaded += 3
        }
        loadImg(loaded)
    })
})