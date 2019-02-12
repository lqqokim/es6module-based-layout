import View from './View.js';

const SouthView = Object.create(View);

SouthView.setup = function (el) {
    this.init(el);
    this.createSelector(el);
    this.bindEvents();
    return this;
}

SouthView.createSelector = function(el) {
    this.mainEl = document.querySelector('.main');
    this.slideBtnEl = el.querySelector('.slide-btn');
    this.splitEl = el.querySelector('.split-slider');
}

SouthView.bindEvents = function () {

    //slide 버튼 클릭 이벤트
    this.slideBtnEl.addEventListener('click', e => {
        if(this.el.classList.contains('open')) {
            this.mainEl.classList.remove('slide-up');
            this.el.classList.remove('open');
        } else {
            this.mainEl.classList.add('slide-up');
            this.el.classList.add('open');
        }
    });

    //split 클릭
    this.splitEl.addEventListener('click', e => {
        if(this.el.classList.contains('open')) {
            this.mainEl.classList.remove('slide-up');
            this.el.classList.remove('open');
        } else {
       
            this.mainEl.classList.add('slide-up');
            this.el.classList.add('open');
        }
    });
}

export default SouthView;