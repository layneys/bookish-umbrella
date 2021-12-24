document.addEventListener('DOMContentLoaded', (e)=> {
    let cursor_back = document.querySelector('.custom-cursor')


    window.addEventListener('mousemove', (e) => {
        cursor_back.style.left = e.pageX - 20 + 'px';
        cursor_back.style.top = e.pageY - window.pageYOffset - 10 + 'px';
    });
});