import { configureStore } from '@reduxjs/toolkit';
import newsReducer from '../features/news/news.slice';
import itemReducer from '../features/item/item.slice';
import commentsReducer from '../features/comments/comments.slice';
import postsReducer from '../features/posts/posts.slice';

export const store = configureStore({
  reducer: {
    news: newsReducer,
    item: itemReducer,
    comments: commentsReducer,
    posts: postsReducer,
  },
});
