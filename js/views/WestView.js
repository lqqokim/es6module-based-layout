import View from './View.js';

const WestView = Object.create(View);

CenterView.setup = function (el) {
    this.init(el);
    this.bindEvents();
    return this;
}

CenterView.setActiveTab = function () {

}

CenterView.bindEvents = function () {
    const tabsEl = this.el.querySelectorAll('.tabs');
    const tabs = Array.from(tabsEl[0].children);

    tabs.forEach(tabEl =>
        tabEl.addEventListener('click', e => {
            const tabIndex = tabs.indexOf(tabEl);
            this.onClickTab(tabIndex);
        })
    );
}

CenterView.onClickTab = function (tabIndex) {
    this.emit('@changeTab', tabIndex);
}

export default WestView;