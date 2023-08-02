import React from "react";
import ReactDOM from "react-dom/client";
import "./css/index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";


import "antd/dist/antd.min.css";
// 国际化中文包
import zhCN from 'antd/es/locale/zh_CN';

import { ConfigProvider } from "antd";

// redux 仓库
import store from "./redux/store";
import { Provider } from "react-redux";

import "@toast-ui/editor/dist/toastui-editor.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <ConfigProvider locale={zhCN}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ConfigProvider>
  </Provider>
);
