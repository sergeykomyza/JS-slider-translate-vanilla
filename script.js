
function sliderLogic(options) {

    const sliderWpar = document.querySelector(options.sliderName); // обертка слайдера
    const slider = sliderWpar.querySelector('.slider__line'); // слайдер
    const dotsWrapper = sliderWpar.querySelector('.dots'); // точки 
    const buttonsWrapper = sliderWpar.querySelector('.buttons'); // кнопки
    const slides = sliderWpar.querySelectorAll('.slider__item'); // слайды
    const slidesCount = slides.length; // кол-во слайдов
    let dotsCount = slidesCount; // кол-во точек соответствует кол-ву слайдов 
    if(!options.loop){ // если зацикленность false, кол-во точек будет меньше
        dotsCount = slidesCount - options.slideVisible + 1;
    }
    const sliderBoxWidth = sliderWpar.querySelector('.slider').offsetWidth; // ширина слайдера
    let nextButton; // кнопка вперед
    let prevButton; // кнопка назад
    let slideWidth; // ширина слайда
    let dots = ''; // точки
    let currentElem = 0; // текущий элемент
    let diffNum; // разность между текущим элементом и кликнутой точкой
    let autoScroll; // автопрокрутка

    // устанавливаем ограничитель кликов
    let beginTimeClick = getTime(); // определяем текущее время
    function getTime() {
        return new Date().getTime();
    };

    if(options.autoPlay){ // если автопрокрутка true
        autoScroll = setInterval(() => { // устанавливаем таймер
            let endTimeClick = getTime(); // определяем время клика
            if (endTimeClick - beginTimeClick > options.speed) { // если разница между временем клика и текущим временем больше чем установл. скорость скролла слайдера
                beginTimeClick = endTimeClick; // обновляем текущее время
                next(1); // и двигаем слайдер
            }
        }, options.autoPlaySpeed);
    }

    // стили для слайдера
    slider.style.cssText = `
      position: relative;
      display: flex;
      align-items: center; 
      transition: all `+options.speed+`ms;
    `

    // определяем ширину слайда
    slides.forEach(item => {
        slideWidth = Math.round(sliderBoxWidth / options.slideVisible); // ширину слайдера делим на кол-во видимых слайдов
        item.style.width = slideWidth + 'px';
    });

    // генерируем точки если dots: true
    if (options.dots) {
        for (let i = 0; i < dotsCount; i++) {
            dots += '<span class="dots__item"></span>'
        }
        dotsWrapper.innerHTML = dots;
    }
    let dotsElems = sliderWpar.querySelectorAll('.dots__item');
    // если dots: true
    if (options.dots) { 
        dotsElems[currentElem].classList.add('active'); // изначально активной точкой будет самая первая 
        for (let i = 0; i < dotsCount; i++) { // перебираем точки
            dotsElems[i].addEventListener('click', function () { // кликаем по ним
                clearInterval(autoScroll); // прерываем автоскролл
                diffNum = Math.abs(i - currentElem); // разница между текущей точкой(элементом) и кликнутой точкой
                let endTimeClick = getTime(); // определяем время клика
                if (i > currentElem && endTimeClick - beginTimeClick > options.speed) { // если кликнутая точка больше текущей и разница между временем клика и текущим временем больше чем установл. скорость скролла слайдера
                    beginTimeClick = endTimeClick; // обновляем текущее время
                    next(diffNum); // и двигаем слайдер вперед на то кол-во слайдов, которое определено в diffNum
                } else if (i < currentElem && endTimeClick - beginTimeClick > options.speed) { // иначе если кликнутая точка меньше текущей и разница между временем клика и текущим временем больше чем установл. скорость скролла слайдера
                    beginTimeClick = endTimeClick; // обновляем текущее время
                    prev(diffNum); // и двигаем слайдер назад на то кол-во слайдов, которое определено в diffNum
                }
            });
        }
    }

    // генерируем кнопки если buttons: true
    if (options.buttons) {
        nextButton = document.createElement('button');
        nextButton.classList.add('next');
        nextButton.innerText = 'next';
        prevButton = document.createElement('button');
        prevButton.classList.add('prev');
        prevButton.innerText = 'prev';
        buttonsWrapper.append(prevButton, nextButton);
        // кликаем по кнопкам 
        nextButton.addEventListener('click', function () {
            clearInterval(autoScroll); // прерываем автоскролл
            let endTimeClick = getTime(); // определяем время клика
            if (endTimeClick - beginTimeClick > options.speed) { // если разница между временем клика и текущим временем больше чем установл. скорость скролла слайдера
                beginTimeClick = endTimeClick; // обновляем текущее время
                next(1); // двигаем слайдер вперед на 1 слайд
            }
        });
        prevButton.addEventListener('click', function () {
            clearInterval(autoScroll);
            let endTimeClick = getTime();
            if (endTimeClick - beginTimeClick > options.speed) {
                beginTimeClick = endTimeClick;
                prev(1); // двигаем слайдер назад на 1 слайд
            }
        });
    }

    // функция вперед
    function next(num) {
        currentElem += num; // текущий элемент увеличиваем на то значение, которое определено в параметре, при вызове функции
        if (currentElem >= dotsCount) { // если текущий элемент больше чем кол-во точек
            currentElem = 0; // то текущий элемент становится первым
        }
        if (options.dots) {// меняем активный класс у точек, если их выбрали в настройках
            for (let i = 0; i < dotsCount; i++) {  
                dotsElems[i].classList.remove('active');
                dotsElems[currentElem].classList.add('active');
            }
        }
        if(!options.loop){ // если зацикленность false
            slider.style.marginLeft = -slideWidth * currentElem + 'px'; // двигаем слайдер (ширина слайда * кол-во, которое указано в переменной (1 или diffNum) )
        }
        if(options.loop){ // если зацикленность true
            slider.style.transition = 'all '+options.speed+'ms'; // добавляем transition слайдеру
            slider.style.marginLeft = -slideWidth * num + 'px'; // двигаем слайдер (ширина слайда * кол-во, которое указано в переменной (1 или diffNum) )
            // добавляем логику для цикла. перебираем значение num. оно равно или 1 или diffNum(если мы хотим передвинуть несколько слайдов сразу)
            // в зависимости от этого, мы клонируем и подменяем столько слайдов, сколько указано в num
            setTimeout(function () {
                slider.style.transition = 'none'; // отменяем transition у слайдера
                for (let i = 0; i < num; i++) { // перебираем значение num (либо 1 либо diffNum)
                    let firstSlide = slider.firstElementChild; // определяем первый элемент
                    let cloneSlide = firstSlide.cloneNode(true); // создаем клон первого слайда
                    slider.appendChild(cloneSlide); // добавляем клонированный элемент в конец слайдера
                    slider.removeChild(firstSlide); // удалем первый элемент
                }
                slider.style.marginLeft = '0px'; // marginLeft ставим в ноль
            }, options.speed);
        }
    }

    // функция назад
    function prev(num) {
        currentElem -= num;
        if (currentElem < 0) {
            currentElem = dotsCount - 1;
        }
        if (options.dots) {// меняем активный класс у точек, если их выбрали в настройках
            for (let i = 0; i < dotsCount; i++) {
                dotsElems[i].classList.remove('active');
                dotsElems[currentElem].classList.add('active');
            }
        }
        if(!options.loop){
            slider.style.marginLeft = -slideWidth * currentElem + 'px';
        }
        if(options.loop){ // если зацикленность true
            for (let i = 0; i < num; i++) {
                let lastSlide = slider.lastElementChild;
                let cloneSlide = lastSlide.cloneNode(true);
                slider.insertBefore(cloneSlide, slider.firstElementChild);
                slider.removeChild(lastSlide);
            }
            slider.style.marginLeft = -slideWidth * num + 'px';
            let compStyle = window.getComputedStyle(slider).marginLeft;
            slider.style.transition = 'all '+options.speed+'ms';
            slider.style.marginLeft = '0px';
            setTimeout(function () {
                slider.style.transition = 'none';
            }, options.speed);
        }
    }

}

sliderLogic({
    sliderName: '.wrapper',
    slideVisible: 1,
    autoPlay: true,
    loop: false,
    buttons: true,
    dots: true,
    speed: 1000,
    autoPlaySpeed: 3000
});
sliderLogic({
    sliderName: '.wrapper-2',
    slideVisible: 3,
    autoPlay: true,
    loop: true,
    buttons: true,
    dots: true,
    speed: 1000,
    autoPlaySpeed: 3000
});


