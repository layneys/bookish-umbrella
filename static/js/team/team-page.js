"use strict";

let workTopItem = document.querySelectorAll(".work__top__item");

window.addEventListener("load", () => {
    for (let i = 8; i < workTopItem.length; i++) {
        workTopItem[i].classList.add("hide");
    }

});

function DisplayWorkTopItem(arg) {

    if (arg === true) {

        if (workTopItem.length > 8) {

            for (let i = 8; i < workTopItem.length; i++) {
                workTopItem[i].classList.remove("hide");
            }

        }

    } else {
        if (workTopItem.length > 8) {

            for (let i = 8; i < workTopItem.length; i++) {
                workTopItem[i].classList.add("hide");
            }

        }
    }


}

let workProjectsBtnOpen = document.querySelector(".work__projects-btnOpen"),
    imgBtn = workProjectsBtnOpen.querySelector("img");


workProjectsBtnOpen.addEventListener("click", (e) => {

    if (workTopItem[8].classList.contains("hide")) {

        DisplayWorkTopItem(true);
        imgBtn.src = "../img/team-page/work-top/hide.svg";

    } else {
        DisplayWorkTopItem(false);
        imgBtn.src = "../img/team-page/work-top/open.svg";
    }


});


let btnsMain = document.querySelectorAll(".main__btn");

function StartStBtn() {
    for (let i = 1; i < btnsMain.length; i++) {
        btnsMain[i].classList.remove("bgBtn");
    }
}

function GetDiv(name) {
    let div = document.querySelector(name);

    let blocks = document.querySelectorAll(".item-main");
    blocks.forEach(item => {
        item.classList.add("hide");
    });

    div.classList.remove("hide");
}

function AddEvBtn() {

    for (let i = 0; i < btnsMain.length; i++) {

        btnsMain[i].addEventListener("click", () => {
            if (i === 0) {
                GetDiv(".portfolio");
            } else if (i === 1) {
                GetDiv(".gallery");
            } else if (i === 2) {
                GetDiv(".resume");
            }

            btnsMain.forEach(item => item.classList.remove("bgBtn"));

            btnsMain[i].classList.add("bgBtn");
        });

    }

}



AddEvBtn();
StartStBtn();