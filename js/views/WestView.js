import View from './View.js';

const WestView = Object.create(View);

WestView.setup = function (el) {
    this.init(el);
    this.createSelector(el);
    this.bindEvents();
    return this;
}

WestView.createSelector = function (el) {
    this.mainEl = document.querySelector('.main');
    this.slideBtnEl = el.querySelector('.west .slide-btn');
    this.expandBtnEls = el.querySelectorAll('.west .expand-btn');
    this.contentItemEls = el.querySelectorAll('.west .content-item');
    this.collapseEl = document.querySelector('.west-collapse');
}

WestView.setActiveTab = function () {

}

WestView.bindEvents = function () {

    //slide 버튼 클릭 이벤트등록
    this.slideBtnEl.addEventListener('click', e => {
        this.mainEl.classList.add('slide-left');
        this.collapseEl.classList.add('open');
    });
    
    //expand 버튼 클릭 이벤트등록
    this.expandBtnEls.forEach((expandBtn, index) => {
        expandBtn.addEventListener('click', e => {
            this.contentItemEls[index].classList.add('expand');
        })
    });
}

WestView.onClickTab = function (tabIndex) {
    this.emit('@changeTab', tabIndex);
}

WestView.onExpand = function (el, index) {

}

export default WestView;