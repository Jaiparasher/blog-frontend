import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import api from '../../utils/api';

// Thunks for fetching, creating, updating, and deleting posts
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const token = localStorage.getItem("token");
  const response = await api.get('/api/posts',
    {
      headers: {Authorization: `Bearer ${token}`}
    });
  
  return response.data;
});

export const fetchPost = createAsyncThunk('posts/fetchPost', async (id) => {
  const token = localStorage.getItem("token");
  const response = await api.get(`/api/posts/${id}`,
    {
      headers: {Authorization: `Bearer ${token}`}
    });
    
  return response.data;
});

export const createPost = createAsyncThunk('posts/createPost', async (postData) => {
  const token = localStorage.getItem("token");
  console.log("pst",postData);
  
  const response = await api.post('/api/posts', postData,
    {
      headers: {Authorization: `Bearer ${token}`}
    });
  return response.data;
});

export const searchPosts = createAsyncThunk('posts/searchPosts', async (query) => {
  const token = localStorage.getItem("token");
  console.log(query);
    const response = await api.get(`/api/posts/search?q=${query}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
});

export const updatePost = createAsyncThunk('posts/updatePost', async ({ id, postData }) => {
  const token = localStorage.getItem("token");
  const response = await api.put(`/api/posts/${id}`, postData,
    {
      headers: {Authorization: `Bearer ${token}`}
    });
  return response.data;
});

export const deletePost = createAsyncThunk('posts/deletePost', async (id) => {
  const token = localStorage.getItem("token");
  await api.delete(`/api/posts/${id}`,
    {
      headers: {Authorization: `Bearer ${token}`}
    });
  return id;
});

const postSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    post: null,
    isLoading: false,  // Change from status to isLoading
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.isLoading = true;  // Set isLoading to true when fetching posts starts
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.isLoading = false;  // Set isLoading to false when fetching posts succeeds
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.isLoading = false;  // Set isLoading to false when fetching posts fails
        state.error = action.error.message;
      })
      .addCase(fetchPost.pending, (state) => {
        state.isLoading = true;  // Set isLoading to true when fetching a single post starts
      })
      .addCase(fetchPost.fulfilled, (state, action) => {
        state.isLoading = false;  // Set isLoading to false when fetching a single post succeeds
        state.post = action.payload;
      })
      .addCase(fetchPost.rejected, (state, action) => {
        state.isLoading = false;  // Set isLoading to false when fetching a single post fails
        state.error = action.error.message;
      })
      .addCase(createPost.pending, (state) => {
        state.isLoading = true;  // Set isLoading to true when creating a post starts
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.isLoading = false;  // Set isLoading to false when creating a post succeeds
        state.posts.push(action.payload);
      })
      .addCase(createPost.rejected, (state, action) => {
        state.isLoading = false;  // Set isLoading to false when creating a post fails
        state.error = action.error.message;
      })
      .addCase(searchPosts.pending, (state) => {
        state.isLoading = true;  // Set isLoading to true when searching posts starts
      })
      .addCase(searchPosts.fulfilled, (state, action) => {
        state.isLoading = false;  // Set isLoading to false when searching posts succeeds
        state.posts = action.payload;
      })
      .addCase(searchPosts.rejected, (state, action) => {
        state.isLoading = false;  // Set isLoading to false when searching posts fails
        state.error = action.error.message;
      })
      .addCase(updatePost.pending, (state) => {
        state.isLoading = true;  // Set isLoading to true when updating a post starts
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.isLoading = false;  // Set isLoading to false when updating a post succeeds
        const index = state.posts.findIndex(post => post._id === action.payload._id);
        if (index !== -1) {
          state.posts[index] = action.payload;
        }
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.isLoading = false;  // Set isLoading to false when updating a post fails
        state.error = action.error.message;
      })
      .addCase(deletePost.pending, (state) => {
        state.isLoading = true;  // Set isLoading to true when deleting a post starts
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.isLoading = false;  // Set isLoading to false when deleting a post succeeds
        state.posts = state.posts.filter(post => post._id !== action.payload);
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.isLoading = false;  // Set isLoading to false when deleting a post fails
        state.error = action.error.message;
      });
  },
});


export default postSlice.reducer;
