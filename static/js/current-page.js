let headerNav = document.querySelector('.header').querySelector('.nav');
let nav = headerNav.querySelectorAll('a');
nav.forEach(link => {
    if(window.location.href.includes(link.href)) {
        link.querySelector('div').style.color = '#000';
    }
})
