import React, { useRef, useState, useEffect } from "react";
import { Form, Input, Select, Button, message } from "antd";
import { Editor } from "@toast-ui/react-editor";
import { useSelector, useDispatch } from "react-redux";
import { getTypeList } from "../redux/typeSlice";
import { useNavigate } from "react-router-dom";

import styles from "../css/AddIssue.module.css";
import { typeOptionCreator } from "../utils/tools";
import { addIssue } from "../api/issue";

export default function AddIssue() {
  const formRef = useRef();
  const editorRef = useRef();

  const { typeList } = useSelector((state) => state.type);
  const { userInfo } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [issueInfo, setIssueInfo] = useState({
    issueTitle: "",
    issueContent: "",
    userId: "",
    typeId: "",
  });

  useEffect(() => {
    if (!typeList.length) {
      // 派发 action 来发送请求，获取到数据填充到状态仓库
      dispatch(getTypeList());
    }
  }, []);

  const addHandle = async () => {
    const content = editorRef.current.getInstance().getHTML();
    const res = await addIssue({
      ...issueInfo,
      issueContent: content,
      userId: userInfo._id,
    });
    if (res.data) {
      navigate("/");
      message.success("已新增成功,待审核");
    }
  };
  const handleChange = (value) => {
    updateInfo(value, "typeId");
  };
  const updateInfo = (newContent, key) => {
    const newIssueInfo = { ...issueInfo };
    newIssueInfo[key] = newContent;
    setIssueInfo(newIssueInfo);
  };
  return (
    <div className={styles.container}>
      <Form
        name="basic"
        initialValues={issueInfo}
        autoComplete="off"
        ref={formRef}
        onFinish={addHandle}
      >
        {/* 问答标题 */}
        <Form.Item
          label="标题"
          name="issueTitle"
          rules={[{ required: true, message: "请输入标题" }]}
        >
          <Input
            placeholder="请输入标题"
            size="large"
            value={issueInfo?.issueTitle}
            onChange={(e) => updateInfo(e.target.value, "issueTitle")}
          />
        </Form.Item>

        {/* 问题类型 */}
        <Form.Item
          label="问题分类"
          name="typeId"
          rules={[{ required: true, message: "请选择问题所属分类" }]}
        >
          <Select style={{ width: 200 }} onChange={handleChange}>
            {typeOptionCreator(Select, typeList)}
          </Select>
        </Form.Item>

        {/* 问答内容 */}
        <Form.Item
          label="问题描述"
          name="issueContent"
          rules={[{ required: true, message: "请输入问题描述" }]}
        >
          <Editor
            initialValue=""
            previewStyle="vertical"
            height="600px"
            initialEditType="wysiwyg"
            useCommandShortcut={true}
            language="zh-CN"
            ref={editorRef}
          />
        </Form.Item>

        {/* 确认按钮 */}
        <Form.Item wrapperCol={{ offset: 3, span: 16 }}>
          <Button type="primary" htmlType="submit">
            确认新增
          </Button>

          <Button type="link" htmlType="submit" className="resetBtn">
            重置
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
