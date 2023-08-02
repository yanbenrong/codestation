import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Avatar } from "antd";

import { formatDate } from "../utils/tools";
import { getIssueById } from "../api/issue";
import { getUserById } from "../api/user";
import PageHeader from "../components/PageHeader";
import Recommend from "../components/Recommend";
import ScoreRank from "../components/ScoreRank";
import Discuss from "../components/Discuss";

import styles from "../css/IssueDetail.module.css";

export default function issueDetail() {
  const { id } = useParams();

  const [issueInfo, setIssueInfo] = useState({});
  const [issueUser, setIssueUser] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const res = await getIssueById(id);
      if (res?.data) {
        setIssueInfo(res.data);
        const result = await getUserById(res.data.userId);
        if (result.data) {
          setIssueUser(result.data);
        }
      }
    };
    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      <PageHeader title="问题详情" />
      <div className={styles.detailContainer}>
        {/* 左侧 */}
        <div className={styles.leftSide}>
          {/* 左上方：问答详情 */}
          <div className={styles.question}>
            {/* 标题 */}
            <h1>{issueInfo?.issueTitle}</h1>
            {/* 提问人信息：头像、昵称、提问时间 */}
            <div className={styles.questioner}>
              <Avatar size="small" src={issueUser?.avatar} />
              <span className={styles.user}>{issueUser?.nickname}</span>
              <span>发布于：{formatDate(issueInfo?.issueDate)}</span>
            </div>
            {/* 问题详情 */}
            <div className={styles.content}>
              <div
                dangerouslySetInnerHTML={{ __html: issueInfo?.issueContent }}
              ></div>
            </div>
          </div>
          {/* 左下方：评论 */}
          <Discuss
            commentType={1}
            targetId={issueInfo?._id}
            issueInfo={issueInfo}
          />
        </div>
        {/* 右侧 */}
        <div className={styles.rightSide}>
          <div style={{ marginBottom: 20 }}>
            <Recommend />
          </div>
          <div style={{ marginBottom: 20 }}>
            <ScoreRank />
          </div>
        </div>
      </div>
    </div>
  );
}
