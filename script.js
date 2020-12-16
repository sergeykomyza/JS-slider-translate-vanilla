function sliderLogic(sliderName, slideVisible, dots, buttons, autoPlay, timeAnimation, autoPlayTime) {

    const sliderWpar = document.querySelector(sliderName);
    const slider = sliderWpar.querySelector('.slider__line');
    const dotsWrapper = sliderWpar.querySelector('.dots');
    const buttonsWrapper = sliderWpar.querySelector('.buttons');
    const slides = sliderWpar.querySelectorAll('.slider__item');
    const slidesCount = slides.length;
    const sliderBoxWidth = sliderWpar.querySelector('.slider').offsetWidth;
    const sliderWidth = slider.offsetWidth;
    let slideWidth;
    let countMovie = 0;
    let dotCount = slidesCount - slideVisible + 1;
    let activeDot;

    if (autoPlay) {
        autoPlay = setInterval(function () {
            nextin(slideWidth);
        }, autoPlayTime);
    }

    slider.style.cssText = `
        position: relative;
        left: 0;
        display: flex;
        align-items: center; 
        transition: all `+ timeAnimation + `s ease-in;
      `

    slides.forEach(item => {
        slideWidth = sliderBoxWidth / slideVisible;
        item.style.width = slideWidth + 'px';
    });

    function goSlide(n) {
        countMovie = countMovie - n;
        if (countMovie < -((slideWidth * slides.length) - (slideVisible * slideWidth))) {
            countMovie = 0;
        }
        if (countMovie > 0) {
            countMovie = -(slideWidth * slides.length) - -(slideVisible * slideWidth);
        }
        dotsElems.forEach(elem => {
            elem.classList.remove('active');
        });
        activeDot = countMovie / -slideWidth;
        if (dots) {
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

    if (dots) {
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
            clearInterval(autoPlay);
            dotsElems.forEach(elem => {
                elem.classList.remove('active');
            });
            this.classList.add('active');
            countMovie = 0 - (i * slideWidth);
            slider.style.left = countMovie + 'px';
        });
    });

    if (buttons) {
        const nextButton = document.createElement('button');
        nextButton.classList.add('next');
        nextButton.innerText = 'next';
        const prevButton = document.createElement('button');
        prevButton.classList.add('prev');
        prevButton.innerText = 'prev';

        buttonsWrapper.append(prevButton, nextButton);

        nextButton.addEventListener('click', () => {
            nextin(slideWidth);
            clearInterval(autoPlay);
        });
        prevButton.addEventListener('click', () => {
            previous(slideWidth);
            clearInterval(autoPlay);
        });
    }

}
// sliderLogic(селектор обертки слайдера, кол-во видимых слайдов, показывать точки или нет, показывать кнопки или нет, включить автопрокрутку или нет, время анимации прокрутки слайдов, интервал автопрокрутки)
sliderLogic('.wrapper', 2, true, true, false, 1, 1000);
sliderLogic('.wrapper-2', 4, true, true, true, 0.5, 1000);