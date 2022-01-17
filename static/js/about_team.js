import { AnimationShowUp } from "./animations/ShowUpClass.js";

document.addEventListener('DOMContentLoaded', ()=> {
    let animBlock = new AnimationShowUp(document.querySelector('.team__list'));
    animBlock.ShowUp();

    let person_card_array = document.querySelectorAll('.person-card');
    person_card_array.forEach(card => {
        card.addEventListener('mousedown', function (e) {
            e.preventDefault();

            let target = e.target;
            let data_field = e.target.getAttribute('data-field');
            if (e.button === 0) {
                if (data_field === 'all' || data_field === 'info' || data_field === 'image') {
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

        card.addEventListener('mouseover', function () {
            this.style.background = '#fff';
            this.querySelector('.person-card__show-more').style.opacity = '1';
            this.querySelector('.person-card__info').querySelector('h3').style.color = '#000';
        });
        card.addEventListener('mouseout', function () {
            this.style.background = '#323A43';
            this.querySelector('.person-card__show-more').style.opacity = '0';
            this.querySelector('.person-card__info').querySelector('h3').style.color = '#fff';
        });
    });
})