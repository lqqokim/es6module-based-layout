import View from './View.js';

const EastView = Object.create(View);

EastView.setup = function (el) {
    this.init(el);
    this.tabEls = el.querySelectorAll('.east .tab');
    this.tabContentEls = el.querySelectorAll('.east .tabcontent');
    this.closeEl = el.querySelector('.east .close');
    this.slideBtnEl = el.querySelector('.east .slide-btn');
    this.bindEvents();
    return this;
}

EastView.bindEvents = function () {
    const tabsElList =  Array.from(this.tabEls);

    //Tab 클릭 이벤트등록
    this.tabEls.forEach((tabEl, index) => {
        tabEl.addEventListener('click', e => {
            this.selectedIndex !== index && this.onClickTab(index);
        });
    });

    //close 클릭 이벤트등록
    this.closeEl.addEventListener('click', e => {
        e.stopPropagation(); //Close버튼 눌렀을때 Tab 클릭에 대한 이벤트 버블링 방지
        const tabIndex = tabsElList.indexOf(this.closeEl.parentNode);
        this.closeTab(tabIndex);
    });

    //Slide 버튼 이벤트드록
    this.slideBtnEl.addEventListener('click', e => {
        this.el.classList.remove('opened');
        this.el.classList.add('closed');
    });
}

EastView.onClickTab = function (index) {
    this.emit('@changeTab', index);
}

EastView.closeTab = function (selectedIndex) {
    this.tabEls[selectedIndex].style.display = 'none';

    this.onchangeContent(selectedIndex);
    this.emit('@closeTab', selectedIndex);
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

EastView.onchangeContent = function(selectedIndex) {
    this.tabContentEls.forEach((tabContentEl, index) => {
        if(selectedIndex === index) {
            tabContentEl.style.display = 'block';
        } else {
            tabContentEl.style.display = 'none';
        }
    }); 
}

EastView.drawGrid = function(data) {
    console.log(data);
}

EastView.sortGridData = function() {

}

export default EastView;