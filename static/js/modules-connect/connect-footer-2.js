function addFooter() {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', '../../../templates/modules/footer_2.html', false);

    xhr.onloadend = ()=> {
        let footer = document.createElement('footer');
        footer.innerHTML = xhr.response;
        document.body.append(footer);
    }

    xhr.send();
}

addFooter();
