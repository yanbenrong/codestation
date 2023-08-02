import React from "react";
import { Card, Carousel } from "antd";

import RecommendItem from "../RecommendItem";
import styles from "../../css/Recommend.module.css";
import { RecommendItemData, CarouselData } from "./staticData";

export default function Recommend() {
  return (
    <Card title="推荐内容" style={{ marginBottom: "20px" }}>
      {/* 上方轮播图 */}
      <div style={{ marginBottom: 20 }}>
        <Carousel autoplay>
          {CarouselData.map((item, index) => {
            return (
              <div key={index}>
                <a
                  style={{
                    background: `url(${item.url}) center/cover no-repeat`,
                  }}
                  className={styles.contentStyle}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                ></a>
              </div>
            );
          })}
        </Carousel>
      </div>
      {RecommendItemData.map((item, index) => {
        return <RecommendItem key={index} recommendInfo={item} />;
      })}
    </Card>
  );
}
