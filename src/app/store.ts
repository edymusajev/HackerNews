import { configureStore } from '@reduxjs/toolkit';
import commentsReducer from '../features/comments/comments.slice';
import postsReducer from '../features/posts/posts.slice';

export const store = configureStore({
  reducer: {
    comments: commentsReducer,
    posts: postsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
