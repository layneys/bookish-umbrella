"use strict";

window.addEventListener("load", () => {

    let arrDiv = document.querySelectorAll(".item-main");

    for (let i = 1; i < arrDiv.length; i++) {
        arrDiv[i].classList.add("hide");
    }

});

document.addEventListener('click', (e) => {
    let popupBgM = document.querySelector('.Mpopup__bg');
    let popupBg = document.querySelector('.popup__bg');
    let popup = document.querySelector('.popup');

    if (e.target === popupBg) {
        popupBg.classList.remove('active');
        popup.classList.remove('active');

        let body = document.querySelector("body");
        let modal = body.querySelector(".popup__bg");

        body.removeChild(modal);

        body.classList.remove("hideScroll");

    }

    if (e.target === popupBgM) {
        CloseModalWork();

    }
});

function CloseModalWork() {
    let popupBgM = document.querySelector('.Mpopup__bg');
    let popupM = document.querySelector('.Mpopup');

    popupBgM.classList.remove('Mactive');
    popupM.classList.remove('Mactive');

    let body = document.querySelector("body");
    let modal = body.querySelector(".Mpopup__bg");

    body.classList.remove("hideScroll");

    body.removeChild(modal);
}

const AddBtnSlider = (sectName) => {
    let sec = document.querySelector(sectName),
        btns = sec.querySelectorAll("button"),
        slider = sec.querySelector(".slider");

    let img = sec.querySelectorAll(".imgButton");

    img[0].setAttribute("src", "../" + img[0].getAttribute("src"));
    img[1].setAttribute("src", "../" + img[1].getAttribute("src"));

    let btnPrev = btns[0];
    let btnNext = btns[1];

    btnPrev.classList.add("btnLeft");
    btnNext.classList.add("btnRight");

    slider.prepend(btnPrev);
    slider.appendChild(btnNext);
};


const ShowSection = (nameS, btnsS, index) => {

    let arrDiv = document.querySelectorAll(".item-main");
    let sec = document.querySelector(nameS);

    for (let i = 0; i < arrDiv.length; i++) {
        arrDiv[i].classList.add("hide");
        btnsS[i].classList.remove("bgBtn");
    }

    sec.classList.remove("hide");
    btnsS[index].classList.add("bgBtn");

};


const BtnShowS = () => {

    let btnsS = document.querySelectorAll(".main__btn");
    let btnShowGall = document.querySelector("#btn_showGall");

    btnsS[0].addEventListener("click", function () { ShowSection(".portfolio", btnsS, 0) });
    btnsS[1].addEventListener("click", function () { ShowSection(".gallery", btnsS, 1) });

    btnsS[2].addEventListener("click", function () { ShowSection(".resume", btnsS, 2) });

    btnShowGall.addEventListener("click", function () { ShowSection(".gallery", btnsS, 1) });

};

