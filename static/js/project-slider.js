import { ImageStorage } from "./image/image-storage.js";

document.addEventListener('DOMContentLoaded', ()=> {
    new Splide( '.splide', {
        type: 'loop',
        focus: 'center',
        perPage: 3,
        autoplay: true,
    }).mount();
//window.splide.Extensions
//autoplay: true,

    let lastIdObjectImage = -1;

    let sliderImages = document.querySelectorAll('[data-url-normal-image]');
    let alreadyThere = new Map();
    for(let i = 0; i < sliderImages.length; ++i) {
        let key = sliderImages[i].getAttribute('data-url-normal-image');
        if(alreadyThere.has(key)) {
            sliderImages[i].setAttribute('data-id', alreadyThere.get(key).getAttribute('data-id'));
        } else {
            sliderImages[i].setAttribute('data-id', `${i}`);
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
    let circleLoader = loader.querySelector('.progress-ring__circle');
    let underLoader = loader.querySelector('.progress-ring__under-circle');
    let radius = circleLoader.r.baseVal.value;
    let circumference = radius * 2 * Math.PI;

    circleLoader.style.strokeDasharray = `${circumference} ${circumference}`;
    circleLoader.style.strokeDashoffset = `${circumference}`;

    underLoader.style.strokeDasharray =  `${circumference} ${circumference}`;
    underLoader.style.strokeDashoffset = `${circumference}`;

    setProgress(0, circleLoader);
    setProgress(100, underLoader);

    function setProgress(percent, circle) {
        const offset = circumference - percent / 100 * circumference;
        circle.style.strokeDashoffset = offset.toString();
    }

    let arrows = document.querySelector('.splide__arrows');

    let left = arrows.children[0].children[0].children[0];
    let right = arrows.children[1].children[0].children[0];

    left.src = "../../media/icons/leftButton-slider.svg";
    right.src = "../../media/icons/rightButton-slider.svg";

    let popUpBlock = document.querySelector('.pop-up-block');
    let popUpBlock__image = document.querySelector('.pop-up-block__image');
    let popUpBlock__video = document.querySelector('.pop-up-block__video');

    let leftButton = popUpBlock.querySelector('.pop-up-block__left-button');
    let rightButton = popUpBlock.querySelector('.pop-up-block__right-button');

    let prevImageElementId = -1;
    let nextImageElementId = -1;

    //let minElementId = 0;
    let maxElementId = collectionOfHighQualityImage.size;

    let videoIsThere = false;
    let videoLink = "/";

    let sliderList = document.querySelector('.splide__list');
    sliderList.addEventListener("click", (e)=> {
        let target = e.target;

        findNext(target);
        findPrev(target);

        if(target.getAttribute('data-video') && !videoIsThere) {
            popUpBlock.style.display = 'flex';
            popUpBlock__video.style.display = 'block';
            if(!videoIsThere) {
                videoLink = target.getAttribute('data-src');
                popUpBlock__video.children[0].src = videoLink;
                videoIsThere = true;
            }
            loader.style.display = 'none';
            leftButton.style.display = rightButton.style.display = 'none';
        }
        if(target.getAttribute('data-image')) {
            popUpBlock.style.display = 'flex';
            popUpBlock__image.style.display = 'block';
            lastIdObjectImage = target.getAttribute('data-id');
            let highQvltImg = collectionOfHighQualityImage.get(lastIdObjectImage);

            CheckForLoadingImage(highQvltImg, target);

            leftButton.style.display = rightButton.style.display = 'flex';
        }
    });
    leftButton.addEventListener('click', ()=> {
        UnsubscribeToLoader(lastIdObjectImage);

        let prevElementInCollection = collectionOfHighQualityImage.get(prevImageElementId);
        let prevElementInDOMSlider = sliderList.querySelector(`[data-id="${prevImageElementId}"]`);

        CheckForLoadingImage(prevElementInCollection, prevElementInDOMSlider);

        findPrev(prevElementInDOMSlider);
    });
    rightButton.addEventListener('click', ()=> {
        UnsubscribeToLoader(lastIdObjectImage)

        let nextElementInCollection = collectionOfHighQualityImage.get(nextImageElementId);
        let nextElementInDOMSlider = sliderList.querySelector(`[data-id="${nextImageElementId}"]`)

        CheckForLoadingImage(nextElementInCollection, nextElementInDOMSlider);

        findNext(nextElementInDOMSlider);
    })

    function findPrev(current) {
        let currentId = +current.getAttribute('data-id');
        let prevId = currentId - 1 < 0 ? maxElementId - 1 : currentId - 1;

        prevImageElementId = prevId.toString();
        lastIdObjectImage = prevImageElementId;

        nextImageElementId = Number.parseInt(prevImageElementId) + 2 < maxElementId ? Number.parseInt(prevImageElementId) + 2 : 0;
        nextImageElementId = nextImageElementId.toString();
    }
    function  findNext(current) {
        let currentId = +current.getAttribute('data-id');
        let nextId = currentId + 1 < maxElementId ? currentId + 1 : 0;

        nextImageElementId = nextId.toString();
        lastIdObjectImage = nextImageElementId;

        prevImageElementId = Number.parseInt(nextImageElementId) - 2 < 0 ? collectionOfHighQualityImage.size - 1 : Number.parseInt(nextImageElementId) - 2 ;
        prevImageElementId = prevImageElementId.toString();
    }

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

            UnsubscribeToLoader(lastIdObjectImage);
        }
    });


    function CheckForLoadingImage(highQvltImg, target) {
        if(highQvltImg._image.isLoaded) {
            AddImage(highQvltImg)
        } else {
            popUpBlock__image.children[0].src = target.src;
            loader.style.display = 'block';
            SubscribeToLoader(highQvltImg);
        }
    }
    function AddImage(highQvltImg) {
        let image = popUpBlock__image.children[0];
        image.src = highQvltImg._image.src;
        image.style.filter = 'blur(0px)';
        loader.style.display = 'none';
    }
    function SubscribeToLoader(collectionObj) {
        collectionObj._image.isSearchCircle = true;
    }
    function UnsubscribeToLoader(id) {
        collectionOfHighQualityImage.get(id)._image.isSearchCircle = false;
        setProgress(0, circleLoader);
    }

})

/*class ImageStorage {
    _image = null;
    _circle = null;
    _url = "";
    _id = 0;

    constructor(url, id) {
        Image.prototype.load = function (url) {
            let thisImg = this;
            let xhr = new XMLHttpRequest();
            xhr.open('GET', url, true);
            xhr.responseType = 'arraybuffer';

            xhr.onload = function (e) {
                let blob = new Blob([this.response]);
                console.log(this.response)
                console.log(blob)
                thisImg.src = window.URL.createObjectURL(blob);
                console.log(thisImg.src);
            };
            xhr.onprogress = function (e) {
                thisImg.completedPercatage = parseInt((e.loaded / e.total) * 100);
                let circle = document.querySelector('.progress-ring__circle')
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
                    let img = document.querySelector('.pop-up-block__image').querySelector('img');
                    img.src = thisImg.src;
                    img.style.filter = 'blur(0px)';
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

        this._circle = document.querySelector('.progress-ring__circle');

        this._load();
    }

    _load() {
        this._image.load(this._url, this._circle);
    }
}*/
