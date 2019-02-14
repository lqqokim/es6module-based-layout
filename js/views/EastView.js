import View from './View.js';

const EastView = Object.create(View);

EastView.setup = function (el) {
    this.el = el;
    this.createSelector(el);
    this.bindEvents();
    return this;
}

EastView.createSelector = function (el) {
    this.mainEl = document.querySelector('.main');
    this.tabEls = el.querySelectorAll('.tab');
    this.tabContentEls = el.querySelectorAll('.tabcontent');
    this.closeEl = el.querySelector('.close');
    this.slideBtnEl = el.querySelector('.slide-btn');
    this.collapseEl = document.querySelector('.east-collapse');
    this.collapseBtnEl = document.querySelector('.east-collapse .slide-btn');
    this.tableEl = el.querySelector('table');
    this.splitEl = el.querySelector('.split-slider');
    this.collapseSplitEl = document.querySelector('.east-collapse .split-slider');
    this.tableHeadEls = el.querySelectorAll('th');
    this.activeEl = el.querySelector('active');
}

//이벤트 등록
EastView.bindEvents = function () {
    const tabsElList = Array.from(this.tabEls);

    //tab 클릭
    this.tabEls.forEach((tabEl, index) => {
        tabEl.addEventListener('click', e => {
            this.selectedIndex !== index && this.onClickTab(index);
        });
    });

    //close 클릭
    this.closeEl.addEventListener('click', e => {
        e.stopPropagation(); //Close버튼 눌렀을때 Tab 클릭에 대한 이벤트 버블링 방지
        const tabIndex = tabsElList.indexOf(this.closeEl.parentNode);
        this.closeTab(tabIndex);
    });

    //slide 버튼 클릭
    this.slideBtnEl.addEventListener('click', e => {
        this.openSide();
    });

    this.collapseBtnEl.addEventListener('click', e => {
        this.closeSide();
    });

    //split 클릭
    this.splitEl.addEventListener('click', (e) => {
        this.el.classList.contains('open') ? this.closeSide() : this.openSide();
    });

    this.collapseSplitEl.addEventListener('click', e => {
        this.closeSide();
    });

    //table header 클릭
    this.tableHeadEls.forEach((tableHeadEl, index) => {
        const tableHeadList = Array.from(this.tableHeadEls);

        tableHeadEl.addEventListener('click', e => {
            const selectedSortBtnEl = tableHeadEl.children[1];
            if (!tableHeadEl.classList.contains('active')) {
                for (let i = 0; i < tableHeadList.length; i++) {
                    if (tableHeadList[i].classList.contains('active')) {
                        tableHeadList[i].classList.remove('asc');
                        tableHeadList[i].classList.remove('desc');
                        tableHeadList[i].classList.remove('active');
                    }
                }

                tableHeadEl.classList.add('active');
                tableHeadEl.children[1].classList.add('asc');
            } else {
                let sortType;

                if (selectedSortBtnEl.classList.contains('asc')) {
                    selectedSortBtnEl.classList.remove('asc');
                    selectedSortBtnEl.classList.add('desc');
                    sortType = 'desc';
                } else if (!selectedSortBtnEl.classList.contains('asc')) {
                    selectedSortBtnEl.classList.remove('desc');
                    selectedSortBtnEl.classList.add('asc');
                    sortType = 'asc';
                }

                const colname = tableHeadEl.classList.value.replace('active', '');
                this.sortGridData(this.datas, sortType, colname.trim());
            }
        })
    })
}

//선택한 tab에 대한 활성화
EastView.setActiveTab = function (selectedIndex) {
    this.selectedIndex = selectedIndex;
    this.tabEls.forEach((tabEl, index) => {
        if (index === selectedIndex) {
            tabEl.classList.add('active');
            this.onchangeContent(selectedIndex);
        } else {
            tabEl.classList.remove('active');
        }
    });
}

//tab 선택에 따른 content변경
EastView.onchangeContent = function (selectedIndex) {
    this.tabContentEls.forEach((tabContentEl, index) => {
        if (selectedIndex === index) {
            tabContentEl.style.display = 'block';
        } else {
            tabContentEl.style.display = 'none';
        }
    });
}

//grid data로 테이블 생성
EastView.drawGrid = function (datas) {
    this.datas = datas;
    const tableEl = document.querySelector('table');

    datas.map(data => {
        const row = document.createElement("tr");
        const col_name = document.createElement("td");
        const col_value = document.createElement("td");

        col_name.innerText = data.name;
        col_value.innerText = data.value;

        row.appendChild(col_name);
        row.appendChild(col_value);
        row.classList.add('row'); 

        tableEl.appendChild(row);
    });
}

//grid data sorting 
EastView.sortGridData = function (gridData, type, key) {
    if (type === "asc") {
        gridData.sort((a, b) => {
            if (a[key] > b[key]) return 1;
            if (a[key] < b[key]) return -1;
            return 0;
        })
    } else if (type === 'desc') {
        gridData.sort((a, b) => {
            if (a[key] < b[key]) return 1;
            if (a[key] > b[key]) return -1;
            return 0;
        })
    }

    Array.from(this.el.querySelectorAll('tr'), (el) => {
        if (el.classList.contains('row')) { //header는 남기고 row class를 가진 것만 제거
            el.remove();
        }
    });

    this.drawGrid(gridData);
}

EastView.closeSide = function () {
    this.mainEl.classList.remove('slide-right');
    this.collapseEl.classList.remove('open');
}

EastView.openSide = function () {
    this.mainEl.classList.add('slide-right');
    this.collapseEl.classList.add('open');
}

EastView.onClickTab = function (index) {
    this.emit('@changeTab', index);
}

EastView.closeTab = function (selectedIndex) {
    this.tabEls[selectedIndex].style.display = 'none';
    this.onchangeContent(selectedIndex);
    this.emit('@closeTab', selectedIndex);
}

export default EastView;