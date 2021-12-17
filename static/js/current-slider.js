let leftButton = document.querySelector('.slider__left-button');
let rightButton = document.querySelector('.slider__right-button');
let sliderInside = document.querySelector('.slider__inside');
let sliderOutside = document.querySelector('.slider__outside');
let childrenOfInsideSlider = document.querySelectorAll('.slider__block');


let popUpBlock = document.querySelector('.pop-up-block');
let popUpBlock__image = document.querySelector('.pop-up-block__image');
let popUpBlock__video = document.querySelector('.pop-up-block__video');


sliderInside.style.left = '0px';
sliderOutside.style.left = '0px';

let startX;
let isMouseDown = false;

let videoLink = "/";
let videoIsThere = false;

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

    if(target.getAttribute('data-image') ||target.getAttribute('data-video')) {
        sliderInside.style.left = - target.offsetLeft + 'px';
        borderCheck();
    }
}

sliderInside.addEventListener('touchstart', function touchStart(e) {
    startX = e.changedTouches[0].pageX - sliderInside.offsetLeft;
});
sliderInside.addEventListener('touchmove', function touchMove(e) {
    let x = e.changedTouches[e.changedTouches.length - 1].pageX;
    if(x !== startX) isMouseDown = true;

    if(isMouseDown) {
        sliderInside.style.transition = 'none';
        sliderInside.style.left = x - startX + 'px';
        borderCheck();
    }
})
sliderInside.addEventListener('touchend', function touchEnd() {
    isMouseDown = false;
    sliderInside.style.transition = 'all .6s';

});


sliderInside.addEventListener('mousedown', function mouseDown(e) {
    startX = e.pageX - sliderInside.offsetLeft;
    isMouseDown = true;
    sliderInside.style.cursor = 'grabbing';
    sliderInside.style.transition = 'none';

})
sliderInside.addEventListener('mousemove', function mouseMove(e) {
    if(!isMouseDown) return false;

    childrenOfInsideSlider.forEach(el => el.style.pointerEvents = 'none');

    let x = e.pageX;
    sliderInside.style.left = x - startX  + 'px';
    borderCheck();
});
sliderInside.addEventListener('mouseup', function mouseUp(){
    isMouseDown = false;
    sliderInside.style.cursor = 'grab';
    sliderInside.style.transition = 'all .6s';

    childrenOfInsideSlider.forEach(el => el.style.pointerEvents = 'all');
});
sliderInside.addEventListener('mouseleave', function mouseLeave(){
    isMouseDown = false;
    sliderInside.style.cursor = 'grab';
    sliderInside.style.transition = 'all .6s';

    childrenOfInsideSlider.forEach(el => el.style.pointerEvents = 'all');
})


leftButton.addEventListener('click', function leftShift() {
    sliderInside.style.left = Number.parseInt(sliderInside.style.left) + childrenOfInsideSlider[0].clientWidth + 20 + 'px';
    borderCheck();
});
rightButton.addEventListener('click', function rightShift(){
    sliderInside.style.left = Number.parseInt(sliderInside.style.left) - childrenOfInsideSlider[0].clientWidth - 20 + 'px';
    borderCheck();
});

function borderCheck() {
    let inner = sliderInside.getBoundingClientRect();
    let outer = sliderOutside.getBoundingClientRect();

    if(Number.parseInt(sliderInside.style.left) > 0) {
        sliderInside.style.left = '0px';
    }
    if(Number.parseInt(sliderInside.style.left) + inner.width  < Number.parseInt(sliderOutside.style.left) + outer.width) {
        sliderInside.style.left = `-${inner.width - outer.width - 10}px`;
        return true;
    }

    return false;
}

(()=> {
    setInterval(()=> {
        sliderInside.style.left = Number.parseInt(sliderInside.style.left) - childrenOfInsideSlider[0].clientWidth - 20 + 'px';
        if(borderCheck()) {
            sliderInside.style.left = 0 + 'px';
        }
    }, 6000);
})();

window.addEventListener('click', (e)=> {
    if(e.target.getAttribute('data-video') || e.target.getAttribute('data-image')) return;
    if(!e.target.getAttribute('data-dont-touch')) {
        popUpBlock.style.display = 'none';
        popUpBlock__image.style.display = 'none';
        popUpBlock__video.style.display = 'none';
        popUpBlock__image.children[0].src = "";
        popUpBlock__video.children[0].src = videoLink;
    }
})

