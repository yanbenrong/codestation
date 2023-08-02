import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import PageHeader from "../components/PageHeader";
import AddIssue from "../components/AddIssue";
import Recommend from "../components/Recommend";
import ScoreRank from "../components/ScoreRank";
import SearchResultItem from "../components/SearchResultItem";

import { getIssueByPage } from "../api/issue";

import styles from "../css/SearchPage.module.css";

export default function SearchPage(props) {
  const location = useLocation();

  const [searchResult, setSearchResult] = useState([]);
  const [pageInfo, setPageInfo] = useState({
    current: 1,
    pageSize: 15,
    total: 0,
  });

  useEffect(() => {
    async function fetchData(state) {
      const { value, searchOption } = state;
      let searchParams = {
        current: pageInfo.current,
        pageSize: pageInfo.pageSize,
        issueStatus: true,
      };
      switch (searchOption) {
        case "issue": {
          searchParams.issueTitle = value;
          const { data } = await getIssueByPage(searchParams);
          // 更新搜索结果
          setSearchResult(data?.data);
          // 更新分页信息
          setPageInfo({
            current: data.currentPage,
            pageSize: data.eachPage,
            total: data.count,
          });
          break;
        }
        case "book": {
          // 搜索书籍
          break;
        }
      }
    }
    if (location.state) {
      fetchData(location.state);
    }
  }, [location.state]);
  return (
    <div className="container">
      <PageHeader title="搜索结果" />
      <div className={styles.searchPageContainer}>
        {/* 左边部分 */}
        <div className={styles.leftSide}>
          {searchResult.map((item) => {
            return <SearchResultItem info={item} key={item._id} />;
          })}
        </div>
        {/* 右边部分 */}
        <div className={styles.rightSide}>
          <AddIssue />
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
