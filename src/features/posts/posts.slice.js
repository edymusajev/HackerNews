import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchIds = createAsyncThunk('posts/fetchIds', async (type) => {
  const response = await axios.get(`https://hacker-news.firebaseio.com/v0/${type}.json`);
  return response.data;
});

export const fetchSinglePost = createAsyncThunk('posts/fetchSinglePost', async (postId) => {
  const response = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${postId}.json`);
  return response.data;
});

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async (arg, { getState }) => {
  const state = getState();
  const items = state.posts.ids.slice(state.posts.startIndex, state.posts.startIndex + 30);

  const posts = await axios.all(
    items.map(async (id) => {
      const post = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json?`);
      return post.data;
    })
  );
  return posts;
});

export const fetchMorePosts = createAsyncThunk('news/fetchMorePosts', async (arg, { getState }) => {
  const state = getState();
  const items = state.posts.ids.slice(state.posts.startIndex, state.posts.startIndex + 30);

  const posts = await axios.all(
    items.map(async (id) => {
      const item = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json?`);
      return item.data;
    })
  );
  return posts;
});

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    ids: null,
    startIndex: 0,
    posts: null,
    singlePost: null,
    type: 'topstories',
  },
  reducers: {
    setNextPage(state, action) {
      if (state.startIndex + 30 < state.ids.length) {
        state.startIndex += 30;
      }
    },
    typeChanged(state, action) {
      state.type = action.payload;
    },
    postsCleared(state, action) {
      state.posts = null;
    },
  },
  extraReducers: {
    [fetchIds.fulfilled]: (state, action) => {
      state.ids = action.payload;
    },
    [fetchSinglePost.fulfilled]: (state, action) => {
      state.singlePost = action.payload;
    },
    [fetchIds.fulfilled]: (state, action) => {
      state.ids = action.payload;
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.posts = action.payload;
    },
    [fetchMorePosts.fulfilled]: (state, action) => {
      state.posts.push(...action.payload);
    },
  },
});

export const { typeChanged, setNextPage, postsCleared } = postsSlice.actions;

export const selectStartIndex = (state) => state.posts.startIndex;
export const selectIds = (state) => state.posts.ids;
export const selectSinglePost = (state) => state.posts.singlePost;
export const selectPosts = (state) => state.posts.posts;
export const selectType = (state) => state.posts.type;

export default postsSlice.reducer;
