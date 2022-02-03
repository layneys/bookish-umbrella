"use strict";


window.addEventListener("load", () => {

    let arrDiv = document.querySelectorAll(".item-main");

    for (let i = 1; i < arrDiv.length; i++) {
        arrDiv[i].classList.add("hide");
    }

    let gallery = document.querySelector('.gallery');
    let itemGal = gallery.querySelectorAll('.item');

    for (let i = 9; i < itemGal.length; i++) {
        itemGal[i].classList.add("hide");
    }

});


document.addEventListener('click', (e) => {
    let popupBgM = document.querySelector('.Mpopup__bg');
    let popupBg = document.querySelector('.popup__bg');
    let popup = document.querySelector('.popup');
    let body = document.querySelector('body');

    if (e.target === popupBg) {
        popupBg.classList.remove('active');
        popup.classList.remove('active');

        body.classList.remove("hideScroll");

    }

    if (e.target === popupBgM) {
        CloseModalWork();
    }
});


const itemClassesMyWorks = {
    1: "item--medium",
    2: "item--large",
    3: "item--large",
    4: "item--medium"
};

const itemClassesGall = {
    1: "item--large",
    2: "item--large",
    3: "item--medium",
    4: "item--width",
    5: "item--min",
    6: "item--min",
    7: "item--width",
    8: "item--width",
    9: "item--full"
};


const SetItemClassMyWorks = () => {

    //four elements of myWorks
    let myWorks = document.querySelector('.work__bottom__top');
    let arrMyWorks = myWorks.querySelectorAll('.item');

    for (let i = 0; i < arrMyWorks.length; i++) {

        arrMyWorks[i].classList.add(itemClassesMyWorks[i + 1]);

    }

    //gallery's elements
    let gallery = document.querySelector('.gallery');
    let arrGall = gallery.querySelectorAll('.item');

    let temp = 1;
    for (let i = 0; i < arrGall.length; i++) {

        arrGall[i].classList.add(itemClassesGall[temp]);

        temp++;

        if (temp === 10)
            temp = 1;
    }

};


