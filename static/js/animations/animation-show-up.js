import { AnimationShowUp } from "./ShowUpClass.js";

document.addEventListener('DOMContentLoaded', ()=> {
    //let animationSection = document.querySelectorAll('.animation-section');

    let sections = document.querySelectorAll('.animation-section');
    let animBlocks  = [];
    sections.forEach(item => {
        animBlocks.push(new AnimationShowUp(item));
    });
    window.addEventListener('scroll', ()=> {
        animBlocks.forEach(item => {
            if(window.pageYOffset + window.screen.availHeight - 100 > item._animationSection.offsetTop && !item._isDone) {
                item.ShowUp();
            }
        })
    });


    let scaleBlocks = document.querySelectorAll('.mouse-enter');
    scaleBlocks.forEach(item => {
        item.addEventListener('mouseover',  () => {
            item.style.transform = 'scale(1.05)';
        });
        item.addEventListener('mouseout', ()=> {
           item.style.transform = 'scale(1)';
        });
    });
});



// class AnimationShowUp {
//     _animationSection = null;
//     _blocks = null;
//     _index = -1;
//     _alreadyThere = [];
//     _delay = 500;
//     _isDone = false;
//
//     constructor(section) {
//         this._animationSection = section;
//         this._blocks = this._animationSection.querySelectorAll('.animation-show-up');
//     }
//     ShowUp() {
//         this._blocks.forEach(item => {
//             setTimeout(()=> {
//                 this._index = Math.floor(Math.random() * this._blocks.length);
//                 this.Check(this._blocks, this._alreadyThere, this._index);
//             }, this._delay);
//
//             this._delay += 500;
//         });
//
//         this._isDone = true;
//         //this.AddInlineProp();
//     }
//     Check(blocks, alTh, ind) {
//         if(alTh.includes(ind)) {
//             while (alTh.includes(ind)) {
//                 ind = Math.floor(Math.random() * this._blocks.length);
//             }
//         }
//
//         alTh.push(ind);
//         this.AddProps(blocks, ind);
//     }
//     AddProps(blocks, ind) {
//         blocks[ind].style.opacity = '1';
//         blocks[ind].style.transform = 'translateY(0)';
//
//         setTimeout(()=> {
//             blocks[ind].style.transition = 'all ease-in-out 0.3s';
//         }, 1500);
//     }
//     // AddInlineProp() {
//     //     this._blocks.forEach(item => {
//     //         item.style.transition = 'none';
//     //     });
//     // }
// }
