import View from './View.js';

const CenterView = Object.create(View);

CenterView.setup = function (el) {
    this.tabsEl = el.querySelectorAll('.tabs');
    this.closeEl = el.querySelector('.tab .close');
    this.contentEl = el.querySelector('.center .content');

    this.init(el);
    this.bindEvents();
    return this;
}

CenterView.bindEvents = function () {
    let tabIndex;
    this.tabs = Array.from(this.tabsEl[0].children);

    //Tab 클릭 이벤트등록
    this.tabs.forEach(tabEl => {
        tabEl.addEventListener('click', e => {
            tabIndex = this.tabs.indexOf(tabEl);
            this.onClickTab(tabIndex);
        });
    });

    //close 클릭 이벤트등록
    this.closeEl.addEventListener('click', e => {
        e.stopPropagation(); //Close버튼 눌렀을때 Tab 클릭에 대한 이벤트 버블링 방지
        const tabIndex = this.tabs.indexOf(this.closeEl.parentNode);
        this.closeTab(tabIndex);
    });
}

CenterView.onClickTab = function (tabIndex) {
    this.emit('@changeTab', tabIndex);
}

CenterView.setActiveTab = function (index) {
    this.tabs.forEach(tabEl => {
        const tabIndex = this.tabs.indexOf(tabEl);
        tabIndex === index ? tabEl.classList.add('active') : tabEl.classList.remove('active');
    });
}

CenterView.closeTab = function (tabIndex) {
    this.tabs[tabIndex].style.display = 'none';
    this.emit('@closeTab', tabIndex);
}

CenterView.appendContent = function (data) {
    this.contentEl.innerHTML = data;
}

export default CenterView;