document.addEventListener('DOMContentLoaded', ()=> {
    new Splide( '.splide', {
        type: 'loop',
        focus: 'center',
        perPage: 3,
        autoplay: true,
    }).mount();
//window.splide.Extensions
//autoplay: true,

    let lastIdLoader = -1;

    let sliderImages = document.querySelectorAll('[data-url-normal-image]');
    let alreadyThere = new Map();
    for(let i = 0; i < sliderImages.length; ++i) {
        let key = sliderImages[i].getAttribute('data-url-normal-image');
        if(alreadyThere.has(key)) {
            sliderImages[i].setAttribute('data-id', alreadyThere.get(key).getAttribute('data-id'));
        } else {
            sliderImages[i].setAttribute('data-id', i);
            alreadyThere.set(sliderImages[i].getAttribute('data-url-normal-image'), sliderImages[i]);
        }
    }


    let collectionOfHighQualityImage = new Map();
    alreadyThere.forEach((value) => {
        let id = value.getAttribute('data-id');
        let url = value.getAttribute('data-url-normal-image');

        collectionOfHighQualityImage.set(id, new ImageStorage(url, id));
    });


    let loader = document.querySelector('.loader');
    let circleLoader = document.querySelector('circle');
    let radius = circleLoader.r.baseVal.value;
    let circumference = radius * 2 * Math.PI;

    circleLoader.style.strokeDasharray = `${circumference} ${circumference}`;
    circleLoader.style.strokeDashoffset = `${circumference}`;

    setProgress(30)

    function setProgress(percent) {
        const offset = circumference - percent / 100 * circumference;
        circleLoader.style.strokeDashoffset = offset;
    }

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
            loader.style.display = 'none';
        } else if(target.getAttribute('data-video') && videoIsThere) {
            popUpBlock.style.display = 'flex';
            popUpBlock__video.style.display = 'block';
            loader.style.display = 'none';
        }
        if(target.getAttribute('data-image')) {
            popUpBlock.style.display = 'flex';
            popUpBlock__image.style.display = 'block';

            lastIdLoader = target.getAttribute('data-id');
            let highQvltImg = collectionOfHighQualityImage.get(lastIdLoader);
            if(highQvltImg._image.isLoaded) {
                popUpBlock__image.children[0].src = highQvltImg._image.src;
                loader.style.display = 'none';
            } else {
                popUpBlock__image.children[0].src = target.src;
                loader.style.display = 'block';
                highQvltImg._image.isSearchCircle = true;
            }
        }
    });

    let cursorDotInside = document.querySelector('.cursor-dot');
    let cursorDotOutside = document.querySelector('.cursor-dot-outline');
    popUpBlock__video.addEventListener('mouseenter', ()=> {
        cursorDotInside.style.opacity = '0';
        cursorDotOutside.style.opacity = '0';
    })

    window.addEventListener('click', (e)=> {
        if(e.target.getAttribute('data-video') || e.target.getAttribute('data-image')) return;
        if(e.target.getAttribute('data-touch')) {
            popUpBlock.style.display = 'none';
            popUpBlock__image.style.display = 'none';
            popUpBlock__video.style.display = 'none';
            popUpBlock__image.children[0].src = "";
            popUpBlock__video.children[0].src = videoLink;

            collectionOfHighQualityImage.get(lastIdLoader)._image.isSearchCircle = false;
        }
    });
})

class ImageStorage {
    _image = null;
    _circle = null;
    _url = "";
    _loadState = 0;
    _id = 0;
    _isLoaded = false;

    constructor(url, id) {
        Image.prototype.load = function (url) {
            let thisImg = this;
            let xhr = new XMLHttpRequest();
            xhr.open('GET', url, true);
            xhr.responseType = 'arraybuffer';

            xhr.onload = function (e) {
                let blob = new Blob([this.response]);
                thisImg.src = window.URL.createObjectURL(blob);
            };
            xhr.onprogress = function (e) {
                thisImg.completedPercatage = parseInt((e.loaded / e.total) * 100);
                let circle = document.querySelector('circle')
                let circumference = circle.r.baseVal.value * 2 * Math.PI;
                const offset = circumference - thisImg.completedPercatage / 100 * circumference;
                if(thisImg.isSearchCircle) {
                    circle.style.strokeDashoffset = offset;
                } else {
                    circle.style.strokeDashoffset = offset * 0;
                    circle = null;

                }
            };
            xhr.onloadstart = function () {
                thisImg.completedPercatage = 0;
            };
            xhr.onloadend = () => {
                thisImg.isLoaded = true;
                if(thisImg.isSearchCircle) {
                    thisImg.isSearchCircle = false;
                    document.querySelector('.pop-up-block__image').querySelector('img').src = thisImg.src;
                    document.querySelector('.loader').style.display = 'none';
                }
            }
            xhr.send();
        };
        Image.prototype.isLoaded = false;
        Image.prototype.isSearchCircle = false;
        Image.prototype.completedPercentage = 0;

        this._image = new Image();
        this._url = `../../media/imgs/${url}`;
        this._id = id;

        this._circle = document.querySelector('circle');

        this._load();
    }

    _load() {
        this._image.load(this._url, this._circle);
    }
}
