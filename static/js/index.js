"use strict";

let body = document.querySelector("body");
let certificatesItem = document.querySelectorAll(".splide__slide");
let divItems = document.querySelectorAll('.div-item');
let textItems = document.querySelectorAll('.text-item');
let container = document.querySelector('.container');

const SetAnim = (arr, clazzEl) => {

    let windowTopCenter = window.pageYOffset;

    arr.forEach(itemM => {

        let classItem = "." + itemM.classList[0] + "";

        let elH = $(classItem).offset().top - document.documentElement.clientHeight + 130;

        let mainTitleEnd = itemM.getBoundingClientRect().bottom;


        if (windowTopCenter >= elH) {
            itemM.classList.add(clazzEl);
        } else {
            itemM.classList.remove(clazzEl);
        }

        if (mainTitleEnd < 0) {
            itemM.classList.remove(clazzEl);
        }
    });

};

const AnimationScroll = () => {
    SetAnim(divItems, "div-animation");
    SetAnim(textItems, "text-animation");
};

AnimationScroll();
window.addEventListener("scroll", () => {
    AnimationScroll();
});

document.addEventListener('click', (e) => {
    let popupBg = document.querySelector('.popup__bg');
    let popup = document.querySelector('.popup');

    if (e.target === popupBg) {
        popupBg.classList.remove('active');
        popup.classList.remove('active');

        let body = document.querySelector("body");
        let modal = body.querySelector(".popup__bg");

        body.classList.remove("hideScroll");

    }
});


let toSlide;
function ModalWindow() {

    let certificatesItemImg = document.querySelectorAll('.certificates__item-img');

    for (let i = 0; i < certificatesItem.length; i++) {

        certificatesItem[i].addEventListener("click", e => {
            e.preventDefault();

            let slide = e.target;
            let imgSlide = slide.querySelector("img");
            let pathImg = imgSlide.src;
            let popupImg = document.querySelector('#popup-img');
            popupImg.setAttribute("src", pathImg);


            body.classList.add("hideScroll");


            let popupBg = document.querySelector('.popup__bg');
            let popup = document.querySelector('.popup');

            popupBg.classList.add('active');
            popup.classList.add('active');


            let imgClose = document.querySelector(".modal__imgClose-img");

            imgClose.addEventListener("click", () => {

                let modal = document.querySelector(".popup__bg");
                body.removeChild(modal);

            });


            if (i + 1 === certificatesItem.length) {
                toSlide = 0;
            } else if (i - 1 < 0) {
                toSlide = certificatesItem.length - 1;
            } else {
                toSlide = i;
            }


        });

    }

    PrevNextSlide(certificatesItemImg);


}


const PrevNextSlide = (arrWork) => {

    let btnNextId = document.querySelector('#btnNext')
        .addEventListener("click", () => {

            if (toSlide >= arrWork.length) {
                toSlide = 0;
            }

            let path;
            if (toSlide + 1 === arrWork.length) {
                path = arrWork[0].getAttribute("src");
            } else {
                path = arrWork[toSlide + 1].getAttribute("src");
            }

            let doc = document.querySelector('.popup_leftImg');
            let imgM = doc.querySelector("img");

            imgM.setAttribute("src", path);


            toSlide++;

        });



    let btnPrevId = document.querySelector('#btnPrev')
        .addEventListener("click", () => {

            if (toSlide <= 0) {
                toSlide = arrWork.length - 1;
            }

            let path;
            if (toSlide - 1 <= 0) {
                path = arrWork[arrWork.length - 1].getAttribute("src");
            } else {
                path = arrWork[toSlide - 1].getAttribute("src");
            }

            let doc = document.querySelector('.popup_leftImg');
            let imgM = doc.querySelector("img");

            imgM.setAttribute("src", path);


            toSlide--;
        });

};


const ImgDown = () => {

    let toSecond = document.querySelector('#toSecond')
        .addEventListener("click", () => {

            document.getElementById("post-01").scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            })

        });

};


let splideArrows = document.querySelector(".splide__arrows"),
    btns = splideArrows.querySelectorAll("button"),
    sliderContent = document.querySelector(".slider__content");


function AddBtn(btnPrev, btnNext, block) {
    btnPrev.classList.add("btnLeft");
    btnNext.classList.add("btnRight");


    block.prepend(btnPrev);
    block.appendChild(btnNext);
}

AddBtn(btns[0], btns[1], sliderContent);
ModalWindow();
ImgDown();