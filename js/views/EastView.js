import View from './View.js';

const EastView = Object.create(View);

EastView.setup = function (el) {
    this.init(el);
    this.tabEls = el.querySelectorAll('.east .tab');
    this.tabContentEls = el.querySelectorAll('.east .tabcontent');
    this.closeEl = el.querySelector('.east .close');
    this.bindEvents();
    return this;
}

EastView.bindEvents = function () {
    this.tabEls.forEach((tabEl, index) => {
        tabEl.addEventListener('click', e => {
            this.selectedIndex !== index && this.onClickTab(index);
        });
    });

    this.closeEl.addEventListener('click', e => {
        this.closeTab();
    });
}

EastView.onClickTab = function (index) {
    this.emit('@changeTab', index);
}

EastView.setActiveTab = function (selectedIndex) {
    this.selectedIndex = selectedIndex;
    this.tabEls.forEach((tabEl, index) => {
        if(index === selectedIndex) {
            tabEl.classList.add('active');
            this.onchangeContent(selectedIndex);
        } else {
            tabEl.classList.remove('active');
        }
    });
}

EastView.closeTab = function (tabIndex) {
    this.tabEls[tabIndex].style.display = 'none';
    this.emit('@closeTab', tabIndex);
}

EastView.onchangeContent = function(selectedIndex) {
    this.tabContentEls.forEach((tabContentEl, index) => {
        if(selectedIndex === index) {
            tabContentEl.style.display = 'block';
        } else {
            tabContentEl.style.display = 'none';
        }
    }); 
}

export default EastView;