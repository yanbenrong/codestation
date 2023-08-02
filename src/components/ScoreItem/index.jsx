import { useState } from "react";
import { Avatar } from "antd";
import classname from "classnames";
import styles from "../../css/ScoreItem.module.css";

function ScoreItem(props) {
  const [classNameCollection] = useState({
    iconfont: true,
    "icon-jiangbei": true,
  });
  const colors = ["#ffda23", "#c5c5c5", "#cd9a62"];
  const rankNum = () => {
    if ([1, 2, 3].includes(props.rank)) {
      return (
        <div
          style={{
            color: colors[props.rank - 1],
            fontSize: "22px",
          }}
          className={classname(classNameCollection)}
        ></div>
      );
    }
    return <div className={styles.rank}>{props.rank}</div>;
  };

  return (
    <div className={styles.container}>
      {/* 名次，头像和昵称 */}
      <div className={styles.left}>
        {rankNum()}
        <div className={styles.avatar}>
          <Avatar size="small" src={props.rankInfo.avatar} />
        </div>
        <div className={styles.nickname}>{props.rankInfo.nickname}</div>
      </div>
      {/* 积分 */}
      <div className={styles.right}>{props.rankInfo.points}</div>
    </div>
  );
}

export default ScoreItem;
