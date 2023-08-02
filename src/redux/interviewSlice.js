import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getInterviewTitle } from "../api/interview";

export const getInterviewTitleAsync = createAsyncThunk(
  "interview/getInterviewTitleAsync",
  async (_, thunkApi) => {
    const res = await getInterviewTitle();
    thunkApi.dispatch(initInterviewTitleList(res.data));
  }
);

const interviewSlice = createSlice({
  name: "interview",
  initialState: {
    interviewTitle: [],
  },
  reducers: {
    initInterviewTitleList: (state, { payload }) => {
      state.interviewTitle = payload;
    },
  },
  // extraReducers:(builder)=>{
  //   builder.addCase(getInterviewTitle.fulfilled, (state, { payload }) => {
  //     state.interviewTitle = payload;
  //   });
  // }
});
export const { initInterviewTitleList } = interviewSlice.actions;

export default interviewSlice.reducer;
