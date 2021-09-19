import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchComments = createAsyncThunk('comments/fetchComments', async (postId) => {
  console.log(postId);
  const response = await axios.get(`http://hn.algolia.com/api/v1/items/${postId}`);
  return response.data.children;
});

const commentsSlice = createSlice({
  name: 'comments',
  initialState: null,
  reducers: {},
  extraReducers: {
    [fetchComments.fulfilled]: (state, action) => {
      return action.payload;
    },
  },
});

export const selectComments = (state) => state.comments;

export default commentsSlice.reducer;
