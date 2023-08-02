import { useState, useEffect, useRef } from "react";
import {
  Comment,
  Avatar,
  Form,
  Button,
  List,
  Tooltip,
  message,
  Pagination,
} from "antd";
import { useSelector } from "react-redux";
import { UserOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";

import { Editor } from "@toast-ui/react-editor";
import { getIssueCommentById, addComment } from "../../api/comment";
import { updateIssue } from "../../api/issue";
import { getUserById } from "../../api/user";
import { formatDate } from "../../utils/tools";
import { updateUserInfoAsync } from "../../redux/userSlice";

import styles from "../../css/Discuss.module.css";

export default function Discuss(props) {
  const { userInfo, isLogin } = useSelector((state) => state.user);
  const editorRef = useRef();
  const dispatch = useDispatch();
  const [commentList, setCommentList] = useState([]);
  const [pageInfo, setPageInfo] = useState({
    current: 1, // 当前是第一页
    pageSize: 10, // 每一页显示 10 条数据
    total: 0, // 数据的总条数
  });
  const [refresh, setRefresh] = useState(false);

  // 头像
  let avatar = null;
  if (isLogin) {
    avatar = <Avatar src={userInfo.avatar} />;
  } else {
    avatar = <Avatar icon={<UserOutlined />} />;
  }

  useEffect(() => {
    if (props.targetId) {
      fetchCommentData();
    }
  }, [props.targetId, refresh, pageInfo.current, pageInfo.pageSize]);
  const pageChange = (page, pageSize) => {
    setPageInfo({ ...pageInfo, current: page, pageSize: pageSize });
    // fetchCommentData();
  };
  const fetchCommentData = async () => {
    const { commentType, targetId } = props;

    let commentData = null;
    if (commentType === 1) {
      // 问答
      const res = await getIssueCommentById(targetId, {
        current: pageInfo.current,
        pageSize: pageInfo.pageSize,
      });
      if (res.data) {
        commentData = res.data.data;
        const { currentPage, count, eachPage } = res.data;
        setPageInfo({
          current: currentPage, // 当前是第一页
          pageSize: eachPage, // 每一页显示 10 条数据
          total: count, // 数据的总条数
        });
      }
    } else {
      // 书籍
    }
    for (let index = 0; index < commentData.length; index++) {
      const item = commentData[index];
      const res = await getUserById(item.userId);
      if (res.data) {
        item.userInfo = res.data;
      }
    }
    // commentData?.forEach(async (item) => {
    //   const res = await getUserById(item.userId);
    //   if (res.data) {
    //     item.userInfo = res.data;
    //   }
    // });
    setCommentList(commentData);
  };
  // 提交评论
  const onSubmit = async () => {
    const { commentType, issueInfo, targetId } = props;
    let commentContent = null;
    if (commentType === 1) {
      commentContent = editorRef.current.getInstance().getHTML();
      if (commentContent === "<p><br></p>") {
        commentContent = "";
      }
    } else {
    }

    if (!commentContent) {
      message.warning("评论不可为空");
    }

    const commentReqData = {
      userId: userInfo._id,
      typeId: issueInfo.typeId,
      commentContent,
      commentType,
      issueId: commentType === 1 ? targetId : null,
      bookId: commentType === 2 ? targetId : null,
    };
    const res = await addComment(commentReqData);
    if (res.data) {
      message.success("评论成功");
      editorRef.current.getInstance().reset();
      setRefresh(!refresh);

      // 更新问答
      updateIssue(targetId, { commentNumber: ++issueInfo.commentNumber });
      // 更新积分
      let newPoint = userInfo.points;
      dispatch(
        updateUserInfoAsync({
          id: userInfo._id,
          newinfo: {
            ...userInfo,
            points: ++newPoint,
          },
        })
      );
    }
  };
  return (
    <div>
      {/* 评论框 */}
      <Comment
        avatar={avatar}
        content={
          <>
            <Form.Item>
              <Editor
                initialValue=""
                previewStyle="vertical"
                height="270px"
                initialEditType="wysiwyg"
                useCommandShortcut={true}
                language="zh-CN"
                ref={editorRef}
                className="editor"
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" disabled={!isLogin} onClick={onSubmit}>
                添加评论
              </Button>
            </Form.Item>
          </>
        }
      />

      {/* 评论列表 */}

      {commentList?.length > 0 && (
        <List
          header="当前评论"
          dataSource={commentList}
          renderItem={(item) => {
            return (
              <Comment
                avatar={<Avatar src={item?.userInfo?.avatar} />}
                author={<a>{item?.userInfo?.nickname}</a>}
                content={
                  <div
                    dangerouslySetInnerHTML={{ __html: item.commentContent }}
                  ></div>
                }
                datetime={
                  <Tooltip title={formatDate(item.commentDate, "year")}>
                    <span>{formatDate(item.commentDate, "year")}</span>
                  </Tooltip>
                }
              />
            );
          }}
        />
      )}

      {/* 分页 */}
      {commentList.length > 0 ? (
        <div className={styles.paginationContainer}>
          <Pagination
            showQuickJumper
            defaultCurrent={1}
            total={pageInfo.total}
            onChange={pageChange}
          />
        </div>
      ) : (
        <div
          style={{
            fontWeight: "200",
            textAlign: "center",
            margin: "50px",
          }}
        >
          暂无评论
        </div>
      )}
    </div>
  );
}
