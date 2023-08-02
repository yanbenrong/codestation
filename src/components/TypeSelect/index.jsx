import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Tag } from "antd";

import { getTypeList, updateIssueTypeId } from "../../redux/typeSlice";

export default function TypeSelect() {
  const { typeList } = useSelector((state) => state.type);
  const dispatch = useDispatch();

  const [tagContainer, setTagContainer] = useState([]);

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
    if (typeList.length === 0) {
      dispatch(getTypeList());
    } else {
      const arr = [];
      arr.push(
        <Tag
          color="magenta"
          value="all"
          key="all"
          style={{ cursor: "pointer" }}
          onClick={() => changeType("all")}
        >
          全部
        </Tag>
      );
      for (let i = 0; i < typeList.length; i++) {
        arr.push(
          <Tag
            color={colorArr[i % colorArr.length]}
            value={typeList[i]._id}
            key={typeList[i]._id}
            style={{ cursor: "pointer" }}
            onClick={() => changeType(typeList[i]._id)}
          >
            {typeList[i].typeName}
          </Tag>
        );
      }
      setTagContainer(arr);
    }
  }, [typeList]);

  const changeType = (id) => {
    if (location.pathname === "/issues") {
      dispatch(updateIssueTypeId(id));
    } else if (location.pathname === "/books") {
    }
  };

  return <div>{tagContainer}</div>;
}
