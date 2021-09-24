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

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async (type, { getState }) => {
  const { posts } = getState();
  const allPostIds = await axios.get(`https://hacker-news.firebaseio.com/v0/${type}.json`);
  const postIds = allPostIds.data.slice(posts.startIndex, posts.startIndex + 30);

  const response = await axios.all(
    postIds.map(async (id) => {
      const post = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json?`);
      if (post.data) {
        return post.data;
      }
    })
  );
  return response;
});

export const fetchMorePosts = createAsyncThunk('news/fetchMorePosts', async (arg, { getState }) => {
  const { posts } = getState();
  const items = posts.ids.slice(posts.startIndex, posts.startIndex + 30);

  const response = await axios.all(
    items.map(async (id) => {
      const item = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json?`);
      return item.data;
    })
  );
  return response;
});

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    idStatus: 'idle',
    postsStatus: 'idle',
    singlePostStatus: 'idle',
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
    resetIndex(state, action) {
      state.startIndex = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIds.pending, (state, action) => {
        state.idStatus = 'pending';
      })
      .addCase(fetchIds.fulfilled, (state, action) => {
        state.idStatus = 'fulfilled';
        state.ids = action.payload;
      })
      .addCase(fetchSinglePost.pending, (state, action) => {
        state.singlePostStatus = 'pending';
      })
      .addCase(fetchSinglePost.fulfilled, (state, action) => {
        state.singlePostStatus = 'fulfilled';
        state.singlePost = action.payload;
      })
      .addCase(fetchPosts.pending, (state, action) => {
        state.postsStatus = 'pending';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.postsStatus = 'fulfilled';
        state.posts = action.payload;
      })
      .addCase(fetchMorePosts.fulfilled, (state, action) => {
        state.posts.push(...action.payload);
      });
  },
});

export const { typeChanged, setNextPage, postsCleared, resetIndex } = postsSlice.actions;

export const selectIdStatus = (state) => state.posts.idStatus;
export const selectSinglePostStatus = (state) => state.posts.singlePostStatus;
export const selectPostsStatus = (state) => state.posts.postsStatus;
export const selectStartIndex = (state) => state.posts.startIndex;
export const selectIds = (state) => state.posts.ids;
export const selectSinglePost = (state) => state.posts.singlePost;
export const selectPosts = (state) => state.posts.posts;
export const selectType = (state) => state.posts.type;

export default postsSlice.reducer;
