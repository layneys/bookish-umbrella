document.addEventListener('DOMContentLoaded', ()=> {
    let isOpen = false;
    let project_wrapper = document.querySelector('.projects-wrapper');
    let realized_projects_array = document.getElementsByClassName('prj-element-of-array');
    let button = document.getElementById('load-more');

    button.addEventListener('click', ()=> {
        let height = 0;
        for(let i = 0; i < realized_projects_array.length; ++i)
            console.log("offsetTop:" + realized_projects_array[i].offsetTop)
        if(!isOpen) {
            isOpen = true;
            button.innerText = 'HIDE';
            height = realized_projects_array[realized_projects_array.length - 1].offsetTop + realized_projects_array[realized_projects_array.length - 1].clientHeight + 50;
        } else {
            isOpen = false;
            button.innerText = 'load more';
            height = realized_projects_array[0].offsetTop + realized_projects_array[0].clientHeight + 50;
        }

        //console.log("height " + height)
        project_wrapper.style.height = height + 'px';
    });


    let arrowUp = document.querySelector('.arrow-up');
    arrowUp.onclick =  () => {
        window.scrollTo(0,0);
    }
})
