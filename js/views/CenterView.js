import View from './View.js';

const CenterView = Object.create(View);

CenterView.setup = function (el) {
    this.tabEls = el.querySelectorAll('.center .tab');
    this.closeEl = el.querySelector('.tab .close');
    this.contentEl = el.querySelector('.center .content');

    this.init(el);
    this.bindEvents();
    return this;
}

CenterView.bindEvents = function () {
    const tabsElList =  Array.from(this.tabEls);

    //Tab 클릭 이벤트등록
    this.tabEls.forEach((tabEl, index) => {
        tabEl.addEventListener('click', e => {
            this.onClickTab(index);
        });
    });

    //close 클릭 이벤트등록
    this.closeEl.addEventListener('click', e => {
        e.stopPropagation(); //Close버튼 눌렀을때 Tab 클릭에 대한 이벤트 버블링 방지
        const tabIndex = tabsElList.indexOf(this.closeEl.parentNode);
        this.closeTab(tabIndex);
    });
}

CenterView.onClickTab = function (index) {
    this.emit('@changeTab', index);
}

CenterView.setActiveTab = function (selectedIndex) {
    this.tabEls.forEach((tabEl, index) => {
        index === selectedIndex ? tabEl.classList.add('active') : tabEl.classList.remove('active');
    });
}

CenterView.closeTab = function (tabIndex) {
    this.tabEls[tabIndex].style.display = 'none';
    this.emit('@closeTab', tabIndex);
}

CenterView.appendContent = function (data) {
    this.contentEl.innerHTML = data;
}

export default CenterView;