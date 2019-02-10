import View from './View.js';

const WestView = Object.create(View);

WestView.setup = function (el) {
    this.init(el);
    this.slideBtnEl = el.querySelector('.slide-btn');
    this.bindEvents();
    return this;
}

WestView.setActiveTab = function () {

}

WestView.bindEvents = function () {
    this.slideBtnEl.addEventListener('click', e => {
        this.el.classList.remove('opened');
        this.el.classList.add('closed');
    });

    // const tabsEl = this.el.querySelectorAll('.tabs');
    // const tabs = Array.from(tabsEl[0].children);

    // tabs.forEach(tabEl =>
    //     tabEl.addEventListener('click', e => {
    //         const tabIndex = tabs.indexOf(tabEl);
    //         this.onClickTab(tabIndex);
    //     })
    // );
}

WestView.onClickTab = function (tabIndex) {
    this.emit('@changeTab', tabIndex);
}

export default WestView;