import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchSinglePost = createAsyncThunk('posts/fetchSinglePost', async (postId) => {
  const response = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${postId}.json`);
  return response.data;
});

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: null,
  },
  reducers: {},
  extraReducers: {
    [fetchSinglePost.fulfilled]: (state, action) => {
      state.posts = action.payload;
    },
  },
});

export const selectSinglePost = (state) => state.posts.posts;

export default postsSlice.reducer;
