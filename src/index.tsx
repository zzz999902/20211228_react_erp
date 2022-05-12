import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'antd/dist/antd.less';
import memoryUtils from './utils/memoryUtils';
import storageUtils from './utils/storageUtils';
import "./mock";
import store from './redux/index'
import { Provider } from 'react-redux'
//将stroe数据保存到自定义的数据模块中
// const user = storageUtils.getUser();
// memoryUtils.user = user

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
