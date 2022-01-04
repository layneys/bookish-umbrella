"use strict";

let body = document.querySelector("body"); 
let certificatesItem = document.querySelectorAll(".splide__slide"); 

document.addEventListener('click', (e) => {
    let popupBg = document.querySelector('.popup__bg');
    let popup = document.querySelector('.popup');

    if (e.target === popupBg) {
        popupBg.classList.remove('active');
        popup.classList.remove('active');

        let body = document.querySelector("body");
        let modal = body.querySelector(".popup__bg");

        body.classList.remove("hideScroll");

        body.removeChild(modal);

    }
});

function ModalWindow () {

    certificatesItem.forEach(item => {
        item.addEventListener("click", (e) => {
            
            let slide = e.target;
            let imgSlide = slide.querySelector("img");
            let pathImg = imgSlide.src;
    
    
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

            body.classList.add("hideScroll");
            
            body.appendChild(modal);
            
    
            let popupBg = document.querySelector('.popup__bg'); 
            let popup = document.querySelector('.popup'); 

            popupBg.classList.add('active'); // Добавляем класс 'active' для фона
            popup.classList.add('active'); // И для самого окна

       

            let imgClose = document.querySelector(".dm-overlay__imgClose-img");
            
            imgClose.addEventListener("click", () => {

                let modal = document.querySelector(".dm-overlay");
                body.removeChild(modal);

            });
    
        });
    });
}



let splideArrows = document.querySelector(".splide__arrows"),
    btns = splideArrows.querySelectorAll("button"),
    certificates = document.querySelector(".slider");


btns[0].addEventListener("click", () => {
    let img = btns[0].querySelector("img");
    img.src = "../media/imgs/splide/prev.svg";
});

btns[1].addEventListener("click", () => {
    let img = btns[1].querySelector("img");
    img.src = "../media/imgs/splide/next.svg";
});

function AddBtn() {
    let btnPrev = btns[0];
    let btnNext = btns[1];

    btnPrev.classList.add("btnLeft");
    btnNext.classList.add("btnRight");


    certificates.prepend(btnPrev);
    certificates.appendChild(btnNext);
}

AddBtn();
ModalWindow();