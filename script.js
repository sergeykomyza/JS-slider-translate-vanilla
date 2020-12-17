function sliderLogic(options) {

    const sliderWpar = document.querySelector(options.sliderName);
    const slider = sliderWpar.querySelector('.slider__line');
    const dotsWrapper = sliderWpar.querySelector('.dots');
    const buttonsWrapper = sliderWpar.querySelector('.buttons');
    const slides = sliderWpar.querySelectorAll('.slider__item');
    const slidesCount = slides.length;
    const sliderBoxWidth = sliderWpar.querySelector('.slider').offsetWidth;
    let slideWidth;
    let countMovie = 0;
    let dotCount = slidesCount - options.slideVisible + 1;
    let activeDot;
    let autoScroll;

    if (options.autoPlay) {
        autoScroll = setInterval(function () {
            nextin(slideWidth);
        }, options.autoPlayTime);
    }

    slider.style.cssText = `
        position: relative;
        left: 0;
        display: flex;
        align-items: center; 
        transition: all `+ options.timeAnimation + `s ease-in;
      `

    slides.forEach(item => {
        slideWidth = Math.round(sliderBoxWidth / options.slideVisible);
        item.style.width = slideWidth + 'px';
    });

    function goSlide(n) {
        countMovie = countMovie - n;
        if (countMovie < -((slideWidth * slides.length) - (options.slideVisible * slideWidth))) {
            countMovie = 0;
        }
        if (countMovie > 0) {
            countMovie = -(slideWidth * slides.length) - -(options.slideVisible * slideWidth);
        }
        dotsElems.forEach(elem => {
            elem.classList.remove('active');
        });
        activeDot = countMovie / -slideWidth;
        if (options.dots) {
            dotsElems[activeDot].classList.add('active');
        }
        slider.style.left = countMovie + 'px';
    }

    function nextin(n) {
        goSlide(n);
    }
    function previous(n) {
        goSlide(-n);
    }

    if (options.dots) {
        let dot = '';
        for (let i = 0; i < dotCount; i++) {
            dot += '<span class="dots__item"></span>'
        }
        dotsWrapper.innerHTML = dot;
    }

    let dotsElems = sliderWpar.querySelectorAll('.dots__item');
    dotsElems.forEach((item, i) => {
        if (countMovie == 0) {
            dotsElems[0].classList.add('active');
        }
        item.addEventListener('click', function () {
            clearInterval(autoScroll);
            dotsElems.forEach(elem => {
                elem.classList.remove('active');
            });
            this.classList.add('active');
            countMovie = 0 - (i * slideWidth);
            slider.style.left = countMovie + 'px';
        });
    });

    if (options.buttons) {

        let sliderClassName = sliderWpar.className;

        const nextButton = document.createElement('button');
        nextButton.classList.add('' + sliderClassName + '__next');
        nextButton.innerText = 'next';
        const prevButton = document.createElement('button');
        prevButton.classList.add('' + sliderClassName + '__prev');
        prevButton.innerText = 'prev';

        buttonsWrapper.append(prevButton, nextButton);

        nextButton.addEventListener('click', function () {
            nextin(slideWidth);
            clearInterval(autoScroll);
        });

        prevButton.addEventListener('click', () => {
            previous(slideWidth);
            clearInterval(autoScroll);
        });

    }

}

sliderLogic({
    sliderName: '.wrapper',
    slideVisible: 3,
    dots: true,
    buttons: true,
    autoPlay: true,
    timeAnimation: 1,
    autoPlayTime: 2000
});

sliderLogic({
    sliderName: '.wrapper-2',
    slideVisible: 4,
    dots: true,
    buttons: true,
    autoPlay: true,
    timeAnimation: 1,
    autoPlayTime: 2000
});


