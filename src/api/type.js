import request from "./request";

/**
 * 获取所有类型
 */
export const getType = () => {
  return request({
    url: "/api/Type",
    method: "GET",
  });
};
