import request from "./request";

/**
 * 根据id获取评论
 * @param {*} id
 * @returns
 */
export const getIssueCommentById = (id, params) => {
  return request({
    url: `/api/comment/issuecomment/${id}`,
    method: "GET",
    params,
  });
};

/**
 * 添加评论
 * @param {*} data
 * @returns
 */
export const addComment = (data) => {
  return request({
    url: `/api/comment`,
    method: "POST",
    data,
  });
};
