import axios from 'axios';

const API_URL = 'http://localhost:8089/api';
const api = axios.create({
  baseURL: API_URL
});

api.interceptors.request.use((config) => {
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');
  if (userId) config.headers['X-User-ID'] = userId;
  if (token) config.headers['Authorization'] = `Bearer ${token}`;
  return config;
});

// Activity service
export const getActivities = (userId) =>
  api.get(`/activities/user/${userId}`);

export const addActivity = (activity, config = {}) =>
  api.post('/activities', activity, config);

export const getActivityDetail = (id) =>
  api.get(`/activities/${id}`);

// Recommendation service
export const getRecommendation = (id) =>
  api.get(`/recommendations/activity/${id}`);
