import CenterView from '../views/CenterView.js';
import CenterModel from './../models/CenterModel.js';

const Center = {
    init() {
        CenterView.setup(document.querySelector('.center'))
            .on('@changeTab', e => this.onChangeTab(e.detail))
            .on('@closeTab', e => this.onCloseTab(e.detail));

        this.selectedTab = 0; //초기에 첫번째 탭선택
        this.renderView(); //Tab을 그린다
    },

    renderView() {
        CenterView.setActiveTab(this.selectedTab);
        this.getTabContents();
    },

    onChangeTab(index) {
        this.selectedTab = index;
        this.renderView();
    },

    onCloseTab(index) {
        this.selectedTab = index + 1;
        this.renderView();
    },

    getTabContents() {
        CenterModel.getData(this.selectedTab)
            .then(data => CenterView.appendContent(data));
    }
}

export default Center;