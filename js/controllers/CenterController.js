import CenterView from '../views/CenterView.js';
import CenterModel from './../models/CenterModel.js';

const Center = {
    init() {
        CenterView.setup(document.querySelector('.center'))
            .on('@changeTab', e => this.onChangeTab(e))
            .on('@closeTab', e => this.onCloseTab(e));

        this.selectedTab = 0; //초기에 첫번째 탭선택
        this.renderView(); //Tab을 그린다
    },

    renderView() {
        CenterView.setActiveTab(this.selectedTab);
        this.getTabContents();
    },

    onChangeTab(e) {
        this.selectedTab = e.detail;
        this.renderView();
    },

    onCloseTab(e) {
        this.selectedTab = e.detail + 1; //Tab 삭제하면 다음Tab이 활성화
        this.renderView();
    },

    getTabContents() {
        CenterModel.getData(this.selectedTab)
            .then(data => CenterView.appendContent(data));
    }
}

export default Center;