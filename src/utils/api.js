import axios from 'axios';

const API_URL = 'https://blog-backend-jlfp.onrender.com';

const api = axios.create({
  baseURL: API_URL
});

// API calls for Posts
export const fetchPosts = async () => {
  const response = await api.get('/api/posts');
  return response.data;
};

export const fetchPostById = async (id) => {
  const response = await api.get(`/api/posts/${id}`);
  return response.data;
};

export const createPost = async (post) => {
  const response = await api.post('/api/posts', post);
  return response.data;
};

export const updatePost = async (id, post) => {
  const response = await api.put(`/api/posts/${id}`, post);
  return response.data;
};

export const deletePost = async (id) => {
  const response = await api.delete(`/api/posts/${id}`);
  return response.data;
};

// API calls for Comments
export const createComment = async (postId, comment) => {
  const response = await api.post(`/posts/${postId}/comments`, comment);
  return response.data;
};

// API calls for Authentication
export const login = async (credentials) => {
  const response = await api.post('/auth/login', credentials);
  return response.data;
};

export const register = async (user) => {
  const response = await api.post('/auth/register', user);
  return response.data;
};

export default api;
