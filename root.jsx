//----页面和路由的根文件----
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
// import App from './public/reducer/TodoListReducer.jsx';
import Immutable from 'immutable';
import Utils from './src/common/utils.jsx';
import router from './router.jsx';
require('velocity-animate');
require('velocity-animate/velocity.ui');

import './root.less';
//热更新配置
if(module.hot){
    module.hot.accept();
}
ReactDOM.render(
    router,
    document.getElementById('reactRoot')
)