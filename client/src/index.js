import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import zhCN from 'antd/locale/zh_CN';
import { ConfigProvider } from "antd";
import { BrowserRouter } from 'react-router-dom'
import store from './redux/store'
import { Provider } from 'react-redux'
import { httpApi } from './utils'

window.httpApi = httpApi
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <ConfigProvider locale={zhCN}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ConfigProvider>
  </Provider>
);
