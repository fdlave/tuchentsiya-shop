const slides = document.querySelector('.slides');

const slideCount = document.querySelectorAll('.slide').length; //кол-во слайдов

const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');

let i = 0;

function goToSlide(index) {
    if (index < 0) {
        index = slideCount - 1;
    }
    else if (index >= slideCount) {
        index = 0;
    }

    i = index;
    slides.style.transform = `translateX(${-index * 100}%)`; //сдвиг контейнера со слайдами
}

function startAutoSlide() {
    autoSlide = setInterval(() => {
        goToSlide(i + 1);
    }, 4800); //переключение слайдов
}

prevButton.addEventListener("click", () => {
    clearInterval(autoSlide);
    goToSlide(i - 1);
    startAutoSlide();
});

nextButton.addEventListener("click", () => {
    clearInterval(autoSlide);
    goToSlide(i + 1);
    startAutoSlide();
});

goToSlide(0); //при загрузке страницы будет первый слайд
startAutoSlide();