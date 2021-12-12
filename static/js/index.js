"use strict";

window.addEventListener("load", () => {
    $("#main__content__btn").on("click", "a", function (event) {

        //отменяем стандартную обработку нажатия по ссылке
        event.preventDefault();
    
        //забираем идентификатор бока с атрибута href
        var id = $(this).attr('href'),
    
          //узнаем высоту от начала страницы до блока на который ссылается якорь
          top = $(id).offset().top;
    
        //анимируем переход на расстояние - top за 1500 мс
        $('body, html').animate({ scrollTop: top }, 1500);
    
      });
});


let body = document.querySelector("body");
let certificatesItem = document.querySelectorAll(".splide__slide");

function CloseModal() {
    let modal = document.querySelector(".dm-overlay");
    body.removeChild(modal);
}

certificatesItem.forEach(item => {
    item.addEventListener("click", (e) => {
        let slide = e.target;
        let imgSlide = slide.querySelector("img");
        let pathImg = imgSlide.src;


        let modal = document.createElement("form");
        modal.classList.add("dm-overlay");
        modal.innerHTML = `
        <div class="dm-overlay__imgClose">
        <img class="dm-overlay__imgClose-img" src="img/modal/modal-close.svg" alt="иконка">
    </div>

    <div class="dm-table">
        <div class="dm-cell">
            <div class="dm-modal">

                <div class="dm-modal__top">

                    <div class="dm-modal__divImg">
                        <img class="dm-modal-img" src="${pathImg}" alt="картинка">
                    </div>

                    <div class="dm-modal__text">
                        <div>
                            <p>
                                1 место за участие в хакатон 2020
                            </p>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    </div>
        `

        body.appendChild(modal);

        let imgClose = document.querySelector(".dm-overlay__imgClose-img");
        imgClose.addEventListener("click", CloseModal);

    });
});


let splideArrows = document.querySelector(".splide__arrows"),
    btns = splideArrows.querySelectorAll("button"),
    certificates = document.querySelector(".certificates");


btns[0].addEventListener("click", () => {
    let img = btns[0].querySelector("img");
    img.src = "./img/splide/prev.png";
});

btns[1].addEventListener("click", () => {
    let img = btns[1].querySelector("img");
    img.src = "./img/splide/next.png";
});

function AddBtn() {
    let btnPrev = btns[0];
    let btnNext = btns[1];

    btnPrev.classList.add("btnLeft");
    btnNext.classList.add("btnRight");

    btnPrev.onmouseenter = function () {
        let img = btnPrev.querySelector("img");
        img.src = "./img/splide/prev1.png";
        console.log("enter");
    }

    btnPrev.onmouseleave = function () {
        let img = btnPrev.querySelector("img");
        img.src = "./img/splide/prev.png";
        console.log("leave");
    }

    btnNext.onmouseenter = function () {
        let img = btnNext.querySelector("img");
        img.src = "./img/splide/next1.png";
        console.log("enter");
    }

    btnNext.onmouseleave = function () {
        let img = btnNext.querySelector("img");
        img.src = "./img/splide/next.png";
        console.log("leave");
    }

    certificates.prepend(btnPrev);
    certificates.appendChild(btnNext);
}

AddBtn();