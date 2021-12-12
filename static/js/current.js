document.addEventListener("DOMContentLoaded", () => {

    let leftArrow = document.querySelector('#leftArrow');
    leftArrow.addEventListener('mouseenter', ()=> {
        leftArrow.src = "https://madsparrowsk.github.io/TinyProject/projects/imgs/PanyatnaLight.png";
    });
    leftArrow.addEventListener('mouseleave', ()=> {
       leftArrow.src = "https://madsparrowsk.github.io/TinyProject/projects/imgs/Panyatna.png";
    });

    let rightArray = document.getElementById('rightArrow');
    rightArray.addEventListener("mouseenter", ()=> {
        rightArray.src = "https://madsparrowsk.github.io/TinyProject/projects/imgs/rightArrowLigth.png";
    });
    rightArray.addEventListener('mouseleave', ()=> {
        rightArray.src = "https://madsparrowsk.github.io/TinyProject/projects/imgs/rightArray.png";
    });

    let upperScreenBlock = document.querySelector('.allScreen');
    let belowInfo = document.querySelector('.belowInfo');
    let belowInfoVideo = document.querySelector('.belowInfoVideo');
    let iframeVideo = document.querySelector('iframe');

    let isMoved = false;
    let isMouseDown = false;
    let isAuto = true;
    let startX;
    let x;


    let slider = document.getElementById('slider');
    let inSlider = document.getElementById("inner-slider");
    inSlider.style.left = 0 + 'px';

    let bars = document.getElementsByClassName('slideBar');
    for(let i = 0; i < bars.length; ++i) {
        bars[i].addEventListener("click", handler);
    }

    function handler(e) {
        if(isMoved) return;

        let outer = slider.getBoundingClientRect();
        let inner = inSlider.getBoundingClientRect();

        inSlider.style.transition = ".7s";

        if(e.target.name === 'video' || e.target.classList.contains('videoBar')) {
            belowInfoVideo.style.display = 'block';
            belowInfo.style.display = 'none';
            inSlider.style.left = 0 + 'px';
        } else {
            belowInfoVideo.style.display = 'none';
            belowInfo.style.display = 'block';
            belowInfo.innerHTML = e.target.parentElement.innerHTML;
            if(inner.right - 300 < outer.right) {
                inSlider.style.left = `-${inner.width - outer.width}px`;
            } else {
                inSlider.style.left = -e.target.offsetLeft + 'px';
            }
        }
        upperScreenBlock.style.display = 'block';
    }


    slider.addEventListener('touchstart', (e)=> {
        e.preventDefault();
        startX = e.targetTouches[0].pageX - inSlider.offsetLeft;
        inSlider.style.transition = "0s";
    })
    slider.addEventListener("touchmove", (e)=> {
        x = e.targetTouches[e.targetTouches.length - 1].pageX;
        if(startX !== x)
            isMoved = true;
        if(isMoved) {
            e.preventDefault();
            inSlider.style.left = (x + Math.abs(parseInt(inSlider.style.left))) - (startX + Math.abs(parseInt(inSlider.style.left))) + 'px';
            borderCheck()
        } else return;
    })
    slider.addEventListener("touchend", ()=> {
        isMoved = false;
        isMouseDown = false;
    })

    slider.addEventListener('mousedown', (e)=> {
        isMouseDown = true;
        e.preventDefault();
        startX = e.pageX - inSlider.offsetLeft;
        inSlider.style.transition = "0s";
    })
    slider.addEventListener('mousemove', (e)=> {
        if(isMouseDown) {
            x = e.pageX;
             if(x !== startX) {
                 isMoved = true;
             }
            if (!isMoved)
                return;
            if (isMoved) {
                inSlider.style.pointerEvents = 'none';
                e.preventDefault();
                inSlider.style.left = (x + Math.abs(parseInt(inSlider.style.left))) - (startX + Math.abs(parseInt(inSlider.style.left))) + 'px';
                borderCheck()
            }
        }
    })
    slider.addEventListener('mouseleave', ()=> {
        inSlider.style.pointerEvents = 'auto';
        isMoved = false;
        isMouseDown = false;
    })
    slider.addEventListener("mouseup", ()=> {
        inSlider.style.pointerEvents = 'auto';
        isMoved = false;
        isMouseDown = false;
    })
    function borderCheck() {
        let outer = slider.getBoundingClientRect();
        let inner = inSlider.getBoundingClientRect();

        if(parseInt(inSlider.style.left) > 0) {
            inSlider.style.left = '0px';
        } else if(inner.right < outer.right) {
            inSlider.style.left = `-${inner.width - outer.width}px`;
        }
    }

    rightArray.addEventListener("click", ()=> {
        let outer = slider.getBoundingClientRect();
        let inner = inSlider.getBoundingClientRect();

        inSlider.style.transition = ".7s";
        if(inner.right - 310 < outer.right)
            inSlider.style.left = `-${inner.width - outer.width}px`;
        else
            inSlider.style.left = parseInt(inSlider.style.left)  -310 + 'px';
    });
    leftArrow.addEventListener("click", ()=> {
        inSlider.style.transition = ".7s"
        if(parseInt(inSlider.style.left)  + 310 >= 0) {
            inSlider.style.left = 0 + 'px';
        } else {
            inSlider.style.left = parseInt(inSlider.style.left) + 310 + 'px';
        }
    });

    window.addEventListener('click', (e)=> {
        if(e.target.name !== 'image' && e.target.name !== 'video' && !e.target.classList.contains('videoBar')) {
            upperScreenBlock.style.display = 'none';
            iframeVideo.src = iframeVideo.src;
        }
    });

    let isGoBack = false;
    (()=> {
        setInterval(()=> {
                let outer = slider.getBoundingClientRect();
                let inner = inSlider.getBoundingClientRect();

                inSlider.style.transition = ".7s"
                if (isAuto) {
                    if (inner.right - 310 < outer.right) {
                        if (isGoBack) {
                            inSlider.style.left = 0 + 'px';
                            isGoBack = false;
                        } else {
                            isGoBack = true;
                            inSlider.style.left = `-${inner.width - outer.width}px`;
                        }
                    } else inSlider.style.left = parseInt(inSlider.style.left) - 310 + 'px';
                }
        }, 4000)
    })();

    // let toDownload = document.getElementsByClassName('toDownload');
    // for(let i = 0; i < toDownload.length; ++i) {
    //     asyncImage(toDownload[i].getAttribute('data-url'))
    //         .then(img => { isImageLoaded(img) ? toDownload[i].src = img.src : console.log();},
    //               error => { console.log(error.message) })
    //         .catch(()=> { console.log('pizdec'); })
    // }

    // function asyncImage(url) {
    //     return new Promise((resolve, reject) => {
    //        const img = new Image();
    //        img.onload = () => resolve(img);
    //        img.onerror = () => reject(new Error(`could not load:${url}`));
    //        img.src = url;
    //     });
    // }
    // function isImageLoaded(img) {
    //     if(!img.complete) return false;

    //     return true;
    // }
    /*asyncImage("http://citg/projects/imgs/designer.svg")
        .then(img => { isImageLoaded(img) ? console.log('true') : console.log(''); })
        .catch(()=> {});*/
});