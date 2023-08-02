import React, { useEffect, useState } from "react";
import { Pagination, Empty } from "antd";

import PageHeader from "../components/PageHeader";
import styles from "../css/Issue.module.css";
import { getIssueByPage } from "../api/issue";
import IssueItem from "../components/IssueItem";
import AddIssue from "../components/AddIssue";
import Recommend from "../components/Recommend";
import ScoreRank from "../components/ScoreRank";
import TypeSelect from "../components/TypeSelect";
import { useSelector } from "react-redux";

export default function Issues() {
  const { issueTypeId } = useSelector((state) => state.type);

  const [issueData, setIssueData] = useState([]);
  const [pageInfo, setPageInfo] = useState({
    current: 1,
    pageSize: 8,
    total: 0,
  });

  useEffect(() => {
    let searchParams = {
      current: pageInfo.current,
      pageSize: pageInfo.pageSize,
      issueStatus: true,
    };
    if (issueTypeId !== "all") {
      searchParams.typeId = issueTypeId;
      searchParams.current = 1;
    }
    fetchIssue(searchParams);
  }, [pageInfo.current, pageInfo.pageSize, issueTypeId]);

  const handlePageChange = (current, pageSize) => {
    setPageInfo({ ...pageInfo, current, pageSize });
  };
  const fetchIssue = async (params) => {
    const res = await getIssueByPage(params);
    if (res?.data) {
      const { data, currentPage, eachPage, count } = res.data;
      setIssueData(data);
      setPageInfo({
        current: currentPage,
        pageSize: eachPage,
        total: count,
      });
    }
  };
  const issueList = issueData.map((item, index) => {
    return <IssueItem key={index} issueInfo={item}></IssueItem>;
  });
  return (
    <div className={styles.container}>
      {/* 上面的头部 */}
      <PageHeader title="问答列表">
        <TypeSelect></TypeSelect>
      </PageHeader>
      {/* 下面的列表内容区域 */}
      <div className={styles.issueContainer}>
        {/* 左边区域 */}
        <div className={styles.leftSide}>
          {issueData.length > 0 ? issueList : <Empty />}
          <div className="paginationContainer">
            {issueData.length > 0 ? (
              <Pagination
                showQuickJumper
                defaultCurrent={1}
                {...pageInfo}
                onChange={handlePageChange}
              />
            ) : (
              ""
            )}
          </div>
        </div>
        {/* 右边区域 */}
        <div className={styles.rightSide}>
          <AddIssue></AddIssue>
          <Recommend />
          <ScoreRank />
        </div>
      </div>
    </div>
  );
}
