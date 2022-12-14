export class AnimationShowUp {
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