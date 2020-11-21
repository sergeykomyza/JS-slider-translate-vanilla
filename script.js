function sliderLogic(sliderName, slideCount) {

    const slider = document.querySelector(sliderName);
    const slides = document.querySelectorAll('.slider__item');
    const sliderBoxWidth = document.querySelector('.slider-box').offsetWidth;
    const sliderWidth = document.querySelector('.slider').offsetWidth;
    const nextButton = document.querySelector('.next');
    const prevButton = document.querySelector('.prev');
    let slideWidth; // длина одного слайда
    let countMovie = 0; // расстояние, на которое прокручивается слайдер за один раз

    // определяем стили для слайдера
    slider.style.cssText = `
        position: relative;
        left: 0;
        display: flex;
        align-items: center; 
        transition: all 0.5s ease-in;
      `
    // перебираем слайды и назначаем им стили
    slides.forEach(item => {
        // slideWidth - длина одного слайда равна ширине слайдера деленное на кол-во слайдов(slideCount)
        slideWidth = sliderBoxWidth / slideCount;
        item.style.flexShrink = '0';
        item.style.width = slideWidth + 'px';
    });

    // функция работы слайдера
    function goSlide(n) {
        countMovie = countMovie - n; // меняем значение countMovie, вычитая из него текущую длину слайда
        /* если прокрутили до последнего слайда, то возвращаем в начало. Вычисляется так:
         если значение, на которое мы уже прокрутили, меньше чем общая длина всего слайдера
         (текущая длина слайда умножить на общее кол-во слайдов, (slideWidth * slides.length-так получаем длину всего слайдера), минус
         общая длина последних слайдов, в указанном кол-ве (slideCount * slideWidth)), тогда countMovie возвращаем в ноль, что
         возвращает слайдер в начало*/
        if (countMovie < -((slideWidth * slides.length) - (slideCount * slideWidth))) {
            countMovie = 0;
        }
        // если двигаем слайдер в обратном напралении, то все наоборот.
        if (countMovie > 0) {
            countMovie = -(slideWidth * slides.length) - -(slideCount * slideWidth);
        }
        slider.style.left = countMovie + 'px'; // записываем полученное значение countMovie в стили
    }

    function nextin(n) {
        goSlide(n);
    }
    function previous(n) {
        goSlide(-n);
    }

    nextButton.addEventListener('click', () => {
        nextin(slideWidth);
    });
    prevButton.addEventListener('click', () => {
        previous(slideWidth);
    });

}

sliderLogic('.slider', 4); // вызываем слайдер, с указанным селектором и кол-вом слайдов

    // window.onresize = function(){
    //   sliderLogic('.slider', 3);
    // }