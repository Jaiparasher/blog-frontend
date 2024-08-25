import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import api from '../../utils/api';

// Thunks for fetching, creating, and deleting comments
export const fetchComments = createAsyncThunk('comments/fetchComments', async (postId) => {
  const token = localStorage.getItem("token");
  const response = await api.get(`/api/comments/${postId}`,
    {
      headers: {Authorization: `Bearer ${token}`}
    });
  return response.data;
});

export const addComment = createAsyncThunk('comments/addComment', async ( commentData ) => {
  console.log(commentData);
  
  const token = localStorage.getItem("token");
  const response = await api.post(`/api/comments`, commentData,
    {
      headers: {Authorization: `Bearer ${token}`}
    });
    
  return response.data;
});

export const deleteComment = createAsyncThunk('comments/deleteComment', async ({ postId, commentId }) => {
  const token = localStorage.getItem("token");
  await api.delete(`/api/posts/${postId}/comments/${commentId}`,
    {
      headers: {Authorization: `Bearer ${token}`}
    });
  return commentId;
});

const commentSlice = createSlice({
  name: 'comments',
  initialState: {
    comments: [],
    isLoading: false,  // Change from status to isLoading
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.isLoading = true;  // Set isLoading to true when fetching comments starts
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.isLoading = false;  // Set isLoading to false when fetching comments succeeds
        state.comments = action.payload.docs;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.isLoading = false;  // Set isLoading to false when fetching comments fails
        state.error = action.error.message;
      })
      .addCase(addComment.pending, (state) => {
        state.isLoading = true;  // Set isLoading to true when adding a comment starts
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.isLoading = false;  // Set isLoading to false when adding a comment succeeds
        state.comments.push(action.payload);
      })
      .addCase(addComment.rejected, (state, action) => {
        state.isLoading = false;  // Set isLoading to false when adding a comment fails
        state.error = action.error.message;
      })
      .addCase(deleteComment.pending, (state) => {
        state.isLoading = true;  // Set isLoading to true when deleting a comment starts
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.isLoading = false;  // Set isLoading to false when deleting a comment succeeds
        state.comments = state.comments.filter(comment => comment._id !== action.payload);
      })
      .addCase(deleteComment.rejected, (state, action) => {
        state.isLoading = false;  // Set isLoading to false when deleting a comment fails
        state.error = action.error.message;
      });
  },
});

export default commentSlice.reducer;
