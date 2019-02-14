import EastView from './../views/EastView.js';
import EastModel from './../models/EastModel.js';

const East = {
    init() {
        EastView.setup(document.querySelector('.east'))
            .on('@changeTab', e => this.onChangeTab(e.detail))
            .on('@closeTab', e => this.onCloseTab(e.detail));

        this.selectedTab = 1;
        this.renderView();
        this.getGridData();
    },

    renderView() {
        EastView.setActiveTab(this.selectedTab);
    },

    onChangeTab(index) {
        this.selectedTab = index;
        this.renderView();
    },

    onCloseTab(index) {
        this.selectedTab = index - 1;
        this.renderView();
    },

    getGridData() {
        EastModel.getGridData()
            .then(data => EastView.drawGrid(data));
    }
};

export default East;