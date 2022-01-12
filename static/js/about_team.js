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

class AnimationShowUp {
    _animationSection = null;
    _blocks = null;
    _index = -1;
    _alreadyThere = [];
    _delay = 500;
    _isDone = false;

    constructor(section) {
        this._animationSection = section;
        this._blocks = this._animationSection.querySelectorAll('.animation-show-up');
    }
    ShowUp() {
        this._blocks.forEach(item => {
            setTimeout(()=> {
                this._index = Math.floor(Math.random() * this._blocks.length);
                this.Check(this._blocks, this._alreadyThere, this._index);
            }, this._delay);

            this._delay += 500;
        });

        this._isDone = true;
    }
    Check(blocks, alTh, ind) {
        if(alTh.includes(ind)) {
            while (alTh.includes(ind)) {
                ind = Math.floor(Math.random() * this._blocks.length);
            }
        }

        alTh.push(ind);
        this.AddProps(blocks, ind);
    }
    AddProps(blocks, ind) {
        blocks[ind].style.opacity = '1';
        blocks[ind].style.transform = 'translateY(0)';
    }
}