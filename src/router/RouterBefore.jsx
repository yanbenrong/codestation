import React from "react";
import Router from "./index";
import { useLocation } from "react-router-dom";
import { Alert } from "antd";

import RouteBeforeConfig from "./RouteBeforeConfig";
import { useSelector } from "react-redux";

export default function RouterBefore() {
  const location = useLocation();

  const { isLogin } = useSelector((state) => state.user);
  const pathInfo = RouteBeforeConfig.filter((item) => {
    return item.path === location.pathname;
  })[0];

  if (pathInfo?.needLogin && !isLogin) {
    return (
      <Alert
        message="请先登录"
        type="warning"
        closable
        style={{
          marginTop: "30px",
          marginBottom: "30px",
        }}
      />
    );
  }
  return <Router></Router>;
}
