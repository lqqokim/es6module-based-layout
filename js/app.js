import CenterController from './controllers/CenterController.js';
import WestController from './controllers/WestController.js';
import EastController from './controllers/EastController.js';
import SouthController from './controllers/SouthController.js';

//각 영역에 대한 Controller 초기화
document.addEventListener('DOMContentLoaded', () => {
    CenterController.init();
    WestController.init();
    EastController.init();
    SouthController.init();
});