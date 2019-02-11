import View from './View.js';

const SouthView = Object.create(View);

SouthView.setup = function (el) {
    this.init(el);
    this.slideBtnEl = el.querySelector('.south .slide-btn');
    this.bindEvents();
    return this;
}

SouthView.bindEvents = function () {

    //Slide 버튼 이벤트드록
    this.slideBtnEl.addEventListener('click', e => {
        this.el.classList.remove('opened');
        this.el.classList.add('closed');
    });
}

export default SouthView;