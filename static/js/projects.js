document.addEventListener("DOMContentLoaded", () => {

    let headerBar = document.getElementById('headerBar');
    let dynamicHeaderBar = document.getElementById('dynamicHeaderBar');
    dynamicHeaderBar.addEventListener('click', ()=> {
        if(headerBar.style.height !== '200px') {
            headerBar.style.height = '200px';
        } else {
            headerBar.style.height = '0px';
        }
    })

    //<field with Projects>
    let isOpen = false;
    let projectsList = document.getElementById('list');
    let openCloseListButton = document.getElementById('openCloseList');
    let bars = document.getElementsByClassName('bar');
    openCloseListButton.addEventListener('click', () => {
        if(!isOpen) {
            openCloseListButton.src = "https://madsparrowsk.github.io/TinyProject/projects/imgs/closeList.svg";
            projectsList.style.height = bars[bars.length - 1].offsetTop + bars[bars.length - 1].clientHeight + 'px';
            isOpen = true;
        } else {

            openCloseListButton.src = "https://madsparrowsk.github.io/TinyProject/projects/imgs/openList.svg";
            projectsList.style.height = bars[0].offsetTop + bars[0].clientHeight + 'px';
            isOpen = false;
        }
    });
    //</field with Projects>

    //<field with contest>
    //</field with contest>

    //<field with inDeveloping projects>
    let inDevsPrjcs = document.getElementsByClassName('inDevBar');
    for(let i = 0; i < inDevsPrjcs.length; ++i) {
        inDevsPrjcs[i].addEventListener('click', (e) => {
            if(e.target === inDevsPrjcs[i]) {
                /*console.log(inDevsPrjcs[i].childNodes[1].href);
                window.location.href = inDevsPrjcs[i].childNodes[1].href;*/
            }
        });
    }
    //</field with inDeveloping projects>
})