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
    this.slideBtnEl = el.querySelector('.south .slide-btn');
}

SouthView.bindEvents = function () {

    //Slide 버튼 이벤트 등록
    this.slideBtnEl.addEventListener('click', e => {
        this.mainEl.classList.add('slide-up');
        this.el.classList.add('opened');
    });
}

export default SouthView;