let leftButton = document.querySelector('.slider__left-button');
let rightButton = document.querySelector('.slider__right-button');
let sliderInside = document.querySelector('.slider__inside');
let sliderOutside = document.querySelector('.slider__outside');
let childrenOfInsideSlider = document.getElementsByClassName('slider__block');


let popUpBlock = document.querySelector('.pop-up-block');
let popUpBlock__image = document.querySelector('.pop-up-block__image');
let popUpBlock__video = document.querySelector('.pop-up-block__video');

let length_test = childrenOfInsideSlider[0].offsetWidth * childrenOfInsideSlider.length;

let cloneBlock = [];
Array.from(childrenOfInsideSlider).forEach(item => cloneBlock.push(item.cloneNode(true)))


sliderInside.style.left = '0px';
sliderOutside.style.left = '0px';

let startX;
let isMouseDown = false;

let videoLink = "/";
let videoIsThere = false;
let isMove = false;

sliderInside.addEventListener('click', clickEvent)
function clickEvent(e) {
    let target = e.target;
    if(target.getAttribute('data-video') && !videoIsThere) {
        popUpBlock.style.display = 'flex';
        popUpBlock__video.style.display = 'block';
        popUpBlock__video.children[0].src = target.getAttribute('data-src');
        videoLink = target.getAttribute('data-src');
        videoIsThere = true;
    } else if(target.getAttribute('data-video') && videoIsThere) {
        popUpBlock.style.display = 'flex';
        popUpBlock__video.style.display = 'block';
    }
    if(target.getAttribute('data-image')) {
        popUpBlock.style.display = 'flex';
        popUpBlock__image.style.display = 'block';
        popUpBlock__image.children[0].src = target.src;
    }

    if(target.getAttribute('data-image') || target.getAttribute('data-video')) {
        //sliderInside.style.left = - target.parentElement.offsetLeft + 'px';
        //borderCheck();
    }

    isMove = true;
}

sliderInside.addEventListener('touchstart', function touchStart(e) {
    startX = e.changedTouches[0].pageX - sliderInside.offsetLeft;
});
sliderInside.addEventListener('touchmove', function touchMove(e) {
    let x = e.changedTouches[e.changedTouches.length - 1].pageX;
    if(x !== startX) isMouseDown = true;

    isMove = true;

    if(isMouseDown) {
        sliderInside.style.transition = 'none';
        sliderInside.style.left = x - startX + 'px';
        //borderCheck();
    }
})
sliderInside.addEventListener('touchend', function touchEnd() {
    isMouseDown = false;
    sliderInside.style.transition = 'all .6s';


    isMove = false;
});


sliderInside.addEventListener('mousedown', function mouseDown(e) {
    startX = e.pageX - sliderInside.offsetLeft;
    isMouseDown = true;
    sliderInside.style.cursor = 'grabbing';
    sliderInside.style.transition = 'none';

})
sliderInside.addEventListener('mousemove', function mouseMove(e) {
    if(!isMouseDown) return false;

    isMove = true;

    Array.from(childrenOfInsideSlider).forEach(el => el.style.pointerEvents = 'none');

    let x = e.pageX;
    sliderInside.style.left = x - startX  + 'px';
    borderCheck(e.target);
});
sliderInside.addEventListener('mouseup', function mouseUp(){
    isMove = false;


    isMouseDown = false;
    sliderInside.style.cursor = 'grab';
    sliderInside.style.transition = 'all .6s';

    Array.from(childrenOfInsideSlider).forEach(el => el.style.pointerEvents = 'all');
});
sliderInside.addEventListener('mouseleave', function mouseLeave(){
    //isMove = false;

    isMouseDown = false;
    sliderInside.style.cursor = 'grab';
    sliderInside.style.transition = 'all .6s';

    Array.from(childrenOfInsideSlider).forEach(el => el.style.pointerEvents = 'all');
})


leftButton.addEventListener("mousedown", function leftShift() {
    isMove = true;

    sliderInside.style.left = Number.parseInt(sliderInside.style.left) + childrenOfInsideSlider[0].clientWidth + 20 + 'px';
    borderCheck();
});
rightButton.addEventListener("mousedown", function rightShift(){
    isMove = true;

    sliderInside.style.left = Number.parseInt(sliderInside.style.left) - childrenOfInsideSlider[0].clientWidth - 20 + 'px';
    //borderCheck();
});
leftButton.addEventListener("mouseup", mouseUp);
rightButton.addEventListener("mousedown", mouseUp);

function mouseUp() {
    isMove = false;
}


//TEST

let isDeny = false;

let test = document.querySelector('.test');
let test_2 = document.querySelector('.test_2');

let test_left = 0;
let test_right = test.getBoundingClientRect().width;

let test_2_left = 0;
let test_2_right = 0;

function borderCheck() {
    let inner = sliderInside.getBoundingClientRect();
    let outer = sliderOutside.getBoundingClientRect();

    console.log(test.getBoundingClientRect().left)

    //console.log(sliderInside.style.left)
    //console.log(sliderInside.getBoundingClientRect().left)


    if(test.getBoundingClientRect().left > test_left && !isDeny) {
        //sliderInside.style.left = '0px';

        console.log(test_2.getBoundingClientRect().left);

        test_2.style.display = 'flex';
        test_2.style.left = - test.getBoundingClientRect().left - test_2.getBoundingClientRect().width  + 'px';

        test_2_left = - test.getBoundingClientRect().left - test_2.getBoundingClientRect().width;
        test_2_right = - test.getBoundingClientRect().left;

        //
        //

       // for(let i = childrenOfInsideSlider.length - 1; i >= 0; --i) {
       //     sliderInside.prepend(childrenOfInsideSlider[i].cloneNode(true));
       // }
        //Array.from(childrenOfInsideSlider).reverse().forEach(item =>  sliderInside.prepend(item.cloneNode(true)));
        //sliderInside.style.left =  - 4650  + 'px';
        //sliderInside.style.pointerEvents = 'none';
        isDeny = true;
        setTimeout(()=> {
            isDeny = false;
        }, 500);
        //sliderInside.style.left = '0px';

        return;

    }
    if(test.getBoundingClientRect().right > test_right && !isDeny)
    {

    }

    // if(Number.parseInt(sliderInside.style.left) + inner.width  < Number.parseInt(sliderOutside.style.left) + outer.width) {
    //     //sliderInside.style.left = `-${inner.width - outer.width - 10}px`;
    //
    //     //Array.from(childrenOfInsideSlider).forEach(item =>  sliderInside.appendChild(item.cloneNode(true)));
    //
    //     return true;
    // }

    //sliderInside.style.pointerEvents = 'all';

    return false;
}

// (()=> {
//     setInterval(()=> {
//         if(!isMove) {
//             if(isMove) return;
//
//             sliderInside.style.left = Number.parseInt(sliderInside.style.left) - childrenOfInsideSlider[0].clientWidth - 20 + 'px';
//             if(borderCheck()) {
//                 sliderInside.style.left = 0 + 'px';
//             }
//         }
//
//         return;
//     }, 3000);
// })();

window.addEventListener('click', (e)=> {
    if(e.target.getAttribute('data-video') || e.target.getAttribute('data-image')) return;
    if(e.target.getAttribute('data-touch')) {
        popUpBlock.style.display = 'none';
        popUpBlock__image.style.display = 'none';
        popUpBlock__video.style.display = 'none';
        popUpBlock__image.children[0].src = "";
        popUpBlock__video.children[0].src = videoLink;

        isMove = false;
    }
})

