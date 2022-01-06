document.addEventListener('DOMContentLoaded', ()=> {
    let animationSection = document.querySelectorAll('.animation-section');

    window.addEventListener('scroll', ()=> {
        animationSection.forEach(section => {
            if(window.pageYOffset + window.screen.availHeight - 100 > section.offsetTop) {
                let blocks = section.querySelectorAll('.animation-section__block');
                blocks.forEach(block => {
                    block.classList.add('animation-show-up');
                })
            }
        })
    });

});