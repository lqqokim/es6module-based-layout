import View from './View.js';

const CenterView = Object.create(View);

CenterView.setup = function (el) {
    this.init(el);
    this.createSelector(el)
    this.bindEvents();
    return this;
}

CenterView.createSelector = function (el) {
    this.tabsEl = el.querySelector('.tabs');
    this.tabEls = el.querySelectorAll('.tab');
    this.closeEl = el.querySelector('.close');
    this.contentEl = el.querySelector('.content');
    this.leftMoveBtnEl = el.querySelector('.left-btn');
    this.rightMoveBtnEl = el.querySelector('.right-btn');
}

CenterView.bindEvents = function () { //이벤트 등록
    const tabsElList = Array.from(this.tabEls);

    //Resize에 의한 스크롤 버튼 생성
    window.addEventListener('resize', e => {
        console.log(this.tabEls[0].offsetWidth + this.tabEls[1].offsetWidth)
        if (this.tabEls[0].offsetWidth + this.tabEls[1].offsetWidth
            > this.tabsEl.offsetWidth) {
            this.leftMoveBtnEl.classList.add('visible');
            this.rightMoveBtnEl.classList.add('visible');
            this.tabsEl.classList.add('add-margin');
        } else {
            this.leftMoveBtnEl.classList.remove('visible');
            this.rightMoveBtnEl.classList.remove('visible');
            this.tabsEl.classList.remove('add-margin');
        }
    });

    //Tab 클릭 이벤트
    this.tabEls.forEach((tabEl, index) => {
        tabEl.addEventListener('click', e => {
            this.onClickTab(index);
        });
    });

    //close 클릭 이벤트
    this.closeEl.addEventListener('click', e => {
        e.stopPropagation(); //Close버튼 눌렀을때 Tab 클릭에 대한 이벤트 버블링 방지
        const tabIndex = tabsElList.indexOf(this.closeEl.parentNode);
        this.closeTab(tabIndex);
    });
}

CenterView.onClickTab = function (index) {
    this.emit('@changeTab', index);
}

CenterView.closeTab = function (tabIndex) {
    this.leftMoveBtnEl.classList.remove('visible');
    this.rightMoveBtnEl.classList.remove('visible');
    this.tabsEl.classList.remove('add-margin');
    this.tabEls[tabIndex].style.display = 'none';
    this.emit('@closeTab', tabIndex);
}

CenterView.setActiveTab = function (selectedIndex) {
    console.log(this);
    this.tabEls.forEach((tabEl, index) => {
        index === selectedIndex
            ? tabEl.classList.add('active') : tabEl.classList.remove('active');
    });
}

CenterView.appendContent = function (data) {
    this.contentEl.innerHTML = data;
}

export default CenterView;