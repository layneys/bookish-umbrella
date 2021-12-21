document.addEventListener('DOMContentLoaded', ()=> {

    let container = document.querySelector('.container');

    let isOpen = false;
    let project_wrapper = document.querySelector('.projects-wrapper');
    let realized_projects_array = document.getElementsByClassName('prj-element-of-array');
    let button = document.getElementById('load-more');

    button.addEventListener('click', ()=> {
        let height;
        if(!isOpen) {
            isOpen = true;
            button.innerText = 'свернуть';
            height = realized_projects_array[realized_projects_array.length - 1].offsetTop + realized_projects_array[realized_projects_array.length - 1].clientHeight + 50;
        } else {
            isOpen = false;
            button.innerText = 'развернуть';
            height = realized_projects_array[3].offsetTop + realized_projects_array[0].clientHeight + 50;
        }
        project_wrapper.style.height = height + 'px';
    });
    let decorationBlur_blue = document.querySelector('.little-description_decoration-blur');
    let decorationBlur_purple = document.querySelector('.after-prjcts_decoration-blur-purple');
    window.addEventListener('scroll', function addRemoveBlur() {
        if(document.documentElement.scrollTop > 5) {
            decorationBlur_purple.style.opacity = '0';
            decorationBlur_blue.style.opacity = '0'

        } else {
            decorationBlur_purple.style.opacity = '1';
            decorationBlur_blue.style.opacity = '1';
        }
    });

    let post_01 = document.querySelector('.post-01');
    let arrowUp = document.querySelector('.arrow-up');
    window.addEventListener('scroll', function scrollArrow(){
        if(document.documentElement.scrollTop > post_01.offsetTop + post_01.clientHeight - 300) {
            arrowUp.style.opacity = '1';
        } else {
            arrowUp.style.opacity = '0';
        }
    });
    let footer = document.querySelector('.footer')
    window.addEventListener('scroll', function arrowPosition() {
        arrowUp.style.position = 'fixed';
        console.log(document.documentElement.clientHeight)
        console.log(footer.offsetTop);
        if(window.pageYOffset >= footer.offsetTop - document.documentElement.clientHeight) {
            arrowUp.style.left = container.offsetLeft + container.clientWidth + 20 +  'px';
            arrowUp.style.bottom =  195  + 'px';
            //...
        } else {
            arrowUp.style.left = container.offsetLeft + container.clientWidth + 20 +  'px';
            arrowUp.style.bottom =  100  + 'px';
        }
    })

    arrowUp.onclick =  () => {
        document.documentElement.scrollTo(0,0);
    }
})
