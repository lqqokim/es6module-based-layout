import View from './View.js';

const WestView = Object.create(View);

WestView.setup = function (el) {
    this.init(el);
    this.createSelector(el);
    this.initContentState();
    this.bindEvents();
    return this;
}

WestView.createSelector = function (el) {
    this.mainEl = document.querySelector('.main');
    this.slideBtnEl = el.querySelector('.slide-btn');
    this.expandBtnEls = el.querySelectorAll('.expand-btn');
    this.contentItemEls = el.querySelectorAll('.content-item');
    this.collapseEl = document.querySelector('.west-collapse');
    this.collapseBtnEl = document.querySelector('.west-collapse .slide-btn');
    this.areaEls = el.querySelectorAll('.area');
}

WestView.initContentState = function () {
    this.expandBtnEls[0].classList.add('change-expand');
    this.contentItemEls[0].classList.add('expand');
}

WestView.bindEvents = function () {

    //slide 버튼 클릭 이벤트
    this.slideBtnEl.addEventListener('click', e => {
        this.mainEl.classList.add('slide-left');
        this.collapseEl.classList.add('open');
    });

    //west collapse에 있는 slide 버튼 클릭 이벤트
    this.collapseBtnEl.addEventListener('click', e => {
        this.mainEl.classList.remove('slide-left');
        this.collapseEl.classList.remove('open');
    });

    //expand 버튼 클릭 이벤트
    const expandBtnEls = this.expandBtnEls;
    expandBtnEls.forEach((expandBtn, index) => {
        expandBtn.addEventListener('click', e => {
            if (!index) { //첫번쩨 아이템
                this.onFirstItemMove(expandBtn, index);
            } else if (this.expandBtnEls.length - 1 === index) { //마지막 아이템
                this.onLastItemMove(expandBtn, index);
            } else {
                this.onNormalItemMove(expandBtn, index);
            }
        });
    });
}

WestView.onFirstItemMove = function (firstBtnEl, index) {
    if (firstBtnEl.classList.contains('change-expand')) { //첫번째 컨텐츠 && expand
        firstBtnEl.classList.remove('change-expand');
        this.contentItemEls[index].classList.remove('expand');

        if (this.contentItemEls[index + 1]) {
            this.expandBtnEls[index + 1].classList.add('change-expand');
            this.contentItemEls[index + 1].classList.add('expand');
        }
    } else if (!firstBtnEl.classList.contains('change-expand')) { //첫번째 컨텐츠 && !expand
        firstBtnEl.classList.add('change-expand');
        this.contentItemEls[index].classList.add('expand');

        for (let i = 0; i < this.expandBtnEls.length; i++) {
            if (i !== index) {
                this.expandBtnEls[i].classList.remove('change-expand');
                this.contentItemEls[i].classList.remove('expand');
            }
        }
    }

}

WestView.onLastItemMove = function (lastBtnEl, index) {
    if (this.expandBtnEls.length - 1 === index && //마지막 컨텐츠 && expand
        lastBtnEl.classList.contains('change-expand')) {
        lastBtnEl.classList.remove('change-expand');
        this.contentItemEls[index].classList.remove('expand');

        if (this.contentItemEls[index - 1]) {
            this.expandBtnEls[index - 1].classList.add('change-expand');
            this.contentItemEls[index - 1].classList.add('expand');
        }
    } else if (this.expandBtnEls.length - 1 === index && //마지막 컨텐츠 && !expand
        !lastBtnEl.classList.contains('change-expand')) {
        lastBtnEl.classList.add('change-expand');
        this.contentItemEls[index].classList.add('expand');

        for (let i = 0; i < this.expandBtnEls.length; i++) {
            if (i !== index) {
                this.expandBtnEls[i].classList.remove('change-expand');
                this.contentItemEls[i].classList.remove('expand');
            }
        }
    }
}

WestView.onNormalItemMove = function (expandBtn, index) {
    if (!expandBtn.classList.contains('change-expand')) {
        expandBtn.classList.add('change-expand');
        this.contentItemEls[index].classList.add('expand');

        if (this.contentItemEls[index + 1]) {
            this.expandBtnEls[index + 1].classList.remove('change-expand');
            this.contentItemEls[index + 1].classList.remove('expand');
        }
    } else {
        expandBtn.classList.remove('change-expand');
        this.contentItemEls[index].classList.remove('expand');

        if (this.contentItemEls[index - 1]) {
            this.expandBtnEls[index - 1].classList.add('change-expand');
            this.contentItemEls[index - 1].classList.add('expand');
        }
    }
}

export default WestView;