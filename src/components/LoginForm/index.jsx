import React, { useState, useRef, useEffect } from "react";
import {
  Modal,
  Radio,
  Form,
  Input,
  Row,
  Col,
  Checkbox,
  Button,
  message,
} from "antd";
import { useDispatch } from "react-redux";

import styles from "./index.module.css";
import {
  getCaptcha,
  userIsExist,
  addUser,
  getUserById,
  userLogin,
} from "../../api/user";
import { initUserInfo, changeLoginStatus } from "../../redux/userSlice";

export default function LoginForm(props) {
  const [radioValue, setRadioValue] = useState("login");
  // 登录表单的状态数据
  const [loginInfo, setLoginInfo] = useState({
    loginId: "",
    loginPwd: "",
    captcha: "",
    remember: true,
  });
  // 注册表单的状态数据
  const [registerInfo, setRegisterInfo] = useState({
    loginId: "",
    nickname: "",
    captcha: "",
  });
  const [captcha, setCaptcha] = useState(null);

  const loginFormRef = useRef();
  const registerFormRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    refreshCaptcha();
  }, [props.isModalOpen]);

  // 关闭modal
  const closeModal = () => {
    props.handleIsopen(false);
    setLoginInfo({
      loginId: "",
      loginPwd: "",
      captcha: "",
      remember: false,
    });
    setRegisterInfo({
      loginId: "",
      nickname: "",
      captcha: "",
    });
  };
  // 切换注册登录表单
  const radioChange = (e) => {
    setRadioValue(e.target.value);
    refreshCaptcha();
  };
  /**
   * 更新注册登录表单字段
   * @param {*} oldInfo 之前整体的状态
   * @param {*} newContent 用户输入的新的内容
   * @param {*} key 对应的键名
   * @param {*} setInfo 修改状态值的函数
   */
  const updateInfo = (oldInfo, newContent, key, setInfo) => {
    const obj = { ...oldInfo };
    obj[key] = newContent;
    setInfo(obj);
  };
  // 点击登录
  const loginHandle = async () => {
    console.log("登录提交", loginInfo);
    const res = await userLogin(loginInfo);
    console.log("登录", res);
    if (res.data) {
      // 验证码正确
      const { data } = res.data;
      if (!data) {
        // 账号密码错误
        message.error("账号密码错误");
        refreshCaptcha();
      } else if (!data.enabled) {
        // 账号被冻结
        message.error("账号已被禁用,请联系管理员");
        refreshCaptcha();
      } else {
        // 登录成功
        message.success("登录成功");
        const userInfo = await getUserById(data._id);
        dispatch(initUserInfo(userInfo.data));
        dispatch(changeLoginStatus(true));
        localStorage.USERTOKEN = res.data.token;
        closeModal();
      }
    } else {
      // 验证码错误
      message.error(res.msg);
      refreshCaptcha();
    }
  };
  // 点击注册
  const registerHandle = async () => {
    const res = await addUser(registerInfo);
    console.log("注册", res);

    if (res.data) {
      message.success("用户注册成功,默认密码为 123456");
      dispatch(initUserInfo(res.data));
      dispatch(changeLoginStatus(true));
      closeModal();
    } else {
      message.error(res.msg);
      refreshCaptcha();
    }
  };
  // 验证账号是否已存在
  const checkLoginIdIsExist = async () => {
    if (registerInfo.loginId) {
      const res = await userIsExist(registerInfo.loginId);
      if (res.data) {
        return Promise.reject("该账号已存在!");
      }
    }
  };
  // 点击切换验证码
  const refreshCaptcha = async () => {
    const res = await getCaptcha();
    setCaptcha(res);
  };

  const resetForm = () => {
    console.log("重置");

    setLoginInfo({
      ...loginInfo,
      loginId: "",
      loginPwd: "",
      captcha: "",
      remember: false,
    });
    setRegisterInfo({
      loginId: "",
      nickname: "",
      captcha: "",
    });
  };
  let container = null; // 表达区域

  if (radioValue === "login") {

    // 登录表单
    container = (
      <div className={styles.container}>
        <Form
          name="basic1"
          autoComplete="off"
          ref={loginFormRef}
          onFinish={loginHandle}
        >
          <Form.Item
            label="登录账号"
            rules={[
              {
                required: true,
                message: "请输入账号",
              },
            ]}
          >
            <Input
              placeholder="请输入你的登录账号"
              value={loginInfo.loginId}
              onChange={
                (e) =>
                  updateInfo(loginInfo, e.target.value, "loginId", setLoginInfo)
                // setLoginInfo({ ...loginInfo, loginId: e.target.value })
              }
            />
          </Form.Item>

          <Form.Item
            label="登录密码"
            rules={[
              {
                required: true,
                message: "请输入密码",
              },
            ]}
          >
            <Input.Password
              placeholder="请输入你的登录密码，新用户默认为123456"
              value={loginInfo.loginPwd}
              onChange={(e) =>
                updateInfo(loginInfo, e.target.value, "loginPwd", setLoginInfo)
              }
            />
          </Form.Item>

          {/* 验证码 */}
          <Form.Item
            name="logincaptcha"
            label="验证码"
            rules={[
              {
                required: true,
                message: "请输入验证码",
              },
            ]}
          >
            <Row align="middle">
              <Col span={16}>
                {" "}
                <Input
                  placeholder="请输入验证码"
                  value={loginInfo.captcha}
                  onChange={(e) =>
                    updateInfo(
                      loginInfo,
                      e.target.value,
                      "captcha",
                      setLoginInfo
                    )
                  }
                />
              </Col>
              <Col span={6}>
                <div
                  className={styles.captchaImg}
                  dangerouslySetInnerHTML={{ __html: captcha }}
                  onClick={refreshCaptcha}
                ></div>
              </Col>
            </Row>
          </Form.Item>

          <Form.Item
            name="remember"
            wrapperCol={{
              offset: 5,
              span: 16,
            }}
          >
            <Checkbox
              checked={loginInfo.remember}
              onChange={(e) =>
                updateInfo(
                  loginInfo,
                  e.target.checked,
                  "remember",
                  setLoginInfo
                )
              }
            >
              记住我
            </Checkbox>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 5,
              span: 16,
            }}
          >
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginRight: 20 }}
            >
              登录
            </Button>
            <Button type="primary" onClick={resetForm}>
              重置
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  } else {
    // 注册表单
    container = (
      <div className={styles.container}>
        <Form
          name="basic2"
          autoComplete="off"
          ref={registerFormRef}
          onFinish={registerHandle}
        >
          <Form.Item
            label="登录账号"
            rules={[
              {
                required: true,
                message: "请输入账号，仅此项为必填项",
              },
              // 验证用户是否已经存在
              { validator: checkLoginIdIsExist },
            ]}
            validateTrigger="onBlur"
          >
            <Input
              placeholder="请输入账号"
              value={registerInfo.loginId}
              onChange={(e) =>
                updateInfo(
                  registerInfo,
                  e.target.value,
                  "loginId",
                  setRegisterInfo
                )
              }
            />
          </Form.Item>

          <Form.Item label="用户昵称" >
            <Input
              placeholder="请输入昵称，不填写默认为新用户xxx"
              value={registerInfo.nickname}
              onChange={(e) =>
                updateInfo(
                  registerInfo,
                  e.target.value,
                  "nickname",
                  setRegisterInfo
                )
              }
            />
          </Form.Item>

          <Form.Item
          
            label="验证码"
            rules={[
              {
                required: true,
                message: "请输入验证码",
              },
            ]}
          >
            <Row align="middle">
              <Col span={16}>
                <Input
                  placeholder="请输入验证码"
                  value={registerInfo.captcha}
                  onChange={(e) =>
                    updateInfo(
                      registerInfo,
                      e.target.value,
                      "captcha",
                      setRegisterInfo
                    )
                  }
                />
              </Col>
              <Col span={6}>
                <div
                  className={styles.captchaImg}
                  onClick={refreshCaptcha}
                  dangerouslySetInnerHTML={{ __html: captcha }}
                ></div>
              </Col>
            </Row>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 5,
              span: 16,
            }}
          >
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginRight: 20 }}
            >
              注册
            </Button>
            <Button type="primary" onClick={resetForm}>
              重置
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
  return (
    <Modal
      title="注册/登录"
      open={props.isModalOpen}
      onCancel={closeModal}
      footer={null}
    >
      <Radio.Group
        className={styles.radioGroup}
        defaultValue="login"
        buttonStyle="solid"
        value={radioValue}
        onChange={radioChange}
      >
        <Radio.Button className={styles.radioButton} value="login">
          登录
        </Radio.Button>
        <Radio.Button className={styles.radioButton} value="signIn">
          注册
        </Radio.Button>
      </Radio.Group>
      {container}
    </Modal>
  );
}
