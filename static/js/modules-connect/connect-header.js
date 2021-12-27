function addHeader() {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', '../../../templates/modules/header.html', false);

    xhr.onloadend = ()=> {
        let header = document.createElement('header');
        header.innerHTML = xhr.response;
        document.body.prepend(header);
    }

    xhr.send();
}

addHeader();
