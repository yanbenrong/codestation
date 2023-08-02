import request from "./request";

/**
 * 获取面试题标题
 * @returns 
 */
export const getInterviewTitle = () => {
  return request({
    url: `/api/interview/interviewTitle`,
    method: "GET",
  });
};

/**
 * 根据id获取面试题
 * @param {*} id 
 * @returns 
 */
export const getInterviewById = (id) => {
  return request({
    url: `/api/interview/${id}`,
    method: "GET",
  });
};