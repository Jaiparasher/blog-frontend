import { configureStore } from '@reduxjs/toolkit';
import postReducer from './posts/postSlice';
import commentReducer from './comments/commentSlice';
import authReducer from './auth/authSlice';

const store = configureStore({
  reducer: {
    posts: postReducer,
    comments: commentReducer,
    auth: authReducer,
  },
});

export default store;
