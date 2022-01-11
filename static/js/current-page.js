let headerNav = document.querySelector('header').querySelector('ul');
let nav = headerNav.querySelectorAll('a');
nav.forEach(link => {
    if(window.location.href === link.href) {
        link.classList.add('current');
    }
})

if(window.location.href.includes('profile')) {
    document.querySelector('[href="http://127.0.0.1:8000/projects/"]').classList.add('current');
}
if(window.location.href.includes('project')) {
    document.querySelector('[href="http://127.0.0.1:8000/team/"]').classList.add('current');
}