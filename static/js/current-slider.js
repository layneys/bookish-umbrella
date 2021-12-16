let leftButton = document.querySelector('.slider__left-button');
let rightButton = document.querySelector('.slider__right-button');
let sliderInside = document.querySelector('.slider__inside');
let sliderOutside = document.querySelector('.slider__outside');
let blocksInsideRibbon = document.querySelectorAll('.slider__block');


sliderInside.style.left = '0px';
sliderOutside.style.left = '0px';

let startX;
let isMouseDown = false;

sliderInside.addEventListener('mousedown', function mouseDown(e) {
    startX = e.pageX - sliderInside.offsetLeft;
    isMouseDown = true;
    sliderInside.style.cursor = 'grabbing';
    sliderInside.style.transition = 'none';
})
sliderInside.addEventListener('mousemove', function mouseMove(e) {
    if(!isMouseDown) return false;

    let x = e.pageX;
    sliderInside.style.left = x - startX  + 'px';
    borderCheck();
});
sliderInside.addEventListener('mouseup', function mouseUp(e){
    isMouseDown = false;
    sliderInside.style.cursor = 'grab';
    sliderInside.style.transition = 'all .3s';
});
sliderInside.addEventListener('mouseleave', function mouseLeave(e){
    isMouseDown = false;
    sliderInside.style.cursor = 'grab';
    sliderInside.style.transition = 'all .3s';
})


leftButton.addEventListener('click', function leftShift() {
    sliderInside.style.left = Number.parseInt(sliderInside.style.left) - blocksInsideRibbon[0].clientWidth - 20 + 'px';
    borderCheck();
});
rightButton.addEventListener('click', function rightShift(){
    sliderInside.style.left = Number.parseInt(sliderInside.style.left) + blocksInsideRibbon[0].clientWidth + 20 + 'px'
    borderCheck();
});

function borderCheck() {
    let inner = sliderInside.getBoundingClientRect();
    let outer = sliderOutside.getBoundingClientRect();



    if(Number.parseInt(sliderInside.style.left) > 0) {
        sliderInside.style.left = '0px';
    }
    if(Number.parseInt(sliderInside.style.left) + inner.width  < Number.parseInt(sliderOutside.style.left) + outer.width) {
        sliderInside.style.left = `-${inner.width - outer.width}px`;
    }
}