function CloseModalWork() {
    let popupM = document.querySelector('.Mpopup');
    let popupBgM = document.querySelector('.Mpopup__bg');
    let body = document.querySelector('body');
    popupBgM.classList.remove('Mactive');

    popupM.classList.remove('Mactive');
    body.classList.remove("hideScroll");
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



const SetMoreDetBbotImgs = (el) => {

    let moreDetBbotImgs = document.querySelector('#more__det_botImgs');
    let arrImgDetBot = el.querySelectorAll('.more__det_item');


    while (moreDetBbotImgs.firstChild) {
        moreDetBbotImgs.removeChild(moreDetBbotImgs.lastChild);
    }

    arrImgDetBot.forEach(item => {

        let img = item.querySelector('img');

        let div = document.createElement("div");
        div.classList.add("more__det_item");
        div.innerHTML = `
                    <img src="${img.getAttribute("src")}">
                `;

        moreDetBbotImgs.appendChild(div);

    });

    // item--full
    if (arrImgDetBot.length % 2 !== 0) {

        moreDetBbotImgs.lastChild.classList.add("item--full");

    }

};

const SetSfteareUsed = (el) => {

    //soft
    let arrSoftImg = el.querySelectorAll('.more_det_soft-item');
    let moreDetSoft = document.querySelector('#more_det_soft');

    while (moreDetSoft.firstChild) {
        moreDetSoft.removeChild(moreDetSoft.lastChild);
    }

    arrSoftImg.forEach(item => {

        let img = item.querySelector("img");
        let text = item.querySelector("p");

        let div = document.createElement("div");
        div.classList.add("more_det_soft-item");
        div.innerHTML = `
            <div class="soft_img">
                <img src="${img.getAttribute("src")}"
                    alt="картинка">
            </div>
            
            <div class="soft_text">
                <p class="title_programm">
                   ${text.textContent}
                </p>
            </div>
            `;

        moreDetSoft.appendChild(div);

    });

};

const SetAboutWork = (el, mBool = true) => {

    let moreDetText;
    if (mBool) {
        moreDetText = document.querySelector('.more_det-text');
    } else {
        moreDetText = document.querySelector('.popup__text');
    }

    moreDetText.innerHTML = "";

    if (el.dataset.text == undefined) {
        moreDetText.innerHTML = "";
    } else {
        moreDetText.innerHTML = el.dataset.text;
    }

};



let numSlide;



const ShowDelWork = (section, mBool) => {

    let sec = document.querySelector(section);
    let arrWork = sec.querySelectorAll(".item");


    for (let i = 0; i < arrWork.length; i++) {

        arrWork[i].addEventListener("click", (e) => {
            e.preventDefault();

            if (mBool) {
                let btnPrev = document.querySelector('#prev_img1')
                .classList.add("hide");
                let btnNext = document.querySelector('#next_img1')
                .classList.add("hide");
        
                let btnPrev1 = document.querySelector('#prev_img')
                .classList.remove("hide");
                let btnNext1 = document.querySelector('#next_img')
                .classList.remove("hide");
        
            } else {
                let btnPrev1 = document.querySelector('#prev_img')
                .classList.add("hide");
                let btnNext1 = document.querySelector('#next_img')
                .classList.add("hide");
        
                let btnPrev = document.querySelector('#prev_img1')
                .classList.remove("hide");
                let btnNext = document.querySelector('#next_img1')
                .classList.remove("hide");
            }

            let divT = e.target;

            let body = document.querySelector("body").classList.add("hideScroll");
            let style = divT.currentStyle || window.getComputedStyle(arrWork[i], false),
                path = style.backgroundImage.slice(4, -1).replace(/"/g, "");


            //text
            SetAboutWork(divT);

            //soft
            SetSfteareUsed(divT);


            //img right
            let mainPopupImg = document.querySelector('#main__popup_img');
            mainPopupImg.setAttribute("src", path);

            let styleM;
            if (i + 1 === arrWork.length) {
                styleM = arrWork[0].currentStyle || window.getComputedStyle(arrWork[0], false);
            } else {
                styleM = arrWork[i + 1].currentStyle || window.getComputedStyle(arrWork[i + 1], false);
            }

            let pathM = styleM.backgroundImage.slice(4, -1).replace(/"/g, "");

            let moreDetItem = document.querySelector(".more_det__work");

            moreDetItem.style.backgroundImage = `url("${pathM}")`;


            let popupBg = document.querySelector('.Mpopup__bg');
            let popup = document.querySelector('.Mpopup');

            popupBg.classList.add('Mactive');
            popup.classList.add('Mactive');

            numSlide = i;

            SetMoreDetBbotImgs(divT);

        });

    }



    PrevNextSlide(arrWork, mBool);
    let imgClose = document.querySelector("#more_det-close")
        .addEventListener("click", CloseModalWork);

};



const PrevNextSlide = (arrWork, mBool) => {

    if (mBool) {

        let btnNextId = document.querySelector('#next_img')
            .addEventListener("click", () => {
                numSlide++;


                if (numSlide >= arrWork.length) {
                    numSlide = 0;
                }

                let moreDetImgs = document.querySelector(".more__det__imgs");
                let img = moreDetImgs.querySelector("img");

                let style = arrWork[numSlide].currentStyle || window.getComputedStyle(arrWork[numSlide], false),
                    path = style.backgroundImage.slice(4, -1).replace(/"/g, "");

                img.setAttribute("src", path);


                // for img right
                let styleM;
                if (numSlide + 1 === arrWork.length) {
                    styleM = arrWork[0].currentStyle || window.getComputedStyle(arrWork[0], false);

                    SetMoreDetBbotImgs(arrWork[arrWork.length - 1]);
                    SetSfteareUsed(arrWork[arrWork.length - 1]);
                    SetAboutWork(arrWork[arrWork.length - 1]);

                } else {
                    styleM = arrWork[numSlide + 1].currentStyle || window.getComputedStyle(arrWork[numSlide + 1], false);

                    SetMoreDetBbotImgs(arrWork[numSlide]);
                    SetSfteareUsed(arrWork[numSlide]);
                    SetAboutWork(arrWork[numSlide]);

                }

                let pathM = styleM.backgroundImage.slice(4, -1).replace(/"/g, "");

                let moreDetItem = document.querySelector(".more_det__work");

                moreDetItem.style.backgroundImage = `url("${pathM}")`;
            });



        let btnPrevId = document.querySelector('#prev_img')
            .addEventListener("click", () => {

                numSlide--;
                console.log(numSlide)

                if (numSlide < 0) {
                    numSlide = arrWork.length - 1;
                }

                let moreDetImgs = document.querySelector(".more__det__imgs");
                let img = moreDetImgs.querySelector("img");

                let style = arrWork[numSlide].currentStyle || window.getComputedStyle(arrWork[numSlide], false),
                    path = style.backgroundImage.slice(4, -1).replace(/"/g, "");

                img.setAttribute("src", path);


                // for img right
                let styleM;
                if (numSlide + 1 === arrWork.length) {
                    styleM = arrWork[0].currentStyle || window.getComputedStyle(arrWork[0], false);

                    SetMoreDetBbotImgs(arrWork[arrWork.length - 1]);
                    SetSfteareUsed(arrWork[arrWork.length - 1]);
                    SetAboutWork(arrWork[arrWork.length - 1]);

                } else {
                    styleM = arrWork[numSlide + 1].currentStyle || window.getComputedStyle(arrWork[numSlide + 1], false);

                    SetMoreDetBbotImgs(arrWork[numSlide]);
                    SetSfteareUsed(arrWork[numSlide]);
                    SetAboutWork(arrWork[numSlide]);

                }

                let pathM = styleM.backgroundImage.slice(4, -1).replace(/"/g, "");

                let moreDetItem = document.querySelector(".more_det__work");

                moreDetItem.style.backgroundImage = `url("${pathM}")`;

            });

    } else {

        let btnNextId = document.querySelector('#next_img1')
            .addEventListener("click", () => {
                numSlide++;


                if (numSlide >= arrWork.length) {
                    numSlide = 0;
                }

                let moreDetImgs = document.querySelector(".more__det__imgs");
                let img = moreDetImgs.querySelector("img");

                let style = arrWork[numSlide].currentStyle || window.getComputedStyle(arrWork[numSlide], false),
                    path = style.backgroundImage.slice(4, -1).replace(/"/g, "");

                img.setAttribute("src", path);


                // for img right
                let styleM;
                if (numSlide + 1 === arrWork.length) {
                    styleM = arrWork[0].currentStyle || window.getComputedStyle(arrWork[0], false);

                    SetMoreDetBbotImgs(arrWork[arrWork.length - 1]);
                    SetSfteareUsed(arrWork[arrWork.length - 1]);
                    SetAboutWork(arrWork[arrWork.length - 1]);

                } else {
                    styleM = arrWork[numSlide + 1].currentStyle || window.getComputedStyle(arrWork[numSlide + 1], false);

                    SetMoreDetBbotImgs(arrWork[numSlide]);
                    SetSfteareUsed(arrWork[numSlide]);
                    SetAboutWork(arrWork[numSlide]);

                }

                let pathM = styleM.backgroundImage.slice(4, -1).replace(/"/g, "");

                let moreDetItem = document.querySelector(".more_det__work");

                moreDetItem.style.backgroundImage = `url("${pathM}")`;
            });



        let btnPrevId = document.querySelector('#prev_img1')
            .addEventListener("click", () => {

                numSlide--;
                console.log(numSlide)

                if (numSlide < 0) {
                    numSlide = arrWork.length - 1;
                }

                let moreDetImgs = document.querySelector(".more__det__imgs");
                let img = moreDetImgs.querySelector("img");

                let style = arrWork[numSlide].currentStyle || window.getComputedStyle(arrWork[numSlide], false),
                    path = style.backgroundImage.slice(4, -1).replace(/"/g, "");

                img.setAttribute("src", path);


                // for img right
                let styleM;
                if (numSlide + 1 === arrWork.length) {
                    styleM = arrWork[0].currentStyle || window.getComputedStyle(arrWork[0], false);

                    SetMoreDetBbotImgs(arrWork[arrWork.length - 1]);
                    SetSfteareUsed(arrWork[arrWork.length - 1]);
                    SetAboutWork(arrWork[arrWork.length - 1]);

                } else {
                    styleM = arrWork[numSlide + 1].currentStyle || window.getComputedStyle(arrWork[numSlide + 1], false);

                    SetMoreDetBbotImgs(arrWork[numSlide]);
                    SetSfteareUsed(arrWork[numSlide]);
                    SetAboutWork(arrWork[numSlide]);

                }

                let pathM = styleM.backgroundImage.slice(4, -1).replace(/"/g, "");

                let moreDetItem = document.querySelector(".more_det__work");

                moreDetItem.style.backgroundImage = `url("${pathM}")`;

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

            SetAboutWork(slide, false);

            let popupLeftImg = document.querySelector('.popup_leftImg');
            let img = popupLeftImg.querySelector('img');
            img.setAttribute("src", pathImg);

            body.classList.add("hideScroll");

            let popupBg = document.querySelector('.popup__bg');
            let popup = document.querySelector('.popup');

            let imgClose = document.querySelector(".modal__imgClose-img");

            imgClose.addEventListener("click", () => {
                let modal = document.querySelector(".popup__bg");
                popupBg.classList.remove('active'); // Добавляем класс 'active' для фона
                popup.classList.remove('active'); // И для самого окна
                body.classList.remove("hideScroll");
            });

            popupBg.classList.add('active'); // Добавляем класс 'active' для фона
            popup.classList.add('active'); // И для самого окна

        });

    });

}


const Anchor = () => {

    let container = document.querySelector('.container');
    let post_01 = document.querySelector('#post-01');
    let arrowUp = document.querySelector('.arrow-up');


    window.addEventListener('scroll', function scrollArrow() {

        if (document.documentElement.scrollTop > post_01.offsetTop + post_01.clientHeight - 300) {

            arrowUp.classList.add("animation-show-up");
            arrowUp.classList.remove("animation-hide-up");

        } else {

            arrowUp.classList.remove("animation-show-up");
            arrowUp.classList.add("animation-hide-up");

        }

    });


    let footer = document.querySelector('.footer');
    window.addEventListener('scroll', function arrowPosition() {

        arrowUp.style.position = 'fixed';
        arrowUp.style.left = container.offsetLeft + container.clientWidth + 'px';

        let top = window.pageYOffset + Math.floor(window.innerHeight / footer.clientHeight) * footer.clientHeight;

        if (top >= footer.offsetTop) {
            arrowUp.style.bottom = footer.clientHeight - (arrowUp.clientHeight / 2) + 'px';
        } else {
            arrowUp.style.bottom = 100 + 'px';
        }

    });

    let toFirst = document.querySelector('#toFirst');
    arrowUp.addEventListener("click", (e) => {
        e.preventDefault()
        const blockID = toFirst.getAttribute('href').substr(1);

        document.getElementById(blockID).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        })
    });


};


let hideItems = 9;
function ShowHideItem() {

    let gallery = document.querySelector('.gallery');
    let itemGal = gallery.querySelectorAll('.item');


    for (hideItems; hideItems < itemGal.length; hideItems++) {

        itemGal[hideItems].classList.remove("hide");

    }

    this.classList.add("btnDisabled");
    this.disabled = false;

};


const LoadMomeGallery = () => {
    let galleryBtn = document.querySelector('#gallery-btn')
        .addEventListener("click", ShowHideItem);

};




BtnShowS();
AddBtnSlider(".portfolio");
AddBtnSlider(".resume");
ShowDelWork(".work__bottom__top", true);
ShowDelWork(".gallery", false);
ModalSWindow();
Anchor();
LoadMomeGallery();
SetItemClassMyWorks();