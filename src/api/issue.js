import request from "./request";

/**
 * 分页获取问答
 */
export const getIssueByPage = (params) => {
  return request({
    url: `/api/issue`,
    method: "GET",
    params: {
      ...params,
    },
  });
};

/**
 * 新增问答
 */
export const addIssue = (data) => {
  return request({
    url: `/api/issue`,
    method: "POST",
    data,
  });
};

/**
 * 根据 id 获取问答详情
 */
export const getIssueById = (id) => {
  return request({
    url: `/api/issue/${id}`,
    method: "GET",
  });
};
/**
 * 更新问答
 * @param {*} data
 * @returns
 */
export const updateIssue = (id, data) => {
  return request({
    url: `/api/issue/${id}`,
    method: "PATCH",
    data,
  });
};
