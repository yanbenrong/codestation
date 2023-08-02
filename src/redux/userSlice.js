import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { message } from "antd";
import { editUser } from "../api/user";

export const updateUserInfoAsync = createAsyncThunk(
  "user/updateUserInfoAsync",
  async (payload, thunkApi) => {
    await editUser(payload.id, payload.newinfo);
    thunkApi.dispatch(updateUserInfo(payload.newinfo));
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    isLogin: false,
    userInfo: {},
  },
  reducers: {
    initUserInfo: (state, { payload }) => {
      state.userInfo = payload;
    },
    updateUserInfo: (state, { payload }) => {
      state.userInfo = payload;
    },
    changeLoginStatus: (state, { payload }) => {
      state.isLogin = payload;
    },
    clearUserInfo: (state) => {
      state.userInfo = {};
    },
  },
});

export const {
  initUserInfo,
  changeLoginStatus,
  clearUserInfo,
  updateUserInfo,
} = userSlice.actions;
export default userSlice.reducer;