let iNextWork;
const NextWork = (arrWork) => {

    if (iNextWork >= arrWork.length) {
        iNextWork = 0;
    }

    let moreDetImgs = document.querySelector(".more__det__imgs");
    let img = moreDetImgs.querySelector("img");

    let style = arrWork[iNextWork].currentStyle || window.getComputedStyle(arrWork[iNextWork], false),
        path = style.backgroundImage.slice(4, -1).replace(/"/g, "");

    img.setAttribute("src", path);


    // for img right
    let styleM;
    if (iNextWork + 1 === arrWork.length) {
        styleM = arrWork[0].currentStyle || window.getComputedStyle(arrWork[0], false);
    } else {
        styleM = arrWork[iNextWork + 1].currentStyle || window.getComputedStyle(arrWork[iNextWork + 1], false);
    }

    let pathM = styleM.backgroundImage.slice(4, -1).replace(/"/g, "");

    let moreDetItem = document.querySelector(".more_det_work");
    moreDetItem.style.backgroundImage = `url("${pathM}")`;

    iNextWork++;

};

const ShowDelWork = (section) => {

    let sec = document.querySelector(section);
    let arrWork = sec.querySelectorAll(".item");


    for (let i = 0; i < arrWork.length; i++) {

        arrWork[i].addEventListener("click", (e) => {
            e.preventDefault();

            let divT = e.target;

            let body = document.querySelector("body");
            let style = divT.currentStyle || window.getComputedStyle(arrWork[i], false),
                path = style.backgroundImage.slice(4, -1).replace(/"/g, "");

            body.classList.add("hideScroll");

            let modal = document.createElement("div");
            modal.classList.add("Mpopup__bg");
            modal.innerHTML = `
            <div class="Mpopup">

            <div class="more__det">

            <div class="more__det__imgs">

                <div>
                    <img src="${path}">
                </div>

            </div>

            <div class="more__det__close">
                <img id="more_det-close" src="../../media/icons/close-icon.svg" alt="иконка">
            </div>

            <div class="more__det__info">

                <div class="more_det_top">

                    <div class="more_det_img">
                        <img src="../../media/imgs/team-page/main/human.png" alt="каритнка">
                    </div>

                    <div>
                        <p class="person_name">
                            Андрей Бредихин
                        </p>
                    </div>

                </div>

                <div class="more_det_item">

                    <div>
                        <p class="more_det_title">
                            About work
                        </p>
                    </div>

                    <div class="more_det_text">
                        <p class="more_det-text">
                            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia
                            consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.
                        </p>
                    </div>

                </div>

                <div class="more_det_item">

                    <div>
                        <p class="more_det_title">
                            Next work
                        </p>
                    </div>

                    <div class="more_det_work">
                        <img id="next_img" src="../../media/icons/next-icon.svg" alt="картинка">
                    </div>

                </div>

                <div class="more_det_item">

                    <div>
                        <p class="more_det_title">
                            About work
                        </p>
                    </div>

                    <div class="more_det_soft">

                        <div class="soft_img">
                            <img src="../../media/imgs/team-page/about-person/skills/Group 113.svg" alt="картинка">
                        </div>

                        <div class="soft_text">
                            <p class="title_programm">
                                PhotoShop
                            </p>
                        </div>

                    </div>

                </div>

                <div class="more_det_item">

                    <div>
                        <p class="more_det_title">
                            Contack
                        </p>
                    </div>

                    <div class="more_det_links">

                        <div class="more_det_link-item">
                            <a class="more_det_link" href="https://ya.ru/" target="_blank">
                                <img class="more_det_img" src="../../media/icons/vk-icon.png" alt="иконка">
                            </a>
                        </div>

                        <div class="more_det_link-item">
                            <a class="more_det_link" href="https://ya.ru/" target="_blank">
                                <img class="more_det_img" src="../../media/icons/tg-icon.png" alt="иконка">
                            </a>
                        </div>


                        <div class="more_det_link-item">
                            <a class="more_det_link" href="https://ya.ru/" target="_blank">
                                <img class="more_det_img" src="../../media/icons/what-icon.png" alt="иконка">
                            </a>
                        </div>

                    </div>

                </div>

            </div>

        </div>
            
            </div>
            `

            body.appendChild(modal);


            // for img right
            let styleM;
            if (i + 1 === arrWork.length) {
                styleM = arrWork[0].currentStyle || window.getComputedStyle(arrWork[0], false);
            } else {
                styleM = arrWork[i + 1].currentStyle || window.getComputedStyle(arrWork[i + 1], false);
            }

            let pathM = styleM.backgroundImage.slice(4, -1).replace(/"/g, "");

            let moreDetItem = document.querySelector(".more_det_work");
            moreDetItem.style.backgroundImage = `url("${pathM}")`;


            let popupBg = document.querySelector('.Mpopup__bg');
            let popup = document.querySelector('.Mpopup');

            popupBg.classList.add('Mactive');
            popup.classList.add('Mactive');

            if (i + 1 === arrWork.length) {
                iNextWork = 0;
            } else {
                iNextWork = i + 1;
            }

            let nextImg = document.querySelector("#next_img")
                    .addEventListener("click", function () { NextWork(arrWork) });


            let imgClose = document.querySelector("#more_det-close")
            .addEventListener("click", CloseModalWork);
        });

    }

};


function ModalSWindow() {

    let arrSplideIt = document.querySelectorAll(".splide__slide");
    let body = document.querySelector("body");

    arrSplideIt.forEach(item => {

        item.addEventListener("click", (e) => {

            let slide = e.target;
            let imgSlide = slide.querySelector("img");
            let pathImg = imgSlide.src;

            body.classList.add("hideScroll");

            let modal = document.createElement("div");
            modal.classList.add("popup__bg");
            modal.innerHTML = `
            <div class="popup">

            <div class="popup_leftImg">
                <img src="${pathImg}" alt="картинка">
            </div>

            <div class="popup_rightDiv">
                <div>
                    <p>
                        1 место за участие в хакатон 2020
                    </p>
                </div>
            </div>
            
            </div>
            `

            body.appendChild(modal);

            let popupBg = document.querySelector('.popup__bg');
            let popup = document.querySelector('.popup');

            popupBg.classList.add('active'); // Добавляем класс 'active' для фона
            popup.classList.add('active'); // И для самого окна


        });

    });

}



BtnShowS();
AddBtnSlider(".portfolio");
AddBtnSlider(".resume");
ShowDelWork(".gallery");
ShowDelWork(".work__bottom__top");
ModalSWindow();
