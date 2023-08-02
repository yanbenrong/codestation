import request from "./request";

/**
 * 获取验证码
 */
export const getCaptcha = () => {
  return request({
    url: "/res/captcha",
    method: "GET",
  });
};

/**
 * 查询用户是否存在
 * @param loginId
 */
export const userIsExist = (loginId) => {
  return request({
    url: `/api/user/userIsExist/${loginId}`,
    method: "GET",
  });
};
/**
 * 根据id查询用户信息
 * @param loginId
 */
export const getUserById = (id) => {
  return request({
    url: `/api/user/${id}`,
    method: "GET",
  });
};
/**
 * 用户注册
 * @param {*} data
 * @returns
 */
export const addUser = (data) => {
  return request({
    url: `/api/user`,
    method: "POST",
    data,
  });
};
/**
 * 用户登录
 * @param {*} data
 * @returns
 */
export const userLogin = (data) => {
  return request({
    url: `/api/user/login`,
    method: "POST",
    data,
  });
};
/**
 * 恢复用户数据
 * @returns
 */
export const getUserInfo = () => {
  return request({
    url: `/api/user/whoami`,
    method: "GET",
  });
};
/**
 * 获取积分前十的用户
 * @returns
 */
export const getUserByPointsRank = () => {
  return request({
    url: `/api/user/pointsrank`,
    method: "GET",
  });
};

/**
 * 根据id 修改用户
 * @param {*} data
 * @returns
 */
export const editUser = (id,data) => {
  return request({
    url: `/api/user/${id}`,
    method: "PATCH",
    data,
  });
};
/**
 * 验证用户账号密码是否正确
 */
export function checkPassword(userId, loginPwd){
  return request({
    url : "/api/user/passwordcheck",
    method : "POST",
    data : {
      userId,
      loginPwd
    }
  })
}