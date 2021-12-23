new Splide( '.splide', {
    type: 'loop',
    focus: 'center',
    perPage: 3,
    autoplay: true,
}).mount() ;
//window.splide.Extensions
//autoplay: true,

let arrows = document.querySelector('.splide__arrows');

let left = arrows.children[0].children[0].children[0];
let right = arrows.children[1].children[0].children[0];

left.src = "../../media/icons/leftButton-slider.svg";
right.src = "../../media/icons/rightButton-slider.svg";


let popUpBlock = document.querySelector('.pop-up-block');
let popUpBlock__image = document.querySelector('.pop-up-block__image');
let popUpBlock__video = document.querySelector('.pop-up-block__video');

let videoIsThere = false;
let videoLink = "/";

let sliderList = document.querySelector('.splide__list');
sliderList.addEventListener("click", (e)=> {
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
});

window.addEventListener('click', (e)=> {
    if(e.target.getAttribute('data-video') || e.target.getAttribute('data-image')) return;
    if(e.target.getAttribute('data-touch')) {
        popUpBlock.style.display = 'none';
        popUpBlock__image.style.display = 'none';
        popUpBlock__video.style.display = 'none';
        popUpBlock__image.children[0].src = "";
        popUpBlock__video.children[0].src = videoLink;
    }
});
