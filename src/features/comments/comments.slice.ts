import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../app/store';

export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async (postId: number | string) => {
    const response = await axios.get(`https://hn.algolia.com/api/v1/items/${postId}`);
    return response.data.children;
  }
);

interface CommentState {
  status: string;
  comments:
    | {
        id: number;
        author: string;
        created_at: Date;
        text: string;
        children: {
          author: string | null;
        }[];
      }[]
    | null;
}

export interface Comment {
  id: number;
  children: {}[] | null;
}

const initialState = {
  status: 'idle',
  comments: null,
} as CommentState;

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state, action) => {
        state.status = 'pending';
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.status = 'fulfilled';
      });
  },
});

export const selectStatus = (state: RootState) => state.comments.status;
export const selectComments = (state: RootState) => state.comments.comments;
export const selectCommentById = (state: RootState, id: number) => {
  if (state.comments.comments) {
    return state.comments.comments.find((comment) => comment.id === id);
  }
};

export default commentsSlice.reducer;
