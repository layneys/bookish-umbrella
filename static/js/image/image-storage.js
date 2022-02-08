export class ImageStorage {
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
                thisImg.src = window.URL.createObjectURL(blob);
            };
            xhr.onprogress = function (e) {
                thisImg.completedPercatage = parseInt((e.loaded / e.total) * 100);
                let circle = document.querySelector('.progress-ring__circle')
                let circumference = circle.r.baseVal.value * 2 * Math.PI;
                const offset = circumference - thisImg.completedPercatage / 100 * circumference;
                if(thisImg.isSearchCircle) {
                    circle.style.strokeDashoffset = offset;
                } else {
                    circle.style.strokeDashoffset = '0';
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
        this._url = `${url}`;
        this._id = id;

        //this._circle = document.querySelector('.progress-ring__circle');

        this._load();
    }

    _load() {
        this._image.load(this._url, this._circle);
    }
}