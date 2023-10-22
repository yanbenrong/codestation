import { Layout, message } from "antd";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import "./css/App.css";
import NavHeader from "./components/NavHeader";
import PageFooter from "./components/PageFooter";
import RouterBefore from "./router/RouterBefore";
import LoginForm from "./components/LoginForm";
import { getUserInfo, getUserById } from "./api/user";
import { initUserInfo, changeLoginStatus } from "./redux/userSlice";

const { Header, Footer, Content } = Layout;

function App() {
  let test = 123;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        if (!localStorage.USERTOKEN) return;
        const res = await getUserInfo();
        if (res.data) {
          const { data } = await getUserById(res.data._id);
          dispatch(initUserInfo(data));
          dispatch(changeLoginStatus(true));
        } else {
          message.warning(res.msg);
          localStorage.removeItem("USERTOKEN");
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserInfo();
  });

  // 登录按钮
  const loginHandle = () => {
    setIsModalOpen(true);
  };
  // 登录modal是否打开
  const handleIsopen = (value) => {
    setIsModalOpen(value);
  };

  return (
    <div className="App">
      <Header>
        <NavHeader loginHandle={loginHandle}></NavHeader>
      </Header>
      <Content className="content">
        <RouterBefore />
      </Content>
      <Footer className="footer">
        <PageFooter></PageFooter>
      </Footer>
      <LoginForm
        isModalOpen={isModalOpen}
        handleIsopen={handleIsopen}
      ></LoginForm>
    </div>
  );
}

export default App;
