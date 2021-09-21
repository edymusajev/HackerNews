import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchComments = createAsyncThunk('comments/fetchComments', async (postId) => {
  const response = await axios.get(`https://hn.algolia.com/api/v1/items/${postId}`);
  return response.data.children;
});

const commentsSlice = createSlice({
  name: 'comments',
  initialState: {
    status: 'idle',
    comments: null,
  },
  reducers: {},
  extraReducers: {
    [fetchComments.pending]: (state, action) => {
      state.status = 'pending';
    },
    [fetchComments.fulfilled]: (state, action) => {
      state.comments = action.payload;
      state.status = 'fulfilled';
    },
  },
});

export const selectStatus = (state) => state.comments.status;
export const selectComments = (state) => state.comments.comments;

export default commentsSlice.reducer;
