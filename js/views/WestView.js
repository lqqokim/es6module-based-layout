import View from './View.js';

const WestView = Object.create(View);

WestView.setup = function (el) {
    this.init(el);
    this.slideBtnEl = el.querySelector('.west .slide-btn');
    this.expandBtnEls = el.querySelectorAll('.west .expand-btn');
    this.bindEvents();
    return this;
}

WestView.setActiveTab = function () {

}

WestView.bindEvents = function () {

    //slide 버튼 클릭 이벤트등록
    this.slideBtnEl.addEventListener('click', e => {
        this.el.classList.remove('opened');
        this.el.classList.add('closed');
    });
    
    //expand 버튼 클릭 이벤트등록
    this.expandBtnEls.forEach((expandBtn, index) => {
        expandBtn.addEventListener('click', e => {
            this.onExpand(expandBtn, index);
        })
    });
}

WestView.onClickTab = function (tabIndex) {
    this.emit('@changeTab', tabIndex);
}

WestView.onExpand = function (el, index) {
    console.log(el, index);
}

export default WestView;