import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getType } from "../api/type";

export const getTypeList = createAsyncThunk("type/getTypeList", async () => {
  const res = await getType();
  return res.data;
});

const typeSlice = createSlice({
  name: "type",
  initialState: {
    typeList: [],
    issueTypeId: "all",
    bookTypeId: "all",
  },
  reducers: {
    updateIssueTypeId: (state, { payload }) => {
      state.issueTypeId = payload;
    },
  },
  // 处理异步reducer
  // 控制台提示已废弃
  // extraReducers: {
  //   [getTypeList.fulfilled]: (state, { payload }) => {
  //     state.typeList = payload;
  //   },
  // },
  extraReducers: (builder) => {
    builder.addCase(getTypeList.fulfilled, (state, { payload }) => {
      state.typeList = payload;
    });
  },
});

export const { updateIssueTypeId } = typeSlice.actions;
export default typeSlice.reducer;
