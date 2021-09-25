import { createSlice } from "@reduxjs/toolkit";

const contentSlice = createSlice({
  name: "content",
  initialState: {
    contentID: null,
    title: null,
    description: null,
    updateTime: null,
    pictureUrl: null,
    createAt: null,
    appropiatePHQSeverity: null,
  },
  reducers: {
    setContent(state, action) {
      state.contentID = action.payload.contentID;
      state.title = action.payload.title;
      state.description = action.payload.description;
      state.updateTime = action.payload.updateTime;
      state.pictureUrl = action.payload.pictureUrl;
      state.createAt = action.payload.createAt;
      state.appropiatePHQSeverity = action.payload.appropiatePHQSeverity;
    },
  },
});

export const { setContent } = contentSlice.actions;

export const selectContentID = (state) => state.content.contentID;
export const selectContentID = (state) => state.content.title;
export const selectContentID = (state) => state.content.description;
export const selectContentID = (state) => state.content.updateTime;
export const selectContentID = (state) => state.content.pictureUrl;
export const selectContentID = (state) => state.content.createAt;
export const selectContentID = (state) => state.content.appropiatePHQSeverity;

export default contentSlice.reducer;
