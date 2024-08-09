import axios from 'axios';
import useAuthStore from '@zustand/authStore'; // Zustand 스토어

const api = axios.create();

// 요청 인터셉터
api.interceptors.request.use(
  (config) => {
    try {
      const accessToken = useAuthStore.getState().accessToken;
      
      if (accessToken) {
        config.headers['Authorization'] = `${accessToken}`;
      }
      
      return config;
    } catch (error) {
      console.error("요청 인터셉터 내부 에러:", error);
      return Promise.reject(error);
    }
  },
  (error) => {
    console.error("인터셉터 에러입니다:", error);
    return Promise.reject(error);
  }
);

// 응답 인터셉터
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const response = await axios.post('/api/refreshToken', {}, { withCredentials: true });
        const newAccessToken = response.headers['authorization'];
        useAuthStore.getState().setAccessToken(newAccessToken);
        originalRequest.headers['Authorization'] = newAccessToken;
        api.defaults.headers.common['Authorization'] = newAccessToken;
        localStorage.setItem('accessToken', newAccessToken);
        useAuthStore.getState().setAccessToken(newAccessToken)
        useAuthStore.getState().setUser(response.data.username)
        useAuthStore.getState().setId(response.data.userId)
        return api(originalRequest);
      } catch (refreshError) {
        console.log("refreshError catch문 안")
        // await handleLogout();
        console.log(refreshError)
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

async function handleLogout() {
  try {
    // 서버에 로그아웃 요청
    await api.post('/api/logout');
  } catch (error) {
    console.error('로그아웃 요청 실패:', error);
  } finally {
    // 로컬 상태 및 스토리지 정리
    localStorage.removeItem('accessToken');
    useAuthStore.getState().logout();
    // 필요한 경우 라우터를 사용하여 로그인 페이지로 리다이렉트
    // 예: router.push('/login');
  }
}

export default api;