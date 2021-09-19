import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchIds = createAsyncThunk('news/fetchIds', async (type) => {
  const response = await axios.get(`https://hacker-news.firebaseio.com/v0/${type}.json`);
  return response.data;
});

export const fetchStories = createAsyncThunk('news/fetchStories', async (arg, { getState }) => {
  const state = getState();
  const items = state.news.ids.slice(state.news.startIndex, state.news.startIndex + 30);

  const stories = await axios.all(
    items.map(async (id) => {
      const item = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json?`);
      return item.data;
    })
  );
  return stories;
});

export const fetchMoreStories = createAsyncThunk(
  'news/fetchMoreStories',
  async (arg, { getState }) => {
    const state = getState();
    const items = state.news.ids.slice(state.news.startIndex, state.news.startIndex + 30);

    const stories = await axios.all(
      items.map(async (id) => {
        const item = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json?`);
        return item.data;
      })
    );
    return stories;
  }
);

const newsSlice = createSlice({
  name: 'news',
  initialState: {
    ids: null,
    startIndex: 0,
    type: 'topstories',
    stories: [],
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
  },
  extraReducers: {
    [fetchIds.fulfilled]: (state, action) => {
      state.ids = action.payload;
    },
    [fetchStories.fulfilled]: (state, action) => {
      state.stories = action.payload;
    },
    [fetchMoreStories.fulfilled]: (state, action) => {
      state.stories.push(...action.payload);
    },
  },
});

export const selectIds = (state) => state.news.ids;
export const selectType = (state) => state.news.type;
export const selectStories = (state) => state.news.stories;
export const selectStartIndex = (state) => state.news.startIndex;

export const { setNextPage, typeChanged } = newsSlice.actions;

export default newsSlice.reducer;
