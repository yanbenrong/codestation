import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, List, Popover, Avatar, message } from "antd";
import { useNavigate } from "react-router-dom";

import style from "./index.module.css";
import { clearUserInfo, changeLoginStatus } from "../../redux/userSlice";

export default function LoginAvatar(props) {
  const { isLogin, userInfo } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  let loginStatus = null;

  const listClick = (item) => {
    if (item === "退出登录") {
      localStorage.removeItem("USERTOKEN");
      dispatch(clearUserInfo());
      dispatch(changeLoginStatus(false));
      message.success("退出登录成功");
      navigate("/");
    } else {
      navigate("/personal");
    }
  };
  if (isLogin) {
    loginStatus = (
      <Popover
        content={
          <List
            dataSource={["个人中心", "退出登录"]}
            size="large"
            renderItem={(item) => {
              return (
                <List.Item
                  className={style.pointer}
                  onClick={() => {
                    listClick(item);
                  }}
                >
                  {item}
                </List.Item>
              );
            }}
          ></List>
        }
      >
        <div className={style.avatarContainer + " " + style.pointer}>
          <Avatar size="large" src={userInfo?.avatar}></Avatar>
        </div>
      </Popover>
    );
  } else {
    loginStatus = (
      <Button type="primary" size="large" onClick={props.loginHandle}>
        注册/登录
      </Button>
    );
  }
  return <div>{loginStatus}</div>;
}
