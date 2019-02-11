import EastView from './../views/EastView.js';

const East = {
    init() {
        EastView.setup(document.querySelector('.east'))
            .on('@changeTab', e => this.onChangeTab(e.detail))

            this.selectedTab = 0;
            this.renderView();
    },

    renderView() {
        EastView.setActiveTab(this.selectedTab);
        this.getTabContents();
    },

    onChangeTab(index) {
        this.selectedTab = index;
        this.renderView();
    },

    getTabContents() {

    }
};

export default East;