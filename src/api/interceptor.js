import axios from 'axios';
import useAuthStore from '@zustand/authStore'; // Zustand 스토어

const api = axios.create();

// 요청 인터셉터
api.interceptors.request.use(
  (config) => {
    const accessToken = useAuthStore.getState().accessToken;
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const response = await axios.post('/api/refresh', {}, { withCredentials: true });
        const newAccessToken = response.data.accessToken;
        useAuthStore.getState().setAccessToken(newAccessToken);
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        useAuthStore.getState().logout();
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

// API 요청 함수 예시
export const fetchUserData = () => {
  return api.get('/user');
};

export const updateUserProfile = (data) => {
  return api.put('/user/profile', data);
};

export default api;