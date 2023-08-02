import React, { useEffect, useState } from "react";
import { Tag } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import styles from "../../css/IssueItem.module.css";
import { formatDate } from "../../utils/tools";
import { getTypeList } from "../../redux/typeSlice";
import { getUserById } from "../../api/user";

export default function IssueItem(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { typeList } = useSelector((state) => state.type);
  const colorArr = [
    "#108ee9",
    "#2db7f5",
    "#f50",
    "green",
    "#87d068",
    "blue",
    "red",
    "purple",
  ];
  useEffect(() => {
    fetchUserInfo(props.issueInfo.userId);
    if (typeList.length === 0) {
      dispatch(getTypeList());
    }
  }, []);

  const [userInfo, setUserInfo] = useState({});
  const fetchUserInfo = async (id) => {
    const res = await getUserById(id);
    if (res.data) {
      setUserInfo(res.data);
    }
  };

  const type = typeList.find((item) => item._id === props.issueInfo.typeId);

  return (
    <div className={styles.container}>
      {/* 回答数 */}
      <div className={styles.issueNum}>
        <div>{props.issueInfo.commentNumber}</div>
        <div>回答</div>
      </div>
      {/* 浏览数 */}
      <div className={styles.issueNum}>
        <div>{props.issueInfo.scanNumber}</div>
        <div>浏览</div>
      </div>
      {/* 问题内容 */}
      <div className={styles.issueContainer}>
        <div
          className={styles.top}
          onClick={() => {
            navigate(`/issueDetail/${props.issueInfo._id}`);
          }}
        >
          {props.issueInfo.issueTitle}
        </div>
        <div className={styles.bottom}>
          <div className={styles.left}>
            <Tag color={colorArr[typeList.indexOf(type) % colorArr.length]}>
              {type?.typeName}
            </Tag>
          </div>
          <div className={styles.right}>
            <Tag color="volcano">{userInfo.nickname}</Tag>
            <span>{formatDate(props.issueInfo.issueDate, "year")}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
