import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Tree, BackTop } from "antd";

import PageHeader from "../components/PageHeader";
import { getInterviewTitleAsync } from "../redux/interviewSlice";
import { getTypeList } from "../redux/typeSlice";
import { getInterviewById } from "../api/interview";

import styles from "../css/Interview.module.css";



export default function Interviews() {
  const dispatch = useDispatch();
  const { interviewTitle } = useSelector((state) => state.interview);
  const { typeList } = useSelector((state) => state.type);

  const [treeData, setTreeData] = useState([]);
  const [interviewInfo, setInterviewInfo] = useState(null);

  useEffect(() => {
    if (!interviewTitle.length) {
      dispatch(getInterviewTitleAsync());
    }
    if (!typeList.length) {
      dispatch(getTypeList());
    }
    if (typeList.length && interviewTitle.length) {
      const arr = []; // 最终组装的数据会放入到该数组中
      // 添加分类标题
      for (let i = 0; i < typeList.length; i++) {
        arr.push({
          title: <h3 style={{ fontWeight: "200" }}>{typeList[i].typeName}</h3>,
          key: i,
        });
      }
      // 每一个分类下面的面试题标题
      for (let i = 0; i < interviewTitle.length; i++) {
        const childArr = [];
        for (let j = 0; j < interviewTitle[i].length; j++) {
          childArr.push({
            title: (
              <h4
                style={{ fontWeight: "200" }}
                onClick={() => clickHandle(interviewTitle[i][j]._id)}
              >
                {interviewTitle[i][j].interviewTitle}
              </h4>
            ),
            key: `${i}-${j}`,
          });
        }
        arr[i].children = childArr;
      }
      setTreeData(arr);
    }
  }, [typeList, interviewTitle]);


  async function clickHandle(id) {
    const { data } = await getInterviewById(id);
    setInterviewInfo(data);
}


let interviewRightSide = null;
if (interviewInfo) {
    // 赋值为面试题的内容
    interviewRightSide = (
        <div className={styles.content}>
            <h1 className={styles.interviewRightTitle}>{interviewInfo?.interviewTitle}</h1>
            <div className={styles.contentContainer}>
                <div dangerouslySetInnerHTML={{ __html: interviewInfo?.interviewContent }}></div>
            </div>
        </div>
    );
} else {
    interviewRightSide = (
        <div style={{
            textAlign: "center",
            fontSize: "40px",
            fontWeight: "100",
            marginTop: "150px"
        }}>
            请在左侧选择面试题
        </div>
    )
}

  return (
    <div className={styles.container}>
      <PageHeader title="面试题大全" />
      <div className={styles.interviewContainer}>
        <div className={styles.leftSide}>
          <Tree treeData={treeData} />
        </div>
        <div className={styles.rightSide}>{interviewRightSide}</div>
      </div>
      <BackTop />
    </div>
  );
}
