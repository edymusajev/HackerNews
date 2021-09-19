import { configureStore } from '@reduxjs/toolkit';
import commentsReducer from '../features/comments/comments.slice';
import postsReducer from '../features/posts/posts.slice';

export const store = configureStore({
  reducer: {
    comments: commentsReducer,
    posts: postsReducer,
  },
});
