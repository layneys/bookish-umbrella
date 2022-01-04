let person_card_array = document.querySelectorAll('.person-card');
person_card_array.forEach(card => {
    card.addEventListener('mousedown', function (e) {
        e.preventDefault();

        let target = e.target;
        let data_field = e.target.getAttribute('data-field');
        if (e.button === 0) {
            if (data_field === 'all' || data_field === 'info' || data_field === 'image') {
                console.log('test');
                window.location.href = this.getAttribute('data-url');
            } else if (data_field === 'link') {
                window.location.href = target.parentNode.getAttribute('href');
            }
        } else if (e.button === 1) {
            if (data_field === 'all' || data_field === 'info' || data_field === 'image') {
                window.open(this.getAttribute('data-url'));
            } else if (data_field === 'link') {
                window.open(target.parentNode.getAttribute('href'));
            }
        }
    });
});