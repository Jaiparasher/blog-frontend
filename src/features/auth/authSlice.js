import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import api from '../../utils/api';

// Thunks for login, register, and getting user details
export const loginUser = createAsyncThunk('auth/loginUser', async (credentials) => {
  const response = await api.post('/api/auth/login', credentials);
  return response.data;
});

export const registerUser = createAsyncThunk('auth/registerUser', async (userData) => {
  const response = await api.post('/api/auth/register', userData);
  return response.data;
});

export const fetchUserDetails = createAsyncThunk('auth/fetchUserDetails', async () => {
  const token = localStorage.getItem("token");
  const response = await api.get('/api/auth/me',
    {
      headers: {Authorization: `Bearer ${token}`}
    });
  return response.data;
});

export const getCurrentUser = createAsyncThunk("getCurrentUser", async() => {
  const token = localStorage.getItem("token");
  const response = await api.get("/api/auth/me",
    {
      headers: {Authorization: `Bearer ${token}`}
    }
  );
  return response.data;
})

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: localStorage.getItem('token') || null,
    status: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.status=false;
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.token = action.payload.token;
        state.status=true;
        localStorage.setItem('token', action.payload.token);
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.token = action.payload.token;
        localStorage.setItem('token', action.payload.token);
      })
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.status = true;
        state.user = action.payload;
        
    });;
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
